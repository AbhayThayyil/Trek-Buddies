import { Router } from 'express';

import { authorization } from '../middlewares/auth.js';
import { createNewConversation, getTwoUserConversation, getUserConversation } from '../controllers/conversation-controller.js';

const router = Router();

// New Conversation
router.post("/",authorization,createNewConversation)

// Get Conversation of a user
router.get("/getConversations",authorization,getUserConversation)

//Get Conversation of 2 users
router.get("/getConversation/:firstUserId/:secondUserId",getTwoUserConversation)


export default router;