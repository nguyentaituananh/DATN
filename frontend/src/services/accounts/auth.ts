import axiosClient from '@/configs/axios'
import { authUri } from '@/services/uri/account/auth'
import type { ILoginData, ILoginResponse } from '@/types/auth'

export const authApis = {
	login: async (authData: ILoginData): Promise<ILoginResponse> => axiosClient.post(authUri.LOGIN, authData)
}
