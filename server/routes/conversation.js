import { Router } from 'express';

import { authorization } from '../middlewares/auth.js';
import { createNewConversation } from '../controllers/conversation-controller.js';

const router = Router();

// New Conversation
router.post("/",createNewConversation)

// Get Conversation of a user


export default router;