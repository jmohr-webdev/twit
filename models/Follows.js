const mongoose = require('mongoose');

const FollowsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  followers: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
      username: {
        type: String,
      },
    },
  ],
  following: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
      username: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model('follows', FollowsSchema);
