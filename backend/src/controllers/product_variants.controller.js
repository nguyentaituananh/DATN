import ProductVariant from "../models/product_variants.model.js";
import mongoose from "mongoose";

// Lấy tất cả biến thể
export const getAllVariants = async (req, res) => {
  try {
    const variants = await ProductVariant.find().populate("product_id");
    res.json(variants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy biến thể theo ID
export const getVariantById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).json({ message: "ID không hợp lệ" });

    const variant = await ProductVariant.findById(req.params.id).populate(
      "product_id"
    );
    if (variant) res.json(variant);
    else res.status(404).json({ message: "Không tìm thấy biến thể sản phẩm" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tạo mới biến thể
export const createVariant = async (req, res) => {
  try {
    const {
      product_id,
      sku,
      attributes,
      material_id,
      style_id,
      room_id,
      price,
      discount_price,
      stock_quantity,
      images,
      is_active,
    } = req.body;

    const newVariant = new ProductVariant({
      product_id,
      sku,
      attributes,
      material_id,
      style_id,
      room_id,
      price,
      discount_price,
      stock_quantity,
      images,
      is_active,
    });

    const saved = await newVariant.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Cập nhật biến thể
export const updateVariant = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).json({ message: "ID không hợp lệ" });

    const updated = await ProductVariant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updated) res.json(updated);
    else
      res.status(404).json({ message: "Không tìm thấy biến thể để cập nhật." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Xóa biến thể
export const deleteVariant = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).json({ message: "ID không hợp lệ" });

    const deleted = await ProductVariant.findByIdAndDelete(req.params.id);
    if (deleted) res.json(deleted);
    else res.status(404).json({ message: "Không tìm thấy biến thể để xoá." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
