import axiosClient from '@/configs/axios'
import type { IObjectFilter, IResponseData } from '@/types'
import type { IProduct, IProductData } from '@/types/products'

export const productApis = {
	createProduct: async (data: IProductData) => axiosClient.post('/products', data),
	getProducts: async (options: IObjectFilter): Promise<IResponseData<IProduct[]>> =>
		axiosClient.get('/products', { params: options })
}
