'use strict'

import mongoose from 'mongoose'
import Order from '../models/order.model.js'
import Product from '../models/product.model.js'
import Coupon from '../models/coupons.model.js'
import Cart from '../models/cart.model.js'
import CartItem from '../models/cartItem.model.js'
import { BadRequestError, NotFoundError } from '../core/error.response.js'
import { removeUndefinedObject } from '../utils/index.js'

class OrderService {
	// Tạo đơn hàng mới với transaction
	static async createOrder(payload) {
		const { user_id, cart_item_ids, shipping_address, coupon_code } = payload

		if (!user_id || !cart_item_ids || !Array.isArray(cart_item_ids) || cart_item_ids.length === 0) {
			throw new BadRequestError('Thiếu thông tin bắt buộc: user_id và cart_item_ids')
		}

		if (!shipping_address) {
			throw new BadRequestError('Địa chỉ giao hàng là bắt buộc')
		}

		// Tạo session cho transaction
		const session = await mongoose.startSession()

		try {
			return await session.withTransaction(
				async () => {
					// 1. Lấy thông tin cart items từ database
					const cartItems = await CartItem.find({
						_id: { $in: cart_item_ids },
						cart_id: { $exists: true }
					})
						.populate('product_id')
						.session(session)

					if (cartItems.length !== cart_item_ids.length) {
						throw new BadRequestError('Một hoặc nhiều cart item không tồn tại')
					}

					// 2. Kiểm tra cart items thuộc về user
					const userCart = await Cart.findOne({ user_id }).session(session)
					if (!userCart) {
						throw new NotFoundError('Không tìm thấy giỏ hàng của người dùng')
					}

					const validCartItems = cartItems.filter(
						(item) => item.cart_id.toString() === userCart._id.toString()
					)

					if (validCartItems.length !== cartItems.length) {
						throw new BadRequestError('Một hoặc nhiều sản phẩm không thuộc về giỏ hàng của bạn')
					}

					// 3. Validate và cập nhật số lượng sản phẩm
					const orderProducts = []
					let totalAmount = 0

					for (const cartItem of validCartItems) {
						const product = cartItem.product_id

						if (!product) {
							throw new NotFoundError(`Sản phẩm trong cart item ${cartItem._id} không tồn tại`)
						}

						// Kiểm tra sản phẩm có còn active không (published và không phải draft)
						if (product.isDraft || !product.isPublish) {
							throw new BadRequestError(`Sản phẩm "${product.name}" hiện không khả dụng`)
						}

						// Kiểm tra số lượng trong kho
						if (product.quantity < cartItem.quantity) {
							throw new BadRequestError(
								`Sản phẩm "${product.name}" không đủ số lượng. Còn lại: ${product.quantity}, yêu cầu: ${cartItem.quantity}`
							)
						}

						// Cập nhật số lượng sản phẩm (trừ đi số lượng đã bán)
						await Product.findByIdAndUpdate(
							product._id,
							{
								$inc: {
									quantity: -cartItem.quantity,
									sold_count: cartItem.quantity
								}
							},
							{ session }
						)

						// Thêm vào danh sách sản phẩm của order
						orderProducts.push({
							product_id: product._id,
							product_name: product.name,
							product_price: product.price,
							quantity: cartItem.quantity,
							subtotal: product.price * cartItem.quantity
						})

						totalAmount += product.price * cartItem.quantity
					}

					// 4. Xử lý coupon nếu có
					let couponDiscount = 0
					let couponData = null

					if (coupon_code) {
						const coupon = await Coupon.findOne({
							code: coupon_code,
							is_active: true
						}).session(session)

						if (!coupon) {
							throw new NotFoundError('Mã giảm giá không tồn tại hoặc không còn hiệu lực')
						}

						const now = new Date()
						if (now < coupon.valid_from || now > coupon.valid_to) {
							throw new BadRequestError('Mã giảm giá không hợp lệ vào thời điểm hiện tại')
						}

						if (coupon.used_count >= coupon.usage_limit) {
							throw new BadRequestError('Mã giảm giá đã đạt giới hạn sử dụng')
						}

						// Kiểm tra điều kiện áp dụng
						if (totalAmount < coupon.min_order_value) {
							throw new BadRequestError(
								`Đơn hàng tối thiểu ${coupon.min_order_value.toLocaleString(
									'vi-VN'
								)}đ để sử dụng mã này`
							)
						}

						// Tính giảm giá
						if (coupon.discount_type === 'percentage') {
							couponDiscount = Math.min(
								(totalAmount * coupon.discount_value) / 100,
								coupon.max_discount_amount || Infinity
							)
						} else if (coupon.discount_type === 'fixed') {
							couponDiscount = Math.min(coupon.discount_value, totalAmount)
						}

						// Cập nhật số lần sử dụng coupon
						await Coupon.findByIdAndUpdate(coupon._id, { $inc: { used_count: 1 } }, { session })

						couponData = {
							coupon_id: coupon._id,
							coupon_code: coupon.code,
							discount_amount: couponDiscount,
							discount_type: coupon.discount_type,
							discount_value: coupon.discount_value
						}
					}

					// 5. Tạo mã đơn hàng unique
					const orderCode = await this.generateOrderCode()

					// 6. Tạo đơn hàng
					const finalAmount = totalAmount - couponDiscount

					const newOrder = await Order.create(
						[
							{
								order_code: orderCode,
								user_id,
								products: orderProducts,
								status: 'pending',
								order_date: new Date(),
								shipping_address,
								subtotal: totalAmount,
								discount_amount: couponDiscount,
								total_amount: finalAmount,
								coupon_data: couponData,
								created_at: new Date(),
								updated_at: new Date()
							}
						],
						{ session }
					)

					// 7. Xóa các cart items đã đặt hàng
					await CartItem.deleteMany(
						{
							_id: { $in: cart_item_ids }
						},
						{ session }
					)

					return newOrder[0]
				},
				{
					readConcern: { level: 'majority' },
					writeConcern: { w: 'majority' }
				}
			)
		} finally {
			await session.endSession()
		}
	}

	// Tạo mã đơn hàng unique
	static async generateOrderCode() {
		const now = new Date()
		const year = now.getFullYear()
		const month = String(now.getMonth() + 1).padStart(2, '0')
		const day = String(now.getDate()).padStart(2, '0')

		// Format: ORD-YYYYMMDD-XXXX (XXXX là số tự tăng trong ngày)
		const datePrefix = `ORD-${year}${month}${day}`

		// Tìm order cuối cùng trong ngày
		const startOfDay = new Date(year, now.getMonth(), now.getDate())
		const endOfDay = new Date(year, now.getMonth(), now.getDate() + 1)

		const lastOrder = await Order.findOne({
			order_code: { $regex: `^${datePrefix}` },
			created_at: { $gte: startOfDay, $lt: endOfDay }
		}).sort({ order_code: -1 })

		let sequence = 1
		if (lastOrder && lastOrder.order_code) {
			const lastSequence = parseInt(lastOrder.order_code.split('-')[2]) || 0
			sequence = lastSequence + 1
		}

		return `${datePrefix}-${String(sequence).padStart(4, '0')}`
	}

	// Lấy tất cả đơn hàng
	static async getAllOrders({ limit = 50, skip = 0, filter = {} }) {
		return await Order.find(filter)
			.populate('user_id', 'name email')
			.limit(limit)
			.skip(skip)
			.sort({ created_at: -1 })
			.lean()
	}

	// Lấy đơn hàng theo ID
	static async getOrderById(order_id) {
		if (!order_id) {
			throw new BadRequestError('Thiếu ID đơn hàng')
		}

		const order = await Order.findById(order_id).populate('user_id', 'name email phone').lean()

		if (!order) {
			throw new NotFoundError('Không tìm thấy đơn hàng')
		}

		return order
	}

	// Lấy đơn hàng theo mã đơn hàng
	static async getOrderByCode(order_code) {
		if (!order_code) {
			throw new BadRequestError('Thiếu mã đơn hàng')
		}

		const order = await Order.findOne({ order_code }).populate('user_id', 'name email phone').lean()

		if (!order) {
			throw new NotFoundError('Không tìm thấy đơn hàng')
		}

		return order
	}

	// Cập nhật trạng thái đơn hàng
	static async updateOrderStatus(order_id, status, note = '') {
		if (!order_id || !status) {
			throw new BadRequestError('Thiếu ID đơn hàng hoặc trạng thái')
		}

		const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']
		if (!validStatuses.includes(status)) {
			throw new BadRequestError('Trạng thái đơn hàng không hợp lệ')
		}

		const order = await Order.findById(order_id)
		if (!order) {
			throw new NotFoundError('Không tìm thấy đơn hàng')
		}

		// Kiểm tra logic chuyển trạng thái
		const currentStatus = order.status
		const validTransitions = {
			pending: ['confirmed', 'cancelled'],
			confirmed: ['processing', 'cancelled'],
			processing: ['shipped', 'cancelled'],
			shipped: ['delivered'],
			delivered: ['refunded'],
			cancelled: [],
			refunded: []
		}

		if (!validTransitions[currentStatus].includes(status)) {
			throw new BadRequestError(`Không thể chuyển từ trạng thái "${currentStatus}" sang "${status}"`)
		}

		// Nếu hủy đơn hàng, hoàn lại số lượng sản phẩm
		if (status === 'cancelled' && order.status !== 'cancelled') {
			const session = await mongoose.startSession()

			try {
				await session.withTransaction(async () => {
					// Hoàn lại số lượng sản phẩm
					for (const orderProduct of order.products) {
						await Product.findByIdAndUpdate(
							orderProduct.product_id,
							{
								$inc: {
									quantity: orderProduct.quantity,
									sold_count: -orderProduct.quantity
								}
							},
							{ session }
						)
					}

					// Hoàn lại coupon nếu có
					if (order.coupon_data && order.coupon_data.coupon_id) {
						await Coupon.findByIdAndUpdate(
							order.coupon_data.coupon_id,
							{ $inc: { used_count: -1 } },
							{ session }
						)
					}

					// Cập nhật trạng thái đơn hàng
					await Order.findByIdAndUpdate(
						order_id,
						{
							status,
							updated_at: new Date(),
							...(note && { cancel_reason: note }),
							...(status === 'delivered' && { actual_delivery_date: new Date() })
						},
						{ session }
					)
				})
			} finally {
				await session.endSession()
			}
		} else {
			// Cập nhật trạng thái bình thường
			const updateData = {
				status,
				updated_at: new Date()
			}

			// Thêm dữ liệu tùy theo trạng thái
			if (note) {
				if (status === 'cancelled') {
					updateData.cancel_reason = note
				} else {
					updateData.status_note = note
				}
			}

			if (status === 'delivered') {
				updateData.actual_delivery_date = new Date()
				updateData.payment_status = 'paid' // Tự động đánh dấu đã thanh toán khi giao hàng
			}

			await Order.findByIdAndUpdate(order_id, updateData)
		}

		return await this.getOrderById(order_id)
	}

	// Lấy đơn hàng theo người dùng
	static async getOrdersByUser({ user_id, limit = 50, skip = 0, status = null }) {
		if (!user_id) {
			throw new BadRequestError('Thiếu ID người dùng')
		}

		const filter = { user_id }
		if (status) {
			filter.status = status
		}

		const orders = await Order.find(filter).limit(limit).skip(skip).sort({ created_at: -1 }).lean()

		const total = await Order.countDocuments(filter)

		return {
			orders,
			pagination: {
				total,
				page: Math.floor(skip / limit) + 1,
				pages: Math.ceil(total / limit),
				limit
			}
		}
	}

	// Lấy thống kê đơn hàng theo trạng thái
	static async getOrderStats(user_id = null) {
		const matchStage = user_id ? { user_id: new mongoose.Types.ObjectId(user_id) } : {}

		const stats = await Order.aggregate([
			{ $match: matchStage },
			{
				$group: {
					_id: '$status',
					count: { $sum: 1 },
					total_amount: { $sum: '$total_amount' }
				}
			}
		])

		const totalOrders = await Order.countDocuments(matchStage)
		const totalRevenue = await Order.aggregate([
			{ $match: { ...matchStage, status: { $in: ['delivered', 'confirmed'] } } },
			{ $group: { _id: null, total: { $sum: '$total_amount' } } }
		])

		return {
			stats,
			summary: {
				total_orders: totalOrders,
				total_revenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0
			}
		}
	}

	// Cập nhật multiple orders status (bulk update)
	static async updateMultipleOrdersStatus(order_ids, status, note = '') {
		if (!order_ids || !Array.isArray(order_ids) || order_ids.length === 0) {
			throw new BadRequestError('Thiếu danh sách ID đơn hàng')
		}

		if (!status) {
			throw new BadRequestError('Thiếu trạng thái')
		}

		const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']
		if (!validStatuses.includes(status)) {
			throw new BadRequestError('Trạng thái đơn hàng không hợp lệ')
		}

		const results = []
		for (const order_id of order_ids) {
			try {
				const updatedOrder = await this.updateOrderStatus(order_id, status, note)
				results.push({
					order_id,
					success: true,
					order: updatedOrder
				})
			} catch (error) {
				results.push({
					order_id,
					success: false,
					error: error.message
				})
			}
		}

		return results
	}

	// Lấy lịch sử thay đổi trạng thái đơn hàng
	static async getOrderStatusHistory(order_id) {
		if (!order_id) {
			throw new BadRequestError('Thiếu ID đơn hàng')
		}

		const order = await Order.findById(order_id).lean()
		if (!order) {
			throw new NotFoundError('Không tìm thấy đơn hàng')
		}

		// Trả về thông tin trạng thái hiện tại và timestamps
		const statusHistory = [
			{
				status: 'pending',
				timestamp: order.created_at,
				note: 'Đơn hàng được tạo'
			}
		]

		// Nếu có status khác pending, thêm vào lịch sử
		if (order.status !== 'pending') {
			statusHistory.push({
				status: order.status,
				timestamp: order.updated_at,
				note: order.status_note || order.cancel_reason || 'Cập nhật trạng thái'
			})
		}

		return {
			order_id: order._id,
			order_code: order.order_code,
			current_status: order.status,
			history: statusHistory
		}
	}

	// Tìm kiếm đơn hàng
	static async searchOrders({ query, user_id = null, limit = 50, skip = 0 }) {
		const searchFilter = {
			$or: [
				{ order_code: { $regex: query, $options: 'i' } },
				{ 'products.product_name': { $regex: query, $options: 'i' } },
				{ 'shipping_address.full_name': { $regex: query, $options: 'i' } },
				{ 'shipping_address.phone': { $regex: query, $options: 'i' } }
			]
		}

		if (user_id) {
			searchFilter.user_id = user_id
		}

		const orders = await Order.find(searchFilter)
			.populate('user_id', 'name email phone')
			.limit(limit)
			.skip(skip)
			.sort({ created_at: -1 })
			.lean()

		const total = await Order.countDocuments(searchFilter)

		return {
			orders,
			pagination: {
				total,
				page: Math.floor(skip / limit) + 1,
				pages: Math.ceil(total / limit),
				limit
			}
		}
	}

	// Cập nhật thông tin giao hàng
	static async updateDeliveryInfo(order_id, deliveryData) {
		if (!order_id) {
			throw new BadRequestError('Thiếu ID đơn hàng')
		}

		const order = await Order.findById(order_id)
		if (!order) {
			throw new NotFoundError('Không tìm thấy đơn hàng')
		}

		const allowedFields = ['tracking_number', 'estimated_delivery_date', 'delivery_fee', 'notes']

		const updateData = removeUndefinedObject(
			Object.keys(deliveryData)
				.filter((key) => allowedFields.includes(key))
				.reduce((obj, key) => {
					obj[key] = deliveryData[key]
					return obj
				}, {})
		)

		if (Object.keys(updateData).length === 0) {
			throw new BadRequestError('Không có dữ liệu hợp lệ để cập nhật')
		}

		updateData.updated_at = new Date()

		await Order.findByIdAndUpdate(order_id, updateData)
		return await this.getOrderById(order_id)
	}

	// Cập nhật phương thức thanh toán
	static async updatePaymentInfo(order_id, paymentData) {
		if (!order_id) {
			throw new BadRequestError('Thiếu ID đơn hàng')
		}

		const order = await Order.findById(order_id)
		if (!order) {
			throw new NotFoundError('Không tìm thấy đơn hàng')
		}

		const allowedFields = ['payment_method', 'payment_status']
		const updateData = removeUndefinedObject(
			Object.keys(paymentData)
				.filter((key) => allowedFields.includes(key))
				.reduce((obj, key) => {
					obj[key] = paymentData[key]
					return obj
				}, {})
		)

		if (Object.keys(updateData).length === 0) {
			throw new BadRequestError('Không có dữ liệu hợp lệ để cập nhật')
		}

		updateData.updated_at = new Date()

		await Order.findByIdAndUpdate(order_id, updateData)
		return await this.getOrderById(order_id)
	}
}

export default OrderService
