import axiosClient from '@/configs/axios'
import { BEST_SELLING_PRODUCTS, STATS_CUSTOMER_OVERVIEW } from '../uri/stats'

export const getBestsellingProducts = async (limit = 5) => {
	const response = await axiosClient.get(`${BEST_SELLING_PRODUCTS}?limit=${limit}`)
	return response.data
}

export const getCustomerOverview = async () => {
	const response = await axiosClient.get(STATS_CUSTOMER_OVERVIEW)
	return response.data
}
