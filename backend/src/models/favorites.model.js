import mongoose from 'mongoose'

const DOCUMENT_NAME = 'Favorite'
const COLLECTION_NAME = 'favorites'

const favoriteSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      description: 'ID người dùng',
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      description: 'ID sản phẩm',
    },
    created_at: {
      type: Date,
      default: Date.now,
      description: 'Thời gian thêm vào danh sách yêu thích',
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
)

// Tạo index để tối ưu tìm kiếm theo user_id
favoriteSchema.index({ user_id: 1 })

const Favorite = mongoose.model(DOCUMENT_NAME, favoriteSchema)

export default Favorite