'use strict'

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Tạo thư mục logs nếu chưa tồn tại
const logsDir = path.join(__dirname, '../logs')
if (!fs.existsSync(logsDir)) {
	fs.mkdirSync(logsDir, { recursive: true })
}

// Log order status changes
export const logOrderStatusChange = (req, res, next) => {
	const originalSend = res.send
	const startTime = Date.now()

	res.send = function (data) {
		const endTime = Date.now()
		const duration = endTime - startTime

		// Only log for order status update endpoints
		if (req.route && req.route.path.includes('status')) {
			const logData = {
				timestamp: new Date().toISOString(),
				method: req.method,
				url: req.originalUrl,
				orderId: req.params.orderId || req.body.order_ids,
				status: req.body.status,
				note: req.body.note,
				user: {
					id: req.user?._id,
					role: req.user?.role,
					email: req.user?.email
				},
				ip: req.ip || req.connection.remoteAddress,
				userAgent: req.get('User-Agent'),
				statusCode: res.statusCode,
				duration: `${duration}ms`,
				success: res.statusCode >= 200 && res.statusCode < 300
			}

			// Write to daily log file
			const today = new Date().toISOString().split('T')[0]
			const logFile = path.join(logsDir, `order-status-${today}.log`)
			const logLine = JSON.stringify(logData) + '\n'

			fs.appendFile(logFile, logLine, (err) => {
				if (err) {
					console.error('Error writing to log file:', err)
				}
			})

			// Also log to console in development
			if (process.env.NODE_ENV === 'development') {
				console.log('📝 Order Status Change Log:', logData)
			}
		}

		return originalSend.call(this, data)
	}

	next()
}

// Log order creation
export const logOrderCreation = (req, res, next) => {
	const originalSend = res.send
	const startTime = Date.now()

	res.send = function (data) {
		const endTime = Date.now()
		const duration = endTime - startTime

		// Only log for order creation endpoint
		if (req.method === 'POST' && req.route && req.route.path === '/') {
			try {
				const responseData = JSON.parse(data)
				const order = responseData?.metadata

				const logData = {
					timestamp: new Date().toISOString(),
					action: 'ORDER_CREATED',
					orderId: order?._id,
					orderCode: order?.order_code,
					user: {
						id: req.user?._id,
						email: req.user?.email
					},
					orderValue: order?.total_amount,
					productCount: order?.products?.length,
					couponUsed: !!order?.coupon_data,
					ip: req.ip || req.connection.remoteAddress,
					userAgent: req.get('User-Agent'),
					statusCode: res.statusCode,
					duration: `${duration}ms`,
					success: res.statusCode >= 200 && res.statusCode < 300
				}

				// Write to daily log file
				const today = new Date().toISOString().split('T')[0]
				const logFile = path.join(logsDir, `order-creation-${today}.log`)
				const logLine = JSON.stringify(logData) + '\n'

				fs.appendFile(logFile, logLine, (err) => {
					if (err) {
						console.error('Error writing to log file:', err)
					}
				})

				// Also log to console in development
				if (process.env.NODE_ENV === 'development') {
					console.log('📦 Order Creation Log:', logData)
				}
			} catch (error) {
				console.error('Error parsing response data for logging:', error)
			}
		}

		return originalSend.call(this, data)
	}

	next()
}

// General order activity logger
export const logOrderActivity = (action) => {
	return (req, res, next) => {
		const originalSend = res.send
		const startTime = Date.now()

		res.send = function (data) {
			const endTime = Date.now()
			const duration = endTime - startTime

			const logData = {
				timestamp: new Date().toISOString(),
				action,
				method: req.method,
				url: req.originalUrl,
				params: req.params,
				query: req.query,
				user: {
					id: req.user?._id,
					role: req.user?.role,
					email: req.user?.email
				},
				ip: req.ip || req.connection.remoteAddress,
				statusCode: res.statusCode,
				duration: `${duration}ms`,
				success: res.statusCode >= 200 && res.statusCode < 300
			}

			// Write to daily log file
			const today = new Date().toISOString().split('T')[0]
			const logFile = path.join(logsDir, `order-activity-${today}.log`)
			const logLine = JSON.stringify(logData) + '\n'

			fs.appendFile(logFile, logLine, (err) => {
				if (err) {
					console.error('Error writing to log file:', err)
				}
			})

			return originalSend.call(this, data)
		}

		next()
	}
}

// Utility function to read logs
export const readOrderLogs = (date = null, type = 'all') => {
	const targetDate = date || new Date().toISOString().split('T')[0]
	const logs = []

	const logTypes = type === 'all' ? ['order-status', 'order-creation', 'order-activity'] : [type]

	for (const logType of logTypes) {
		const logFile = path.join(logsDir, `${logType}-${targetDate}.log`)

		if (fs.existsSync(logFile)) {
			const content = fs.readFileSync(logFile, 'utf8')
			const lines = content
				.split('\n')
				.filter((line) => line.trim())
				.map((line) => {
					try {
						return JSON.parse(line)
					} catch (error) {
						return null
					}
				})
				.filter(Boolean)

			logs.push(...lines)
		}
	}

	return logs.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
}

export default {
	logOrderStatusChange,
	logOrderCreation,
	logOrderActivity,
	readOrderLogs
}
