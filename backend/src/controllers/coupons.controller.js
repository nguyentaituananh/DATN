import Coupons from "../models/coupons.model.js";
import { couponSchema, couponUpdateSchema } from "../validates/coupons.validates.js";

export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupons.find();
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createCoupons = async (req, res) => {
  const { error } = couponSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((err) => ({
      field: err.path?.[0] || "null",
      message: err.message,
    }));
    return res.status(400).json({ errors });
  }

  try {
    const newCoupons = new Coupons(req.body);
    const saved = await newCoupons.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateCoupons = async (req, res) => {
  const { error } = couponUpdateSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((err) => ({
      field: err.path?.[0] || "null",
      message: err.message,
    }));
    return res.status(400).json({ errors });
  }

  try {
    const { id } = req.params;
    const updated = await Coupons.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Không tìm thấy mã giảm giá để cập nhật." });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCoupons = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Coupons.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Không tìm thấy mã giảm giá để xóa." });
    }
    res.json({ message: "Xóa mã giảm giá thành công." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
