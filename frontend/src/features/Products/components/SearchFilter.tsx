import { Search, X } from 'lucide-react'

interface SearchFilterProps {
    searchInput: string
    onSearchChange: (value: string) => void
}

const SearchFilter = ({ searchInput, onSearchChange }: SearchFilterProps) => {
    return (
        <div className='rounded-lg bg-white p-3 shadow-sm'>
            <div className='flex items-center gap-2 rounded border border-gray-200 px-2 py-1'>
                <Search size={16} className='text-gray-500' />
                <input
                    value={searchInput}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder='Tìm sản phẩm...'
                    className='w-full bg-transparent py-2 text-sm outline-none'
                />
                {searchInput && (
                    <button
                        onClick={() => onSearchChange('')}
                        className='text-gray-400 hover:text-gray-600'
                    >
                        <X size={14} />
                    </button>
                )}
            </div>
        </div>
    )
}

export default SearchFilter
