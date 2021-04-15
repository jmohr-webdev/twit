const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
  res.send(`Getting profile of ${req.params.id}`);
});

// POST ROUTE
// Creates a new user

// PUT ROUTE
// Updates a user's account or profile

// DELETE ROUTE
// Deletes a user

module.exports = router;
