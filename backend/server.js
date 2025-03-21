const express = require('express');
const mongodb = require('./Config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const errorCatcher = require('./middlewares/errorMiddleware');
const userRoutes = require('./routes/userRoutes');
const emotionRoutes = require('./routes/emotionRoutes');
const reminderRoutes = require('./routes/reminderRoutes');

dotenv.config();

mongodb.connect();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/emotions', emotionRoutes);
app.use('/api/reminders', reminderRoutes);

// Unprotected test route
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Error handling middleware
app.use(errorCatcher);

const PORT = process.env.PORT || 5050;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;