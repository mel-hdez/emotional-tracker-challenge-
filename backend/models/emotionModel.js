const mongoose = require('mongoose');

const emotionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  emotion: {
    type: String,
    required: true,
    enum: ['happy', 'sad', 'angry', 'anxious', 'neutral']
  },
  intensity: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  notes: String,
  triggers: [String],
  activities: [String]
});
// TODO: Define indexes for performance

function getEmotionStats(userId) {
  // TODO: Implement aggregation for emotion statistics
  return this.aggregate([
    { $match: { user: mongoose.Types.ObjectId(userId) } },
    { $group: { _id: '$emotion', count: { $sum: 1 } } }
  ]);
}

module.exports = mongoose.model('Emotion', emotionSchema);