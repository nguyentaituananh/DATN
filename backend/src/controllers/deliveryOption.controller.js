import DeliveryOption from '../models/deliveryOption.model.js';
import { deliveryOptionSchema, deliveryOptionUpdateSchema } from '../validates/deliveryOptions.validate.js';

export const createDeliveryOption = async (req, res) => {
  try {
    const { error } = deliveryOptionSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const newOption = new DeliveryOption(req.body);
    const saved = await newOption.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi tạo phương thức giao hàng', error: err.message });
  }
};

export const getAllDeliveryOptions = async (req, res) => {
  try {
    const options = await DeliveryOption.find().populate('product_id');
    res.json(options);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách phương thức giao hàng', error: err.message });
  }
};

export const getDeliveryOptionById = async (req, res) => {
  try {
    const option = await DeliveryOption.findById(req.params.id).populate('product_id');
    if (!option) return res.status(404).json({ message: 'Không tìm thấy phương thức giao hàng' });
    res.json(option);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy phương thức giao hàng', error: err.message });
  }
};

export const updateDeliveryOption = async (req, res) => {
  try {
    const { error } = deliveryOptionUpdateSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const updated = await DeliveryOption.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Không tìm thấy phương thức giao hàng để cập nhật' });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi cập nhật phương thức giao hàng', error: err.message });
  }
};

export const deleteDeliveryOption = async (req, res) => {
  try {
    const deleted = await DeliveryOption.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Không tìm thấy phương thức giao hàng để xóa' });

    res.json({ message: 'Xóa phương thức giao hàng thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa phương thức giao hàng', error: err.message });
  }
};
