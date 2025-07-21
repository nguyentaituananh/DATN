'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { ICategory } from '@/types/categories'
import { formatDate } from '@/utils'

interface CategoryColumnsProps {
	onEdit?: (category: ICategory) => void
	onDelete?: (categoryId: string) => void
}

export const createCategoryColumns = ({ onEdit, onDelete }: CategoryColumnsProps): ColumnDef<ICategory>[] => [
	{
		accessorKey: 'name',
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Tên danh mục
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
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
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Ngày tạo
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => {
			const createdAt = row.getValue('createdAt') as string
			return <div className="text-sm">{formatDate(new Date(createdAt), 'MMM dd, yyyy')}</div>
		}
	},
	{
		accessorKey: 'updatedAt',
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Ngày cập nhật
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
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
					<Button onClick={handleEdit} size="icon">
						<Edit className="h-4 w-4" />
					</Button>
					<Button onClick={handleDelete} className="text-red-600" size="icon">
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
			)
		}
	}
]
