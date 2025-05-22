// src/controllers/order.controller.js
import Order from '../models/order.model.js';

export const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user_id').populate('products.product_id');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
