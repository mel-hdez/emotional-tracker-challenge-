const express = require('express');
const {
  getEmotions,
  getEmotionById,
  createEmotion,
  updateEmotion,
  getEmotionSummary,
  shareEmotions
} = require('../controllers/emotionController');
const { protect } = require('../middlewares/authMiddleware');
const { hasTherapist } = require('../middlewares/authorizationMiddleware');

const router = express.Router();

// Protected routes
router.route('/')
  .get(protect, getEmotions)
  .post(protect, createEmotion);

router.get('/summary', protect, getEmotionSummary)
router.route('/:id')
  .get(getEmotionById)
  .put(protect, updateEmotion)

router.post('/share', protect, hasTherapist, shareEmotions);

module.exports = router;