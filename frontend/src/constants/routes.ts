export const routes = {
	home: '/',
	login: '/login',
	dashboard: '/dashboard',
	categoryManagement: '/dashboard/categories',
	productManagement: '/dashboard/products',
	couponManagement: '/dashboard/coupons',
	customerManagement: '/dashboard/customers',
	orderManagement: '/dashboard/orders',
	orderDetail: '/dashboard/orders/:orderId',

	myOrders: '/my-orders',
	userProfile: '/profile',
	cartPage: '/cart',
	checkoutPage: '/checkout',
	order: '/order',
	orderDetailUser: '/order/:orderCode',
	favorites: '/favorites',
	collections: '/collections',
	about: '/about'
}

// Helper functions để generate dynamic routes
export const generateRoutes = {
	// Admin order detail
	orderDetail: (orderId: string) => `/dashboard/orders/${orderId}`,

	// User order detail
	orderDetailUser: (orderCode: string) => `/order/${orderCode}`,

	// User profile
	userProfile: (userId?: string) => (userId ? `/profile/${userId}` : '/profile'),

	// Product detail (if needed)
	productDetail: (productId: string) => `/products/${productId}`,

	// Category page (if needed)
	categoryPage: (categoryId: string) => `/categories/${categoryId}`
}
