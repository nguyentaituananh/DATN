import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
	ShoppingCart,
	Heart,
	Share2,
	Minus,
	Plus,
	Shield,
	Truck,
	RefreshCw,
	Star,
	ArrowLeft,
	AlertCircle
} from 'lucide-react'
import type { IProduct } from '@/types/products'
import { useGetProduct } from '@/hooks/products/useProducts'
import { useAddToCart } from '@/hooks/cart/useCart' // Import the hook
import placeholderImage from '@/assets/images/placeholder-image.png'

const formatPrice = (price: number) => new Intl.NumberFormat('vi-VN').format(price) + 'đ'

const DetailProduct = () => {
	const { id } = useParams<{ id: string }>()
	const navigate = useNavigate()
	const [selectedImage, setSelectedImage] = useState<string>('')
	const [tab, setTab] = useState<'details' | 'warranty'>('details')
	const [quantity, setQuantity] = useState(1)

	const { data: productResponse, isLoading, isError, error } = useGetProduct(id || '')
	const { mutate: addToCart } = useAddToCart() // Instantiate the hook

	const product: IProduct | undefined = productResponse?.metadata

	useEffect(() => {
		if (product?.images?.[0] && !selectedImage) {
			setSelectedImage(product.images[0])
		}
	}, [product, selectedImage])

	const handleAddToCart = () => {
		if (product && !isOutOfStock) {
			addToCart({ productId: product._id, quantity })
		}
	}

	// Loading state
	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="flex flex-col items-center space-y-4">
					<div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
					<p className="text-gray-600 text-lg">Đang tải sản phẩm...</p>
				</div>
			</div>
		)
	}

	// Error state
	if (isError) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<AlertCircle className="w-12 h-12 text-red-500" />
					</div>
					<h2 className="text-2xl font-bold text-gray-900 mb-2">Có lỗi xảy ra</h2>
					<p className="text-red-500 text-lg mb-4">{error?.message || 'Không thể tải thông tin sản phẩm'}</p>
					<button
						onClick={() => navigate(-1)}
						className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition-colors"
					>
						<ArrowLeft className="w-4 h-4 inline mr-2" />
						Quay lại
					</button>
				</div>
			</div>
		)
	}

	// Product not found
	if (!product) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<span className="text-gray-400 text-4xl">📦</span>
					</div>
					<h2 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy sản phẩm</h2>
					<p className="text-gray-600 mb-4">Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xóa</p>
					<button
						onClick={() => navigate('/products')}
						className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition-colors"
					>
						Xem tất cả sản phẩm
					</button>
				</div>
			</div>
		)
	}

	// Calculate product data
	const originalPrice = Number(product.original_price || 0)
	const currentPrice = Number(product.price || 0)
	const hasDiscount = originalPrice > currentPrice && originalPrice > 0
	const discountPercent = hasDiscount ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0
	const isOutOfStock = Number(product.quantity || 0) === 0
	const rating = Number(product.rating_average || 0)

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Breadcrumb */}
			<div className="bg-white border-b">
				<div className="max-w-7xl mx-auto px-4 py-4">
					<nav className="flex items-center space-x-2 text-sm text-gray-600">
						<button onClick={() => navigate('/')} className="hover:text-orange-600 transition-colors">
							Trang chủ
						</button>
						<span>/</span>
						<button onClick={() => navigate('/products')} className="hover:text-orange-600 transition-colors">
							Sản phẩm
						</button>
						<span>/</span>
						<span className="text-gray-900 font-medium line-clamp-1">{product.name}</span>
					</nav>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 py-8">
				<div className="bg-white rounded-2xl shadow-lg overflow-hidden">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
						{/* LEFT: Images */}
						<div className="space-y-4">
							{/* Main Image */}
							<div className="relative group">
								<img
									src={selectedImage || product.images?.[0] || placeholderImage}
									alt={product.name}
									className="w-full h-[500px] object-cover rounded-xl shadow-lg"
									onError={(e) => {
										e.currentTarget.src = placeholderImage
									}}
								/>
								<div className="absolute top-4 right-4 flex space-x-2">
									<button className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
										<Heart className="w-5 h-5 text-gray-600" />
									</button>
									<button className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
										<Share2 className="w-5 h-5 text-gray-600" />
									</button>
								</div>

								{/* Discount Badge */}
								{discountPercent > 0 && (
									<div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
										-{discountPercent}%
									</div>
								)}

								{/* Out of Stock Overlay */}
								{isOutOfStock && (
									<div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
										<span className="bg-white px-4 py-2 rounded-lg text-gray-800 font-semibold">Hết hàng</span>
									</div>
								)}
							</div>

							{/* Image Thumbnails */}
							{product.images && product.images.length > 1 && (
								<div className="flex space-x-3 overflow-x-auto p-2">
									{product.images.map((img, idx) => (
										<img
											key={idx}
											src={img}
											alt={`${product.name} - ${idx + 1}`}
											className={`flex-shrink-0 w-20 h-20 object-cover rounded-lg cursor-pointer transition-all ${
												selectedImage === img
													? 'ring-4 ring-orange-600 ring-opacity-50 scale-105'
													: 'hover:scale-105 hover:shadow-md'
											}`}
											onClick={() => setSelectedImage(img)}
											onError={(e) => {
												e.currentTarget.src = placeholderImage
											}}
										/>
									))}
								</div>
							)}
						</div>

						{/* RIGHT: Product Info */}
						<div className="space-y-6">
							{/* Product Name */}
							<div>
								<h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
								<div className="flex items-center space-x-2">
									<div className="flex items-center">
										{[...Array(5)].map((_, i) => (
											<Star
												key={i}
												className={`w-5 h-5 ${
													i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
												}`}
											/>
										))}
									</div>
									<span className="text-gray-600">({rating.toFixed(1)})</span>
									<span className="text-gray-400">•</span>
									<span className="text-gray-600">Còn {Number(product.quantity || 0)} sản phẩm</span>
								</div>
							</div>

							{/* Price */}
							<div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border border-orange-100">
								<div className="flex items-center space-x-4 mb-2">
									<span className="text-3xl font-bold text-orange-600">{formatPrice(currentPrice)}</span>
									{hasDiscount && (
										<>
											<span className="text-xl text-gray-500 line-through">{formatPrice(originalPrice)}</span>
											<span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
												-{discountPercent}%
											</span>
										</>
									)}
								</div>
								{hasDiscount && (
									<p className="text-green-600 text-sm font-medium">
										Tiết kiệm {formatPrice(originalPrice - currentPrice)}
									</p>
								)}
								<p className="text-gray-600 text-sm mt-1">Giá đã bao gồm VAT</p>
							</div>

							{/* Product Details */}
							{(product.material || product.size) && (
								<div className="grid grid-cols-2 gap-4">
									{product.material && (
										<div className="bg-gray-50 p-4 rounded-lg">
											<span className="text-gray-500 text-sm block">Vật liệu</span>
											<span className="font-semibold text-gray-900">{product.material}</span>
										</div>
									)}
									{product.size && (
										<div className="bg-gray-50 p-4 rounded-lg">
											<span className="text-gray-500 text-sm block">Kích thước</span>
											<span className="font-semibold text-gray-900">{product.size}</span>
										</div>
									)}
								</div>
							)}

							{/* Category */}
							{product.category_id && (
								<div className="flex items-center space-x-2">
									<span className="text-gray-500">Danh mục:</span>
									<span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
										{typeof product.category_id === 'object' ? product.category_id.name : product.category_id}
									</span>
								</div>
							)}

							{/* Quantity Selector */}
							<div className="space-y-2">
								<label className="text-gray-700 font-semibold">Số lượng:</label>
								<div className="flex items-center space-x-4">
									<div className="flex items-center border-2 border-gray-200 rounded-lg">
										<button
											onClick={() => setQuantity(Math.max(1, quantity - 1))}
											className="p-3 hover:bg-gray-50 transition-colors disabled:opacity-50"
											disabled={quantity <= 1}
										>
											<Minus className="w-4 h-4" />
										</button>
										<span className="px-6 py-3 font-semibold text-lg">{quantity}</span>
										<button
											onClick={() => setQuantity(Math.min(Number(product.quantity || 1), quantity + 1))}
											className="p-3 hover:bg-gray-50 transition-colors disabled:opacity-50"
											disabled={quantity >= Number(product.quantity || 1)}
										>
											<Plus className="w-4 h-4" />
										</button>
									</div>
									<span className="text-gray-600">
										{isOutOfStock ? 'Hết hàng' : `${Number(product.quantity || 0)} sản phẩm có sẵn`}
									</span>
								</div>
							</div>

							{/* Action Buttons */}
							<div className="space-y-4">
								<div className="flex space-x-4">
									<button
										className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg transition-all transform ${
											isOutOfStock
												? 'bg-gray-300 text-gray-500 cursor-not-allowed'
												: 'bg-orange-600 hover:bg-red-600 text-white hover:scale-105'
										}`}
										disabled={isOutOfStock}
									>
										{isOutOfStock ? 'HẾT HÀNG' : 'MUA NGAY'}
									</button>
									<button
										onClick={handleAddToCart}
										className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg transition-all flex items-center justify-center space-x-2 ${
											isOutOfStock
												? 'border-2 border-gray-300 text-gray-500 cursor-not-allowed'
												: 'border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'
										}`}
										disabled={isOutOfStock}
									>
										<ShoppingCart className="w-5 h-5" />
										<span>THÊM VÀO GIỎ</span>
									</button>
								</div>

								{/* Member Offer */}
								{!isOutOfStock && (
									<div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-xl border border-green-200">
										<div className="flex items-center justify-between">
											<div className="flex items-center space-x-3">
												<div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
													<span className="text-white font-bold">%</span>
												</div>
												<div>
													<p className="font-semibold text-green-800">Ưu đãi thành viên</p>
													<p className="text-green-700 text-sm">Giảm 5% khi đăng ký thành viên</p>
												</div>
											</div>
											<button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
												ĐĂNG KÝ
											</button>
										</div>
									</div>
								)}
							</div>

							{/* Features */}
							<div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
								<div className="text-center space-y-2">
									<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
										<Truck className="w-6 h-6 text-blue-600" />
									</div>
									<div>
										<p className="font-semibold text-sm">Miễn phí vận chuyển</p>
										<p className="text-xs text-gray-600">Đơn hàng lớn hơn 5 triệu</p>
									</div>
								</div>
								<div className="text-center space-y-2">
									<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
										<Shield className="w-6 h-6 text-green-600" />
									</div>
									<div>
										<p className="font-semibold text-sm">Bảo hành 1 năm</p>
										<p className="text-xs text-gray-600">Chính hãng</p>
									</div>
								</div>
								<div className="text-center space-y-2">
									<div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
										<RefreshCw className="w-6 h-6 text-orange-600" />
									</div>
									<div>
										<p className="font-semibold text-sm">Đổi trả 7 ngày</p>
										<p className="text-xs text-gray-600">Miễn phí</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Tabs Section */}
					<div className="border-t border-gray-200 p-8">
						<div className="max-w-4xl">
							{/* Tab Navigation */}
							<div className="flex space-x-8 border-b border-gray-200 mb-6">
								<button
									className={`pb-4 px-2 font-semibold text-lg transition-colors relative ${
										tab === 'details'
											? 'text-orange-600 border-b-2 border-orange-600'
											: 'text-gray-500 hover:text-gray-700'
									}`}
									onClick={() => setTab('details')}
								>
									Chi tiết sản phẩm
								</button>
								<button
									className={`pb-4 px-2 font-semibold text-lg transition-colors relative ${
										tab === 'warranty'
											? 'text-orange-600 border-b-2 border-orange-600'
											: 'text-gray-500 hover:text-gray-700'
									}`}
									onClick={() => setTab('warranty')}
								>
									Chính sách bảo hành
								</button>
							</div>

							{/* Tab Content */}
							<div className="prose prose-gray max-w-none">
								{tab === 'details' ? (
									<div className="bg-gray-50 p-6 rounded-xl">
										<div className="text-gray-700 leading-7 space-y-4">
											{product.description ? (
												<div
													className="prose prose-gray max-w-none"
													dangerouslySetInnerHTML={{ __html: product.description }}
												/>
											) : (
												<>
													<p>
														Các sản phẩm nội thất tại chúng tôi đa số đều được sản xuất tại nhà máy của công ty cổ
														phần xây dựng kiến trúc AA với đội ngũ nhân viên và công nhân ưu tú cùng cơ sở vật chất
														hiện đại.
													</p>
													<p>
														Chúng tôi đã kiểm tra kỹ lưỡng từ nguồn nguyên liệu cho đến sản phẩm hoàn thiện cuối cùng.
													</p>
													<p>
														Chúng tôi bảo hành một năm cho các trường hợp có lỗi về kỹ thuật trong quá trình sản xuất
														hay lắp đặt.
													</p>
													<div className="bg-orange-50 border-l-4 border-orange-600 p-4 rounded">
														<p className="font-semibold text-orange-800 mb-1">Lưu ý quan trọng:</p>
														<p>
															Quý khách không nên tự sửa chữa mà hãy báo ngay cho chúng tôi qua hotline:{' '}
															<strong className="text-orange-600">1800 7200</strong>.
														</p>
													</div>
												</>
											)}
										</div>
									</div>
								) : (
									<div className="bg-gray-50 p-6 rounded-xl">
										<div className="grid md:grid-cols-2 gap-6">
											<div>
												<h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center">
													<Shield className="w-5 h-5 text-green-600 mr-2" />
													Chính sách bảo hành
												</h3>
												<ul className="space-y-3 text-gray-700">
													<li className="flex items-start space-x-3">
														<div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
														<span>Sản phẩm được bảo hành chính hãng từ nhà cung cấp.</span>
													</li>
													<li className="flex items-start space-x-3">
														<div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
														<span>Đổi trả trong 7 ngày nếu lỗi từ nhà sản xuất.</span>
													</li>
													<li className="flex items-start space-x-3">
														<div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
														<span>Vận chuyển toàn quốc, hỗ trợ lắp đặt nội thành TP.HCM.</span>
													</li>
												</ul>
											</div>
											<div className="bg-white p-4 rounded-lg border border-gray-200">
												<h4 className="font-semibold text-gray-900 mb-3">Hotline hỗ trợ</h4>
												<div className="space-y-2 text-sm">
													<p>
														<strong>Tư vấn:</strong> 1800 7200
													</p>
													<p>
														<strong>Kỹ thuật:</strong> 1800 7201
													</p>
													<p>
														<strong>Email:</strong> support@furnihome.vn
													</p>
													<p>
														<strong>Thời gian:</strong> 8:00 - 18:00 (T2-T7)
													</p>
												</div>
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DetailProduct
