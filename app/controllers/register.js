var path = require('path');
const express = require('express');
const router = express.Router();
const { User, sequelize } = require('../models/user');
const { generateToken, hashPassword } = require('../auth');

router.post('/', (req, res) => {
  sequelize.sync().then(() => {
    User.findOne({ where: { email: req.body.email } }).then(existingUser => {
      if (existingUser) {
        res.status(400).json({ 'status': false, 'error': 'User already exists with this email' });
      } else {
        hashPassword(req.body.password).then(hashedPassword => {
          User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
          }).then(user => {
            const token = generateToken({ id: user.id, email: user.email });
            res.json({ 'api_token': token });
          }).catch(error => {
            console.error('Failed to create a new record:', error);
            res.status(500).json({ 'status': false, 'error': 'Failed to create user' });
          });
        }).catch(error => {
          console.error('Failed to create user:', error);
          res.status(500).json({ 'status': false, 'error': 'Failed to create user' });
        });
      }
    }).catch(error => {
      console.error('Failed to check if user exists:', error);
      res.status(500).json({ 'status': false, 'error': 'Failed to create user' });
    });
  }).catch(error => {
    console.error('Failed to create user:', error);
    res.status(500).json({ 'status': false, 'error': 'Failed to create user' });
  });
});

module.exports = router;
