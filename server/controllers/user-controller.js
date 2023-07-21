const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = {
  

  updateUser: async (req, res) => {
    if (req.body.userId === req.params.id) {
      // If you are updating a password
      if (req.body.password) {
        try {
          req.body.password = await bcrypt.hash(req.body.password, 10);
        } catch (err) {
          res.status(500).json(err);
        }
      }
      try {
        const userToUpdate = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json("User details have been updated !");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can update only your account !");
    }
  },

  deleteUser: async (req, res) => {
    if (req.body.userId === req.params.id) {
      try {
        const userToDelete = await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User account has been deleted !");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can delete only your account !");
    }
  },

  getSingleUserData: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, updatedAt, ...other } = user._doc;
      if (user) {
        res.status(200).json(other);
      } else {
        res.status(404).json("User not found");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  followUser: async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const userToFollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (!userToFollow.followers.includes(req.body.userId)) {
          await userToFollow.updateOne({ $push: { followers: req.body.userId } });
          await currentUser.updateOne({
            $push: { following: req.params.id },
          });
          res.status(400).json("User followed");
        } else {
          res.status(403).json("You are already following this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You cannot follow yourself");
    }
  },

  unfollowUser: async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const userToUnfollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (userToUnfollow.followers.includes(req.body.userId)) {
          await userToUnfollow.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({
            $pull: { following: req.params.id },
          });
          res.status(400).json("User unfollowed");
        } else {
          res.status(403).json("You are not following this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You cannot unfollow yourself");
    }
  },
};
