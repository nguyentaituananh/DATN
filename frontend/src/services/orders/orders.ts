import axiosClient from '@/configs/axios'
import type { IResponseData } from '@/types'
import type {
	IOrder,
	IOrdersResponse,
	IOrderStats,
	IOrderStatusHistory,
	ISearchOrdersParams,
	IUpdateOrderStatusParams,
	IUpdateDeliveryInfoParams,
	IUpdatePaymentInfoParams,
	IBulkUpdateStatusParams,
	ICreateOrderPayload,
	IExportOrdersParams,
	IGenerateReportParams,
	IExportOrdersResponse,
	IOrderReport,
	OrderStatus
} from '@/types/orders'

// =============== PUBLIC API ENDPOINTS ===============

// Lấy đơn hàng theo mã đơn hàng (Public)
export const getOrderByCode = async (orderCode: string): Promise<IResponseData<IOrder>> => {
	return axiosClient.get(`/orders/code/${orderCode}`)
}

// =============== USER API ENDPOINTS ===============

// Lấy đơn hàng của tôi
export const getMyOrders = async (params?: {
	limit?: number
	skip?: number
	status?: OrderStatus
}): Promise<IResponseData<IOrdersResponse>> => {
	const searchParams = new URLSearchParams()
	if (params?.limit) searchParams.append('limit', params.limit.toString())
	if (params?.skip) searchParams.append('skip', params.skip.toString())
	if (params?.status) searchParams.append('status', params.status)

	const query = searchParams.toString()
	return axiosClient.get(`/orders/my-orders${query ? `?${query}` : ''}`)
}

// Tìm kiếm đơn hàng
export const searchOrders = async (params: ISearchOrdersParams): Promise<IResponseData<IOrdersResponse>> => {
	const searchParams = new URLSearchParams()
	searchParams.append('q', params.q)
	if (params.limit) searchParams.append('limit', params.limit.toString())
	if (params.skip) searchParams.append('skip', params.skip.toString())

	return axiosClient.get(`/orders/search?${searchParams.toString()}`)
}

// Lấy thống kê đơn hàng
export const getOrderStats = async (userId?: string): Promise<IResponseData<IOrderStats>> => {
	const query = userId ? `?userId=${userId}` : ''
	return axiosClient.get(`/orders/stats${query}`)
}

// Lấy đơn hàng theo ID
export const getOrderById = async (orderId: string): Promise<IResponseData<IOrder>> => {
	return axiosClient.get(`/orders/${orderId}`)
}

// Lấy lịch sử trạng thái đơn hàng
export const getOrderStatusHistory = async (orderId: string): Promise<IResponseData<IOrderStatusHistory>> => {
	return axiosClient.get(`/orders/${orderId}/history`)
}

// Tạo đơn hàng mới
export const createOrder = async (orderData: ICreateOrderPayload): Promise<IResponseData<IOrder>> => {
	return axiosClient.post('/orders', orderData)
}

// =============== ADMIN API ENDPOINTS ===============

// Xuất dữ liệu đơn hàng (Admin)
export const exportOrders = async (params?: IExportOrdersParams): Promise<IResponseData<IExportOrdersResponse>> => {
	const searchParams = new URLSearchParams()
	if (params?.format) searchParams.append('format', params.format)
	if (params?.start_date) searchParams.append('start_date', params.start_date)
	if (params?.end_date) searchParams.append('end_date', params.end_date)
	if (params?.status) searchParams.append('status', params.status)

	const query = searchParams.toString()
	return axiosClient.get(`/orders/export${query ? `?${query}` : ''}`)
}

// Tạo báo cáo đơn hàng (Admin)
export const generateOrderReport = async (params?: IGenerateReportParams): Promise<IResponseData<IOrderReport>> => {
	const searchParams = new URLSearchParams()
	if (params?.start_date) searchParams.append('start_date', params.start_date)
	if (params?.end_date) searchParams.append('end_date', params.end_date)

	const query = searchParams.toString()
	return axiosClient.get(`/orders/report${query ? `?${query}` : ''}`)
}

// Lấy đơn hàng theo user (Admin)
export const getOrdersByUser = async (
	userId: string,
	params?: { limit?: number; skip?: number; status?: OrderStatus }
): Promise<IResponseData<IOrdersResponse>> => {
	const searchParams = new URLSearchParams()
	if (params?.limit) searchParams.append('limit', params.limit.toString())
	if (params?.skip) searchParams.append('skip', params.skip.toString())
	if (params?.status) searchParams.append('status', params.status)

	const query = searchParams.toString()
	return axiosClient.get(`/orders/user/${userId}${query ? `?${query}` : ''}`)
}

// Lấy tất cả đơn hàng (Admin)
export const getAllOrders = async (params?: { limit?: number; skip?: number }): Promise<IResponseData<IOrder[]>> => {
	const searchParams = new URLSearchParams()
	if (params?.limit) searchParams.append('limit', params.limit.toString())
	if (params?.skip) searchParams.append('skip', params.skip.toString())

	const query = searchParams.toString()
	return axiosClient.get(`/orders/all${query ? `?${query}` : ''}`)
}

// Cập nhật trạng thái đơn hàng (Admin)
export const updateOrderStatus = async (
	orderId: string,
	params: IUpdateOrderStatusParams
): Promise<IResponseData<IOrder>> => {
	return axiosClient.put(`/orders/${orderId}/status`, params)
}

// Cập nhật thông tin giao hàng (Admin)
export const updateDeliveryInfo = async (
	orderId: string,
	params: IUpdateDeliveryInfoParams
): Promise<IResponseData<IOrder>> => {
	return axiosClient.put(`/orders/${orderId}/delivery`, params)
}

// Cập nhật thông tin thanh toán (Admin)
export const updatePaymentInfo = async (
	orderId: string,
	params: IUpdatePaymentInfoParams
): Promise<IResponseData<IOrder>> => {
	return axiosClient.put(`/orders/${orderId}/payment`, params)
}

// Cập nhật trạng thái hàng loạt (Admin)
export const updateMultipleOrdersStatus = async (params: IBulkUpdateStatusParams): Promise<IResponseData<IOrder[]>> => {
	return axiosClient.put('/orders/bulk/status', params)
}
