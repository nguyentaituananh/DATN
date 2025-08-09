export interface IOrderProduct {
	product_id: string
	product_name: string
	product_price: number
	quantity: number
	subtotal: number
}

export interface IOrderUser {
	_id: string
	name: string
	email: string
}

export interface ICouponData {
	coupon_id: string
	coupon_code: string
	discount_amount: number
	discount_type: 'percentage' | 'fixed'
	discount_value: number
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'
export type PaymentMethod = 'cash' | 'card' | 'bank_transfer' | 'e_wallet'

export interface IOrder {
	_id: string
	order_code: string
	user_id: IOrderUser | string
	products: IOrderProduct[]
	status: OrderStatus
	order_date: string
	shipping_address: string
	subtotal: number
	discount_amount: number
	total_amount: number
	coupon_data?: ICouponData | null
	payment_status: PaymentStatus
	payment_method?: PaymentMethod
	delivery_fee: number
	tracking_number?: string
	notes?: string
	created_at: string
	updated_at: string
	createdAt: string
	updatedAt: string
	__v: number
}

export interface ICreateOrderPayload {
	cart_item_ids: string[]
	shipping_address: string
	coupon_code?: string
}

export interface IOrdersResponse {
	orders: IOrder[]
	pagination: {
		total: number
		page: number
		pages: number
		limit: number
	}
}

export interface IOrderStats {
	stats: Array<{
		_id: OrderStatus
		count: number
		total_amount: number
	}>
	summary: {
		total_orders: number
		total_revenue: number
	}
}

export interface IOrderStatusHistory {
	order_id: string
	order_code: string
	current_status: OrderStatus
	history: Array<{
		status: OrderStatus
		timestamp: string
		note: string
	}>
}

export interface ISearchOrdersParams {
	q: string
	limit?: number
	skip?: number
}

export interface IUpdateOrderStatusParams {
	status: OrderStatus
	note?: string
}

export interface IUpdateDeliveryInfoParams {
	tracking_number?: string
	estimated_delivery_date?: string
	delivery_fee?: number
	notes?: string
}

export interface IUpdatePaymentInfoParams {
	payment_method?: PaymentMethod
	payment_status?: PaymentStatus
}

export interface IBulkUpdateStatusParams {
	order_ids: string[]
	status: OrderStatus
	note?: string
}

export interface IExportOrdersParams {
	format?: 'csv' | 'json'
	start_date?: string
	end_date?: string
	status?: OrderStatus
}

export interface IGenerateReportParams {
	start_date?: string
	end_date?: string
}

export interface IExportOrdersResponse {
	filePath: string
	recordCount: number
	fileSize: number
}

export interface IOrderReport {
	period: {
		start_date: string
		end_date: string
	}
	generated_at: string
	summary: {
		total_orders: number
		total_revenue: number
		total_discount: number
		avg_order_value: number
	}
	status_breakdown: Array<{
		status: string
		status_text: string
		count: number
		total_amount: number
		percentage: string
	}>
	daily_sales: Array<{
		_id: string
		orders: number
		revenue: number
	}>
	top_products: Array<{
		_id: string
		total_quantity: number
		total_revenue: number
		order_count: number
	}>
}
