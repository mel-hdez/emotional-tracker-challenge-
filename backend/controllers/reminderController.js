const Reminder = require('../models/reminderModel')

const getReminders = async(req, res) => {
  const reminders = await Reminder.find({user: req.user._id, isArchived: false}).sort({date: -1})
    .catch(() => res.status(500).json({ message: 'Error retrieving reminders' }));

  res.json(reminders);
}

// Dos tipos de recordatorios. Una vez y que se repiten a traves del tiempo.
const createReminder= async(req, res) => {
  const { activity, time, schedule, date} = req.body
  const userId = req.user._id
  console.log(userId);
  
  let newReminder
  
  try {
    if (schedule === 'onetime' && time === null && date !== null) {
      newReminder = await Reminder.create({
        userId,
        activity,
        date,
        schedule
      })
    } else {
      newReminder = await Reminder.create({
        userId,
        activity,
        time,
        schedule
      })
    }
  }catch (err){
    console.log(err);
    
    res.status(500).json({ message: 'Error creating reminder' })
  }

  res.status(201).json(newReminder);
}

const deleteReminder= async(req, res) => {
  const reminder = await Reminder.findById({_id: req.params.id, user: req.user._id})
    .catch(() => res.status(500).json({ message: 'Error retrieving reminder' }));

  if (!reminder) {
    res.status(404).json({ message: 'Reminder not found' });
    return;
  }

  reminder.isArchived = true;
  await reminder.save();

  res.json(reminder);
}

module.exports = {
    getReminders,
    createReminder,
    deleteReminder
}