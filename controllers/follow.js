const User = require('../models/User');
const Profile = require('../models/Profile');
const asyncHandler = require('../middleware/async');

// 👍 FOLLOW AND UNFOLLOW 👎
// ************ POST ROUTE ************
// Route: POST /api/v1/:username/follow
// Follows a user
// requires user to be logged in
exports.followUser = asyncHandler(async (req, res, next) => {
  try {
    // Find the user making the request
    const user = await User.findOne({ _id: req.user.id });

    if (!user) {
      return res
        .status(400)
        .json({ msg: 'Current user does not exist', success: false });
    }

    // Double check to make sure user is not already followed
    const alreadyFollowed = user.following.find(
      (follow) => follow.username === req.params.username
    );

    if (alreadyFollowed) {
      return res
        .status(400)
        .json({ msg: 'You already follow this user', success: false });
    }

    // Find the user being followed
    const userToFollow = await User.findOne({ username: req.params.username });

    if (!userToFollow) {
      return res
        .status(400)
        .json({ msg: 'User to follow does not exist', success: false });
    }

    user.following.push({
      id: userToFollow._id,
      username: userToFollow.username,
    });

    userToFollow.followers.push({
      id: user._id,
      username: user.username,
    });

    await user.save();
    await userToFollow.save();

    res.status(200).json({
      msg: `You followed ${req.params.username}`,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: 'Server error', success: false, error: error.message });
  }
});

// ************ POST ROUTE ************
// Route: POST /api/v1/:username/unfollow
// Unfollows a user
// requires user to be logged in
exports.unfollowUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    const userToUnfollow = await User.findOne({
      username: req.params.username,
    });

    user.following = user.following.filter((follow, index) => {
      userToUnfollow._id.toString() !== follow.id.toString();
    });

    userToUnfollow.followers = userToUnfollow.followers.filter(
      (follower, index) => {
        user._id.toString() !== follower.id.toString();
      }
    );

    await user.save();
    await userToUnfollow.save();

    res
      .status(200)
      .json({ msg: `${user.username} unfollowed ${req.params.username}` });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});
