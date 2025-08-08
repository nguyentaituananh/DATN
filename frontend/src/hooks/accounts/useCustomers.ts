import { userApi } from '@/services/user/user'
import type { IObjectFilter } from '@/types'
import type { IUser } from '@/types/users'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

/**
 * Hook to get a list of users with filtering and pagination.
 * Mirrors the structure of useGetProducts.
 * @param options - Filtering and pagination options.
 */
export const useGetUsers = (options: IObjectFilter) => {
	return useQuery({
		queryKey: ['users', options],
		queryFn: () => userApi.getAllUsers(options)
	})
}

/**
 * Hook to get the details of a single user.
 * @param userId - The ID of the user to fetch.
 */
export const useGetUser = (userId: string) => {
	return useQuery({
		queryKey: ['user', userId],
		queryFn: () => userApi.getUserById(userId),
		enabled: !!userId // Only run the query if userId is provided
	})
}

/**
 * Hook for updating a user's information.
 * Mirrors the structure of useUpdateProduct.
 */
export const useUpdateUser = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ userId, data }: { userId: string; data: Partial<IUser> }) =>
			userApi.updateUser(userId, data),
		onSuccess: (_, { userId }) => {
			toast.success('Cập nhật người dùng thành công')
			// Invalidate the list of users to refetch the updated data
			queryClient.invalidateQueries({ queryKey: ['users'] })
			// Invalidate the specific user's query cache
			queryClient.invalidateQueries({ queryKey: ['user', userId] })
		}
	})
}

/**
 * Hook for deleting a user (soft delete).
 * Mirrors the structure of useDeleteProduct.
 */
export const useDeleteUser = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (userId: string) => userApi.deleteUser(userId),
		onSuccess: () => {
			toast.success('Xoá người dùng thành công')
			queryClient.invalidateQueries({ queryKey: ['users'] })
		}
	})
}
