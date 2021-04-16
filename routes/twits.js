const express = require('express');
const router = express.Router({ mergeParams: true });
const Twit = require('../models/Twit');
const User = require('../models/User');

router.get('/twits', (req, res) => {
  res.send(`Get all twits by ${req.params.username}`);
});

router.get('/twits/:id', (req, res) => {
  res.send(`${req.params.id} by ${req.params.username}`);
});

router.post('/twits', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });

    console.log(user);

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

module.exports = router;
