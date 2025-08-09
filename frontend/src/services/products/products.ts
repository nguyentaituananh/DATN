import axiosClient from '@/configs/axios'
import type { IObjectFilter, IResponseData } from '@/types'
import type { IProduct, IProductData } from '@/types/products'

export const productApis = {
	createProduct: async (data: IProductData) => axiosClient.post('/products', data),
	getProducts: async (options: IObjectFilter): Promise<IResponseData<IProduct[]>> =>
		axiosClient.get('/products', { params: options }),
	getProduct: async (productId: string): Promise<IResponseData<IProduct>> =>
		axiosClient.get(`/products/${productId}`),

	updateProduct: async (productId: string, data: IProductData) => axiosClient.put(`/products/${productId}`, data),
	deleteProduct: async (productId: string) => axiosClient.delete(`/products/${productId}`),
	publishProduct: async (productId: string) => axiosClient.patch(`/products/${productId}/publish`),
	unPublishProduct: async (productId: string) => axiosClient.patch(`/products/${productId}/unpublish`),
	getAllDrafts: async (): Promise<IResponseData<IProduct[]>> => axiosClient.get('/products/admin/drafts'),
	getAllPublished: async (): Promise<IResponseData<IProduct[]>> => axiosClient.get('/products/admin/published')
}
