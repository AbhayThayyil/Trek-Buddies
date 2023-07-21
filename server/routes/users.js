const router = require("express").Router();
const {
  updateUser,
  deleteUser,
  getSingleUserData,
  followUser,
  unfollowUser,
} = require("../controllers/user-controller");
const User = require("../models/User");

router.get("/", (req, res) => {
  res.send("First test");
});

// Update a user
router.put("/:id", updateUser);

// Delete a user
router.delete("/:id", deleteUser);

// Get a user
router.get("/:id", getSingleUserData);

// Follow a user
router.put("/:id/follow",followUser)

// Unfollow a user
router.put("/:id/unfollow",unfollowUser)

module.exports = router;
