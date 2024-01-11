import express from 'express';
const router = express.Router();
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  searchWeather,
} from '../controllers/controller.js';
import { ensureLoggedIn } from '../middleware/authMiddleware.js';

// Login route
router.post('/login', loginUser);

// Register route
router.post('/register', registerUser);

// Logout route
router.post('/logout', logoutUser);

// Get Profile route
router.get('/profile', ensureLoggedIn, getUserProfile);

// Update profile
router.put('/profile', ensureLoggedIn, updateUserProfile);

// Search Weather Route
router.get('/search', searchWeather);

export default router;
