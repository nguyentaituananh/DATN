import mongoose from 'mongoose'

const DOCUMENT_NAME = 'Order'
const COLLECTION_NAME = 'orders'

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      description: 'ID người dùng',
    },
    products: {
      type: Array, 
      default: [],
      description: 'Danh sách sản phẩm trong đơn hàng',
    },
    status: {
      type: String,
      enum: ['pending', 'shipped', 'done', 'cancelled'],
      required: true,
      description: 'Trạng thái đơn hàng',
    },
    order_date: {
      type: Date,
      required: true,
      description: 'Ngày đặt hàng',
    },
    shipping_address: {
      type: String,
      required: true,
      description: 'Địa chỉ giao hàng',
    },
    created_at: {
      type: Date,
      default: Date.now,
      description: 'Thời gian tạo đơn hàng',
    },
    updated_at: {
      type: Date,
      default: Date.now,
      description: 'Thời gian cập nhật đơn hàng',
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
)

// Cập nhật updated_at trước khi lưu
orderSchema.pre('save', function (next) {
  this.updated_at = Date.now()
  next()
})

// Tạo index để tối ưu tìm kiếm theo user_id và status
orderSchema.index({ user_id: 1, status: 1 })

const Order = mongoose.model(DOCUMENT_NAME, orderSchema)

export default Order