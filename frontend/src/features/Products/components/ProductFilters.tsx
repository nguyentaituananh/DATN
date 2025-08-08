import { Home } from 'lucide-react'
import SearchFilter from './SearchFilter'
import CategoryFilter from './CategoryFilter'
import PriceRangeFilter from './PriceRangeFilter'

interface CategoryItem {
    _id: string
    name: string
    icon: typeof Home
}

interface ProductFiltersProps {
    searchInput: string
    onSearchChange: (value: string) => void
    categories: CategoryItem[]
    selectedCategoryId: string
    onSelectCategory: (id: string) => void
    getCategoryCount: (categoryId: string) => number
    priceRange: [number, number]
    onSelectPriceRange: (min: number, max: number) => void
}

const ProductFilters = ({
    searchInput,
    onSearchChange,
    categories,
    selectedCategoryId,
    onSelectCategory,
    getCategoryCount,
    priceRange,
    onSelectPriceRange,
}: ProductFiltersProps) => {
    return (
        <div className='lg:w-64 space-y-6'>
            <SearchFilter
                searchInput={searchInput}
                onSearchChange={onSearchChange}
            />

            <CategoryFilter
                categories={categories}
                selectedCategoryId={selectedCategoryId}
                onSelectCategory={onSelectCategory}
                getCategoryCount={getCategoryCount}
            />

            <PriceRangeFilter
                priceRange={priceRange}
                onSelectPriceRange={onSelectPriceRange}
            />
        </div>
    )
}

export default ProductFilters
