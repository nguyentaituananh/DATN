import type { IObjectFilter, IResponseData } from '@/types'
import type { IUser } from '@/types/users'
import axiosClient from '@/configs/axios'

export const userApi = {
	getAllUsers: async (params: IObjectFilter): Promise<IResponseData<{ users: IUser[]; total: number }>> =>
		axiosClient.get('/users', { params }),
	getUserById: async (id: string): Promise<IUser> => axiosClient.get(`/users/${id}`),
	updateUser: async (id: string, data: Partial<IUser>): Promise<IUser> => axiosClient.put(`/users/${id}`, data),
	deleteUser: async (id: string): Promise<void> => axiosClient.delete(`/users/${id}`),
	sendVerificationEmail: async (userId: string) => axiosClient.post(`/users/${userId}/send-verification-email`),
	resetPasswordLink: async (userId: string) => axiosClient.post(`/users/${userId}/reset-password-link`),
	revokeAllSessions: async (userId: string) => axiosClient.post(`/users/${userId}/revoke-sessions`),
	toggleUserStatus: async (userId: string) => axiosClient.put(`/users/${userId}/toggle-status`)
}
