import express from 'express';
import { register, login, getMe } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.js';
import { updateUser } from '../controllers/user.controller.js';

const router = express.Router();

// Authentication routes
router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

// Profile routes (alias for user-specific operations)
router.get('/profile', protect, getMe);
router.put('/profile', protect, async (req, res, next) => {
  req.params.id = req.user._id.toString();
  return updateUser(req, res, next);
});

export default router;
