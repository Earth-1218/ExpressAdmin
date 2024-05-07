const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const { generateToken } = require('../auth');
const bcrypt = require('bcryptjs');

router.post('/', (req, res) => {
  try {
    User.findOne({ where: { email: req.body.email } })
      .then(user => {
        if (user !== null) {
          return res.status(400).json({ 'status': false, error: 'Email already exists' });
        } else {
          const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
          });
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  const token = generateToken({ id: user.id, email: user.email });
                  res.json({ 'api_token': token });
                })
                .catch(err => res.status(500).json({'status': false, 'error': 'Error in signup' }));
            });
          });
        }
      })
  } catch (error) {
    console.error(error);
    res.status(500).json({'status': false, 'error': 'Error in signup.' });
  }
});

module.exports = router;
