const express = require('express');
const { getAllUsers, registerUser } = require('../controllers/user');
const twitRouter = require('./twits');

const router = express.Router();

// Route: /api/v1
router.route('/').get(getAllUsers).post(registerUser);

module.exports = router;
