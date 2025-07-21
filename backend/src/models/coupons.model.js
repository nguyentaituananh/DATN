import mongoose from 'mongoose'

const DOCUMENT_NAME = 'Coupon'
const COLLECTION_NAME = 'coupons'

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      description: 'Mã giảm giá (duy nhất)',
    },
    discount_percent: {
      type: Number,
      required: true,
      description: 'Phần trăm giảm giá',
    },
    valid_from: {
      type: Date,
      required: true,
      description: 'Ngày bắt đầu hiệu lực',
    },
    valid_to: {
      type: Date,
      required: true,
      description: 'Ngày hết hiệu lực',
    },
    usage_limit: {
      type: Number,
      required: true,
      description: 'Giới hạn số lần sử dụng',
    },
    used_count: {
      type: Number,
      default: 0,
      description: 'Số lần đã sử dụng',
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
couponSchema.pre('save', function (next) {
  this.updated_at = Date.now()
  next()
})

// Tạo index để tối ưu tìm kiếm theo code
couponSchema.index({ code: 1 }, { unique: true })

const Coupon = mongoose.model(DOCUMENT_NAME, couponSchema)

export default Coupon