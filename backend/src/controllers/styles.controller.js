import Style from "../models/styles.model.js";
import { styleSchema, styleUpdateSchema } from "../validates/styles.validate.js";
// Tạo style mới
export const createStyle = async (req, res) => {
  try {
    const { error } = styleSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const newStyle = new Style(req.body);
    const saved = await newStyle.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Tạo phong cách thất bại", error: err.message });
  }
};

// Lấy tất cả styles
export const getAllStyles = async (req, res) => {
  try {
    const styles = await Style.find();
    res.status(200).json(styles);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách phong cách", error: err.message });
  }
};

// Lấy style theo ID
export const getStyleById = async (req, res) => {
  try {
    const style = await Style.findById(req.params.id);
    if (!style) return res.status(404).json({ message: "Không tìm thấy phong cách" });
    res.status(200).json(style);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy phong cách", error: err.message });
  }
};

// Cập nhật style
export const updateStyle = async (req, res) => {
  try {
    const { error } = styleUpdateSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const updated = await Style.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Không tìm thấy phong cách để cập nhật" });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Cập nhật phong cách thất bại", error: err.message });
  }
};

// Xoá style
export const deleteStyle = async (req, res) => {
  try {
    const deleted = await Style.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Không tìm thấy phong cách để xoá" });

    res.status(200).json({ message: "Xoá phong cách thành công" });
  } catch (err) {
    res.status(500).json({ message: "Xoá phong cách thất bại", error: err.message });
  }
};
