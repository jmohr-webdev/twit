const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      minLength: 3,
      maxLength: 16,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      select: false,
    },
    createdDate: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserSchema.virtual('twits', {
  ref: 'Twit',
  localField: '_id',
  foreignField: 'user',
  justOne: false,
  options: { sort: { createdDate: -1 } },
});

module.exports = mongoose.model('User', UserSchema);
