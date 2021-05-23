const express = require('express');
const auth = require('../middleware/auth');
const loggedIn = require('../middleware/loggedIn');
const {
  getProfile,
  updateProfile,
  deleteUser,
} = require('../controllers/profile');

const {
  followUser,
  unfollowUser,
  getFollowing,
  getFollowers,
} = require('../controllers/follow');

const router = express.Router({ mergeParams: true });

// Route: /api/v1/:username/
router
  .route('/')
  .get(getProfile)
  .put(auth, updateProfile)
  .delete(auth, deleteUser);

router.route('/follow').post(loggedIn, followUser);
router.route('/unfollow').post(loggedIn, unfollowUser);
router.route('/following').get(getFollowing);
router.route('/followers').get(getFollowers);

module.exports = router;
