import mongoose from 'mongoose'

const DOCUMENT_NAME = 'Order'
const COLLECTION_NAME = 'orders'

const orderProductSchema = new mongoose.Schema(
	{
		product_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
			required: true,
			description: 'ID sản phẩm'
		},
		product_name: {
			type: String,
			required: true,
			description: 'Tên sản phẩm tại thời điểm đặt hàng'
		},
		product_price: {
			type: Number,
			required: true,
			description: 'Giá sản phẩm tại thời điểm đặt hàng'
		},
		quantity: {
			type: Number,
			required: true,
			min: 1,
			description: 'Số lượng sản phẩm'
		},
		subtotal: {
			type: Number,
			required: true,
			description: 'Tổng tiền cho sản phẩm này (price * quantity)'
		}
	},
	{ _id: false }
)

const couponDataSchema = new mongoose.Schema(
	{
		coupon_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Coupon',
			required: true
		},
		coupon_code: {
			type: String,
			required: true
		},
		discount_amount: {
			type: Number,
			required: true,
			min: 0
		},
		discount_type: {
			type: String,
			enum: ['percentage', 'fixed'],
			required: true
		},
		discount_value: {
			type: Number,
			required: true
		}
	},
	{ _id: false }
)

const orderSchema = new mongoose.Schema(
	{
		order_code: {
			type: String,
			required: true,
			unique: true,
			description: 'Mã đơn hàng duy nhất (ORD-YYYYMMDD-XXXX)'
		},
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			description: 'ID người dùng đặt hàng'
		},
		products: {
			type: [orderProductSchema],
			required: true,
			validate: {
				validator: function (products) {
					return products && products.length > 0
				},
				message: 'Đơn hàng phải có ít nhất một sản phẩm'
			},
			description: 'Danh sách sản phẩm trong đơn hàng'
		},
		status: {
			type: String,
			enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
			default: 'pending',
			required: true,
			description: 'Trạng thái đơn hàng'
		},
		order_date: {
			type: Date,
			required: true,
			default: Date.now,
			description: 'Ngày đặt hàng'
		},
		shipping_address: {
			type: String,
			required: true,
			description: 'Địa chỉ giao hàng'
		},
		subtotal: {
			type: Number,
			required: true,
			min: 0,
			description: 'Tổng tiền trước khi giảm giá'
		},
		discount_amount: {
			type: Number,
			default: 0,
			min: 0,
			description: 'Số tiền được giảm giá'
		},
		total_amount: {
			type: Number,
			required: true,
			min: 0,
			description: 'Tổng tiền sau khi giảm giá'
		},
		coupon_data: {
			type: couponDataSchema,
			default: null,
			description: 'Thông tin mã giảm giá đã sử dụng'
		},
		payment_status: {
			type: String,
			enum: ['pending', 'paid', 'failed', 'refunded'],
			default: 'pending',
			description: 'Trạng thái thanh toán'
		},
		payment_method: {
			type: String,
			enum: ['cash', 'card', 'bank_transfer', 'e_wallet'],
			description: 'Phương thức thanh toán'
		},
		delivery_fee: {
			type: Number,
			default: 0,
			min: 0,
			description: 'Phí giao hàng'
		},
		estimated_delivery_date: {
			type: Date,
			description: 'Ngày giao hàng dự kiến'
		},
		actual_delivery_date: {
			type: Date,
			description: 'Ngày giao hàng thực tế'
		},
		tracking_number: {
			type: String,
			description: 'Mã vận đơn'
		},
		notes: {
			type: String,
			description: 'Ghi chú cho đơn hàng'
		},
		cancel_reason: {
			type: String,
			description: 'Lý do hủy đơn hàng'
		},
		status_note: {
			type: String,
			description: 'Ghi chú về trạng thái'
		},
		created_at: {
			type: Date,
			default: Date.now,
			description: 'Thời gian tạo đơn hàng'
		},
		updated_at: {
			type: Date,
			default: Date.now,
			description: 'Thời gian cập nhật đơn hàng'
		}
	},
	{
		collection: COLLECTION_NAME,
		timestamps: true
	}
)

// Middleware để cập nhật updated_at trước khi lưu
orderSchema.pre('save', function (next) {
	this.updated_at = new Date()
	next()
})

// Middleware để cập nhật updated_at trước khi update
orderSchema.pre(['updateOne', 'findOneAndUpdate'], function (next) {
	this.set({ updated_at: new Date() })
	next()
})

// Indexes để tối ưu performance
orderSchema.index({ user_id: 1 })
orderSchema.index({ status: 1 })
orderSchema.index({ order_code: 1 })
orderSchema.index({ created_at: -1 })
orderSchema.index({ user_id: 1, status: 1 })
orderSchema.index({ user_id: 1, created_at: -1 })

// Virtual fields
orderSchema.virtual('total_items').get(function () {
	return this.products.reduce((total, product) => total + product.quantity, 0)
})

orderSchema.virtual('is_cancellable').get(function () {
	return ['pending', 'confirmed'].includes(this.status)
})

orderSchema.virtual('is_refundable').get(function () {
	return ['delivered'].includes(this.status) && this.payment_status === 'paid'
})

// Ensure virtual fields are serialized
orderSchema.set('toJSON', { virtuals: true })
orderSchema.set('toObject', { virtuals: true })

// Cập nhật updated_at trước khi lưu
orderSchema.pre('save', function (next) {
	this.updated_at = Date.now()
	next()
})

// Tạo index để tối ưu tìm kiếm theo user_id và status
orderSchema.index({ user_id: 1, status: 1 })

const Order = mongoose.model(DOCUMENT_NAME, orderSchema)

export default Order
