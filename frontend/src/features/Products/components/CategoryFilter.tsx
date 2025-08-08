import { Filter, Home } from 'lucide-react'

interface CategoryItem {
    _id: string
    name: string
    icon: typeof Home
}

interface CategoryFilterProps {
    categories: CategoryItem[]
    selectedCategoryId: string
    onSelectCategory: (id: string) => void
    getCategoryCount: (categoryId: string) => number
}

const CategoryFilter = ({
    categories,
    selectedCategoryId,
    onSelectCategory,
    getCategoryCount
}: CategoryFilterProps) => {
    return (
        <div className='rounded-lg bg-white p-3 shadow-sm'>
            <h3 className='mb-4 flex items-center gap-2 font-semibold text-gray-800'>
                <Filter size={18} />
                Danh mục sản phẩm
            </h3>
            <div className='space-y-2'>
                {categories.map((category) => {
                    const IconComponent = category.icon
                    const count = getCategoryCount(category._id)
                    const active = selectedCategoryId === category._id

                    return (
                        <button
                            key={category._id}
                            onClick={() => onSelectCategory(category._id)}
                            className={`w-full flex items-center justify-between p-3 rounded-lg text-sm transition-colors ${active
                                ? 'border border-orange-200 bg-orange-50 text-orange-600'
                                : 'text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <div className='flex items-center gap-3'>
                                <IconComponent size={16} />
                                <span>{category.name}</span>
                            </div>
                            <span className='rounded-full bg-gray-100 px-2 py-1 text-xs'>
                                {count}
                            </span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default CategoryFilter
