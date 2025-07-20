import { DataTable } from '@/components/shared/DataTable'
import ModalAddProduct from '@/features/ProductManager/components/ModalAddProduct'
import { createProductColumns } from '@/features/ProductManager/components/productColumns'
import { useGetProducts } from '@/hooks/products/useProducts'
import { useState } from 'react'

const ProductManagerPage = () => {
	const [openModal, setOpenModal] = useState(false)

	const { data: products, isFetching } = useGetProducts({ isDraft: false })

	const columns = createProductColumns({
		onEdit: () => {},
		onDelete: () => {}
	})

	return (
		<>
			<div className="flex flex-col gap-4 h-full">
				<DataTable
					columns={columns}
					data={products?.metadata || []}
					searchKey="name"
					searchPlaceholder="Tìm kiếm theo tên sản phẩm"
					showColumnToggle={true}
					showPagination={true}
					showRowSelection={true}
					loading={isFetching}
					onAddNew={() => setOpenModal(true)}
					addNewLabel="Thêm mới sản phẩm"
					title="Quản lý sản phẩm"
				/>
			</div>

			{openModal && <ModalAddProduct isOpen={openModal} onClose={() => setOpenModal(false)} />}
		</>
	)
}

export default ProductManagerPage
