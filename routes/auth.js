const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// ************ POST ROUTE ************
// Route: POST /api/v1/auth/login
// Login and get token
router.post('/login', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Finds user by email or username
    let user = await User.findOne({
      $or: [{ username }, { email }],
    }).select('+password');

    // Returns error if user does not exist
    if (!user) {
      return res
        .status(400)
        .json({ msg: 'Invalid credentials', success: false });
    }

    // Checks if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Returns error if password is incorrect
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ msg: 'Invalid credentials', success: false });
    }

    // Returns token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWTSECRET,
      { expiresIn: '5 days' },
      (error, token) => {
        if (error) throw error;
        res.json({ msg: `Logged in as ${user.username}`, token });
      }
    );
  } catch (error) {
    res
      .status(500)
      .json({ msg: 'Server error', success: false, error: error.message });
  }
});

module.exports = router;
