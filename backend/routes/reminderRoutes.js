const express = require('express');
const { getReminders, createReminder, deleteReminder } = require('../controllers/reminderController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getReminders)
  .post(protect, createReminder);
router.delete('/:id', protect, deleteReminder);

module.exports = router;