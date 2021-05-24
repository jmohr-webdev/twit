const User = require('../models/User');
const Profile = require('../models/Profile');
const Follows = require('../models/Follows');
const asyncHandler = require('../middleware/async');

// // ************ GET ROUTE ************
// Route: POST /api/v1/:username/following
// Finds who the user is following
exports.getFollowing = asyncHandler(async (req, res, next) => {
  try {
    const following = await Follows.findOne({
      username: req.params.username,
    }).select('following');

    if (!following) {
      return res
        .status(400)
        .json({ msg: 'This user does not exist', success: false });
    }

    res.status(200).json({
      msg: `Found who ${req.params.username} follows`,
      following,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: 'Server error', success: false, error: error.message });
  }
});

// // ************ GET ROUTE ************
// Route: POST /api/v1/:username/followers
// Finds who is following the user
exports.getFollowers = asyncHandler(async (req, res, next) => {
  try {
    const followers = await Follows.findOne({
      username: req.params.username,
    }).select('followers');

    if (!followers) {
      return res
        .status(400)
        .json({ msg: 'Could not retrieve followers', success: false });
    }

    res.status(200).json({
      msg: `Found who follows ${req.params.username}`,
      followers,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: 'Server error', success: false, error: error.message });
  }
});

// 👍 FOLLOW AND UNFOLLOW 👎
// ************ POST ROUTE ************
// Route: POST /api/v1/:username/follow
// Follows a user
// requires user to be logged in
exports.followUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await Follows.findOne({ user: req.user.id }).select(
      'username following'
    );

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
    const userToFollow = await Follows.findOne({
      username: req.params.username,
    });

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
      msg: `${user.username} followed ${req.params.username}`,
      user,
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
    const user = await Follows.findOne({ user: req.user.id });
    const userToUnfollow = await Follows.findOne({
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

    res.status(200).json({
      msg: `${user.username} unfollowed ${req.params.username}`,
      user,
    });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});
