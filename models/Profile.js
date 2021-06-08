const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      maxLength: 180,
    },
    location: {
      type: String,
      maxLength: 50,
    },
    avatar: {
      type: String,
    },
    smallAvatar: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ProfileSchema.virtual('twits', {
  ref: 'Twit',
  localField: '_id',
  foreignField: 'profile',
  justOne: false,
  options: { sort: { createdDate: -1 } },
});

module.exports = mongoose.model('profile', ProfileSchema);
