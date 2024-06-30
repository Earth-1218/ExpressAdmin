// routes/protected.js

const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../auth');
const { getLocation } = require('../controllers/address');

// Protected route
router.get('/profile', authenticateUser, (req, res) => {
  res.json(req.user);
});

router.post('/location', authenticateUser, async (req, res) => {
  try {
    const location = await getLocation(req.body.iwant, req.body.id);
    res.status(200).json({ status: true, message: `Location (${req.body.iwant}) data fetched`, data:location });
  } catch (error) {
    res.status(500).json({ status: true, message: error.message, error: 'Failed to get location' });
  }
});

module.exports = router;
