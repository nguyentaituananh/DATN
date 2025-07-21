import { productApis } from '@/services/proucts/products'
import type { IObjectFilter } from '@/types'
import type { IProductData } from '@/types/products'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useCreateProduct = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (data: IProductData) => productApis.createProduct(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products'] })
		}
	})
}

export const useGetProducts = (options: IObjectFilter) => {
	return useQuery({
		queryKey: ['products'],
		queryFn: () => productApis.getProducts(options)
	})
}
