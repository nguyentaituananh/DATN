import { memo } from 'react'
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react'
import type { IProduct } from '@/types/products'
import { toast } from 'sonner'

const formatPrice = (price: number) => new Intl.NumberFormat('vi-VN').format(price) + 'đ'

import placeholderImage from '@/assets/images/placeholder-image.png'
import { useAddFavorite, useRemoveFavorite, useGetFavorites } from '@/hooks/favorites/useFavorites'
import { useAddToCart } from '@/hooks/cart/useCart'
import { useAuth } from '@/hooks/accounts'

interface ProductCardProps {
    product: IProduct
    onProductClick: (id: string) => void
}

const ProductCard = memo(({ product, onProductClick }: ProductCardProps) => {
    const firstImage = product.images?.[0] || placeholderImage
    const rating = Number(product.rating_average || 0)
    const originalPrice = Number(product.original_price || 0)
    const currentPrice = Number(product.price || 0)
    const hasOriginal = originalPrice > currentPrice && originalPrice > 0
    const discountPercent = hasOriginal ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0
    const isOutOfStock = Number(product.quantity || 0) === 0

    const { mutate: addFavorite } = useAddFavorite()
    const { mutate: removeFavorite } = useRemoveFavorite()
    const { data: favoritesData } = useGetFavorites()
    const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart()
    const { isAuthenticated } = useAuth()

    // Kiểm tra xem sản phẩm có trong danh sách yêu thích không
    const isFavorite = favoritesData?.metadata?.some(item => item.product_id._id === product._id)

    const handleToggleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (isFavorite) {
            removeFavorite(product._id)
        } else {
            addFavorite(product._id)
        }
    }

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation()

        if (!isAuthenticated) {
            toast.error('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng')
            return
        }

        if (isOutOfStock) {
            return
        }

        addToCart(product._id)
    }

    return (
        <div
            className={`group relative overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col h-full ${isOutOfStock ? 'border-gray-200 opacity-75' : 'border-gray-100 hover:border-orange-200'
                }`}
            onClick={() => onProductClick(product._id)}
        >
            <div className='relative overflow-hidden flex-shrink-0'>
                <img
                    src={firstImage}
                    alt={product.name}
                    className={`h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110 ${isOutOfStock ? 'grayscale' : ''
                        }`}
                    onError={(e) => {
                        e.currentTarget.src = placeholderImage
                    }}
                />

                {/* Discount Badge */}
                {discountPercent > 0 && (
                    <div className='absolute left-3 top-3 rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white shadow-md'>
                        -{discountPercent}%
                    </div>
                )}

                {/* Out of Stock Badge */}
                {isOutOfStock && (
                    <div className='absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm'>
                        <span className='rounded-lg bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-md'>
                            Hết hàng
                        </span>
                    </div>
                )}

                {/* Action Buttons */}
                <div className='absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                    <button
                        className={`rounded-full p-2 shadow-lg backdrop-blur-sm hover:scale-105 transition-all duration-200 ${isFavorite
                            ? 'bg-red-500 hover:bg-red-600'
                            : 'bg-white/90 hover:bg-white'
                            }`}
                        onClick={handleToggleFavorite}
                        title={isFavorite ? 'Bỏ yêu thích' : 'Yêu thích'}
                    >
                        <Heart
                            size={16}
                            className={`transition-colors ${isFavorite
                                ? 'text-white fill-white'
                                : 'text-gray-600 hover:text-red-500'
                                }`}
                        />
                    </button>
                    <button
                        className='rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm hover:bg-white hover:scale-105 transition-all duration-200'
                        onClick={(e) => {
                            e.stopPropagation()
                            onProductClick(product._id)
                        }}
                        title='Xem chi tiết'
                    >
                        <Eye size={16} className='text-gray-600 hover:text-orange-500 transition-colors' />
                    </button>
                </div>
            </div>

            <div className='p-4 flex flex-col flex-grow'>
                {/* Title - Fixed height */}
                <h3 className='mb-2 text-sm font-semibold text-gray-800 group-hover:text-orange-600 transition-colors h-10 line-clamp-2 leading-5'>
                    {product.name}
                </h3>

                {/* Description - Fixed height */}
                <div className='mb-3 h-10 flex-shrink-0'>
                    {product.description && (
                        <p className='text-xs text-gray-600 leading-5 line-clamp-2'>
                            {product.description}
                        </p>
                    )}
                </div>

                {/* Rating - Fixed height */}
                <div className='mb-3 flex items-center gap-2 h-5 flex-shrink-0'>
                    <div className='flex items-center'>
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={12}
                                className={i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                            />
                        ))}
                    </div>
                    <span className='text-xs text-gray-500 font-medium'>
                        {rating > 0 ? `(${rating.toFixed(1)})` : '(Chưa có đánh giá)'}
                    </span>
                </div>

                {/* Price - Fixed height */}
                <div className='mb-3 flex-shrink-0'>
                    <div className='flex items-center gap-2 mb-1'>
                        <span className='text-lg font-bold text-red-600'>
                            {formatPrice(currentPrice)}
                        </span>
                        {hasOriginal && (
                            <span className='text-xs text-gray-400 line-through'>
                                {formatPrice(originalPrice)}
                            </span>
                        )}
                    </div>

                    {/* Stock Info */}
                    <div className='flex items-center justify-between'>
                        <span className={`text-xs ${isOutOfStock ? 'text-red-500 font-medium' : 'text-gray-600'}`}>
                            {isOutOfStock ? 'Hết hàng' : `Còn ${Number(product.quantity || 0)} sp`}
                        </span>
                        {hasOriginal && (
                            <span className='text-xs text-green-600 font-medium'>
                                Tiết kiệm {formatPrice(originalPrice - currentPrice)}
                            </span>
                        )}
                    </div>
                </div>

                {/* Spacer to push button to bottom */}
                <div className='flex-grow'></div>

                {/* Add to Cart Button - Always at bottom */}
                <button
                    className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${isOutOfStock
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg active:scale-95'
                        } ${isAddingToCart ? 'opacity-75 cursor-not-allowed' : ''}`}
                    onClick={handleAddToCart}
                    disabled={isOutOfStock || isAddingToCart}
                >
                    <ShoppingCart size={14} />
                    {isAddingToCart ? 'Đang thêm...' : isOutOfStock ? 'Hết hàng' : 'Thêm vào giỏ'}
                </button>
            </div>
        </div>
    )
})

ProductCard.displayName = 'ProductCard'

export default ProductCard
