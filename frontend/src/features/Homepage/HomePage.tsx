import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const HomePage = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
			{/* Header */}
			<header className="bg-white shadow-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center py-6">
						<div className="flex items-center">
							<h1 className="text-2xl font-bold text-gray-900">Furniture Store</h1>
						</div>
						<nav className="flex space-x-8">
							<Link to="/" className="text-gray-900 hover:text-indigo-600 font-medium">
								Trang chủ
							</Link>
							<Link to="/dashboard" className="text-gray-900 hover:text-indigo-600 font-medium">
								Dashboard
							</Link>
						</nav>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="text-center">
					<h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
						Chào mừng đến với
						<span className="text-indigo-600"> Furniture Store</span>
					</h2>
					<p className="mt-6 max-w-3xl mx-auto text-xl text-gray-600">
						Khám phá bộ sưu tập nội thất cao cấp của chúng tôi. Từ ghế sofa sang trọng đến bàn làm việc hiện
						đại, chúng tôi có mọi thứ để biến ngôi nhà của bạn thành một không gian hoàn hảo.
					</p>
					<div className="mt-10 flex justify-center gap-4">
						<Button asChild size="lg">
							<Link to="/products">Xem sản phẩm</Link>
						</Button>
						<Button variant="outline" size="lg" asChild>
							<Link to="/dashboard">Quản lý cửa hàng</Link>
						</Button>
					</div>
				</div>

				{/* Features Section */}
				<div className="mt-20">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="text-center">
							<div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
								<svg
									className="w-8 h-8 text-indigo-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-semibold text-gray-900 mb-2">Chất lượng cao cấp</h3>
							<p className="text-gray-600">
								Tất cả sản phẩm được chọn lọc kỹ càng với chất liệu cao cấp và thiết kế tinh tế.
							</p>
						</div>

						<div className="text-center">
							<div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
								<svg
									className="w-8 h-8 text-indigo-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-semibold text-gray-900 mb-2">Giá cả hợp lý</h3>
							<p className="text-gray-600">
								Cam kết mang đến giá tốt nhất thị trường với chất lượng không thể chối cãi.
							</p>
						</div>

						<div className="text-center">
							<div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
								<svg
									className="w-8 h-8 text-indigo-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-semibold text-gray-900 mb-2">Giao hàng nhanh chóng</h3>
							<p className="text-gray-600">
								Dịch vụ giao hàng nhanh chóng và đóng gói cẩn thận đảm bảo sản phẩm đến tay bạn an toàn.
							</p>
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}

export default HomePage
