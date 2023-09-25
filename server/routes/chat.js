import { Router } from 'express';
import Chat from '../models/Chat.js';

import { authorization } from '../middlewares/auth.js';

const router = Router();


export default router;