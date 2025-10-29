 const express = require('express');
const router = express.Router();

// Register user
router.post('/register', (req, res) => {
  res.json({ message: 'Register user' });
});

// Login user
router.post('/login', (req, res) => {
  res.json({ message: 'Login user' });
});

// Get current user
router.get('/me', (req, res) => {
  res.json({ message: 'Get current user' });
});

// Logout user
router.post('/logout', (req, res) => {
  res.json({ message: 'Logout user' });
});

module.exports = router;