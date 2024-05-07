const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const { generateToken, comparePassword } = require('../auth');

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user === null) {
      return res.status(400).json({ 'status': false, error: 'Invalid email or password.' });
    }
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) return res.status(400).json({ 'status': false, error: 'Invalid email or password.' });
    const token = generateToken({ id: user.id, email: user.email });
    res.json({ 'api_token': token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 'status': false, error: 'Error in login.' });
  }
});

module.exports = router;
