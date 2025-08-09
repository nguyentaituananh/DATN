import { Home } from 'lucide-react'
import type { IProduct } from '@/types/products'
import ProductCard from './ProductCard'

interface ProductGridProps {
    products: IProduct[]
    viewMode: 'grid' | 'list'
    onProductClick: (id: string) => void
}

const ProductGrid = ({ products, viewMode, onProductClick }: ProductGridProps) => {
    if (products.length === 0) {
        return (
            <div className='py-12 text-center'>
                <Home size={48} className='mx-auto mb-4 text-gray-400' />
                <h3 className='mb-2 text-lg font-medium text-gray-600'>Không tìm thấy sản phẩm</h3>
                <p className='text-gray-500'>Thử thay đổi bộ lọc để xem thêm sản phẩm</p>
            </div>
        )
    }

    return (
        <div className={`grid gap-6 ${viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'
            }`}>
            {products.map((product) => (
                <ProductCard
                    key={product._id}
                    product={product}
                    onProductClick={onProductClick}
                />
            ))}
        </div>
    )
}

export default ProductGrid
