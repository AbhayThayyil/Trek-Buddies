import { bucketName, s3 } from "../config/s3bucket.js";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import Admin from "../models/Admin.js";
import User from "../models/User.js";
import Post from "../models/Post.js";

export const getUsersList = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(400).json("No users found");
    } else {
      res.status(200).json({ users, message: "Users found" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getPostsList = async (req, res) => {
  try {
    const posts = await Post.find().populate("owner comments.userId");
    if (!posts) {
      return res.status(400).json("No posts found");
    } else {
      for (const post of posts) {
        const getObjectParams = {
          Bucket: bucketName,
          Key: post.image,
        };

        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        post.imageURL = url;
      }

      res.status(200).json({ posts, message: "Posts found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// To Block/Unblock a user

export const blockUser = async (req, res) => {
  const userEmail = req.params.userEmail;

  console.log(userEmail, "email chk");
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(400).json("No user found");
    }
    if (user.blocked) {
      user.blocked = false;
    } else {
      user.blocked = true;
    }

    const updatedUser = await user.save();
    console.log(updatedUser, "block/unblock user chk");
    res.status(200).json({ updatedUser, message: "User block status changed" });
  } catch (err) {
    res.status(500).json(err);
  }
};

// To get ALL REPORTS

export const getAllReports = async (req, res) => {
  const allReports = [];
  try {
    const posts = await Post.find();
    posts.forEach((post) => {
      post.reports.forEach((report) => {
        allReports.push(report);
      });
    });
    res.status(200).json({ allReports, message: "Reports found" });
  } catch (err) {
    res.status(500).json(err);
  }
};
