import type { ColumnDef } from '@tanstack/react-table'
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { IProduct } from '@/types/products'
import { formatDate } from '@/utils'

interface ProductColumnsProps {
	onEdit?: (product: IProduct) => void
	onDelete?: (productId: string) => void
	onPublish?: (productId: string) => void
	onUnpublish?: (productId: string) => void
}

export const createProductColumns = ({ onEdit, onDelete, onPublish, onUnpublish }: ProductColumnsProps): ColumnDef<IProduct>[] => [
	{
		accessorKey: '_id',
		header: 'ID sản phẩm',
		cell: ({ row }) => <div className="font-mono text-xs text-muted-foreground">{row.getValue('_id')}</div>
	},
	{
		accessorKey: 'name',
		header: 'Tên sản phẩm',
		cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>
	},
	{
		accessorKey: 'category_id',
		header: 'Danh mục',
		cell: ({ row }) => {
			const category = row.original.category_id
			return <div className="font-medium">{category?.name}</div>
		}
	},
	{
		accessorKey: 'price',
		header: 'Giá',
		cell: ({ row }) => {
			const price = Number.parseFloat(row.getValue('price'))
			const formatted = new Intl.NumberFormat('vi-VN', {
				style: 'currency',
				currency: 'VND'
			}).format(price)

			return <div className="text-right font-medium">{formatted}</div>
		}
	},
	{
		accessorKey: 'quantity',
		header: 'Số lượng',
		cell: ({ row }) => <div className="text-center">{row.getValue('quantity')}</div>
	},
	{
		accessorKey: 'isPublish',
		header: 'Trạng thái',
		cell: ({ row }) => {
			const isPublished = row.getValue('isPublish')
			return (
				<Badge variant={isPublished ? 'default' : 'secondary'}>
					{isPublished ? 'Đã xuất bản' : 'Bản nháp'}
				</Badge>
			)
		}
	},
	{
		accessorKey: 'createdAt',
		header: 'Ngày tạo',
		cell: ({ row }) => {
			const createdAt = row.getValue('createdAt') as string
			return <div className="text-sm">{formatDate(createdAt, 'MMM dd, yyyy')}</div>
		}
	},
	{
		id: 'actions',
		enableHiding: false,
		header: 'Hành động',
		cell: ({ row }) => {
			const product = row.original
			const handleEdit = () => {
				onEdit?.(product)
			}
			const handleDelete = () => {
				onDelete?.(product._id)
			}
			const handlePublish = () => {
				onPublish?.(product._id)
			}
			const handleUnpublish = () => {
				onUnpublish?.(product._id)
			}

			return (
				<div className="flex items-center gap-2">
					<Button onClick={handleEdit} size="icon" variant="outline" title="Chỉnh sửa">
						<Edit className="h-4 w-4" />
					</Button>

					{product.isPublish ? (
						<Button onClick={handleUnpublish} size="icon" variant="outline" title="Chuyển về Draft">
							<EyeOff className="h-4 w-4" />
						</Button>
					) : (
						<Button onClick={handlePublish} size="icon" variant="outline" title="Xuất bản">
							<Eye className="h-4 w-4" />
						</Button>
					)}

					<Button
						onClick={handleDelete}
						size="icon"
						variant="destructive"
						title="Xóa"
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
			)
		}
	}
]
