import { authApis } from '@/services/accounts/auth'
import type { ILoginData, ILoginResponse, IApiError } from '@/types/auth'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/authStore'

interface LocationState {
	from?: string
}

// Hook để lấy auth state
export const useAuth = () => {
	const user = useAuthStore((state) => state.user)
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
	const accessToken = useAuthStore((state) => state.accessToken)
	const refreshToken = useAuthStore((state) => state.refreshToken)

	return {
		user,
		isAuthenticated,
		accessToken,
		refreshToken
	}
}

export const useLogin = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const setUser = useAuthStore((state) => state.setUser)
	const setTokens = useAuthStore((state) => state.setTokens)
	const setAuthenticated = useAuthStore((state) => state.setAuthenticated)

	return useMutation({
		mutationFn: (data: ILoginData) => authApis.login(data),
		onSuccess: (response: ILoginResponse) => {
			console.log(response)

			setUser(response.user)
			setTokens(response.tokens.accessToken, response.tokens.refreshToken)
			setAuthenticated(true)

			toast.success('Đăng nhập thành công!')

			const state = location.state as LocationState
			const redirectTo = state?.from || '/'
			navigate(redirectTo, { replace: true })
		},
		onError: (error: IApiError) => {
			const errorMessage = error?.response?.data?.message || 'Đăng nhập thất bại'
			toast.error(errorMessage)
		}
	})
}

export const useLogout = () => {
	const navigate = useNavigate()
	const clearAuth = useAuthStore((state) => state.clearAuth)

	return () => {
		clearAuth()
		toast.success('Đăng xuất thành công!')
		navigate('/login')
	}
}
