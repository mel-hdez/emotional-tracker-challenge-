const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserProfile, resetPassword } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.put('/reset-password', protect, resetPassword);

module.exports = router;