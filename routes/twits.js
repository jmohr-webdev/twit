const express = require('express');
const router = express.Router({ mergeParams: true });
const auth = require('../middleware/auth');
const loggedIn = require('../middleware/loggedIn');
const {
  getTwits,
  getUserTwits,
  getSingleTwit,
  createATwit,
  deleteATwit,
} = require('../controllers/twits');

// Route: /api/v1/dash/
router.route('/').get(getTwits);

// Route: /api/v1/dash/post
router.route('/post').post(loggedIn, createATwit);

// Route: /api/v1/:username
router.route('/:username').get(getUserTwits);

// Route: /api/v1/:username/:id
router.route('/:username/:id').get(getSingleTwit).delete(auth, deleteATwit);

module.exports = router;
