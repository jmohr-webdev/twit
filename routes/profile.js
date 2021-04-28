const express = require('express');
const User = require('../models/User');
const Profile = require('../models/Profile');
const auth = require('../middleware/auth');
const loggedIn = require('../middleware/loggedIn');

const router = express.Router({ mergeParams: true });

// ************ GET ROUTE ************
// Route: GET /api/v1/:username/
// Gets a user's profile
// does not require authentication
router.get('/', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
      return res.status(400).json({
        msg: `User ${req.params.username} does not exist`,
        success: false,
      });
    }

    const profile = await Profile.findOne({ user: user._id });

    res.status(200).json({
      msg: `Found profile of ${req.params.username}`,
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Something went wrong',
      error: error.message,
      success: false,
    });
  }
});

// ************ PUT ROUTE ************
// Route: PUT /api/v1/:username/
// Updates user's profile
// requires authentication
router.put('/', auth, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });

    // Returns error if user not found in database
    if (!user) {
      return res
        .status(400)
        .json({ msg: `${req.params.username} does not exist` });
    }

    const { bio, location } = req.body;
    const profileFields = { bio, location };

    // Cycles through profile fields and sets value if available
    for (const [key, value] of Object.entries(profileFields)) {
      if (value && value.length > 0) {
        profileFields[key] = value;
      }
    }

    const profile = await Profile.findOneAndUpdate(
      { user: user._id },
      { $set: profileFields },
      { new: true }
    );

    if (!profile) {
      return res.status(400).json({
        msg: `${req.params.username} profile could not be updated`,
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      msg: `Updated ${req.params.username} profile`,
      data: profile,
    });
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
});

// ************ DELETE ROUTE ************
// Route: DELETE /api/v1/:username/
// Deletes user's profile
// requires authentication
router.delete('/', auth, async (req, res) => {
  try {
    const userToDelete = await User.findOne({ username: req.params.username });

    if (!userToDelete) {
      return res
        .status(400)
        .json({ msg: `${req.params.username} does not exist` });
    }

    await Promise.all([
      Profile.findOneAndRemove({ user: userToDelete._id }),
      User.findOneAndRemove({ _id: userToDelete._id }),
    ]);

    res.status(200).json({
      success: true,
      msg: `Deleted ${req.params.username}`,
      data: userToDelete,
    });
  } catch (error) {
    res.status(400).json({
      msg: 'There was an issue',
      success: false,
      errorMsg: error.message,
    });
  }
});

// 👍 FOLLOW AND UNFOLLOW 👎
// ************ POST ROUTE ************
// Route: POST /api/v1/:username/follow
// Follows a user
// requires user to be logged in
router.post('/follow', loggedIn, async (req, res) => {
  try {
    res
      .status(200)
      .json({ msg: `Will eventually follow ${req.params.username}` });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

// ************ POST ROUTE ************
// Route: POST /api/v1/:username/unfollow
// Unfollows a user
// requires user to be logged in
router.post('/unfollow', loggedIn, async (req, res) => {
  try {
    res
      .status(200)
      .json({ msg: `Will eventually unfollow ${req.params.username}` });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

module.exports = router;
