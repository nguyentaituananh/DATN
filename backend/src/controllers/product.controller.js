import Product from "../models/product.model.js";

// Lấy tất cả sản phẩm
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy theo ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) res.json(product);
    else res.status(404).json({ message: "Không tìm thấy sản phẩm" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Thêm sản phẩm mới
export const createProduct = async (req, res) => {
  try {
    const { name, price, category, description, stock, images } = req.body;
    const newProduct = new Product({
      name,
      price,
      category,
      description,
      stock,
      images,
    });
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(400).json({ message: "Không tìm thấy sản phẩm để cập nhật." });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Product.findByIdAndDelete(id);
    if (post) {
      res.json(post);
    } else {
      res.status(400).json({ message: "Không tìm thấy sản phẩm để xóa." });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
