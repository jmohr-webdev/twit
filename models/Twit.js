const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TwitSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
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
