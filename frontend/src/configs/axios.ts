import axios, { type AxiosResponse } from 'axios'

const axiosClient = axios.create({
	baseURL: import.meta.env.BE_API_URL || 'http://localhost:3001/api',
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json'
	}
})

// Hàm để lấy token từ store (sẽ được cập nhật từ component)
let getAccessToken: () => string | null = () => null

export const setTokenGetter = (getter: () => string | null) => {
	getAccessToken = getter
}

// Interceptor request: Thêm token vào header
axiosClient.interceptors.request.use((config) => {
	const token = getAccessToken()

	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}

	config.headers.Accept = 'application/json'

	// Chỉ set Content-Type cho JSON request, không ghi đè nếu đã có sẵn
	if (!config.headers['Content-Type']) {
		config.headers['Content-Type'] = 'application/json'
	}

	return config
})

// Interceptor response: Xử lý lỗi toàn cục và extract metadata
axiosClient.interceptors.response.use(
	(response: AxiosResponse) => {
		// Extract data from metadata if it exists
		if (response.data && response.data.metadata) {
			response.data = response.data.metadata
		}
		return response.data
	},
	(error) => {
		console.error('Global error handler:', error)
		// Don't show toast here, let individual requests handle it
		return Promise.reject(error)
	}
)

export default axiosClient
