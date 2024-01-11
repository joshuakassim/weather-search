import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '8h',
  });

  res.cookie('secureUserCookie', token, {
    httpOnly: true, // only accessible through HTTP and not JS on the client side
    sameSite: 'strict',
    maxAge: 8 * 60 * 60 * 1000,
  });
};

export default generateToken;
