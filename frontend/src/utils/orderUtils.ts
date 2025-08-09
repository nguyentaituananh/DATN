import type { OrderStatus, PaymentStatus } from '@/types/orders'

export const OrderUtils = {
	// Get status text in Vietnamese
	getStatusText: (status: OrderStatus): string => {
		const statusMap: Record<OrderStatus, string> = {
			pending: 'Chờ xác nhận',
			confirmed: 'Đã xác nhận',
			processing: 'Đang xử lý',
			shipped: 'Đã gửi hàng',
			delivered: 'Đã giao hàng',
			cancelled: 'Đã hủy',
			refunded: 'Đã hoàn tiền'
		}
		return statusMap[status] || status
	},

	// Get payment status text in Vietnamese
	getPaymentStatusText: (status: PaymentStatus): string => {
		const statusMap: Record<PaymentStatus, string> = {
			pending: 'Chờ thanh toán',
			paid: 'Đã thanh toán',
			failed: 'Thanh toán thất bại',
			refunded: 'Đã hoàn tiền'
		}
		return statusMap[status] || status
	},

	// Get status color for UI
	getStatusColor: (status: OrderStatus): string => {
		const colorMap: Record<OrderStatus, string> = {
			pending: 'bg-yellow-100 text-yellow-800',
			confirmed: 'bg-blue-100 text-blue-800',
			processing: 'bg-purple-100 text-purple-800',
			shipped: 'bg-indigo-100 text-indigo-800',
			delivered: 'bg-green-100 text-green-800',
			cancelled: 'bg-red-100 text-red-800',
			refunded: 'bg-gray-100 text-gray-800'
		}
		return colorMap[status] || 'bg-gray-100 text-gray-800'
	},

	// Get payment status color for UI
	getPaymentStatusColor: (status: PaymentStatus): string => {
		const colorMap: Record<PaymentStatus, string> = {
			pending: 'bg-yellow-100 text-yellow-800',
			paid: 'bg-green-100 text-green-800',
			failed: 'bg-red-100 text-red-800',
			refunded: 'bg-blue-100 text-blue-800'
		}
		return colorMap[status] || 'bg-gray-100 text-gray-800'
	},

	// Check if order can be cancelled
	canBeCancelled: (status: OrderStatus): boolean => {
		return ['pending', 'confirmed'].includes(status)
	},

	// Check if order can be refunded
	canBeRefunded: (status: OrderStatus, paymentStatus: PaymentStatus): boolean => {
		return status === 'delivered' && paymentStatus === 'paid'
	},

	// Get next possible statuses for admin
	getNextStatuses: (currentStatus: OrderStatus): OrderStatus[] => {
		const statusTransitions: Record<OrderStatus, OrderStatus[]> = {
			pending: ['confirmed', 'cancelled'],
			confirmed: ['processing', 'cancelled'],
			processing: ['shipped', 'cancelled'],
			shipped: ['delivered'],
			delivered: ['refunded'],
			cancelled: [],
			refunded: []
		}
		return statusTransitions[currentStatus] || []
	},

	// Format order amount
	formatAmount: (amount: number): string => {
		return new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND'
		}).format(amount)
	},

	// Format order date
	formatDate: (dateString: string): string => {
		return new Date(dateString).toLocaleDateString('vi-VN', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit'
		})
	},

	// Calculate order progress percentage
	getProgressPercentage: (status: OrderStatus): number => {
		const progressMap: Record<OrderStatus, number> = {
			pending: 0,
			confirmed: 25,
			processing: 50,
			shipped: 75,
			delivered: 100,
			cancelled: 0,
			refunded: 0
		}
		return progressMap[status] || 0
	},

	// Get status icon
	getStatusIcon: (status: OrderStatus): string => {
		const iconMap: Record<OrderStatus, string> = {
			pending: '⏳',
			confirmed: '✅',
			processing: '⚙️',
			shipped: '🚚',
			delivered: '📦',
			cancelled: '❌',
			refunded: '💰'
		}
		return iconMap[status] || '📋'
	}
}
