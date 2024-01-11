import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
import express from 'express';
import axios from 'axios';
const router = express.Router();

// @description   Authenticate user and set token
// route          POST /api/users/login
// @access        Public i.e. does not require user to be logged in to access
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.comparePassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      city: user.city,
    });
  } else {
    res.status(401);
    throw new Error('Invalid username or password');
  }
});

// @description   Register a new user
// route          POST /api/users/register
// @access        Public i.e. does not require user to be logged in to access this route
const registerUser = asyncHandler(async (req, res) => {
  const { name, username, password, city } = req.body;

  const userExists = await User.findOne({
    username,
  });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    username,
    password,
    city,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      city: user.city,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @description   Log out user
// route          POST /api/users/logout
// @access        Public i.e. does not require user to be logged in to access this route
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie('secureUserCookie', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'User logged out' });
});

// @description   Get user profile
// route          GET /api/users/profile
// @access        Private i.e. user has to be logged in to acces this route
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    username: req.user.username,
    city: req.user.city,
    password: req.user.password,
  };

  res.status(200).json(user);
});

// @description   Update user profile
// route          PUT /api/users/profile
// @access        Private i.e. user has to be logged in to access ths route
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.username = req.body.username || user.username;
    user.city = req.body.city || user.city;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      username: updatedUser.username,
      city: updatedUser.city,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @description   Search weather
// route          POST /api/users/search
// @access        Private i.e. user has to be logged in to access ths route
const searchWeather = asyncHandler(async (req, res) => {
  const { city } = req.body;

  console.log(city);

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${city}&days=3&aqi=yes&alerts=no`;

  try {
    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (error) {
    // res.status(404).json({ message: error.message });
    res.status(400).json({ message: 'That is not a city' });
  }
});

export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  searchWeather,
};
