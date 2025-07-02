import Category from "../models/category.model.js";

// [POST] Tạo danh mục
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

// [GET] Lấy tất cả danh mục
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// [PUT] Cập nhật danh mục
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, parent_category_id } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, description, parent_category_id },
      { new: true }
    );

    if (updatedCategory) {
      res.json(updatedCategory);
    } else {
      res.status(404).json({ message: "Không tìm thấy danh mục để cập nhật." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// [DELETE] Xoá danh mục
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (deletedCategory) {
      res.json({ message: "Xoá danh mục thành công." });
    } else {
      res.status(404).json({ message: "Không tìm thấy danh mục để xoá." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
