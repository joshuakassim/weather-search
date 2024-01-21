import jwt from 'jsonwebtoken';

// Create JWT for user and store it in an HTTP-only cookie
const generateToken = (res, userId) => {
  // Creates token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '8h',
  });

  // Creates Cookie
  res.cookie('secureUserCookie', token, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 8 * 60 * 60 * 1000,
  });
};

export default generateToken;
