// src/controllers/styles.controller.js
import Style from "../models/styles.model.js";

// Tạo style mới
export const createStyle = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newStyle = new Style({ name, description });
    const saved = await newStyle.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy tất cả styles
export const getAllStyles = async (req, res) => {
  try {
    const styles = await Style.find();
    res.status(200).json(styles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy style theo ID
export const getStyleById = async (req, res) => {
  try {
    const style = await Style.findById(req.params.id);
    if (!style) return res.status(404).json({ message: "Style not found" });
    res.status(200).json(style);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cập nhật style
export const updateStyle = async (req, res) => {
  try {
    const updated = await Style.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Style not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Xoá style
export const deleteStyle = async (req, res) => {
  try {
    const deleted = await Style.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Style not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
