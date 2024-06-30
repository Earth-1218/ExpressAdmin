// auth.js
var path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models/user');

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ 'status': false, error: 'Access denied. No token provided.' });

  try {
    const decoded = verifyToken(token);
    req.user = await User.findByPk(decoded.id);
    next();
  } catch (error) {
    res.status(400).json({ 'status': false, error: 'Invalid token.' });
  }
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = { generateToken, verifyToken, authenticateUser, hashPassword, comparePassword };
