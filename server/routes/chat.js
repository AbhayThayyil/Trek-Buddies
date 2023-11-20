import { Router } from 'express';

import { authorization } from '../middlewares/auth.js';
import { createMessage, getMessages } from '../controllers/chat-controller.js';

const router = Router();

// New Message created
router.post("/",createMessage)

// Get messages
router.get("/:conversationId",authorization,getMessages)

export default router;