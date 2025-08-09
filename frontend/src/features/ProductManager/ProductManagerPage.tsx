import { ModalConfirmDelete } from '@/components/modals/ModalConfirmDelete'
import { DataTable } from '@/components/shared/DataTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ModalProduct from '@/features/ProductManager/components/ModalProduct'
import { createProductColumns } from '@/features/ProductManager/components/productColumns'
import { useGetCategories } from '@/hooks/categories/useCategory'
import {
	useDeleteProduct,
	useGetAllDrafts,
	useGetAllPublished,
	usePublishProduct,
	useUnpublishProduct
} from '@/hooks/products/useProducts'
import type { IProduct } from '@/types/products'
import { useState, useMemo } from 'react'

const ProductManagerPage = () => {
	const [openModal, setOpenModal] = useState(false)
	const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')
	const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null)
	const [selectedStatus, setSelectedStatus] = useState<string>('all')
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
	const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedCategory, setSelectedCategory] = useState<string>('all')

	const { data: productPublish, isFetching: isFetchingPublish } = useGetAllPublished()
	const { data: productDrafts, isFetching: isFetchingDrafts } = useGetAllDrafts()
	const { data: categoriesData } = useGetCategories()
	const { mutate: deleteProduct, isPending } = useDeleteProduct()
	const { mutate: publishProduct, isPending: isPublishing } = usePublishProduct()
	const { mutate: unpublishProduct, isPending: isUnpublishing } = useUnpublishProduct()

	const allProducts = useMemo(() => {
		const published = productPublish?.metadata ?? []
		const drafts = productDrafts?.metadata ?? []
		return [...published, ...drafts]
	}, [productPublish, productDrafts])

	const filteredData = useMemo(() => {
		let data = allProducts

		if (selectedStatus !== 'all') {
			data = data.filter((p) => (selectedStatus === 'isPublish' ? p.isPublish : !p.isPublish))
		}

		if (selectedCategory !== 'all') {
			data = data.filter((p) => p.category_id._id === selectedCategory)
		}

		if (searchTerm) {
			data = data.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
		}

		return data
	}, [allProducts, selectedStatus, selectedCategory, searchTerm])

	const columns = createProductColumns({
		onEdit: (product) => {
			setSelectedProduct(product)
			setModalMode('edit')
			setOpenModal(true)
		},
		onDelete: (productId) => {
			setOpenDeleteDialog(true)
			setSelectedProductId(productId)
		},
		onPublish: (productId) => {
			publishProduct(productId)
		},
		onUnpublish: (productId) => {
			unpublishProduct(productId)
		}
	})

	const categories = useMemo(() => {
		return categoriesData?.metadata?.categories || []
	}, [categoriesData])
	

	return (
		<>
			<div className="flex flex-col gap-4 h-full">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-5">
						<Input
							placeholder="Tìm kiếm theo tên sản phẩm..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-[240px]"
						/>
						<Select value={selectedCategory} onValueChange={setSelectedCategory}>
							<SelectTrigger className="w-[240px]">
								<SelectValue placeholder="Chọn danh mục" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Tất cả danh mục</SelectItem>
								{categories?.map((category) => (
									<SelectItem key={category._id} value={category._id}>
										{category.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Select value={selectedStatus} onValueChange={setSelectedStatus}>
							<SelectTrigger className="w-[240px]">
								<SelectValue placeholder="Chọn trạng thái" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Tất cả trạng thái</SelectItem>
								<SelectItem value="isDraft">Bản nháp</SelectItem>
								<SelectItem value="isPublish">Đã xuất bản</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<Button
						onClick={() => {
							setModalMode('create')
							setSelectedProduct(null)
							setOpenModal(true)
						}}
					>
						Thêm mới sản phẩm
					</Button>
				</div>

				<DataTable
					columns={columns}
					data={filteredData}
					isLoading={isFetchingPublish || isFetchingDrafts || isPending || isPublishing || isUnpublishing}
				/>
			</div>

			{openModal && (
				<ModalProduct
					isOpen={openModal}
					onClose={() => {
						setOpenModal(false)
						setSelectedProduct(null)
						setModalMode('create')
					}}
					productData={selectedProduct}
					mode={modalMode}
				/>
			)}

			{openDeleteDialog && (
				<ModalConfirmDelete
					isOpen={openDeleteDialog}
					onClose={() => {
						setOpenDeleteDialog(false)
						setSelectedProductId(null)
					}}
					onConfirm={() => {
						if (selectedProductId) deleteProduct(selectedProductId)
					}}
				/>
			)}
		</>
	)
}

export default ProductManagerPage
