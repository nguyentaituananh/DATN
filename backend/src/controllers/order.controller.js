import OrderService from '../services/order.service.js'
import { OK, CREATED } from '../core/success.response.js'
import asyncHandler from '../helpers/asyncHandler.js'

class OrderController {
	// Tạo đơn hàng mới
	createOrder = asyncHandler(async (req, res) => {
		const { cart_item_ids, shipping_address, coupon_code } = req.body
		const user_id = req.user._id // Lấy từ middleware authentication

		const newOrder = await OrderService.createOrder({
			user_id,
			cart_item_ids,
			shipping_address,
			coupon_code
		})

		new CREATED({
			message: 'Tạo đơn hàng thành công',
			metadata: newOrder
		}).send(res)
	})

	// Lấy đơn hàng theo mã đơn hàng
	getOrderByCode = asyncHandler(async (req, res) => {
		const { orderCode } = req.params
		const order = await OrderService.getOrderByCode(orderCode)

		new OK({
			message: 'Lấy thông tin đơn hàng thành công',
			metadata: order
		}).send(res)
	})

	// Cập nhật trạng thái đơn hàng
	updateOrderStatus = asyncHandler(async (req, res) => {
		const { orderId } = req.params
		const { status, note } = req.body

		const updatedOrder = await OrderService.updateOrderStatus(orderId, status, note)

		new OK({
			message: 'Cập nhật trạng thái đơn hàng thành công',
			metadata: updatedOrder
		}).send(res)
	})

	// Lấy đơn hàng của user hiện tại
	getMyOrders = asyncHandler(async (req, res) => {
		const user_id = req.user._id
		const { limit = 50, skip = 0, status } = req.query

		const orders = await OrderService.getOrdersByUser({
			user_id,
			limit: parseInt(limit),
			skip: parseInt(skip),
			status
		})

		new OK({
			message: 'Lấy danh sách đơn hàng của tôi thành công',
			metadata: orders
		}).send(res)
	})

	// Lấy tất cả đơn hàng
	getAllOrders = asyncHandler(async (req, res) => {
		const { limit = 50, skip = 0 } = req.query
		const orders = await OrderService.getAllOrders({
			limit: parseInt(limit),
			skip: parseInt(skip)
		})

		new OK({
			message: 'Lấy danh sách đơn hàng thành công',
			metadata: orders
		}).send(res)
	})

	// Lấy đơn hàng theo ID
	getOrderById = asyncHandler(async (req, res) => {
		const { orderId } = req.params
		const order = await OrderService.getOrderById(orderId)

		new OK({
			message: 'Lấy thông tin đơn hàng thành công',
			metadata: order
		}).send(res)
	})

	// Lấy đơn hàng theo mã đơn hàng
	getOrderByCode = asyncHandler(async (req, res) => {
		const { orderCode } = req.params
		const order = await OrderService.getOrderByCode(orderCode)

		new OK({
			message: 'Lấy thông tin đơn hàng thành công',
			metadata: order
		}).send(res)
	})

	// Cập nhật đơn hàng
	updateOrder = asyncHandler(async (req, res) => {
		const { orderId } = req.params
		const updatedOrder = await OrderService.updateOrder(orderId, req.body)

		new OK({
			message: 'Cập nhật đơn hàng thành công',
			metadata: updatedOrder
		}).send(res)
	})

	// Xóa đơn hàng
	deleteOrder = asyncHandler(async (req, res) => {
		const { orderId } = req.params
		const result = await OrderService.deleteOrder(orderId)

		new OK({
			message: 'Xóa đơn hàng thành công',
			metadata: result
		}).send(res)
	})

	// Lấy đơn hàng theo người dùng
	getOrdersByUser = asyncHandler(async (req, res) => {
		const { userId } = req.params
		const { limit = 50, skip = 0, status } = req.query
		const orders = await OrderService.getOrdersByUser({
			user_id: userId,
			limit: parseInt(limit),
			skip: parseInt(skip),
			status
		})

		new OK({
			message: 'Lấy danh sách đơn hàng của người dùng thành công',
			metadata: orders
		}).send(res)
	})

	// Lấy thống kê đơn hàng
	getOrderStats = asyncHandler(async (req, res) => {
		const { userId } = req.query
		const stats = await OrderService.getOrderStats(userId)

		new OK({
			message: 'Lấy thống kê đơn hàng thành công',
			metadata: stats
		}).send(res)
	})

	// Cập nhật trạng thái nhiều đơn hàng
	updateMultipleOrdersStatus = asyncHandler(async (req, res) => {
		const { order_ids, status, note } = req.body
		const results = await OrderService.updateMultipleOrdersStatus(order_ids, status, note)

		new OK({
			message: 'Cập nhật trạng thái đơn hàng thành công',
			metadata: results
		}).send(res)
	})

	// Lấy lịch sử thay đổi trạng thái đơn hàng
	getOrderStatusHistory = asyncHandler(async (req, res) => {
		const { orderId } = req.params
		const history = await OrderService.getOrderStatusHistory(orderId)

		new OK({
			message: 'Lấy lịch sử trạng thái đơn hàng thành công',
			metadata: history
		}).send(res)
	})

	// Tìm kiếm đơn hàng
	searchOrders = asyncHandler(async (req, res) => {
		const { q: query, limit = 50, skip = 0 } = req.query
		const user_id = req.user?.role === 'admin' ? null : req.user._id

		if (!query || query.trim().length < 2) {
			throw new BadRequestError('Từ khóa tìm kiếm phải có ít nhất 2 ký tự')
		}

		const results = await OrderService.searchOrders({
			query: query.trim(),
			user_id,
			limit: parseInt(limit),
			skip: parseInt(skip)
		})

		new OK({
			message: 'Tìm kiếm đơn hàng thành công',
			metadata: results
		}).send(res)
	})

	// Cập nhật thông tin giao hàng
	updateDeliveryInfo = asyncHandler(async (req, res) => {
		const { orderId } = req.params
		const updatedOrder = await OrderService.updateDeliveryInfo(orderId, req.body)

		new OK({
			message: 'Cập nhật thông tin giao hàng thành công',
			metadata: updatedOrder
		}).send(res)
	})

	// Cập nhật thông tin thanh toán
	updatePaymentInfo = asyncHandler(async (req, res) => {
		const { orderId } = req.params
		const updatedOrder = await OrderService.updatePaymentInfo(orderId, req.body)

		new OK({
			message: 'Cập nhật thông tin thanh toán thành công',
			metadata: updatedOrder
		}).send(res)
	})

	// Export đơn hàng
	exportOrders = asyncHandler(async (req, res) => {
		const { format = 'csv', start_date, end_date, status } = req.query
		const OrderExportUtil = (await import('../utils/orderExport.js')).default

		// Build filters
		const filters = {}
		if (start_date || end_date) {
			filters.created_at = {}
			if (start_date) filters.created_at.$gte = new Date(start_date)
			if (end_date) filters.created_at.$lte = new Date(end_date)
		}
		if (status) filters.status = status

		let result
		if (format === 'json') {
			result = await OrderExportUtil.exportToJSON(filters)
		} else {
			result = await OrderExportUtil.exportToCSV(filters)
		}

		new OK({
			message: 'Xuất dữ liệu đơn hàng thành công',
			metadata: result
		}).send(res)
	})

	// Tạo báo cáo đơn hàng
	generateOrderReport = asyncHandler(async (req, res) => {
		const { start_date, end_date } = req.query
		const OrderExportUtil = (await import('../utils/orderExport.js')).default

		const report = await OrderExportUtil.generateReport(start_date, end_date)

		new OK({
			message: 'Tạo báo cáo đơn hàng thành công',
			metadata: report
		}).send(res)
	})
}

export default new OrderController()
