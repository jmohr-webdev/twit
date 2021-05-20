const Twit = require('../models/Twit');
const User = require('../models/User');
const asyncHandler = require('../middleware/async');

// ************ GET ROUTE ************
// Route: GET /api/v1/twits/
// Get a bunch of twits
// does not require authentication
exports.getTwits = asyncHandler(async (req, res, next) => {
  try {
    const twits = await Twit.find().sort({ createdDate: -1 }).limit(10);
    if (!twits) {
      return res
        .status(204)
        .json({ msg: 'No one has twitted anything', success: true });
    }

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
    const user = await await User.findOne({ username: req.params.username });

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

// ************ POST ROUTE ************
// Route: POST /api/v1/twits/
// Creates a twit
// requires authentication
exports.createATwit = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    const newTwit = new Twit({
      content: req.body.content,
      username: user.username,
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
