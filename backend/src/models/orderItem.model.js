import mongoose from 'mongoose'

const DOCUMENT_NAME = 'OrderItem'
const COLLECTION_NAME = 'order_items'

const orderItemSchema = new mongoose.Schema(
  {
    code_order: {
      type: String,
      required: true,
      description: 'Mã đơn hàng',
    },
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
      description: 'ID đơn hàng',
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
    price: {
      type: Number,
      required: true,
      description: 'Giá sản phẩm',
    },
    discount_price: {
      type: Number,
      default: null,
      description: 'Giá sau giảm giá (có thể null)',
    },
    created_at: {
      type: Date,
      default: Date.now,
      description: 'Thời gian tạo',
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
)

// Tạo index để tối ưu tìm kiếm theo order_id và product_id
orderItemSchema.index({ order_id: 1, product_id: 1 })

const OrderItem = mongoose.model(DOCUMENT_NAME, orderItemSchema)

export default OrderItem