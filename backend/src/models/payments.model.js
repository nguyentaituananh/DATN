'use strict'

import mongoose from 'mongoose'

const DOCUMENT_NAME = 'Payment'
const COLLECTION_NAME = 'payments'

const paymentSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
      description: 'ID của đơn hàng'
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      description: 'ID của người dùng'
    },
    amount: {
      type: Number,
      required: true,
      description: 'Số tiền thanh toán'
    },
    method: {
      type: String,
      enum: ['credit_card', 'paypal', 'cod', 'momo', 'bank_transfer'],
      required: true,
      description: 'Phương thức thanh toán'
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
      description: 'Trạng thái thanh toán'
    },
    transaction_id: {
      type: String,
      default: null,
      description: 'ID giao dịch từ cổng thanh toán'
    },
    paid_at: {
      type: Date,
      default: null,
      description: 'Thời gian thanh toán'
    },
    note: {
      type: String,
      default: null,
      description: 'Ghi chú'
    }
  },
  {
    collection: COLLECTION_NAME,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
)

// Tạo index để tối ưu tìm kiếm theo order_id và user_id
paymentSchema.index({ order_id: 1, user_id: 1 })

const Payment= mongoose.model(DOCUMENT_NAME, paymentSchema)

export default Payment