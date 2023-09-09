import { bucketName, s3 } from "../config/s3bucket.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

import { v4 as uuidv4 } from "uuid";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import sharp from "sharp";
import crypto from "crypto";

const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

// Create a post

export const createPost = async (req, res) => {
  console.log("req.body", req.body);
  console.log("req.file", req.file);

  const contentType = "image/webp";

  const buffer = await sharp(req.file.buffer).webp().toBuffer();
  const imageName = randomImageName();

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Body: buffer,
    ContentType: contentType,
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);

  const newPost = await new Post({
    owner: req.body.owner,
    description: req.body.description,
    image: imageName,
  }).populate("owner");

  // console.log(newPost,"this is new post populated");
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Updating a post

export const updatePost = async (req, res) => {
  try {
    const postToUpdate = await Post.findById(req.params.postId);

    if (!postToUpdate) {
      res.status(400).json({ error: "Post not found" });
    } else {
      if (postToUpdate.owner.toString() === req.userId) {
        await postToUpdate.updateOne({ $set: req.body });
        res.status(200).json({ message: "Post updated successfully" });
      } else {
        res.status(403).json({ error: "You cannot update other's post" });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Deleting a post

export const deletePost = async (req, res) => {
  try {
    const postToDelete = await Post.findById(req.params.postId);

    if (!postToDelete) {
      res.status(404).json({ error: "Post not found" });
    } else {
      console.log(postToDelete, "chk post to delete");
      // console.log(req.userId,"chk userId");

      if (postToDelete.owner.toString() !== req.userId) {
        return res
          .status(403)
          .json({ error: "You cannot delete other's post" });
      }

      const params = {
        Bucket: bucketName,
        Key: postToDelete.image,
      };

      const command = new DeleteObjectCommand(params);
      await s3.send(command);

      await postToDelete.deleteOne();
      return res
        .status(200)
        .json({ message: "Post deleted successfully", postToDelete });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Like / Dislike a post

export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(400).json("Post not found");
    }
    const isLiked = post.likes.includes(req.userId);

    const updatedPost = await post.updateOne(
      isLiked
        ? { $pull: { likes: req.userId } }
        : { $push: { likes: req.userId } }
    );

    if (isLiked) {
      res.status(200).json({ message: "The post has been disliked" });
    } else {
      res.status(200).json({ message: "The post has been liked" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get details of a single post

export const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    const getObjectParams = {
      Bucket: bucketName,
      Key: post.image,
    };
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    post.imageURL = url;

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get all posts for a user timeline -own posts and friends post

export const getTimelinePosts = async (req, res) => {
  const currentUser = await User.findById(req.userId);

  try {
    const timelinePosts = await Post.find({
      $or: [
        { owner: currentUser._id },
        { owner: { $in: currentUser.following } },
      ],
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "comments.userId owner",
        model: "User",
        select: "firstName lastName profilePicture",
      });

    for (const post of timelinePosts) {
      const getObjectParams = {
        Bucket: bucketName,
        Key: post.image,
      };

      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      post.imageURL = url;
    }

    // console.log(timelinePosts, "timeline post chk");
    res.status(200).json(timelinePosts);
  } catch (err) {
    res.status(500).json(err);
  }

  // try {
  //   const timelinePosts = await Post.aggregate([
  //     {
  //       $match: {
  //         $or: [
  //           { owner: currentUser._id },
  //           { owner: { $in: currentUser.following } },
  //         ],
  //       },
  //     },
  //     {
  //       $lookup: {
  //         from: "users",
  //         localField: "owner",
  //         foreignField: "_id",
  //         as: "owner",
  //       },
  //     },
  //     {
  //       $unwind: "$owner",
  //     },

  //     {
  //       $sort: { createdAt: -1 },
  //     },
  //   ]);

  //   // To get all postIds
  //   const postIds = timelinePosts.map((post) => post._id);
  //   console.log(postIds, "postId chk");

  //   const populated=timelinePosts.populate({
  //     path: "comments.userId",
  //     model: "User",
  //     select: "firstName lastName profilePicture",
  //   })
  //   .sort({ createdAt: -1 });

  //   console.log(populated,"populated ");

  //   // To get all the posts populated
  //   const populatedTimelinePosts = await timelinePosts.find({
  //     _id: { $in: postIds },
  //   })
  //     .populate({
  //       path: "comments.userId",
  //       model: "User",
  //       select: "firstName lastName profilePicture",
  //     })
  //     .sort({ createdAt: -1 });

  //     for (const post of populatedTimelinePosts) {
  //       const getObjectParams = {
  //         Bucket: bucketName,
  //         Key: post.image,
  //       };

  //       const command = new GetObjectCommand(getObjectParams);
  //       const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
  //       post.imageURL = url;
  //     }

  //   console.log(populatedTimelinePosts, "timeline posts");

  //   res.status(200).json(populatedTimelinePosts);
  // } catch (err) {
  //   res.status(500).json(err);
  // }
};

// Get only user's posts

export const getUserPosts = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);

    if (!currentUser) {
      return res.status(404).json("User not found");
    }

    const userPosts = await Post.find({ owner: currentUser._id }).populate({
      path: "owner comments.userId",
      model: "User",
      select: "firstName lastName profilePicture",
    });

    for (const post of userPosts) {
      const getObjectParams = {
        Bucket: bucketName,
        Key: post.image,
      };

      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      post.imageURL = url;
    }

    // console.log(userPosts,"user's posts");
    res.status(200).json(userPosts.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
};

// To report a post

export const reportPost = async (req, res) => {
  const uuid = uuidv4();
  try {
    // console.log(req.body, "req.body");
    const postToReport = await Post.findById(req.params.postId);
    if (!postToReport) {
      return res.status(400).json({ error: "Post not found" });
    } else {
      if (postToReport.owner.toString() === req.userId) {
        return res
          .status(403)
          .json({ error: "You cannot report your own post" });
      } else {
        const reportObject = {
          userId: req.userId,
          reportReason: req.body.reportReasonText,
          reportId: uuid,
        };
        console.log(reportObject, "report obj chk");
        await postToReport.updateOne({
          $push: { reports: reportObject },
        });

        const reportedPost = await Post.findById(req.params.postId).populate({
          path: "reports.userId",
          model: "User",
          select: "firstName lastName profilePicture",
        });
        console.log(reportedPost, "repo post chk");
        const uniqueReport = reportedPost.reports.find(
          (report) => report.reportId === uuid
        );

        console.log(uniqueReport, "unique report chk");

        res
          .status(200)
          .json({ message: "Reported successfully", report: uniqueReport });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Comment on a post

export const commentOnPost = async (req, res) => {
  const uuid = uuidv4();
  try {
    const postToComment = await Post.findById(req.params.postId);
    if (!postToComment) {
      res.status(400).json({ error: "Post not found" });
    } else {
      console.log(req.body, "body check ");
      const commentObject = {
        userId: req.userId,
        comment: req.body.comment,
        commentId: uuid,
      };
      await postToComment.updateOne({
        $push: { comments: commentObject },
      });

      // await postToComment.populate('comments.userId')

      // console.log(postToComment,"post check if comment is there");

      const postToComment2 = await Post.findById(req.params.postId).populate({
        path: "comments.userId",
        model: "User",
        select: "firstName lastName profilePicture",
      });
      const postedComment = postToComment2.comments.find(
        (comment) => comment.commentId === uuid
      );
      // console.log(postedComment, "comment that was posted");

      // todo FIX THIS.I am not getting the comment details.Check if it is a query issue

      res
        .status(200)
        .json({ message: "Commented successfully", comment: postedComment });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Edit a comment on a post

export const editComment=async(req,res)=>{
  console.log(req.body,"check the body ");
  try{
    const post = await Post.findById(req.params.postId);
    console.log(post, "post");
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const comment = post.comments.id(req.params.commentId);
    console.log(comment, "comment");
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (comment.userId.toString() !== req.userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to edit this comment" });
    }




  }
  catch(err){
    res.status(500).json(err);
  }
};

// Delete a comment on a post

export const deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    console.log(post, "post");
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comment = post.comments.id(req.params.commentId);
    console.log(comment, "comment");
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (comment.userId.toString() !== req.userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this comment" });
    }

    post.comments.pull(comment._id);
    await post.save();

    res.json({
      message: "Comment deleted successfully",
      comment,
      postId: post._id,
      commentId: comment._id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
