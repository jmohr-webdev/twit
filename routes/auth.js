const express = require('express');

const { login, loadUser } = require('../controllers/auth');

const router = express.Router();

router.route('/').get(loadUser);

router.route('/login').post(login);

module.exports = router;
