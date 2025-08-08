import { Grid, List } from 'lucide-react'

type SortKey = 'name' | 'price-low' | 'price-high' | 'rating'

interface ProductToolbarProps {
    productsCount: number
    sortBy: SortKey
    onChangeSort: (sortKey: SortKey) => void
    viewMode: 'grid' | 'list'
    onSetViewMode: (mode: 'grid' | 'list') => void
}

const ProductToolbar = ({
    productsCount,
    sortBy,
    onChangeSort,
    viewMode,
    onSetViewMode,
}: ProductToolbarProps) => {
    return (
        <div className='mb-6 rounded-lg bg-white p-4 shadow-sm'>
            <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
                <div className='text-sm text-gray-600'>
                    Hiển thị {productsCount} sản phẩm
                </div>

                <div className='flex items-center gap-4'>
                    <select
                        value={sortBy}
                        onChange={(e) => onChangeSort(e.target.value as SortKey)}
                        className='rounded border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500'
                    >
                        <option value='name'>Tên A-Z</option>
                        <option value='price-low'>Giá thấp đến cao</option>
                        <option value='price-high'>Giá cao đến thấp</option>
                        <option value='rating'>Đánh giá cao nhất</option>
                    </select>

                    <div className='flex overflow-hidden rounded border border-gray-200'>
                        <button
                            onClick={() => onSetViewMode('grid')}
                            className={`p-2 ${viewMode === 'grid'
                                    ? 'bg-orange-500 text-white'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            <Grid size={16} />
                        </button>
                        <button
                            onClick={() => onSetViewMode('list')}
                            className={`p-2 ${viewMode === 'list'
                                    ? 'bg-orange-500 text-white'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            <List size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductToolbar
