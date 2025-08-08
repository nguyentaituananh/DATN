import { useAuthStore } from '@/stores'
import axios, { type AxiosResponse } from 'axios'
import { toast } from 'sonner'
import { routes } from '@/constants'

const axiosClient = axios.create({
	baseURL: import.meta.env.BE_API_URL || 'http://localhost:3001/api',
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json'
	}
})

// Request interceptor: Add token to header
axiosClient.interceptors.request.use(config => {
	const token = useAuthStore.getState().accessToken

	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}

	config.headers.Accept = 'application/json'

	// Only set Content-Type for JSON request, don't overwrite if already present
	if (!config.headers['Content-Type']) {
		config.headers['Content-Type'] = 'application/json'
	}

	return config
})

// Response interceptor: Global error handling and metadata extraction
axiosClient.interceptors.response.use(
	(response: AxiosResponse) => {
		return response.data
	},
	async error => {
		const originalRequest = error.config

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true

			const { refreshToken, setAccessToken, setRefreshToken, logout } = useAuthStore.getState()

			if (refreshToken) {
				try {
					const response = await axiosClient.post('/access/refresh-token', {
						refreshToken
					})

					const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.tokens

					setAccessToken(newAccessToken)
					setRefreshToken(newRefreshToken)

					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
					return axiosClient(originalRequest)
				} catch (refreshError) {
					console.error('Error refreshing token:', refreshError)
					toast.error('Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại.')
					logout()
					window.location.href = routes.login
					return Promise.reject(refreshError)
				}
			} else {
				// No refresh token available, redirect to login
				toast.error('Vui lòng đăng nhập để tiếp tục.')
				logout()
				window.location.href = routes.login
			}
		}

		return Promise.reject(error)
	}
)

export default axiosClient
