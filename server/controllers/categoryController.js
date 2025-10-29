import Category from '../models/Category.js';

// Get all categories
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

// Create category
export const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const category = await Category.create({
      name,
      description
    });

    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};