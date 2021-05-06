const express = require('express');

const { getAllUsers, registerUser } = require('../controllers/user');

const router = express.Router();

// Route: /api/v1
router.route('/').get(getAllUsers).post(registerUser);

module.exports = router;
