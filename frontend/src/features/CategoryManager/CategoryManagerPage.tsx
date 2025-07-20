import { ModalConfirmDelete } from '@/components/modals/ModalConfirmDelete'
import { DataTable } from '@/components/shared/DataTable'
import { Button } from '@/components/ui/button'
import { createCategoryColumns } from '@/features/CategoryManager/components/categoryColumns'
import ModalAddCategory from '@/features/CategoryManager/components/ModalAddCategory'
import { useDeleteCategory, useGetCategories } from '@/hooks/categories/useCategory'
import type { ICategory } from '@/types/categories'
import { CirclePlus } from 'lucide-react'
import { useState } from 'react'

const CategoryManagerPage = () => {
	const [openModal, setOpenModal] = useState(false)
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
	const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
	const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null)

	const { data } = useGetCategories()
	const { mutate: deleteCategory } = useDeleteCategory()

	const columns = createCategoryColumns({
		onEdit: (categoryData) => {
			setOpenModal(true)
			setSelectedCategory(categoryData)
		},
		onDelete: (categoryId) => {
			setOpenDeleteDialog(true)
			setSelectedCategoryId(categoryId)
		}
	})

	return (
		<>
			<div className="flex flex-col gap-4">
				<div className="flex items-center justify-end">
					<Button
						onClick={() => {
							setSelectedCategory(null)
							setOpenModal(true)
						}}
					>
						<CirclePlus />
						Thêm mới danh mục
					</Button>
				</div>
				<div className="">
					<DataTable
						columns={columns}
						data={data?.metadata.categories || []}
						searchKey="name"
						searchPlaceholder="Tìm kiếm theo tên danh mục"
						showColumnToggle={true}
						showPagination={true}
						showRowSelection={true}
					/>
				</div>
			</div>

			{openModal && (
				<ModalAddCategory
					isOpen={openModal}
					onClose={() => setOpenModal(false)}
					categoryData={selectedCategory ?? undefined}
				/>
			)}

			{openDeleteDialog && (
				<ModalConfirmDelete
					isOpen={openDeleteDialog}
					onClose={() => {
						setOpenDeleteDialog(false)
						setSelectedCategory(null)
					}}
					onConfirm={() => {
						if (selectedCategoryId) deleteCategory(selectedCategoryId)
					}}
				/>
			)}
		</>
	)
}

export default CategoryManagerPage
