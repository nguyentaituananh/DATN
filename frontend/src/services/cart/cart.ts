import axiosClient from '@/configs/axios'
import type { IResponseData } from '@/types'
import type { ICart, ICartItem } from '@/types/cart'

interface AddToCartPayload {
	cart_id: string
	product_id: string
	variant_id?: string
	quantity: number
}

interface CreateCartPayload {
	user_id: string
}

interface UpdateCartItemQuantityPayload {
	quantity: number
}

export const cartApis = {
	getCart: async (): Promise<IResponseData<ICart>> => axiosClient.get('/cart'),

	getCartByUser: async (userId: string): Promise<IResponseData<ICart>> => axiosClient.get(`/cart/user/${userId}`),

	getCartItems: async (cartId: string): Promise<IResponseData<ICartItem[]>> =>
		axiosClient.get(`/cartItem/cart/${cartId}`),

	createCart: async (payload: CreateCartPayload): Promise<IResponseData<ICart>> => axiosClient.post('/cart', payload),

	addToCart: async (payload: AddToCartPayload): Promise<IResponseData<ICartItem>> =>
		axiosClient.post('/cartItem', payload),

	removeCartItem: async (productId: string): Promise<IResponseData<null>> =>
		axiosClient.delete(`/cart/product/${productId}`),

	updateCartItemQuantity: async (
		productId: string,
		quantity: UpdateCartItemQuantityPayload
	): Promise<IResponseData<ICartItem>> => axiosClient.patch(`/cart/product/${productId}`, quantity)
}
