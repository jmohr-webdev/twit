const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const colors = require('colors');
const User = require('../models/User');

module.exports = async function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check to see if token exists
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    jwt.verify(token, process.env.JWTSECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
      }
      // Sets user
      req.user = decoded.user;
      next();
    });
  } catch (error) {
    console.log('something is wrong with auth middleware'.red);
    res.status(500).json({ msg: 'Server error' });
  }
};