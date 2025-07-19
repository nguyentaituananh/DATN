import Cart from "../models/repositories/cart.model.js";

// Lấy giỏ hàng theo user_id
export const getCartByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ user_id: userId }).populate(
      "items.product_id"
    );
    if (!cart) return res.status(404).json({ message: "Chưa có giỏ hàng." });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Thêm hoặc cập nhật sản phẩm trong giỏ
export const addToCart = async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;

    let cart = await Cart.findOne({ user_id });

    if (!cart) {
      cart = new Cart({
        user_id,
        items: [{ product_id, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product_id.toString() === product_id
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product_id, quantity });
      }
    }

    cart.updated_at = Date.now();
    const saved = await cart.save();
    res.status(200).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Cập nhật số lượng sản phẩm
export const updateCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ user_id: userId });
    if (!cart)
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng." });

    const item = cart.items.find(
      (item) => item.product_id.toString() === productId
    );
    if (!item)
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm trong giỏ." });

    item.quantity = quantity;
    cart.updated_at = Date.now();

    const saved = await cart.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Xóa một sản phẩm khỏi giỏ
export const removeCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const cart = await Cart.findOne({ user_id: userId });
    if (!cart)
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng." });

    cart.items = cart.items.filter(
      (item) => item.product_id.toString() !== productId
    );
    cart.updated_at = Date.now();

    const saved = await cart.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Xóa toàn bộ giỏ hàng
export const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ user_id: userId });
    if (!cart)
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng." });

    cart.items = [];
    cart.updated_at = Date.now();

    const saved = await cart.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
