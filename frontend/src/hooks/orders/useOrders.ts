import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as orderService from '@/services/orders/orders'
import type {
	ISearchOrdersParams,
	IUpdateOrderStatusParams,
	IUpdateDeliveryInfoParams,
	IUpdatePaymentInfoParams,
	OrderStatus
} from '@/types/orders'

// ============ QUERY HOOKS ============

/**
 * Hook to get the current user's orders.
 * @param params Optional parameters for pagination and filtering by status.
 * @param enabled Whether the query should run.
 */
export const useGetMyOrders = (
	params?: {
		limit?: number
		skip?: number
		status?: OrderStatus
	},
	enabled = true
) => {
	return useQuery({
		// A more descriptive key for the current user's orders.
		queryKey: ['orders', 'list', 'my-orders', params],
		queryFn: () => orderService.getMyOrders(params),
		enabled,
		select: (data) => data.metadata
	})
}

/**
 * Hook to get a single order by its ID.
 * @param orderId The ID of the order.
 * @param enabled Whether the query should run.
 */
export const useGetOrderById = (orderId: string, enabled = true) => {
	return useQuery({
		// Use a consistent structure: ['entity', 'type', 'id']
		queryKey: ['orders', 'detail', orderId],
		queryFn: () => orderService.getOrderById(orderId),
		enabled: enabled && !!orderId,
		select: (data) => data.metadata
	})
}

/**
 * Hook to get a single order by its unique code.
 * @param orderCode The unique code of the order.
 * @param enabled Whether the query should run.
 */
export const useGetOrderByCode = (orderCode: string, enabled = true) => {
	return useQuery({
		// Differentiate by using 'code' as a key part.
		queryKey: ['orders', 'detail', 'code', orderCode],
		queryFn: () => orderService.getOrderByCode(orderCode),
		enabled: enabled && !!orderCode,
		select: (data) => data.metadata
	})
}

/**
 * Hook to search for orders.
 * @param params Search parameters.
 * @param enabled Whether the query should run.
 */
export const useSearchOrders = (params: ISearchOrdersParams, enabled = true) => {
	return useQuery({
		// A clear key for search results with specific parameters.
		queryKey: ['orders', 'search', params],
		queryFn: () => orderService.searchOrders(params),
		enabled: enabled && !!params.q && params.q.length >= 2,
		select: (data) => data.metadata
	})
}

/**
 * Hook to get order statistics.
 * @param userId Optional user ID for user-specific stats.
 * @param enabled Whether the query should run.
 */
export const useGetOrderStats = (userId?: string, enabled = true) => {
	return useQuery({
		// Conditional key to handle user-specific vs. global stats.
		queryKey: ['orders', 'stats', userId || 'global'],
		queryFn: () => orderService.getOrderStats(userId),
		select: (data) => data.metadata,
		enabled
	})
}

/**
 * Hook to get the status history for a specific order.
 * @param orderId The ID of the order.
 * @param enabled Whether the query should run.
 */
export const useGetOrderStatusHistory = (orderId: string, enabled = true) => {
	return useQuery({
		// Nested key to clearly indicate this is a sub-resource of an order.
		queryKey: ['orders', 'detail', orderId, 'history'],
		queryFn: () => orderService.getOrderStatusHistory(orderId),
		enabled: enabled && !!orderId,
		select: (data) => data.metadata
	})
}

// =============== ADMIN QUERY HOOKS ===============

/**
 * Hook to get all orders (Admin).
 */
export const useGetAllOrders = () => {
	return useQuery({
		// More specific key to avoid conflicts with other 'orders' queries.
		queryKey: ['orders', 'list', 'all'],
		queryFn: () => orderService.getAllOrders(),
		select: (data) => ({ orders: data.metadata, total: data.metadata.length })
	})
}

/**
 * Hook to get orders for a specific user (Admin).
 * @param userId The ID of the user.
 * @param params Optional parameters for pagination and filtering.
 * @param enabled Whether the query should run.
 */
export const useGetOrdersByUser = (
	userId: string,
	params?: { limit?: number; skip?: number; status?: OrderStatus },
	enabled = true
) => {
	return useQuery({
		// Clear key for a user's orders, distinct from the current user's orders.
		queryKey: ['orders', 'list', 'by-user', userId, params],
		queryFn: () => orderService.getOrdersByUser(userId, params),
		enabled: enabled && !!userId,
		select: (data) => data.metadata
	})
}

// ============ MUTATION HOOKS ============

/**
 * Hook to create a new order.
 */
export const useCreateOrder = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: orderService.createOrder,
		onSuccess: (data) => {
			// Invalidate queries that might be affected.
			// Using `queryKey: ['orders', 'list']` will invalidate all order lists.
			queryClient.invalidateQueries({ queryKey: ['orders', 'list'] })
			queryClient.invalidateQueries({ queryKey: ['orders', 'stats'] })
			queryClient.invalidateQueries({ queryKey: ['cart'] })
			return data.metadata
		}
	})
}

/**
 * Hook to update an order's status (Admin).
 */
export const useUpdateOrderStatus = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ orderId, params }: { orderId: string; params: IUpdateOrderStatusParams }) =>
			orderService.updateOrderStatus(orderId, params),
		onSuccess: (data, variables) => {
			// Invalidate the specific order detail and all order lists.
			queryClient.invalidateQueries({ queryKey: ['orders', 'detail', variables.orderId] })
			queryClient.invalidateQueries({ queryKey: ['orders', 'list'] })
			// Invalidate order stats as status change affects stats.
			queryClient.invalidateQueries({ queryKey: ['orders', 'stats'] })
			// Invalidate history to show new status.
			queryClient.invalidateQueries({ queryKey: ['orders', 'detail', variables.orderId, 'history'] })

			return data.metadata
		}
	})
}

/**
 * Hook to update an order's delivery info (Admin).
 */
export const useUpdateDeliveryInfo = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ orderId, params }: { orderId: string; params: IUpdateDeliveryInfoParams }) =>
			orderService.updateDeliveryInfo(orderId, params),
		onSuccess: (data, variables) => {
			// Invalidate the specific order detail and relevant lists.
			queryClient.invalidateQueries({ queryKey: ['orders', 'detail', variables.orderId] })
			queryClient.invalidateQueries({ queryKey: ['orders', 'list'] })
			return data.metadata
		}
	})
}

/**
 * Hook to update an order's payment info (Admin).
 */
export const useUpdatePaymentInfo = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ orderId, params }: { orderId: string; params: IUpdatePaymentInfoParams }) =>
			orderService.updatePaymentInfo(orderId, params),
		onSuccess: (data, variables) => {
			// Invalidate the specific order detail and relevant lists.
			queryClient.invalidateQueries({ queryKey: ['orders', 'detail', variables.orderId] })
			queryClient.invalidateQueries({ queryKey: ['orders', 'list'] })
			return data.metadata
		}
	})
}

/**
 * Hook to update the status of multiple orders (Admin).
 */
export const useUpdateMultipleOrdersStatus = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: orderService.updateMultipleOrdersStatus,
		onSuccess: () => {
			// Invalidate all order lists as multiple orders are affected.
			queryClient.invalidateQueries({ queryKey: ['orders', 'list'] })
			// Invalidate order stats.
			queryClient.invalidateQueries({ queryKey: ['orders', 'stats'] })
		}
	})
}

/**
 * Hook to export orders (Admin).
 */
export const useExportOrders = () => {
	return useMutation({
		mutationFn: orderService.exportOrders,
		onSuccess: (data) => {
			return data.metadata
		}
	})
}

/**
 * Hook to generate an order report (Admin).
 */
export const useGenerateOrderReport = () => {
	return useMutation({
		mutationFn: orderService.generateOrderReport,
		onSuccess: (data) => {
			return data.metadata
		}
	})
}
