const express = require('express');
const router = express.Router({ mergeParams: true });
const Twit = require('../models/Twit');
const User = require('../models/User');

// Get all twits from a specific user
// GET Route
// No authentication needed
router.get('/twits', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
      return res.status(400).json({ msg: 'User not found', success: false });
    }

    const twits = await Twit.find({ user: user._id });

    res.status(200).json({ msg: 'Twits found', success: true, data: twits });
  } catch (error) {
    res
      .status(500)
      .json({ msg: 'Server error', success: false, error: error.message });
  }
});

// Get a single twit
// GET Route
// No authentication needed
router.get('/twits/:id', async (req, res) => {
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

// Create a Twit
// POST Route
// WILL REQUIRE AUTHENTICATION
router.post('/twits', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
      return res.status(400).json({ msg: 'User not found', success: false });
    }

    const newTwit = new Twit({
      content: req.body.content,
      user: user._id,
    });

    await Twit.create(newTwit);

    res
      .status(200)
      .json({ msg: 'New twit created', success: true, data: newTwit });
  } catch (error) {
    res.status(500).json({
      msg: 'Something went wrong',
      success: false,
      error: error.message,
    });
  }
});

// Delete a twit
// DELETE Route
// WILL REQUIRE AUTHENTICATION
router.delete('/twits/:id', async (req, res) => {
  try {
    const twitToDelete = await Twit.findOneAndDelete({ _id: req.params.id });

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

module.exports = router;
