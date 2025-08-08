import { useState, useMemo, useCallback } from 'react'
import { Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useGetAllPublished } from '@/hooks/products/useProducts'
import type { IProduct } from '@/types/products'
import { useGetCategories } from '@/hooks/categories/useCategory'
import { useDebounce } from '@/hooks/useDebounce'
import ProductFilters from './components/ProductFilters'
import ProductToolbar from './components/ProductToolbar'
import ProductGrid from './components/ProductGrid'

type SortKey = 'name' | 'price-low' | 'price-high' | 'rating'

type CategoryItem = { _id: string; name: string; icon: typeof Home }

const ProductsPage = () => {
	const navigate = useNavigate()
	const [searchInput, setSearchInput] = useState('')
	const debouncedSearch = useDebounce(searchInput, 300)
	const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all')
	const [sortBy, setSortBy] = useState<SortKey>('name')
	const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
	const [priceRange, setPriceRange] = useState<[number, number]>([0, 50_000_000])

	const { data: productsData, isLoading: isLoadingProducts } = useGetAllPublished()
	const { data: categoriesData, isLoading: isLoadingCategories } = useGetCategories()

	const products: IProduct[] = useMemo(() => productsData?.metadata || [], [productsData])

	const categories: CategoryItem[] = useMemo(() => {
		const base: CategoryItem[] = [{ _id: 'all', name: 'Tất cả sản phẩm', icon: Home }]
		const fetched = categoriesData?.metadata?.categories || []
		return base.concat(
			fetched.map((cat: { _id: string; name: string }) => ({ _id: String(cat._id), name: cat.name, icon: Home }))
		)
	}, [categoriesData])

	// Precompute counts per category id for quick rendering
	const productCountsByCategoryId = useMemo(() => {
		const map = new Map<string, number>()
		for (const p of products) {
			const id = String(p.category_id?._id || '')
			if (!id) continue
			map.set(id, (map.get(id) || 0) + 1)
		}
		return map
	}, [products])

	const filteredProducts = useMemo(() => {
		const term = debouncedSearch.trim().toLowerCase()
		const [minP, maxP] = priceRange
		const byCategory = selectedCategoryId !== 'all' ? selectedCategoryId : null

		let list = products
		if (term) {
			list = list.filter((p) =>
				p.name?.toLowerCase().includes(term) || p.description?.toLowerCase().includes(term)
			)
		}
		if (byCategory) {
			list = list.filter((p) => String(p.category_id?._id || '') === byCategory)
		}
		list = list.filter((p) => {
			const price = Number(p.price || 0)
			return price >= minP && price <= maxP
		})

		const sorted = [...list]
		switch (sortBy) {
			case 'price-low':
				sorted.sort((a, b) => Number(a.price || 0) - Number(b.price || 0))
				break
			case 'price-high':
				sorted.sort((a, b) => Number(b.price || 0) - Number(a.price || 0))
				break
			case 'rating':
				sorted.sort((a, b) => Number(b.rating_average || 0) - Number(a.rating_average || 0))
				break
			case 'name':
			default:
				sorted.sort((a, b) => (a.name || '').localeCompare(b.name || ''))
		}
		return sorted
	}, [products, debouncedSearch, selectedCategoryId, priceRange, sortBy])

	const onSelectCategory = useCallback((id: string) => setSelectedCategoryId(id), [])
	const onSetViewMode = useCallback((mode: 'grid' | 'list') => setViewMode(mode), [])
	const onSelectPriceRange = useCallback((min: number, max: number) => setPriceRange([min, max]), [])
	const onChangeSort = useCallback((v: SortKey) => setSortBy(v), [])
	const onProductClick = useCallback((id: string) => navigate(`/product/${id}`), [navigate])
	const onSearchChange = useCallback((value: string) => setSearchInput(value), [])

	// Get category count function
	const getCategoryCount = useCallback((categoryId: string) => {
		if (categoryId === 'all') return products.length
		return productCountsByCategoryId.get(categoryId) || 0
	}, [products.length, productCountsByCategoryId])

	const isLoading = isLoadingProducts || isLoadingCategories
	if (isLoading) return <div>Đang tải sản phẩm và danh mục...</div>

	return (
		<div className='min-h-screen bg-gray-50'>
			<div className='mx-auto max-w-7xl px-4 py-8'>
				<div className='flex flex-col lg:flex-row gap-8'>
					<ProductFilters
						searchInput={searchInput}
						onSearchChange={onSearchChange}
						categories={categories}
						selectedCategoryId={selectedCategoryId}
						onSelectCategory={onSelectCategory}
						getCategoryCount={getCategoryCount}
						priceRange={priceRange}
						onSelectPriceRange={onSelectPriceRange}
					/>

					<div className='flex-1'>
						<ProductToolbar
							productsCount={filteredProducts.length}
							sortBy={sortBy}
							onChangeSort={onChangeSort}
							viewMode={viewMode}
							onSetViewMode={onSetViewMode}
						/>

						<ProductGrid
							products={filteredProducts}
							viewMode={viewMode}
							onProductClick={onProductClick}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductsPage
