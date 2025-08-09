import type { IProduct } from './products'

export interface FavoriteProduct {
	id: string
	name: string
	price: number
	imageUrl: string
}

export interface IFavoriteItem {
	_id: string
	user_id: string
	product_id: IProduct
	created_at: string
	updatedAt: string
}

export interface IFavoriteResponse {
	favorites: IFavoriteItem[]
}
