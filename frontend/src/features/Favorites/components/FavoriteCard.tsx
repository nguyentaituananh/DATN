import React from 'react'
import { Heart, Trash2, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { FavoriteProduct } from '@/types/favorites'
import placeholderImage from '@/assets/images/placeholder-image.png'

interface FavoriteCardProps {
    product: FavoriteProduct
    onRemove: (productId: string) => void
    onAddToCart?: (productId: string) => void
}

const formatPrice = (price: number) => new Intl.NumberFormat('vi-VN').format(price) + 'đ'

export const FavoriteCard: React.FC<FavoriteCardProps> = ({
    product,
    onRemove,
    onAddToCart
}) => {
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.src = placeholderImage
    }

    return (
        <div className="group relative bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden">
                <img
                    src={product.imageUrl || placeholderImage}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={handleImageError}
                />

                {/* Remove Button - Top Right */}
                <button
                    onClick={() => onRemove(product.id)}
                    className="absolute top-3 right-3 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm hover:bg-red-50 hover:scale-105 transition-all duration-200 opacity-0 group-hover:opacity-100"
                    title="Xóa khỏi yêu thích"
                >
                    <Heart size={16} className="text-red-500 fill-red-500" />
                </button>

                {/* Favorite Badge - Top Left */}
                <div className="absolute top-3 left-3 rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    ❤️ Yêu thích
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Product Name */}
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 leading-5 min-h-[2.5rem]">
                    {product.name}
                </h3>

                {/* Price */}
                <div className="mb-4">
                    <span className="text-lg font-bold text-red-600">
                        {formatPrice(product.price)}
                    </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <Button
                        onClick={() => onAddToCart?.(product.id)}
                        className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium transition-colors duration-200"
                        size="sm"
                    >
                        <ShoppingCart size={14} className="mr-1" />
                        Thêm vào giỏ
                    </Button>

                    <Button
                        onClick={() => onRemove(product.id)}
                        variant="outline"
                        className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors duration-200"
                        size="sm"
                    >
                        <Trash2 size={14} />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default FavoriteCard
