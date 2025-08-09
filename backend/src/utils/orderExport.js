'use strict'

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import Order from '../models/order.model.js'
import { BadRequestError } from '../core/error.response.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class OrderExportUtil {
	// Export orders to CSV
	static async exportToCSV(filters = {}, filePath = null) {
		try {
			const orders = await Order.find(filters)
				.populate('user_id', 'name email phone')
				.sort({ created_at: -1 })
				.lean()

			if (orders.length === 0) {
				throw new BadRequestError('Không có đơn hàng nào để xuất')
			}

			// CSV Headers
			const headers = [
				'Mã đơn hàng',
				'Tên khách hàng',
				'Email',
				'Số điện thoại',
				'Trạng thái',
				'Trạng thái thanh toán',
				'Ngày đặt',
				'Tổng tiền',
				'Giảm giá',
				'Thành tiền',
				'Số sản phẩm',
				'Địa chỉ giao hàng',
				'Mã vận đơn',
				'Ghi chú'
			]

			// Convert orders to CSV rows
			const csvRows = orders.map((order) => [
				order.order_code,
				order.user_id?.name || 'N/A',
				order.user_id?.email || 'N/A',
				order.user_id?.phone || 'N/A',
				OrderExportUtil.getStatusText(order.status),
				OrderExportUtil.getPaymentStatusText(order.payment_status),
				new Date(order.order_date).toLocaleDateString('vi-VN'),
				order.subtotal.toLocaleString('vi-VN'),
				order.discount_amount.toLocaleString('vi-VN'),
				order.total_amount.toLocaleString('vi-VN'),
				order.products.reduce((sum, p) => sum + p.quantity, 0),
				order.shipping_address,
				order.tracking_number || 'N/A',
				order.notes || 'N/A'
			])

			// Combine headers and rows
			const csvContent = [headers, ...csvRows].map((row) => row.map((field) => `"${field}"`).join(',')).join('\n')

			// Write to file
			const outputPath = filePath || path.join(__dirname, '../exports', `orders_${Date.now()}.csv`)

			// Ensure exports directory exists
			const exportDir = path.dirname(outputPath)
			if (!fs.existsSync(exportDir)) {
				fs.mkdirSync(exportDir, { recursive: true })
			}

			fs.writeFileSync(outputPath, '\uFEFF' + csvContent, 'utf8') // Add BOM for UTF-8

			return {
				filePath: outputPath,
				recordCount: orders.length,
				fileSize: fs.statSync(outputPath).size
			}
		} catch (error) {
			throw new Error(`Lỗi khi xuất CSV: ${error.message}`)
		}
	}

	// Export orders to JSON
	static async exportToJSON(filters = {}, filePath = null) {
		try {
			const orders = await Order.find(filters)
				.populate('user_id', 'name email phone')
				.sort({ created_at: -1 })
				.lean()

			if (orders.length === 0) {
				throw new BadRequestError('Không có đơn hàng nào để xuất')
			}

			const exportData = {
				exported_at: new Date().toISOString(),
				filters,
				total_records: orders.length,
				orders: orders.map((order) => ({
					...order,
					status_text: OrderExportUtil.getStatusText(order.status),
					payment_status_text: OrderExportUtil.getPaymentStatusText(order.payment_status),
					formatted_dates: {
						order_date: new Date(order.order_date).toLocaleDateString('vi-VN'),
						created_at: new Date(order.created_at).toLocaleDateString('vi-VN'),
						updated_at: new Date(order.updated_at).toLocaleDateString('vi-VN')
					}
				}))
			}

			const outputPath = filePath || path.join(__dirname, '../exports', `orders_${Date.now()}.json`)

			// Ensure exports directory exists
			const exportDir = path.dirname(outputPath)
			if (!fs.existsSync(exportDir)) {
				fs.mkdirSync(exportDir, { recursive: true })
			}

			fs.writeFileSync(outputPath, JSON.stringify(exportData, null, 2), 'utf8')

			return {
				filePath: outputPath,
				recordCount: orders.length,
				fileSize: fs.statSync(outputPath).size
			}
		} catch (error) {
			throw new Error(`Lỗi khi xuất JSON: ${error.message}`)
		}
	}

	// Generate order report
	static async generateReport(startDate, endDate) {
		try {
			const dateFilter = {}
			if (startDate) dateFilter.$gte = new Date(startDate)
			if (endDate) dateFilter.$lte = new Date(endDate)

			const matchStage = Object.keys(dateFilter).length > 0 ? { created_at: dateFilter } : {}

			// Aggregate statistics
			const stats = await Order.aggregate([
				{ $match: matchStage },
				{
					$group: {
						_id: null,
						total_orders: { $sum: 1 },
						total_revenue: { $sum: '$total_amount' },
						total_discount: { $sum: '$discount_amount' },
						avg_order_value: { $avg: '$total_amount' }
					}
				}
			])

			// Status breakdown
			const statusBreakdown = await Order.aggregate([
				{ $match: matchStage },
				{
					$group: {
						_id: '$status',
						count: { $sum: 1 },
						total_amount: { $sum: '$total_amount' }
					}
				}
			])

			// Daily sales
			const dailySales = await Order.aggregate([
				{ $match: matchStage },
				{
					$group: {
						_id: {
							$dateToString: { format: '%Y-%m-%d', date: '$created_at' }
						},
						orders: { $sum: 1 },
						revenue: { $sum: '$total_amount' }
					}
				},
				{ $sort: { _id: 1 } }
			])

			// Top products
			const topProducts = await Order.aggregate([
				{ $match: matchStage },
				{ $unwind: '$products' },
				{
					$group: {
						_id: '$products.product_name',
						total_quantity: { $sum: '$products.quantity' },
						total_revenue: { $sum: '$products.subtotal' },
						order_count: { $sum: 1 }
					}
				},
				{ $sort: { total_quantity: -1 } },
				{ $limit: 10 }
			])

			const report = {
				period: {
					start_date: startDate || 'All time',
					end_date: endDate || 'Present'
				},
				generated_at: new Date().toISOString(),
				summary: stats[0] || {
					total_orders: 0,
					total_revenue: 0,
					total_discount: 0,
					avg_order_value: 0
				},
				status_breakdown: statusBreakdown.map((item) => ({
					status: item._id,
					status_text: OrderExportUtil.getStatusText(item._id),
					count: item.count,
					total_amount: item.total_amount,
					percentage: stats[0] ? ((item.count / stats[0].total_orders) * 100).toFixed(2) + '%' : '0%'
				})),
				daily_sales: dailySales,
				top_products: topProducts
			}

			return report
		} catch (error) {
			throw new Error(`Lỗi khi tạo báo cáo: ${error.message}`)
		}
	}

	// Helper methods
	static getStatusText(status) {
		const statusMap = {
			pending: 'Chờ xác nhận',
			confirmed: 'Đã xác nhận',
			processing: 'Đang xử lý',
			shipped: 'Đã gửi hàng',
			delivered: 'Đã giao hàng',
			cancelled: 'Đã hủy',
			refunded: 'Đã hoàn tiền'
		}
		return statusMap[status] || status
	}

	static getPaymentStatusText(status) {
		const statusMap = {
			pending: 'Chờ thanh toán',
			paid: 'Đã thanh toán',
			failed: 'Thanh toán thất bại',
			refunded: 'Đã hoàn tiền'
		}
		return statusMap[status] || status
	}
}

export default OrderExportUtil
