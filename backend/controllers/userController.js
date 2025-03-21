const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'mysecretkey123';

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '30d'
  });
};

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }

  const user = await User.create({
    name,
    email,
    password
  }).catch(() => res.status(500).json({ message: 'Error creating user' }));

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email })
    .catch(() => res.status(500).json({ message: 'Error retrieving user' }));

  if (user && user.matchPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email
  });
};

const updateUserProfile = async (req, res) => {
  const { name, email } = req.body;

  const user = await User.findById(req.user._id)
    .catch(() => res.status(500).json({ message: 'Error retrieving user' }));

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  user.name = name || user.name;
  user.email = email || user.email;

  await user.save()
    .catch(() => res.status(500).json({ message: 'Error updating user' }));

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email
  });
}

const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email })
    .catch(() => res.status(500).json({ message: 'Error retrieving user' }));

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  user.password = password;
  await user.save()
    .catch(() => res.status(500).json({ message: 'Error updating user' }));

  res.json({
    message: 'Password reset successfully'
  });
}

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  resetPassword
};