import axiosClient from '@/configs/axios'
import type { IResponseData } from '@/types'
import type { IFavoriteItem } from '@/types/favorites'

export const favoriteApis = {
	getFavorites: async (): Promise<IResponseData<IFavoriteItem[]>> => axiosClient.get('/favorites/my-favorites'),
	addFavorite: async (productId: string) => axiosClient.post('/favorites', { product_id: productId }),
	removeFavorite: async (productId: string) => axiosClient.delete(`/favorites/product/${productId}`)
}
