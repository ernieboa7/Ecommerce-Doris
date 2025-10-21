// util.js

import jwt from 'jsonwebtoken';
import config from './config.js';

//  Generate a JWT token for a user
const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET,
    {
      expiresIn: '24h',
    }
  );
};

//  Middleware to verify JWT token (authentication)
const isAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7); // Remove "Bearer "
    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'Invalid token' });
      }
      req.user = decoded;
      next();
    });
  } else {
    return res.status(401).send({ message: 'No token provided' });
  }
};

//  Middleware to check if user is an admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(403).send({ message: 'Admin access denied' });
};

export { getToken, isAuth, isAdmin };
