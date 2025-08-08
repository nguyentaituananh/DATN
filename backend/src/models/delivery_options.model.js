'use strict'

import mongoose from 'mongoose'

const DOCUMENT_NAME = 'DeliveryOption'
const COLLECTION_NAME = 'delivery_options'

const deliveryOptionSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      description: 'ID của sản phẩm'
    },
    method: {
      type: String,
      required: true,
      description: 'Phương thức giao hàng'
    },
    fee: {
      type: Number,
      required: true,
      description: 'Phí giao hàng'
    },
    estimated_days: {
      type: Number,
      required: true,
      description: 'Số ngày dự kiến giao hàng'
    }
  },
  {
    collection: COLLECTION_NAME,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
)

// Tạo index để tối ưu tìm kiếm theo product_id
deliveryOptionSchema.index({ product_id: 1 })

const DeliveryOption= mongoose.model(DOCUMENT_NAME, deliveryOptionSchema)

export default DeliveryOption