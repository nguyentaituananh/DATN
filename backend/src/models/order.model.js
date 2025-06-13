// src/models/order.model.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      }
    ],
    status: {
      type: String,
      enum: ['pending', 'shipped', 'done'],
      default: 'pending',
    },
    order_date: {
      type: Date,
      default: Date.now,
    },
    shipping_address: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
