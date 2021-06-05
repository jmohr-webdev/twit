const express = require('express');
const auth = require('../middleware/auth');
const loggedIn = require('../middleware/loggedIn');
const {
  getProfile,
  updateProfile,
  deleteUser,
} = require('../controllers/profile');

const {
  uploadAvatar,
  resizeAvatar,
  saveAvatar,
} = require('../controllers/avatar');

const {
  followUser,
  unfollowUser,
  getFollowing,
  getFollowers,
} = require('../controllers/follow');

const multer = require('multer');
const path = require('path');

const router = express.Router({ mergeParams: true });
const app = express();

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

router.route('/avatar').put(uploadAvatar, resizeAvatar, saveAvatar);

module.exports = router;
