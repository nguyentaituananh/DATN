'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Edit, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { IProduct } from '@/types/products'
import { formatDate } from '@/utils'

interface ProductColumnsProps {
	onEdit?: (product: IProduct) => void
	onDelete?: (productId: string) => void
}

export const createProductColumns = ({ onEdit, onDelete }: ProductColumnsProps): ColumnDef<IProduct>[] => [
	{
		accessorKey: '_id',
		header: 'ID sản phẩm',
		cell: ({ row }) => <div className="font-mono text-xs text-muted-foreground">{row.getValue('_id')}</div>
	},
	{
		accessorKey: 'name',
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					{'Tên sản phẩm'}
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>
	},
	{
		accessorKey: 'price',
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					{'Giá'}
					<ArrowUpDown className="h-4 w-4" />
				</Button>
			)
		},
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
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					{'Số lượng'}
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => <div className="text-center">{row.getValue('quantity')}</div>
	},
	{
		accessorKey: 'isPublish',
		header: 'Trạng thái', // Không cần sắp xếp cho trạng thái
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
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					{'Ngày tạo'}
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => {
			const createdAt = row.getValue('createdAt') as string
			return <div className="text-sm">{formatDate(createdAt, 'MMM dd, yyyy')}</div>
		}
	},
	{
		accessorKey: 'updatedAt',
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					{'Ngày cập nhật'}
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => {
			const updatedAt = row.getValue('updatedAt') as string
			return <div className="text-sm">{formatDate(updatedAt, 'MMM dd, yyyy')}</div>
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

			return (
				<div className="flex items-center gap-2">
					<Button onClick={handleEdit} size="icon" variant="ghost">
						<Edit className="h-4 w-4" />
					</Button>
					<Button
						onClick={handleDelete}
						size="icon"
						variant="ghost"
						className="text-destructive hover:text-destructive/80"
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
			)
		}
	}
]
