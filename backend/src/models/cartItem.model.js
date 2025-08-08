import mongoose from 'mongoose'

const DOCUMENT_NAME = 'CartItem'
const COLLECTION_NAME = 'cart_items'

const cartItemSchema = new mongoose.Schema(
  {
    cart_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cart',
      required: true,
      description: 'ID giỏ hàng',
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      description: 'ID sản phẩm',
    },
    variant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductVariant',
      default: null,
      description: 'ID biến thể sản phẩm (có thể null)',
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Số lượng phải lớn hơn 0'],
      description: 'Số lượng sản phẩm',
    },
    added_at: {
      type: Date,
      default: Date.now,
      description: 'Thời gian thêm vào giỏ',
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
)

// Tạo index để tối ưu tìm kiếm theo cart_id
cartItemSchema.index({ cart_id: 1 })

const CartItem = mongoose.model(DOCUMENT_NAME, cartItemSchema)

export default CartItem