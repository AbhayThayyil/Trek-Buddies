import { Router } from 'express';
import {
  getUserRegistration,
  postUserRegistration,
  getUserLogin,
  postUserLogin,
  userLogout,
} from '../controllers/auth-controller.js';
import { authorization } from '../middlewares/auth.js';

const router = Router();

// USER REGISTER
router.route('/register').get(getUserRegistration).post(postUserRegistration);

// USER LOGIN
router.route('/login').get(getUserLogin).post(postUserLogin);

// USER LOGOUT
router.get('/logout', userLogout);

// Todo: This is a test route, delete when hosting
router.get('/test', authorization, (req, res) => {
  console.log(req.userId, req.email);
  const user = {
    id: req.userId,
    email: req.email,
  };
  res.status(200).json({ user, message: 'Test Success' });
});

export default router;
