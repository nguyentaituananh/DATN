import type { IProduct } from './products'

export interface CartProduct extends IProduct {
	quantity: number
}

export interface ICart {
	_id: string
	user_id: string
	created_at: string
	updated_at: string
	createdAt: string
	updatedAt: string
}

export interface ICartItem {
	_id: string
	cart_id: string
	product_id: string | IProduct
	variant_id?: string
	quantity: number
	added_at: string
	createdAt: string
	updatedAt: string
}

export interface ICartItemWithProduct extends Omit<ICartItem, 'product_id'> {
	product_id: IProduct
}
