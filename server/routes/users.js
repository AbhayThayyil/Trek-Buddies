import { Router } from "express";
import {
  updateUser,
  deleteUser,
  getSingleUserData,
  followUser,
  unfollowUser,
  listUser,
  getAllUsers,
  getFriendsData,
  updateProfilePic,
  updateCoverPic,
} from "../controllers/user-controller.js";
import User from "../models/User.js";
import { authorization } from "../middlewares/auth.js";
import upload from "../config/multer.js";

const router = Router();

router.get("/", getAllUsers);

// Get a user
router.get("/:id", authorization, getSingleUserData);

// Update a user
router.put("/update", authorization, updateUser);

// Delete a user
router.delete("/delete", authorization, deleteUser);

// Follow a user
router.put("/:id/follow", authorization, followUser);

// Unfollow a user
router.put("/:id/unfollow", authorization, unfollowUser);

// to get a friend's data
router.get("/friends/all",authorization, getFriendsData);

// TEST - List Users
router.get("/test/listUsers", authorization, listUser);

// to UPDATE Profile Picture 

router.put("/updateProfilePicture",authorization,upload.single('file'),updateProfilePic)

// to UPDATE Cover Picture 

router.put("/updateCoverPicture",authorization,upload.single('file'),updateCoverPic)

export default router;
