const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TwitSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
    minLength: [1, 'Please enter in at least one character.'],
    maxLength: [400, 'Twit is too long. Please keep it to 400 characters'],
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Twit', TwitSchema);
