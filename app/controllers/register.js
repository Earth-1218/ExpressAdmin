var path = require('path');
const express = require('express');
const router = express.Router();
const { User, sequelize } = require('../models/user');
const { generateToken, hashPassword } = require('../auth');

router.post('/', (req, res) => {
  sequelize.sync().then(() => {
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
      console.error('Unable to create table:', error);
      res.status(500).json({ 'status': false, 'error': 'Failed to create user' });
    });
  }).catch(error => {
    console.error('Unable to create table:', error);
    res.status(500).json({ 'status': false, 'error': 'Unable to create table' });
  });
});

module.exports = router;
