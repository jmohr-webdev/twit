const User = require('../models/User');
const Profile = require('../models/Profile');
const asyncHandler = require('../middleware/async');

// ************ GET ROUTE ************
// Route: GET /api/v1/:username/
// Gets a user's profile
// does not require authentication
exports.getProfile = asyncHandler(async (req, res, next) => {
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
exports.updateProfile = asyncHandler(async (req, res, next) => {
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
exports.deleteUser = asyncHandler(async (req, res, next) => {
  try {
    const userToDelete = await User.findOne({ username: req.params.username });

    if (!userToDelete) {
      return res
        .status(400)
        .json({ msg: `${req.params.username} does not exist` });
    }

    await Promise.all([
      Profile.deleteOne({ user: userToDelete._id }),
      User.deleteOne({ _id: userToDelete._id }),
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
