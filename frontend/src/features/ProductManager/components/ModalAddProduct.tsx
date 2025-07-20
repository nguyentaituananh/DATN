import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import UploadFile from '@/components/shared/UploadFile'
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
import type { IModelProps, IUploadResponse } from '@/types'
import { useId, useState } from 'react'
import { useGetCategories } from '@/hooks/categories/useCategory'
import { useForm, type SubmitHandler } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateProduct } from '@/hooks/products/useProducts'

const productSchema = z.object({
	name: z.string().min(1, 'Tên sản phẩm không được để trống'),
	description: z.string().min(1, 'Mô tả sản phẩm không được để trống').max(1000),
	price: z.string().min(1, 'Giá sản phẩm không được để trống'),
	quantity: z.string().min(1, 'Số lượng không được để trống'),
	category: z.string().min(1, 'Danh mục không được để trống')
})

export type IProductForm = z.infer<typeof productSchema>

const ModalAddProduct = ({ isOpen, onClose }: IModelProps) => {
	const id = useId()
	const { data } = useGetCategories()
	const [filesUploaded, setFilesUploaded] = useState<IUploadResponse[]>([])

	const { mutate: createProduct } = useCreateProduct()

	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		formState: { isSubmitting, errors }
	} = useForm<IProductForm>({ resolver: zodResolver(productSchema) })

	const handleChangeSelect = (value: string) => {
		setValue('category', value, {
			shouldValidate: true
		})
	}

	const onSubmit: SubmitHandler<IProductForm> = async (data) => {
		const values = {
			...data,
			category_id: data.category,
			images: filesUploaded.map((file) => file.url)
		}

		await createProduct(values)
		onClose()
		setFilesUploaded([])
	}

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-2xl max-h-[90vh] w-full" aria-describedby={undefined}>
				<DialogHeader>
					<DialogTitle>Thêm mới sản phẩm</DialogTitle>
				</DialogHeader>
				<DialogBody>
					<form className="space-y-4" onSubmit={handleSubmit(onSubmit)} id={id}>
						<Input
							{...register('name')}
							label="Tên sản phẩm"
							placeholder="Nhập tên sản phẩm"
							error={errors?.name?.message}
						/>
						<Textarea
							{...register('description')}
							label="Mô tả sản phẩm"
							placeholder="Nhập mô tả"
							error={errors?.description?.message}
						/>
						<Input
							{...register('price')}
							label="Giá sản phẩm"
							type="number"
							placeholder="Nhập giá sản phẩm"
							error={errors?.price?.message}
						/>
						<Input
							{...register('quantity')}
							label="Số lượng"
							type="number"
							placeholder="Nhập số lượng"
							error={errors?.quantity?.message}
						/>
						<div className="flex flex-col gap-1">
							<Select
								name="category"
								value={getValues('category')}
								onValueChange={(value) => handleChangeSelect(value)}
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Chọn danh mục sản phẩm" />
								</SelectTrigger>
								<SelectContent className="w-full">
									{data?.metadata.categories.map((category) => (
										<SelectItem key={category._id} value={category._id}>
											{category.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{errors?.category?.message && (
								<span className="text-sm text-destructive">{errors.category.message}</span>
							)}
						</div>

						<UploadFile setFilesUploaded={setFilesUploaded} title="Tải lên hình ảnh sản phẩm" />
					</form>
				</DialogBody>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline" disabled={isSubmitting}>
							Huỷ
						</Button>
					</DialogClose>
					<Button type="submit" disabled={isSubmitting} form={id}>
						Thêm sản phẩm
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default ModalAddProduct
