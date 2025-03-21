const Reminder = require('../models/reminderModel')

const notificationWorker = async (reminder) => {
  return {
    run: () => {
      Reminder.sendNotifications();
    }
  }
}

module.exports = notificationWorker()