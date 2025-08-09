import type { ColumnDef } from '@tanstack/react-table'
import { Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { ICategory } from '@/types/categories'
import { formatDate } from '@/utils'

import placeholderImage from '@/assets/images/placeholder-image.png'

interface CategoryColumnsProps {
	onEdit?: (category: ICategory) => void
	onDelete?: (categoryId: string) => void
}

export const createCategoryColumns = ({ onEdit, onDelete }: CategoryColumnsProps): ColumnDef<ICategory>[] => [
	{
		accessorKey: 'images',
		header: 'Hình ảnh',
		cell: ({ row }) => {
			const images = row.getValue('images') as string | null
			return (
				<div className="w-16 h-16">
					<img
						src={images ?? placeholderImage}
						alt={row.getValue('name') as string}
						className="w-full h-full object-cover rounded-md border"
					/>
				</div>
			)
		}
	},
	{
		accessorKey: 'name',
		header: 'Tên danh mục',
		cell: ({ row }) => {
			const name = row.getValue('name') as string
			return <div className="font-medium">{name}</div>
		}
	},
	{
		accessorKey: 'description',
		header: 'Mô tả',
		cell: ({ row }) => {
			const description = row.getValue('description') as string
			return (
				<div className="max-w-[200px] truncate" title={description}>
					{description}
				</div>
			)
		}
	},
	{
		accessorKey: 'createdAt',
		header: 'Ngày tạo',
		cell: ({ row }) => {
			const createdAt = row.getValue('createdAt') as string
			return <div className="text-sm">{formatDate(new Date(createdAt), 'MMM dd, yyyy')}</div>
		}
	},
	{
		accessorKey: 'updatedAt',
		header: 'Ngày tạo',
		cell: ({ row }) => {
			const updatedAt = row.getValue('updatedAt') as string
			return <div className="text-sm">{formatDate(new Date(updatedAt), 'MMM dd, yyyy')}</div>
		}
	},
	{
		id: 'actions',
		enableHiding: false,
		header: 'Hành động',
		cell: ({ row }) => {
			const category = row.original

			const handleEdit = () => {
				onEdit?.(category)
			}

			const handleDelete = () => {
				onDelete?.(category._id)
			}

			return (
				<div className="flex items-center gap-4">
					<Button onClick={handleEdit} size="icon" variant="outline">
						<Edit className="h-4 w-4" />
					</Button>
					<Button onClick={handleDelete} size="icon" variant="destructive">
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
			)
		}
	}
]