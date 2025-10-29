const express = require('express');
const router = express.Router();

// Get all posts
router.get('/', (req, res) => {
  res.json({ message: 'Get all posts' });
});

// Get single post
router.get('/:id', (req, res) => {
  res.json({ message: `Get post ${req.params.id}` });
});

// Create post
router.post('/', (req, res) => {
  res.json({ message: 'Create new post' });
});

// Update post
router.put('/:id', (req, res) => {
  res.json({ message: `Update post ${req.params.id}` });
});

// Delete post
router.delete('/:id', (req, res) => {
  res.json({ message: `Delete post ${req.params.id}` });
});

module.exports = router;