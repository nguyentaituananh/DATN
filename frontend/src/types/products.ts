import type { ICategory } from "./categories";

export interface IProductData {
	id?: string
	name: string
	description: string
	price: string
	quantity: string
	category: string
	images: string[]
}

export interface IProduct {
	_id: string
	name: string
	slug: string
	description: string
	price: number
	quantity: number
	images: string[]
	related_products: string[]
	isDraft: boolean
	isPublish: boolean
	is_active?: boolean
	rating_average: number
	createdAt: string
	updatedAt: string
	original_price?: number
	material?: string
	size?: string
	discount_price?: number
	category_id: string | ICategory; // Can be a string or a populated ICategory object
}
