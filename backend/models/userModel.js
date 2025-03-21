const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  phone: String,
  therapistId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null},
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save hook to hash password
userSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

// Method to compare passwords
userSchema.methods.matchPassword = function(enteredPassword) {
  return bcrypt.compareSync(enteredPassword, this.password);
};

userSchema.methods.sanitize = () => {
  const user = this;
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', userSchema);