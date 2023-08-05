const router = require("express").Router();
const {
  updateUser,
  deleteUser,
  getSingleUserData,
  followUser,
  unfollowUser,
  listUser,
  getFriends,
  getAllUsers,
} = require("../controllers/user-controller");
const User = require("../models/User");
const {authorization} =require("../middlewares/auth")

router.get("/", getAllUsers);

// Update a user
router.put("/:id", updateUser);

// Delete a user
router.delete("/:id", deleteUser);

// Get a user
router.get("/:id", getSingleUserData);

// Follow a user
router.put("/:id/follow",authorization,followUser)

// Unfollow a user
router.put("/:id/unfollow",unfollowUser)

router.get("/friends/:userId",getFriends)



//TEST- List Users

router.get("/test/listUsers",authorization,listUser)

module.exports = router;
