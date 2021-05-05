const express = require('express');
const Twit = require('../models/Twit');
const User = require('../models/User');
const asyncHandler = require('../middleware/async');

// ************ GET ROUTE ************
// Route: GET /api/v1/:username/twits/
// Get all twits from a specific user
// does not require authentication
exports.getUserTwits = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
      return res.status(400).json({ msg: 'User not found', success: false });
    }

    const twits = await Twit.find({ user: user._id });

    res.status(200).json({
      msg: 'Twits found',
      count: twits.length,
      success: true,
      data: twits,
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: 'Server error', success: false, error: error.message });
  }
});

// ************ GET ROUTE ************
// Route: GET /api/v1/:username/twits/:id
// Get a single twit
// does not require authentication
exports.getSingleTwit = asyncHandler(async (req, res, next) => {
  try {
    const twit = await Twit.findOne({ _id: req.params.id });

    if (!twit) {
      return res.status(400).json({ msg: 'Twit not found', success: false });
    }

    res.status(200).json({ msg: 'Twit found', success: true, data: twit });
  } catch (error) {
    res
      .status(500)
      .json({ msg: 'Server error', success: false, error: error.message });
  }
});

// ************ POST ROUTE ************
// Route: POST /api/v1/:username/twits/
// Creates a twit
// requires authentication
exports.createATwit = asyncHandler(async (req, res, next) => {
  try {
    const newTwit = new Twit({
      content: req.body.content,
      user: req.user.id,
    });

    await Twit.create(newTwit);

    res
      .status(200)
      .json({ msg: 'New twit created', success: true, data: newTwit });
  } catch (error) {
    res.status(500).json({
      msg: 'Something went wrong, no twit created',
      success: false,
      error: error.message,
    });
  }
});

// ************ DELETE ROUTE ************
// Route: DELETE /api/v1/:username/twits/:id
// Deletes a specific twit
// requires authentication
exports.deleteATwit = asyncHandler(async (req, res, next) => {
  try {
    const twitToDelete = await Twit.deleteOne({ _id: req.params.id });

    if (!twitToDelete) {
      return res.status(400).json({ msg: 'Twit not found', success: false });
    }

    res
      .status(200)
      .json({ msg: 'Twit deleted', success: true, data: twitToDelete });
  } catch (error) {
    res
      .status(500)
      .json({ msg: 'Server error', success: false, error: error.message });
  }
});
