const Post = require("../models/Post");
const User = require("../models/User");

module.exports = {
  createPost: async (req, res) => {
    const newPost = new Post(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  updatePost: async (req, res) => {
    try {
      const postToUpdate = await Post.findById(req.params.id);

      if (!postToUpdate) {
        res.status(400).json({ error: "Post not found" });
      } else {
        if (postToUpdate.owner.toString() === req.body.owner) {
          await postToUpdate.updateOne({ $set: req.body });
          res.status(200).json({ message: "Post updated successfully" });
        } else {
          res.status(403).json({ error: "You cannot update other's post" });
        }
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deletePost: async (req, res) => {
    try {
      const postToDelete = await Post.findById(req.params.id);

      if (!postToDelete) {
        res.status(400).json({ error: "Post not found" });
      } else {
        if (postToDelete.owner.toString() === req.body.owner) {
          await postToDelete.deleteOne();
          res.status(200).json({ message: "Post deleted successfully" });
        } else {
          res.status(403).json({ error: "You cannot delete other's post" });
        }
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  likePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post.likes.includes(req.body.owner)) {
        await post.updateOne({ $push: { likes: req.body.owner } });
        res.status(200).json({ message: "The post has been liked" });
      } else {
        await post.updateOne({ $pull: { likes: req.body.owner } });
        res.status(200).json({ message: "The post has been disliked" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getSinglePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getTimelinePosts: async (req, res) => {
    try {
      const currentUser = await User.findById(req.body.userId);

      const userPosts = await Post.find({ owner: currentUser._id });

      const friendsPosts = await Promise.all(
        currentUser.following.map((friendId) => {
          return Post.find({ owner: friendId });
        })
      );
      console.log(friendsPosts);
      res.status(200).json(userPosts.concat(...friendsPosts));
    } catch (err) {
      res.status(500).json(err);
    }
  },

  reportPost: async (req, res) => {
    try {
      const postToReport = await Post.findById(req.params.id);
      if (!postToReport) {
        res.status(400).json({ error: "Post not found" });
      } else {
        if (postToReport.owner.toString() === req.body.userId) {
          res.status(403).json({ error: "You cannot report your own post" });
        } else {
          const reportObject = {
            userId: req.body.userId,
            reportReason: req.body.reportReason,
          };
          await postToReport.updateOne({
            $push: { reports: reportObject },
          });
          res.status(200).json({ message: "Reported successfully" });
        }
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  commentOnPost: async (req, res) => {
    try {
      const postToComment = await Post.findById(req.params.id);
      if (!postToComment) {
        res.status(400).json({ error: "Post not found" });
      } else {
        const commentObject = {
          userId: req.body.userId,
          comment: req.body.comment,
        };
        await postToComment.updateOne({
          $push: { comments: commentObject },
        });
        res.status(200).json({ message: "Commented successfully" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteComment: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      console.log(post, "post");
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      const comment = post.comments.id(req.params.commentId);
      console.log(comment, "comment");
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }

      if (comment.userId.toString() !== req.body.userId) {
        return res
          .status(403)
          .json({error:"You are not authorized to delete this comment"});
      }

      post.comments.pull(comment._id);
      await post.save();

      res.json({message:"Comment deleted successfully"});
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
