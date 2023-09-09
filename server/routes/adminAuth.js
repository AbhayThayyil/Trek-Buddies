import { Router } from 'express';
import { getAdminLogin, postAdminLogin } from '../controllers/auth-controller.js';
import Admin from '../models/Admin.js';

const router = Router();

// ADMIN LOGIN
router.route('/login').get(getAdminLogin).post(postAdminLogin);

export default router;
