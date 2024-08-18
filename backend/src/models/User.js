const mongoose = require('mongoose');

const User = new mongoose.Schema({
  username: String,
  pass: String,
  role: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', User, 'User');
