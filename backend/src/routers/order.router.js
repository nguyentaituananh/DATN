import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from '../controllers/order.controller.js';

const router = express.Router();

// Tạo đơn hàng
router.post('/', createOrder);

// Lấy tất cả đơn hàng
router.get('/', getAllOrders);

// Lấy một đơn hàng theo ID
router.get('/:id', getOrderById);

// Cập nhật đơn hàng theo ID
router.put('/:id', updateOrder);

// Xóa đơn hàng theo ID
router.delete('/:id', deleteOrder);

export default router;
