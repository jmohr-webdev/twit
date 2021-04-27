const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Profile = require('../models/Profile');

const router = express.Router();

// GET ROUTE
// Get all users
router.get('/', async (req, res) => {
  const users = await User.find();
  res
    .status(200)
    .json({ msg: 'Find all users', count: users.length, users: users });
});

// POST ROUTE
// Registers a new user
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

    let newUser = new User({
      username,
      email,
      password,
    });

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    newUser = await User.create(newUser);

    const newProfile = await Profile.create({ user: newUser._id });

    const payload = {
      user: {
        id: newUser._id,
      },
    };

    // Return json web token
    jwt.sign(
      payload,
      process.env.JWTSECRET,
      { expiresIn: '5 days' },
      (error, token) => {
        if (error) throw error;
        res.json({
          msg: `Created ${newUser.username} account and profile`,
          success: true,
          token,
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      msg: 'There was an issue',
      success: false,
      errorMsg: error.message,
    });
  }
});

// PUT ROUTE
// Updates a user's account
// WILL REQUIRE AUTHENTICATION

module.exports = router;
