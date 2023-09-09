import { Router } from 'express';
import { getUsersList, getPostsList } from '../controllers/admin-controller.js';
import adminAuthorize from '../middlewares/adminAuthorize.js';

const router = Router();

// To get a list of all users
router.get('/usersList', adminAuthorize, getUsersList);

// To get a list of all posts
router.get('/postsList', adminAuthorize, getPostsList);

export default router;
