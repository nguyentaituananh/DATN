const formatPrice = (price: number) => new Intl.NumberFormat('vi-VN').format(price) + 'đ'

const PRICE_RANGES = [
    { label: 'Dưới 5 triệu', min: 0, max: 5_000_000 },
    { label: '5 - 10 triệu', min: 5_000_000, max: 10_000_000 },
    { label: '10 - 20 triệu', min: 10_000_000, max: 20_000_000 },
    { label: 'Trên 20 triệu', min: 20_000_000, max: 50_000_000 },
] as const

interface PriceRangeFilterProps {
    priceRange: [number, number]
    onSelectPriceRange: (min: number, max: number) => void
}

const PriceRangeFilter = ({ priceRange, onSelectPriceRange }: PriceRangeFilterProps) => {
    return (
        <div className='rounded-lg bg-white p-4 shadow-sm'>
            <h3 className='mb-4 font-semibold text-gray-800'>Khoảng giá</h3>
            <div className='space-y-3'>
                {PRICE_RANGES.map((range) => (
                    <button
                        key={range.label}
                        onClick={() => onSelectPriceRange(range.min, range.max)}
                        className='block w-full rounded px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50'
                    >
                        {range.label}
                    </button>
                ))}
            </div>
            <div className='mt-3 text-xs text-gray-500'>
                Hiện tại: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
            </div>
        </div>
    )
}

export default PriceRangeFilter
