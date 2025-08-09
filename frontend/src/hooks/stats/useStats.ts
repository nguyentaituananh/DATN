import { getBestsellingProducts, getCustomerOverview } from '@/services/stats/stats'
import { useQuery } from '@tanstack/react-query'

export const useBestsellingProducts = (limit = 5) => {
	return useQuery({
		queryKey: ['bestselling-products', limit],
		queryFn: () => getBestsellingProducts(limit)
	})
}

export const useCustomerOverview = () => {
	return useQuery({
		queryKey: ['customer-overview'],
		queryFn: getCustomerOverview
	})
}
