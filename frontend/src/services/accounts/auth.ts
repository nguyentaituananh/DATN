import axiosClient from '@/configs/axios'
import type { ILoginData, ILoginResponse } from '@/types/auth'

export const authApis = {
	login: async (authData: ILoginData): Promise<ILoginResponse> => axiosClient.post('auth/login', authData)
}
