const express = require('express');
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
    const user = await User.findOne({ _id: req.user.id });
    const userToFollow = await User.findOne({ username: req.params.username });

    if (!user) {
      return res
        .status(400)
        .json({ msg: 'Current user does not exist', success: false });
    }

    const userToFollowProfile = await Profile.findOne({
      user: userToFollow._id,
    });

    if (!userToFollowProfile) {
      return res
        .status(400)
        .json({ msg: 'User to follow does not exist', success: false });
    }

    const userProfile = await Profile.findOne({ user: req.user.id });

    userProfile.following.forEach((follow) => {
      if (userToFollow._id.toString() === follow.id.toString()) {
        return res.status(400).json({ msg: 'Already following this user' });
      }
    });

    userProfile.following.push({
      id: userToFollow._id,
      username: userToFollow.username,
    });

    userToFollowProfile.followers.push({
      id: user._id,
      username: user.username,
    });

    await userProfile.save();
    await userToFollowProfile.save();

    res.status(200).json({
      msg: `${user.username} followed ${req.params.username}`,
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
    const userProfile = await Profile.findOne({ user: req.user.id });
    const userToUnfollow = await User.findOne({
      username: req.params.username,
    });
    const userToUnfollowProfile = await Profile.findOne({
      user: userToUnfollow._id,
    });

    userProfile.following = userProfile.following.filter((follow, index) => {
      userToUnfollow._id.toString() !== follow.id.toString();
    });

    userToUnfollowProfile.followers = userToUnfollowProfile.followers.filter(
      (follower, index) => {
        user._id.toString() !== follower.id.toString();
      }
    );

    await userProfile.save();
    await userToUnfollowProfile.save();

    res
      .status(200)
      .json({ msg: `${user.username} unfollowed ${req.params.username}` });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});