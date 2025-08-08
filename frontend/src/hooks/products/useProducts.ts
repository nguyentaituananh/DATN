import { productApis } from '@/services/proucts/products'
import type { IObjectFilter } from '@/types'
import type { IProductData } from '@/types/products'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useCreateProduct = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (data: IProductData) => productApis.createProduct(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products'] })
			queryClient.invalidateQueries({ queryKey: ['draft-products'] })
		}
	})
}

export const useGetProducts = (options: IObjectFilter) => {
	return useQuery({
		queryKey: ['products', options],
		queryFn: () => productApis.getProducts(options)
	})
}

export const useGetProduct = (productId: string) => {
	return useQuery({
		enabled: !!productId,
		queryKey: ['product', productId],
		queryFn: () => productApis.getProduct(productId)
	})
}

export const useUpdateProduct = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ productId, data }: { productId: string; data: IProductData }) =>
			productApis.updateProduct(productId, data),
		onSuccess: (_, { productId }) => {
			toast.success('Cập nhật sản phẩm thành công')
			queryClient.invalidateQueries({ queryKey: ['products'] })
			queryClient.invalidateQueries({ queryKey: ['draft-products'] })
			queryClient.invalidateQueries({ queryKey: ['published-products'] })
			queryClient.invalidateQueries({ queryKey: ['product', productId] })
		}
	})
}

export const useDeleteProduct = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (productId: string) => productApis.deleteProduct(productId),
		onSuccess: () => {
			toast.success('Xoá sản phẩm thành công')
			queryClient.invalidateQueries({ queryKey: ['products'] })
			queryClient.invalidateQueries({ queryKey: ['draft-products'] })
			queryClient.invalidateQueries({ queryKey: ['published-products'] })
		}
	})
}

export const usePublishProduct = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (productId: string) => productApis.publishProduct(productId),
		onSuccess: () => {
			toast.success('Xuất bản sản phẩm thành công')
			queryClient.invalidateQueries({ queryKey: ['products'] })
			queryClient.invalidateQueries({ queryKey: ['draft-products'] })
			queryClient.invalidateQueries({ queryKey: ['published-products'] })
		}
	})
}

export const useUnpublishProduct = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (productId: string) => productApis.unPublishProduct(productId),
		onSuccess: () => {
			toast.success('Hủy xuất bản sản phẩm thành công')
			queryClient.invalidateQueries({ queryKey: ['products'] })
			queryClient.invalidateQueries({ queryKey: ['draft-products'] })
			queryClient.invalidateQueries({ queryKey: ['published-products'] })
		}
	})
}

export const useGetAllDrafts = () => {
	return useQuery({
		queryKey: ['draft-products'],
		queryFn: () => productApis.getAllDrafts()
	})
}

export const useGetAllPublished = () => {
	return useQuery({
		queryKey: ['published-products'],
		queryFn: () => productApis.getAllPublished()
	})
}
