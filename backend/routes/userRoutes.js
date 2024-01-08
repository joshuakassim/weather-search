import express from 'express';
const router = express.Router();
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  searchWeather,
} from '../controllers/userController.js';

router.post('/login', loginUser);

router.post('/register', registerUser);

router.post('/logout', logoutUser);

router.get('/profile', getUserProfile);

router.put('/profile', updateUserProfile);

router.post('/search', searchWeather);

export default router;
