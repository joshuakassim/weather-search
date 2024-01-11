import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const ensureLoggedIn = asyncHandler(async (req, res, next) => {
  let token = req.cookies.secureUserCookie;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId)
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Invalid token');
    }
  } else {
    res.status(401);
    throw new Error('Please login');
  }
});

export { ensureLoggedIn };
