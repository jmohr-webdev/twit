const express = require('express');
const loggedIn = require('../middleware/loggedIn');
const { login, loadUser } = require('../controllers/auth');

const router = express.Router();

router.route('/').get(loggedIn, loadUser);

router.route('/login').post(login);

module.exports = router;
