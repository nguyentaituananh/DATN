import mongoose from 'mongoose'

const DOCUMENT_NAME = 'Review'
const COLLECTION_NAME = 'reviews'

const reviewSchema = new mongoose.Schema(
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
    rating: {
      type: Number,
      required: true,
      min: [1, 'Điểm đánh giá phải từ 1 đến 5'],
      max: [5, 'Điểm đánh giá phải từ 1 đến 5'],
      description: 'Điểm đánh giá (1-5)',
    },
    comment: {
      type: String,
      default: null,
      description: 'Bình luận (có thể null)',
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
reviewSchema.pre('save', function (next) {
  this.updated_at = Date.now()
  next()
})

// Tạo index để tối ưu tìm kiếm theo user_id và product_id
reviewSchema.index({ user_id: 1, product_id: 1 })

const Review = mongoose.model(DOCUMENT_NAME, reviewSchema)

export default Review