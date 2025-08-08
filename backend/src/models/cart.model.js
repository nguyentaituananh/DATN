import mongoose from 'mongoose'

const DOCUMENT_NAME = 'Cart'
const COLLECTION_NAME = 'carts'

const cartSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      description: 'ID người dùng',
    },
    created_at: {
      type: Date,
      default: Date.now,
      description: 'Thời gian tạo',
    },
    updated_at: {
      type: Date,
      default: Date.now,
      description: 'Thời gian cập nhật',
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
)

// Cập nhật updated_at trước khi lưu
cartSchema.pre('save', function (next) {
  this.updated_at = Date.now()
  next()
})

// Tạo index để tối ưu tìm kiếm theo user_id
cartSchema.index({ user_id: 1 })

const Cart = mongoose.model(DOCUMENT_NAME, cartSchema)

export default Cart