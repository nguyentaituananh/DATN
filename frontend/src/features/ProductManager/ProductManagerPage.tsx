import { ModalConfirmDelete } from '@/components/modals/ModalConfirmDelete'
import { DataTable } from '@/components/shared/DataTable'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ModalProduct from '@/features/ProductManager/components/ModalProduct'
import { createProductColumns } from '@/features/ProductManager/components/productColumns'
import { useDeleteProduct, useGetAllDrafts, useGetAllPublished, usePublishProduct, useUnpublishProduct } from '@/hooks/products/useProducts'
import type { IProduct } from '@/types/products'
import { useState } from 'react'

const ProductManagerPage = () => {
	const [openModal, setOpenModal] = useState(false)
	const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')
	const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null)
	const [selectedStatus, setSelectedStatus] = useState<string>('all')
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
	const [selectedProductId, setSelectedProductId] = useState<string | null>(null)

	const { data: productPublish, isFetching: isFetchingPublish } = useGetAllPublished()
	const { data: productDrafts, isFetching: isFetchingDrafts } = useGetAllDrafts()
	const { mutate: deleteProduct, isPending } = useDeleteProduct()
	const { mutate: publishProduct, isPending: isPublishing } = usePublishProduct()
	const { mutate: unpublishProduct, isPending: isUnpublishing } = useUnpublishProduct()

	// Logic để lấy data và loading state dựa trên selectedStatus
	const getDisplayData = () => {
		switch (selectedStatus) {
			case 'isDraft':
				return {
					data: productDrafts?.metadata ?? [],
					isLoading: isFetchingDrafts
				}
			case 'isPublish':
				return {
					data: productPublish?.metadata ?? [],
					isLoading: isFetchingPublish
				}
			case 'all':
			default:
				return {
					data: [...(productPublish?.metadata ?? []), ...(productDrafts?.metadata ?? [])],
					isLoading: isFetchingPublish || isFetchingDrafts
				}
		}
	}

	const { data: displayData, isLoading } = getDisplayData()

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

	const handleStatusChange = (value: string) => {
		setSelectedStatus(value)
	}

	return (
		<>
			<div className="flex flex-col gap-4 h-full">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-5">
						<Select value={selectedStatus} onValueChange={handleStatusChange}>
							<SelectTrigger className="w-[240px]">
								<SelectValue placeholder="Select Product Status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Tất cả</SelectItem>
								<SelectItem value="isDraft">Draft</SelectItem>
								<SelectItem value="isPublish">Published</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<Button onClick={() => {
						setModalMode('create')
						setSelectedProduct(null)
						setOpenModal(true)
					}}>Thêm mới sản phẩm</Button>
				</div>

				<DataTable
					columns={columns}
					data={displayData}
					isLoading={isLoading || isPending || isPublishing || isUnpublishing}
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