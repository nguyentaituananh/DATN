import z from 'zod'
import { useEffect, useId, useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogHeader,
	DialogContent,
	DialogTitle,
	DialogFooter,
	DialogClose,
	DialogBody
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import UploadFile from '@/components/shared/UploadFile'
import { useCreateCategory, useUpdateCategory } from '@/hooks/categories/useCategory'
import type { IModelProps, IUploadResponse } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ICategory } from '@/types/categories'

const categorySchema = z.object({
	name: z.string().min(2, 'Tên danh mục không được để trống').max(100, 'Tên danh mục không được vượt quá 100 ký tự'),
	description: z.string().min(1, 'Mô tả không được để trống').max(500, 'Mô tả không được vượt quá 500 ký tự')
})

type CategoryFormFields = z.infer<typeof categorySchema>

interface ModalAddCategoryProps extends IModelProps {
	categoryData?: ICategory
}

const ModalAddCategory = ({ isOpen, onClose, categoryData }: ModalAddCategoryProps) => {
	const id = useId()
	const [filesUploaded, setFilesUploaded] = useState<IUploadResponse[]>([])
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { isSubmitting, errors }
	} = useForm<CategoryFormFields>({ resolver: zodResolver(categorySchema) })

	const { mutate: createCategory } = useCreateCategory()
	const { mutate: updateCategory } = useUpdateCategory()

	const onSubmit: SubmitHandler<CategoryFormFields> = async (data) => {
		const categoryData_form = {
			...data,
			images: filesUploaded.length > 0 ? filesUploaded[0].url : (categoryData?.images || null)
		}

		if (categoryData) {
			updateCategory({ id: categoryData._id, data: categoryData_form })
		} else createCategory(categoryData_form)
		onClose()
		reset()
		setFilesUploaded([])
	}

	useEffect(() => {
		if (isOpen) {
			if (categoryData) {
				setValue('name', categoryData.name)
				setValue('description', categoryData.description)

				// Set existing image if available
				if (categoryData.images) {
					const existingImage: IUploadResponse = {
						url: categoryData.images,
						public_id: `existing-category-image`,
						asset_id: `existing-category-asset`
					}
					setFilesUploaded([existingImage])
				} else {
					setFilesUploaded([])
				}
			} else {
				reset({ name: '', description: '' })
				setFilesUploaded([])
			}
		}
	}, [isOpen, categoryData, setValue, reset])

	const handleClose = () => {
		onClose()
		reset()
		setFilesUploaded([])
	}

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className="max-w-xl max-h-[90vh]" aria-describedby={undefined}>
				<DialogHeader>
					<DialogTitle>{categoryData ? 'Cập nhật danh mục' : 'Tạo mới danh mục sản phẩm'}</DialogTitle>
				</DialogHeader>
				<DialogBody>
					<form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} id={id}>
						<Input
							label="Tên danh mục"
							placeholder="Nhập tên danh mục"
							{...register('name')}
							error={errors?.name?.message}
						/>
						<Textarea
							rows={4}
							label="Mô tả"
							placeholder="Nhập mô tả"
							{...register('description')}
							error={errors?.description?.message}
						/>

						<UploadFile
							setFilesUploaded={setFilesUploaded}
							title={categoryData ? "Cập nhật hình ảnh danh mục" : "Tải lên hình ảnh danh mục"}
							initialImages={filesUploaded}
						/>
					</form>
				</DialogBody>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline" disabled={isSubmitting} onClick={handleClose}>
							Huỷ
						</Button>
					</DialogClose>
					<Button type="submit" disabled={isSubmitting} form={id}>
						{categoryData ? 'Cập nhật danh mục' : 'Tạo mới danh mục'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default ModalAddCategory