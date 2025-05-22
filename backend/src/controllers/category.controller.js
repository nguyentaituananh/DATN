import Category from '../models/category.model.js';

export const createCategory = async (req, res) => {
  try {
    const { name, description, parent_category_id } = req.body;
    const newCategory = new Category({ name, description, parent_category_id });
    const saved = await newCategory.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
