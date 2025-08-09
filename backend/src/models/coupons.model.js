import mongoose from 'mongoose'

const DOCUMENT_NAME = 'Coupon'
const COLLECTION_NAME = 'coupons'

const couponSchema = new mongoose.Schema(
	{
		code: {
			type: String,
			required: true,
			unique: true,
			uppercase: true,
			trim: true,
			description: 'Mã giảm giá (duy nhất)'
		},
		name: {
			type: String,
			required: true,
			trim: true,
			description: 'Tên mã giảm giá'
		},
		description: {
			type: String,
			trim: true,
			description: 'Mô tả mã giảm giá'
		},
		discount_type: {
			type: String,
			required: true,
			enum: ['percentage', 'fixed'],
			description: 'Loại giảm giá: percentage (phần trăm) hoặc fixed (số tiền cố định)'
		},
		discount_value: {
			type: Number,
			required: true,
			min: 0,
			description: 'Giá trị giảm giá (phần trăm hoặc số tiền)'
		},
		max_discount_amount: {
			type: Number,
			default: null,
			description: 'Số tiền giảm giá tối đa (chỉ áp dụng cho loại percentage)'
		},
		min_order_amount: {
			type: Number,
			default: 0,
			description: 'Số tiền đơn hàng tối thiểu để áp dụng'
		},
		valid_from: {
			type: Date,
			required: true,
			description: 'Ngày bắt đầu hiệu lực'
		},
		valid_to: {
			type: Date,
			required: true,
			description: 'Ngày hết hiệu lực'
		},
		usage_limit: {
			type: Number,
			required: true,
			min: 1,
			description: 'Giới hạn số lần sử dụng'
		},
		used_count: {
			type: Number,
			default: 0,
			description: 'Số lần đã sử dụng'
		},
		is_active: {
			type: Boolean,
			default: true,
			description: 'Trạng thái hoạt động'
		},
		created_by: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			description: 'Người tạo mã giảm giá'
		}
	},
	{
		collection: COLLECTION_NAME,
		timestamps: true
	}
)

// Validate giá trị giảm giá theo loại
couponSchema.pre('save', function (next) {
	// Validate discount_value based on discount_type
	if (this.discount_type === 'percentage') {
		if (this.discount_value > 100) {
			return next(new Error('Phần trăm giảm giá không thể vượt quá 100%'))
		}
	}

	// Validate valid_to > valid_from
	if (this.valid_to <= this.valid_from) {
		return next(new Error('Ngày hết hạn phải sau ngày bắt đầu'))
	}

	next()
})

// Method để tính toán số tiền giảm giá
couponSchema.methods.calculateDiscount = function (orderAmount) {
	// Kiểm tra đơn hàng có đủ điều kiện không
	if (orderAmount < this.min_order_amount) {
		throw new Error(`Đơn hàng tối thiểu ${this.min_order_amount.toLocaleString('vi-VN')} VND`)
	}

	let discountAmount = 0

	if (this.discount_type === 'percentage') {
		discountAmount = (orderAmount * this.discount_value) / 100

		// Áp dụng giới hạn số tiền giảm tối đa nếu có
		if (this.max_discount_amount && discountAmount > this.max_discount_amount) {
			discountAmount = this.max_discount_amount
		}
	} else if (this.discount_type === 'fixed') {
		discountAmount = this.discount_value

		// Số tiền giảm không được vượt quá giá trị đơn hàng
		if (discountAmount > orderAmount) {
			discountAmount = orderAmount
		}
	}

	return Math.round(discountAmount)
}

// Method để kiểm tra tính hợp lệ của coupon
couponSchema.methods.isValid = function () {
	const now = new Date()

	return {
		isValid: this.is_active && this.valid_from <= now && this.valid_to >= now && this.used_count < this.usage_limit,
		errors: [
			...(this.is_active ? [] : ['Mã giảm giá đã bị vô hiệu hóa']),
			...(this.valid_from <= now ? [] : ['Mã giảm giá chưa có hiệu lực']),
			...(this.valid_to >= now ? [] : ['Mã giảm giá đã hết hạn']),
			...(this.used_count < this.usage_limit ? [] : ['Mã giảm giá đã hết lượt sử dụng'])
		]
	}
}

// Cập nhật updated_at trước khi lưu
couponSchema.pre('save', function (next) {
	this.updated_at = Date.now()
	next()
})

// Tạo index để tối ưu tìm kiếm
couponSchema.index({ code: 1 }, { unique: true })
couponSchema.index({ is_active: 1 })
couponSchema.index({ valid_from: 1, valid_to: 1 })
couponSchema.index({ discount_type: 1 })

const Coupon = mongoose.model(DOCUMENT_NAME, couponSchema)

export default Coupon
