import axios from 'axios';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// Log user in and set JWT token
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  // Check if the user exists and passwords match
  if (user && (await user.comparePassword(password))) {
    // Generate toekn and send JSON response with user data
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      location: user.location,
    });

    // If user does not exist, or passwords do not match, throw and error
  } else {
    res.status(401);
    throw new Error('Invalid username or password');
  }
});

// Register new user and log them in
const registerUser = asyncHandler(async (req, res) => {
  const { name, username, password } = req.body;

  // Chech if user already exists and respond with appropriate error
  const userExists = await User.findOne({
    username,
  });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create new user
  try {
    const user = await User.create({
      name,
      username,
      password,
    });

    // If use was created, log them in and send JSON response
    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        username: user.username,
        location: user.location,
      });
    }

    // Alert user of error
  } catch (error) {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Log user out and destroy cookie
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie('secureUserCookie', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'User logged out' });
});

// Get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    username: req.user.username,
    location: req.user.location,
    password: req.user.password,
  };

  res.status(200).json(user);
});

// Update users profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  // Update users details
  if (user) {
    user.name = req.body.name || user.name;
    user.username = req.body.username || user.username;
    user.location = req.body.location || user.location;

    // Update users password if provided
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    // Send JSON response
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      username: updatedUser.username,
      location: updatedUser.location,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Get weather data from API
const searchWeather = asyncHandler(async (req, res) => {
  const { location } = req.params;

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${location}&days=7&aqi=no&alerts=no`;

  // Get weather data and send JSON response
  try {
    const response = await axios.get(url);
    res.status(200).json(response.data);

    // Throw error
  } catch (error) {
    res.status(400);
    throw new Error('Please enter a valid city');
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
