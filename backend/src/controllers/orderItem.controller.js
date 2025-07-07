import OrderItem from "../models/orderItem.model.js";
import { orderItemSchema, orderItemUpdateSchema } from "../validates/orderItems.validate.js";

export const getAllOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItem.find().populate("product_id variant_id");
    res.status(200).json(orderItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createOrderItem = async (req, res) => {
  try {
    const { error } = orderItemSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const newOrderItem = new OrderItem(req.body);
    await newOrderItem.save();
    res.status(201).json(newOrderItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = orderItemUpdateSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const updatedOrderItem = await OrderItem.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedOrderItem) {
      return res.status(404).json({ message: "Không tìm thấy chi tiết đơn hàng." });
    }

    res.status(200).json(updatedOrderItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrderItem = await OrderItem.findByIdAndDelete(id);
    if (!deletedOrderItem) {
      return res.status(404).json({ message: "Không tìm thấy chi tiết đơn hàng để xóa." });
    }
    res.status(200).json({ message: "Xóa chi tiết đơn hàng thành công." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
