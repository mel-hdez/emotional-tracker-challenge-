const mongoose = require('mongoose');
const {sendNotifications} = require('../Config/notification');
const reminderSchem = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  activity: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: false,
    default: null
  },
  time: {
    type:String,
    required: false,
    default: null
  },
  schedule: {
    type: String,
    required: true,
    enum: ['onetime', 'daily']
  },
  isArchived: {
    type: Boolean,
    default: false
  },
});

reminderSchem.methods.sendNotifications = () => {
  const actualDate = new Date();
  const actualTime = actualDate.getTime();
  const oneTimeReminders = Reminder.find({date: actualDate, schedule: 'onetime'});
  const dailyReminders = Reminder.find({time: actualTime, schedule: 'daily'});

  oneTimeReminders.forEach(reminder => {
    sendNotifications(reminder);
  });

  dailyReminders.forEach(reminder => {
    sendNotifications(reminder);
  });
}

module.exports = mongoose.model('Reminder', reminderSchem);