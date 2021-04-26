const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();
const User = require('../models/User');

router.get('/:id', (req, res) => {
  res.send(`Getting profile of ${req.params.id}`);
});

// POST ROUTE
// Creates a new user
router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check to see if user is already in database
    const alreadyExists = await User.findOne({
      $or: [{ username }, { email }],
    });

    // Returns error if user already exists
    if (alreadyExists) {
      return res
        .status(400)
        .json({ msg: 'User already exists', success: false });
    }

    const newUser = new User({
      username,
      email,
      password,
    });

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await User.create(newUser);

    res
      .status(200)
      .json({ msg: 'New user created', success: true, data: newUser });
  } catch (error) {
    res.status(400).json({
      msg: 'There was an issue',
      success: false,
      errorMsg: error.message,
    });
  }
});

// PUT ROUTE
// Updates a user's account or profile
// WILL REQUIRE AUTHENTICATION

module.exports = router;
