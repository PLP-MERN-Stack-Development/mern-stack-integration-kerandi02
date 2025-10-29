const express = require('express');
const router = express.Router();

// Get all categories
router.get('/', (req, res) => {
  res.json({ message: 'Get all categories' });
});

// Get single category
router.get('/:id', (req, res) => {
  res.json({ message: `Get category ${req.params.id}` });
});

// Create category
router.post('/', (req, res) => {
  res.json({ message: 'Create new category' });
});

// Update category
router.put('/:id', (req, res) => {
  res.json({ message: `Update category ${req.params.id}` });
});

// Delete category
router.delete('/:id', (req, res) => {
  res.json({ message: `Delete category ${req.params.id}` });
});

module.exports = router;