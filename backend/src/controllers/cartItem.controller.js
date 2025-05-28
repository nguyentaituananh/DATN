import CartItem from "../models/CartItem.js";

// Tạo mục trong giỏ hàng
export const addCartItem = async (req, res) => {
  try {
    const { cart_id, product_id, variant_id, quantity } = req.body;
    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }
    const newItem = new CartItem({
      cart_id,
      product_id,
      variant_id: variant_id || null,
      quantity,
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy tất cả mục theo cart_id
export const getItemsByCartId = async (req, res) => {
  try {
    const { cart_id } = req.params;
    const items = await CartItem.find({ cart_id }).populate("product_id variant_id");
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật số lượng mục trong giỏ hàng theo _id
export const updateCartItemQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }
    const updatedItem = await CartItem.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: "CartItem not found" });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa mục trong giỏ hàng theo _id
export const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await CartItem.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "CartItem not found" });
    }
    res.status(200).json({ message: "CartItem deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};