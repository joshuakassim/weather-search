import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// Ensures user is logged in
const ensureLoggedIn = asyncHandler(async (req, res, next) => {
  let token = req.cookies.secureUserCookie;

  // Checks for token
  if (token) {
    try {
      // Verify token, get user and move to next piece of middleware
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId);
      next();

      // If token is invalid, alert user
    } catch (error) {
      res.status(401);
      throw new Error('Invalid token');
    }

    // If token is not available, alert user to login
  } else {
    res.status(401);
    throw new Error('Please login');
  }
});

export { ensureLoggedIn };
