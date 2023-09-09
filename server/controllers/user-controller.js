import User from "../models/User.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    if (allUsers) {
      res.status(200).json(allUsers);
    } else {
      res.status(400).json("No users found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getSingleUserData = async (req, res) => {
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
};

export const updateUser = async (req, res) => {
  if (req.body.userId === req.userId) {
    // If you are updating a password
    if (req.body.password) {
      try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      } catch (err) {
        res.status(500).json(err);
      }
    }
    try {
      const userToUpdate = await User.findOneAndUpdate(
        { _id: req.userId },
        {
          $set: req.body,
        }
      );
      res.status(200).json("User details have been updated !");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account !");
  }
};

export const deleteUser = async (req, res) => {
  if (req.body.userId === req.userId) {
    try {
      const userToDelete = await User.findByIdAndDelete(req.userId);
      res.status(200).json("User account has been deleted !");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account !");
  }
};

export const followUser = async (req, res) => {
  // console.log(req.userId);
  if (req.userId !== req.params.id) {
    try {
      const [userToFollow, currentUser] = await Promise.all([
        User.findById(req.params.id),
        User.findById(req.userId),
      ]);

      if (!userToFollow || !currentUser) {
        return res.status(404).json("User not found");
      }

      if (!userToFollow.followers.includes(req.userId)) {
        await Promise.all([
          userToFollow.updateOne({ $push: { followers: req.userId } }),
          currentUser.updateOne({ $push: { following: req.params.id } }),
        ]);
        res.status(200).json("User followed");
      } else {
        res.status(403).json("You are already following this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You cannot follow yourself");
  }
};

export const unfollowUser = async (req, res) => {
  // console.log(req.userId);
  if (req.userId !== req.params.id) {
    try {
      const [userToUnfollow, currentUser] = await Promise.all([
        User.findById(req.params.id),
        User.findById(req.userId),
      ]);

      if (!userToUnfollow || !currentUser) {
        return res.status(404).json("User not found");
      }

      if (userToUnfollow.followers.includes(req.userId)) {
        await Promise.all([
          userToUnfollow.updateOne({ $pull: { followers: req.userId } }),
          currentUser.updateOne({ $pull: { following: req.params.id } }),
        ]);
        res.status(200).json("User Unfollowed");
      } else {
        res.status(403).json("You are not following this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You cannot unfollow yourself");
  }
};

export const getFriendsData = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const friends = await Promise.all(
      user.followings.map((followedId) => {
        return User.findById(followedId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, firstName, lastName, profilePicture } = friend;
      friendList.push({ _id, firstName, lastName, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
};

// This is a sample for jwt auth test
//todo: delete later
export const listUser = async (req, res) => {
  try {
    console.log(req.userId, "userId from token");
    const users = await User.find({});
    // console.log(users);
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(400).json("Not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
