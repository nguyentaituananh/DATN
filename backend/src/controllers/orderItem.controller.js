import OrderItem from "../models/orderItem.model.js";

export const getAllOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItem.find().populate("product_id variant_id");
    res.status(200).json(orderItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const createOrderItem = async (req, res) => {
  try {
    const { product_id, order_id, variant_id, quantity, price, discount_price } = req.body;
    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }
    const newOrderItem = new OrderItem({
      product_id,
      order_id,
      variant_id,
      quantity,
      price,
      discount_price
    });
    await newOrderItem.save();
    res.status(201).json(newOrderItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const updateOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, price, discount_price } = req.body;
    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }
    const updatedOrderItem = await OrderItem.findByIdAndUpdate(
      id,
      { quantity, price, discount_price },
      { new: true }
    );
    if (!updatedOrderItem) {
      return res.status(404).json({ message: "OrderItem not found" });
    }
    res.status(200).json(updatedOrderItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const deleteOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrderItem = await OrderItem.findByIdAndDelete(id);
    if (!deletedOrderItem) {
      return res.status(404).json({ message: "OrderItem not found" });
    }
    res.status(200).json({ message: "OrderItem deleted successfully" });
    }
    catch (error) {
    res.status(500).json({ message: error.message });
    }
}