import DeliveryOption from '../models/deliveryOption.model.js';

export const createDeliveryOption = async (req, res) => {
  try {
    const newOption = new DeliveryOption(req.body);
    const saved = await newOption.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi tạo delivery option', error: err.message });
  }
};

export const getAllDeliveryOptions = async (req, res) => {
  try {
    const options = await DeliveryOption.find().populate('product_id');
    res.json(options);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách delivery options', error: err.message });
  }
};

export const getDeliveryOptionById = async (req, res) => {
  try {
    const option = await DeliveryOption.findById(req.params.id).populate('product_id');
    if (!option) return res.status(404).json({ message: 'Không tìm thấy delivery option' });
    res.json(option);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy delivery option', error: err.message });
  }
};

export const updateDeliveryOption = async (req, res) => {
  try {
    const updated = await DeliveryOption.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Không tìm thấy delivery option để cập nhật' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi cập nhật delivery option', error: err.message });
  }
};

export const deleteDeliveryOption = async (req, res) => {
  try {
    const deleted = await DeliveryOption.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Không tìm thấy delivery option để xóa' });
    res.json({ message: 'Xóa delivery option thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa delivery option', error: err.message });
  }
};
