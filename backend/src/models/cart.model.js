import mongoose from "mongoose";


const cartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      }
    }
  ],
  updated_at: {
    type: Date,
    default: Date.now
  }
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;