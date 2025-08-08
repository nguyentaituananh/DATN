export interface ICouponData {
	code: string
	name: string
	description?: string
	discount_type: 'percentage' | 'fixed'
	discount_value: number
	max_discount_amount?: number
	min_order_amount?: number
	valid_from: Date
	valid_to: Date
	usage_limit: number
}

export interface ICoupon {
	_id: string
	code: string
	name: string
	description?: string
	discount_type: 'percentage' | 'fixed'
	discount_value: number
	max_discount_amount?: number
	min_order_amount: number
	valid_from: Date
	valid_to: Date
	usage_limit: number
	used_count: number
	is_active: boolean
	created_by?: {
		_id: string
		name: string
		email: string
	}
	createdAt: Date
	updatedAt: Date
}

export interface ICouponValidation {
	isValid: boolean
	errors: string[]
}

export interface IDiscountCalculation {
	coupon: ICoupon
	original_amount: number
	discount_amount: number
	final_amount: number
	discount_details: {
		type: 'percentage' | 'fixed'
		value: number
		max_discount?: number
	}
}
