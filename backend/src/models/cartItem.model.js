import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  cart_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
    required: true
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  variant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductVariant",
    default: null
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  added_at: {
    type: Date,
    default: Date.now
  }
});

const CartItem = mongoose.model("CartItem", cartItemSchema);
<<<<<<< HEAD
export default CartItem;
=======
export default CartItem;
>>>>>>> 55d107a72aa0df79e9a549e316f81d2abd82a840
