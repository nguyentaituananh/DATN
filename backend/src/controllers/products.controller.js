import Product from "../models/products.model.js";
import Category from "../models/category.model.js";

// Lấy tất cả sản phẩm
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category_id");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy sản phẩm theo ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category_id")
      .populate("related_products");
    if (product) res.json(product);
    else res.status(404).json({ message: "Không tìm thấy sản phẩm" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tạo sản phẩm mới
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      discount_price,
      category_id,
      description,
      images,
      related_products,
    } = req.body;

    const newProduct = new Product({
      name,
      price,
      discount_price,
      category_id,
      description,
      images,
      related_products,
    });

    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Cập nhật sản phẩm
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Không tìm thấy sản phẩm để cập nhật." });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Xóa sản phẩm
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (deleted) {
      res.json(deleted);
    } else {
      res.status(404).json({ message: "Không tìm thấy sản phẩm để xóa." });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Lấy sản phẩm theo category name
export const getProductsByCategoryName = async (req, res) => {
  try {
    const { name } = req.params;

    const category = await Category.findOne({ name });
    if (!category) {
      return res.status(404).json({ message: "Không tìm thấy danh mục." });
    }

    const products = await Product.find({ category_id: category._id }).populate(
      "category_id"
    );

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
