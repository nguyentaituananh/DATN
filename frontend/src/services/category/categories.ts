import axiosClient from '@/configs/axios'
import type { IResponseData } from '@/types'
import type { ICategoriesResponse, ICategoryData } from '@/types/categories'

export const categoryApis = {
	createCategory: async (data: ICategoryData) => axiosClient.post('/categories', data),
	getCategories: async (): Promise<IResponseData<ICategoriesResponse>> => axiosClient.get('/categories'),
	updateCategory: async (id: string, data: ICategoryData) => axiosClient.put(`/categories/${id}`, data),
	deleteCategory: async (id: string) => axiosClient.delete(`/categories/${id}`)
}