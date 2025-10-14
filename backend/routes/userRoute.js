import express from 'express';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/userModel.js';
import { getToken, isAuth } from '../util.js';

dotenv.config();

const router = express.Router();

// === Update user ===
router.put('/:id', isAuth, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password, 8);
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser),
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// === Sign in ===
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required' });

  const user = await User.findOne({ email });
  if (!user)
    return res.status(404).json({ message: 'User not found. Please register first.' });

  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword)
    return res.status(401).json({ message: 'Invalid password' });

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: getToken(user),
  });
});

// === Register ===
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  if (password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password))
    return res.status(400).json({
      message: 'Password must be at least 8 characters, include a number and an uppercase letter',
    });

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: 'User already exists. Please sign in.' });

  const newUser = new User({
    name,
    email,
    password: bcrypt.hashSync(password, 8),
  });

  await newUser.save();
  res.status(201).json({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    isAdmin: newUser.isAdmin,
    token: getToken(newUser),
  });
});

// === Create Admin (only in dev) ===
/*if (process.env.NODE_ENV !== 'production') {
  router.post('/createadmin', async (req, res) => {
    if (req.body.secret !== process.env.ADMIN_SECRET)
      return res.status(401).json({ message: 'Unauthorized' });

    const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (existingAdmin)
      return res.json({ message: 'Admin already exists' });

    const adminUser = new User({
      name: process.env.ADMIN_NAME || 'Admin',
      email: process.env.ADMIN_EMAIL,
      password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 8),
      isAdmin: true,
    });

    const createdAdmin = await adminUser.save();
    res.json({
      message: 'Admin user created successfully',
      email: createdAdmin.email,
    });
  });
}
*/

export default router;
