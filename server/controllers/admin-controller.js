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
    const posts = await Post.find().populate("owner");
    if (!posts) {
      return res.status(400).json("No posts found");
    } else {
      res.status(200).json({ posts, message: "Posts found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
