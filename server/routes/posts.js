import { Router } from 'express';
import {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getSinglePost,
  getTimelinePosts,
  reportPost,
  commentOnPost,
  deleteComment,
  getUserPosts,
  editComment,
} from '../controllers/post-controller.js';
import { authorization } from '../middlewares/auth.js';
import upload from '../config/multer.js';


const router = Router();

// Create a post
router.post('/', authorization, upload.single('file'), createPost);

// Get a post, Update a post, Delete a post
router
  .route('/:postId')
  .get(authorization,getSinglePost)
  .put(authorization,updatePost)
  .delete(authorization,deletePost);

// Like and Dislike a post
router.put('/:postId/like', authorization, likePost);

// Comment on a post
router.put('/:postId/comment', authorization, commentOnPost);

// Edit a comment

router.patch('/:postId/editComment/:commentId',authorization,editComment)

// Delete a comment
router.put('/:postId/deleteComment/:commentId', authorization, deleteComment);

// Report a post
router.put('/:postId/report', authorization, reportPost);

// Get timeline posts - fetch posts of self and friends
router.get('/timeline/all', authorization, getTimelinePosts);

router.get('/profile/:userId', authorization, getUserPosts);

export default router;
