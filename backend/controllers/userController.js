import asyncHandler from 'express-async-handler';

// @description   Authenticate user and set token
// route          POST /api/users/login
// @access        Public i.e. does not require user to be logged in to access
const loginUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Log user in' });
});

// @description   Register a new user
// route          POST /api/users/register
// @access        Public i.e. does not require user to be logged in to access this route
const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'User registered' });
});

// @description   Log out user
// route          POST /api/users/logout
// @access        Public i.e. does not require user to be logged in to access this route
const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'User logged out' });
});

// @description   Get user profile
// route          GET /api/users/profile
// @access        Private i.e. user has to be logged in to acces this route
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'User profile' });
});

// @description   Update user profile
// route          PUT /api/users/profile
// @access        Private i.e. user has to be logged in to access ths route
const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Profile updated' });
});

// @description   Search weather
// route          POST /api/users/search
// @access        Private i.e. user has to be logged in to access ths route
const searchWeather = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Search performed' });
});

export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  searchWeather,
};
