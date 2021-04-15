const express = require('express');
const router = express.Router({ mergeParams: true });

router.get('/twits', (req, res) => {
  res.send(`Get all twits by ${req.params.username}`);
});

router.get('/twits/:id', (req, res) => {
  res.send(`${req.params.id} by ${req.params.username}`);
});

module.exports = router;
