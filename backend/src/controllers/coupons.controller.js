import Coupons from "../models/coupons.model.js";

export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupons.find();
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const createCoupons = async (req, res) => {
  try {
    const { code,discount_percent,valid_from,valid_to,usage_limit} = req.body;
    const newCoupons = new Coupons({
        code,
        discount_percent,
        valid_from,
        valid_to,
        usage_limit
    });
    const saved = await newCoupons.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export const updateCoupons = async (req, res) => {
    try {
        const { id } = req.params;
        const { code, discount_percent, valid_from, valid_to, usage_limit } = req.body;
        const updatedCoupons = await Coupons.findByIdAndUpdate(id, { code, discount_percent, valid_from, valid_to, usage_limit }, { new: true });
        if (updatedCoupons) {
            res.json(updatedCoupons);
        } else {
            res.status(404).json({ message: "Không tìm thấy mã giảm giá để cập nhật." });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });  
    }
}

export const deleteCoupons = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCoupons = await Coupons.findByIdAndDelete(id);
        if (deletedCoupons) {
            res.json({ message: "Xóa mã giảm giá thành công." });
        } else {
            res.status(404).json({ message: "Không tìm thấy mã giảm giá để xóa." });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}