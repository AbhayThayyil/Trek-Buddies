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
} from "../controllers/user-controller.js";
import User from "../models/User.js";
import { authorization } from "../middlewares/auth.js";

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
router.get("/friends/", getFriendsData);

// TEST - List Users
router.get("/test/listUsers", authorization, listUser);

export default router;
