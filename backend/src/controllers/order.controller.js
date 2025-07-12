import Order from '../models/order.model.js';

// Tạo đơn hàng
export const createOrder = async (req, res) => {
  try {
    console.log("🟡 Đã nhận order body:", req.body);
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("❌ Lỗi tạo order:", err);
    res.status(500).json({ message: err.message });
  }
};

// Lấy tất cả đơn hàng
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user_id')
      .populate('products.product_id');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Lấy 1 đơn hàng theo ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id)
      .populate('user_id')
      .populate('products.product_id');
    if (!order) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng.' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Cập nhật đơn hàng theo ID
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng để cập nhật.' });
    }
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Xóa đơn hàng theo ID
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng để xoá.' });
    }
    res.json({ message: 'Xóa đơn hàng thành công.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
