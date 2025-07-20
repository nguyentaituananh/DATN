import axios, { type AxiosResponse } from 'axios'
import { useAuthStore } from '@/stores/authStore'
import { toast } from 'sonner'

const axiosClient = axios.create({
	baseURL: import.meta.env.BE_API_URL || 'http://localhost:3001/api',
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json'
	}
})

// Interceptor request: Thêm token vào header
axiosClient.interceptors.request.use((config) => {
	// Lấy token trực tiếp từ Zustand store
	const token = useAuthStore.getState().accessToken

	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}

	config.headers.Accept = 'application/json'

	if (!config.headers['Content-Type']) {
		config.headers['Content-Type'] = 'application/json'
	}

	return config
})

// Interceptor response: Xử lý lỗi toàn cục và extract metadata
axiosClient.interceptors.response.use(
	(response: AxiosResponse) => {
		if (response.status === 201) toast.success(response.data.message || 'Thêm mới thành công')

		return response.data
	},
	(error) => {
		console.error('Global error handler:', error)
		// Don't show toast here, let individual requests handle it
		return Promise.reject(error)
	}
)

export default axiosClient
