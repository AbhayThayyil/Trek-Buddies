const router = require("express").Router();
const { createPost, updatePost, deletePost, likePost, getSinglePost, getTimelinePosts, reportPost, commentOnPost, deleteComment } = require("../controllers/post-controller");
const Post = require("../models/Post");

//Create a post
router.post("/", createPost);

//Update a post
router.put("/:id", updatePost);

//Delete a post
router.delete("/:id", deletePost);

//Like and Dislike a post
router.put("/:id/like",likePost)

//Comment on a post
router.put("/:id/comment",commentOnPost)

//Delete a comment
router.put("/:id/deleteComment/:commentId",deleteComment)

//Report a post
router.put("/:id/report",reportPost)

//Get a post
router.get("/:id",getSinglePost)

//Get timeline posts - fetch posts of self and friends 
router.get("/timeline/all",getTimelinePosts)

module.exports = router;
