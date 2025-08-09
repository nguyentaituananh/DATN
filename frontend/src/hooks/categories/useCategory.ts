import { categoryApis } from '@/services/category/categories'
import type { ICategoryData } from '@/types/categories'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useCreateCategory = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (data: ICategoryData) => categoryApis.createCategory(data),
		onSuccess: () => {
			toast.success('Tạo danh mục thành công')
			queryClient.invalidateQueries({ queryKey: ['categories'] })
		}
	})
}

export const useGetCategories = () => {
	return useQuery({
		queryKey: ['categories'],
		queryFn: async () => categoryApis.getCategories()
	})
}

export const useUpdateCategory = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ id, data }: { id: string; data: ICategoryData }) => categoryApis.updateCategory(id, data),
		onSuccess: () => {
			toast.success('Cập nhật danh mục thành công')
			queryClient.invalidateQueries({ queryKey: ['categories'] })
		}
	})
}

export const useDeleteCategory = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (id: string) => categoryApis.deleteCategory(id),
		onSuccess: () => {
			toast.success('Xóa danh mục thành công')
			queryClient.invalidateQueries({ queryKey: ['categories'] })
		}
	})
}
