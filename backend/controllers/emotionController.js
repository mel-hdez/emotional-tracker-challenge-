const Emotion = require('../models/emotionModel');

// Get all emotions for a user
const getEmotions = async (req, res) => {
  await Emotion.find({ user: req.user._id })
    .then(emotions => res.json(emotions))
    .catch(() => res.status(500).json({ message: 'Error retrieving emotions' }));
};

// Get single emotion by ID
const getEmotionById = async (req, res) => {
  await Emotion.findById(req.params.id)
    .then(emotion => {
      if (!emotion) {
        res.status(404).json({ message: 'Emotion not found' });
        return;
      }
      res.json(emotion)
    })
    .catch(() => res.status(500).json({ message: 'Error retrieving emotion' }));
};

// Create a new emotion entry
const createEmotion = async (req, res) => {
  const { emotion, intensity, notes } = req.body;

  const newEmotion = await Emotion.create({
    user: req.user._id,
    emotion,
    intensity,
    notes
  }).catch(() => res.status(500).json({ message: 'Error creating emotion' }));

  res.status(201).json(newEmotion);
};

// Update an emotion
const updateEmotion = async (req, res) => {
  const { emotion, intensity, notes } = req.body;

  const emotionRecord = await Emotion.findById(req.params.id)
    .catch(() => res.status(500).json({ message: 'Error retrieving emotion' }));

  if (!emotionRecord) {
    res.status(404).json({ message: 'Emotion not found' });
    return;
  }

  emotionRecord.emotion = emotion || emotionRecord.emotion;
  emotionRecord.intensity = intensity || emotionRecord.intensity;
  emotionRecord.notes = notes || emotionRecord.notes;

  const updatedEmotion = await emotionRecord.save();
  res.json(updatedEmotion);
};

const getEmotionSummary = async (req) => {
  const summary = await Emotion.aggregate([
    { $match: { user: req.user._id } },
    {
      $group: {
        _id: '$emotion',
        count: { $sum: 1 },
        totalIntensity: { $sum: '$intensity' }
      }
    },
    {
      $group: {
        _id: null,
        emotionCounts: { $push: { emotion: '$_id', count: '$count' } },
        totalEmotions: { $sum: '$count' },
        totalIntensity: { $sum: '$totalIntensity' }
      }
    },
    {
      $project: {
        _id: 0,
        count: '$totalEmotions',
        averageIntensity: {
          $cond: [
            { $eq: ['$totalEmotions', 0] },
            0,
            { $divide: ['$totalIntensity', '$totalEmotions'] }
          ]
        },
        emotionCounts: 1
      }
    }
  ]).catch(() => res.status(500).json({ message: 'Error retrieving emotions' }));

  // console.log((JSON.stringify(summary)));
  return res.status(200).json(summary);
};

// TODO: Implement therapist sharing
const shareEmotions = async (req, res) => {
  const { therapistId } = req.user;
  const therapist = await User.findById(therapistId)
    .catch(() => res.status(500).json({ message: 'Error retrieving therapist' }));
  console.log(therapist);

  if (therapist === null || !therapist) {
    res.status(404).json({ message: 'Therapist not found' });
    return;
  }

  const emotions = await Emotion.find({ user: req.user._id })
    .catch(() => res.status(500).json({ message: 'Error retrieving emotions' }));
  res.json(emotions);
};

module.exports = {
  getEmotions,
  getEmotionById,
  createEmotion,
  updateEmotion,
  getEmotionSummary,
  shareEmotions
};