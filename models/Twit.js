const mongoose = require('mongoose');

const TwitSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    maxLength: 400,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Twit', TwitSchema);
