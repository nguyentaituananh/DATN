import Dimension from '../models/dimensions.model.js';

export const createDimension = async (req, res) => {
  try {
    const newDimension = new Dimension(req.body);
    const saved = await newDimension.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi tạo dimension', error: err.message });
  }
};

export const getAllDimensions = async (req, res) => {
  try {
    const dimensions = await Dimension.find().populate('product_id');
    res.json(dimensions);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách dimensions', error: err.message });
  }
};

export const getDimensionById = async (req, res) => {
  try {
    const dimension = await Dimension.findById(req.params.id).populate('product_id');
    if (!dimension) return res.status(404).json({ message: 'Không tìm thấy dimension' });
    res.json(dimension);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy dimension', error: err.message });
  }
};

export const updateDimension = async (req, res) => {
  try {
    const updated = await Dimension.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Không tìm thấy dimension để cập nhật' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi cập nhật dimension', error: err.message });
  }
};

export const deleteDimension = async (req, res) => {
  try {
    const deleted = await Dimension.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Không tìm thấy dimension để xóa' });
    res.json({ message: 'Xóa dimension thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa dimension', error: err.message });
  }
};
