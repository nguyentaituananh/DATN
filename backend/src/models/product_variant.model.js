'use strict'

import mongoose from 'mongoose'

const DOCUMENT_NAME = 'ProductVariant'
const COLLECTION_NAME = 'product_variants'

const productVariantSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      description: 'ID của sản phẩm'
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      description: 'Mã SKU của biến thể'
    },
    attributes: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      description: 'Thuộc tính của biến thể (ví dụ: kích thước, màu sắc)'
    },
    price: {
      type: Number,
      required: true,
      description: 'Giá của biến thể'
    },
    discount_price: {
      type: Number,
      default: null,
      description: 'Giá khuyến mãi của biến thể'
    },
    stock_quantity: {
      type: Number,
      required: true,
      description: 'Số lượng tồn kho'
    },
    in_stock: {
      type: Boolean,
      required: true,
      description: 'Trạng thái còn hàng'
    },
    images: {
      type: [String],
      default: [],
      description: 'Danh sách URL hình ảnh của biến thể'
    },
    is_active: {
      type: Boolean,
      default: true,
      description: 'Trạng thái kích hoạt của biến thể'
    }
  },
  {
    collection: COLLECTION_NAME,
    timestamps: { createdAt: 'date_created', updatedAt: 'updated_at' }
  }
)

// Tạo index để tối ưu tìm kiếm theo product_id và sku
productVariantSchema.index({ product_id: 1, sku: 1 }, { unique: true })

const ProductVariant = mongoose.model(DOCUMENT_NAME, productVariantSchema)

export default ProductVariant