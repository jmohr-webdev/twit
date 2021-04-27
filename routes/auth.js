const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// POST route
// Login and get token
router.post('/login', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    let user = await User.findOne({
      $or: [{ username }, { email }],
    }).select('+password');

    if (!user) {
      return res
        .status(400)
        .json({ msg: 'Invalid credentials', success: false });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    console.log(passwordMatch);

    if (!passwordMatch) {
      return res
        .status(400)
        .json({ msg: 'Invalid credentials', success: false });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    console.log(payload);

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
