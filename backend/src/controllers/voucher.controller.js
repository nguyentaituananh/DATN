import Voucher from "../models/voucher.model.js";
import mongoose from "mongoose";

// Lấy tất cả voucher
export const getAllVouchers = async (req, res) => {
  try {
    const vouchers = await Voucher.find();
    res.json(vouchers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tạo voucher mới
export const createVoucher = async (req, res) => {
  try {
    const { code, discount, expiry_date } = req.body;

    if (!code || !discount || !expiry_date) {
      return res.status(400).json({ message: "Vui lòng nhập đủ thông tin." });
    }

    const newVoucher = new Voucher({ code, discount, expiry_date });
    const savedVoucher = await newVoucher.save();
    res.status(201).json(savedVoucher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Xóa voucher
export const deleteVoucher = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "ID không hợp lệ" });

    const voucher = await Voucher.findById(id);
    if (!voucher)
      return res.status(404).json({ message: "Không tìm thấy voucher." });

    await voucher.deleteOne();
    res.json({ message: "Xoá voucher thành công." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Lấy voucher theo ID
export const getVoucherById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "ID không hợp lệ" });

    const voucher = await Voucher.findById(id);
    if (!voucher)
      return res.status(404).json({ message: "Không tìm thấy voucher." });

    res.json(voucher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cập nhật voucher
export const updateVoucher = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "ID không hợp lệ" });

    const { code, discount, expiry_date, status } = req.body;

    const updatedVoucher = await Voucher.findByIdAndUpdate(
      id,
      { code, discount, expiry_date, status },
      { new: true }
    );

    if (!updatedVoucher)
      return res.status(404).json({ message: "Không tìm thấy voucher." });

    res.json(updatedVoucher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
