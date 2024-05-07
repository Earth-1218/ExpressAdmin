// routes/protected.js

const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../auth');

// Protected route
router.get('/profile', authenticateUser, (req, res) => {
  res.json(req.user);
});

module.exports = router;
