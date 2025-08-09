import { userApi } from '@/services/user/user'
import type { IObjectFilter } from '@/types'
import type { IUser } from '@/types/users'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useGetUsers = (options: IObjectFilter) => {
	return useQuery({
		queryKey: ['users', options],
		queryFn: () => userApi.getAllUsers(options)
	})
}

export const useGetUserById = (userId: string) => {
	return useQuery({
		queryKey: ['user', userId],
		queryFn: () => userApi.getUserById(userId)
	})
}

export const useUpdateUser = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ userId, data }: { userId: string; data: Partial<IUser> }) =>
			userApi.updateUser(userId, data),
		onSuccess: (_, { userId }) => {
			toast.success('Cập nhật người dùng thành công')
			queryClient.invalidateQueries({ queryKey: ['users'] })
			queryClient.invalidateQueries({ queryKey: ['user', userId] })
		}
	})
}

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

export const useSendVerificationEmail = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (userId: string) => userApi.sendVerificationEmail(userId),
		onSuccess: () => {
			toast.success('Gửi email xác thực thành công')
			queryClient.invalidateQueries({ queryKey: ['users'] })
		}
	})
}

export const useResetPasswordLink = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (userId: string) => userApi.resetPasswordLink(userId),
		onSuccess: () => {
			toast.success('Gửi liên kết đặt lại mật khẩu thành công')
			queryClient.invalidateQueries({ queryKey: ['users'] })
		}
	})
}

export const useRevokeAllSessions = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (userId: string) => userApi.revokeAllSessions(userId),
		onSuccess: () => {
			toast.success('Thu hồi tất cả phiên thành công')
			queryClient.invalidateQueries({ queryKey: ['users'] })
		}
	})
}

export const useToggleUserStatus = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (userId: string) => userApi.toggleUserStatus(userId),
		onSuccess: () => {
			toast.success('Chuyển đổi trạng thái người dùng thành công')
			queryClient.invalidateQueries({ queryKey: ['users'] })
		}
	})
}