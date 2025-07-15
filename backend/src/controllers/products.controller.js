import Product from "../models/products.model.js";
import Category from "../models/category.model.js";
import ProductVariant from "../models/product_variants.model.js";
import cloudinary from "../config/cloudinary.config.js";
import fs from "fs";
import mongoose from "mongoose";

// Lấy tất cả sản phẩm kèm biến thể
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category_id")
      .populate("related_products");

    const productsWithVariants = await Promise.all(
      products.map(async (product) => {
        const variants = await ProductVariant.find({ product_id: product._id });
        return { ...product.toObject(), variants };
      })
    );

    res.json(productsWithVariants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy sản phẩm theo ID (kèm biến thể)
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "ID không hợp lệ" });

    const product = await Product.findById(id)
      .populate("category_id")
      .populate("related_products");

    if (!product)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm." });

    const variants = await ProductVariant.find({ product_id: id });

    res.json({ ...product.toObject(), variants });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tạo sản phẩm mới
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discount_price,
      category_id,
      related_products,
      size,
      color,
      dimensions,
    } = req.body;

    if (!name || !description || !category_id) {
      return res.status(400).json({
        message:
          "Thiếu các trường bắt buộc: name, description, price, category_id.",
      });
    }

    // Upload ảnh
    const images = [];
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "products",
      });
      images.push(result.secure_url);
      fs.unlinkSync(file.path);
    }

    const newProduct = new Product({
      name,
      description,
      price,
      discount_price: discount_price || 0,
      category_id,
      images,
      related_products: related_products || [],
      size,
      color,
      dimensions,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(400).json({ message: err.message });
  }
};

// Cập nhật sản phẩm
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "ID không hợp lệ" });

    const product = await Product.findById(id);
    if (!product)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm." });

    const {
      name,
      description,
      price,
      discount_price,
      category_id,
      related_products,
      size,
      color,
      dimensions,
    } = req.body;

    // Upload ảnh mới nếu có
    if (req.files && req.files.length > 0) {
      const newImages = [];
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "products",
        });
        newImages.push(result.secure_url);
        fs.unlinkSync(file.path);
      }
      product.images = newImages;
    }

    // Update các field
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.discount_price = discount_price || product.discount_price;
    product.category_id = category_id || product.category_id;
    product.related_products = related_products || product.related_products;
    product.size = size || product.size;
    product.color = color || product.color;
    product.dimensions = dimensions || product.dimensions;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Xoá sản phẩm kèm biến thể
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "ID không hợp lệ" });

    const product = await Product.findById(id);
    if (!product)
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm để xoá." });

    await ProductVariant.deleteMany({ product_id: id });
    await product.deleteOne();

    res.json({ message: "Đã xoá sản phẩm và các biến thể liên quan." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Lấy sản phẩm theo tên danh mục
export const getProductsByCategoryName = async (req, res) => {
  try {
    const { name } = req.params;
    const category = await Category.findOne({ name });
    if (!category)
      return res.status(404).json({ message: "Không tìm thấy danh mục." });

    const products = await Product.find({ category_id: category._id }).populate(
      "category_id"
    );
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ message: "Thiếu tham số tìm kiếm" });

    const products = await Product.find({
      name: { $regex: q, $options: "i" },
    })
      .limit(10)
      .select("name _id");

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
