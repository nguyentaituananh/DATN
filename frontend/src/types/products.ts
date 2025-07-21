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
	category_id: string
	related_products: string[]
	isDraft: boolean
	isPublish: boolean
	rating_average: number
	createdAt: string
	updatedAt: string
}
