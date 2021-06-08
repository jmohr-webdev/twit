const Twit = require('../models/Twit');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Follows = require('../models/Follows');
const asyncHandler = require('../middleware/async');

// ************ GET ROUTE ************
// Route: GET /api/v1/twits/
// Get a bunch of twits
// does not require authentication
exports.getTwits = asyncHandler(async (req, res, next) => {
  try {
    let twits = await Twit.find()
      .sort({ createdDate: -1 })
      .limit(10)
      .populate();
    if (!twits) {
      return res
        .status(204)
        .json({ msg: 'No one has twitted anything', success: true });
    }

    res.status(200).json({
      msg: 'Get all twits',
      count: twits.length,
      twits,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: 'Server error', success: false, error: error.message });
  }
});

// ************ GET ROUTE ************
// Route: GET /api/v1/:username/:twitid
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

// ************ GET ROUTE ************
// Route: GET /api/v1/twits/:username
// Get all twits from a specific user
// does not require authentication
exports.getUserTwits = asyncHandler(async (req, res, next) => {
  try {
    const profile = await Profile.findOne({
      username: req.params.username,
    });

    if (!profile) {
      return res.status(400).json({ msg: 'User not found', success: false });
    }

    const twits = await Twit.find({ profile: profile._id }).sort({
      createdDate: -1,
    });

    res.status(200).json({
      msg: 'Twits found',
      count: twits.length,
      success: true,
      twits,
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: 'Server error', success: false, error: error.message });
  }
});

// ************ GET ROUTE ************
// Route: GET /api/v1/twits/following
// Get a bunch of twits
// Requires user to be logged in
exports.getFollowingTwits = asyncHandler(async (req, res, next) => {
  try {
    const userFollowing = await Follows.findOne({ user: req.user.id });

    if (!userFollowing) {
      return res.status(400).json({
        msg: 'The current user does not exist',
        success: false,
      });
    }

    let following = userFollowing.following.map((follow) => follow.username);

    const twits = await Twit.find({ username: { $in: following } })
      .sort({ createdDate: -1 })
      .limit(10);

    if (!twits) {
      return res.status(400).json({
        msg: 'The current user does not exist',
        success: false,
      });
    }

    res.status(200).json({
      msg: `Get all twits from users ${userFollowing.username} is following`,
      following: userFollowing.following,
      twits,
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: 'Server error', success: false, error: error.message });
  }
});

// ************ POST ROUTE ************
// Route: POST /api/v1/twits/
// Creates a twit
// requires authentication
exports.createATwit = asyncHandler(async (req, res, next) => {
  try {
    // const user = await User.findById(req.user.id).select('-password');
    const profile = await Profile.findOne({ user: req.user.id });

    const newTwit = new Twit({
      content: req.body.content,
      username: profile.username,
      profile: profile._id,
    });

    await Twit.create(newTwit);

    res.status(200).json(newTwit);
  } catch (error) {
    res.status(500).json({
      msg: 'Something went wrong, no twit created',
      success: false,
      error: error.message,
    });
  }
});

// ************ DELETE ROUTE ************
// Route: DELETE /api/v1/twits/:id
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
