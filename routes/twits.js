const express = require('express');
const router = express.Router({ mergeParams: true });
const auth = require('../middleware/auth');
const {
  getUserTwits,
  getSingleTwit,
  createATwit,
  deleteATwit,
} = require('../controllers/twits');

// Route: /api/v1/:username/twits/

router.route('/').get(getUserTwits).post(auth, createATwit);
router.route('/:id').get(getSingleTwit).delete(auth, deleteATwit);

module.exports = router;
