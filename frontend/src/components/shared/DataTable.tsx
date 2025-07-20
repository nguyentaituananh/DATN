'use client'

import * as React from 'react'
import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
	type VisibilityState
} from '@tanstack/react-table'
import { ChevronDown, CirclePlus, Loader2, Search, Settings2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	searchKey?: string
	searchPlaceholder?: string
	showColumnToggle?: boolean
	showPagination?: boolean
	showRowSelection?: boolean
	loading?: boolean
	title?: string
	description?: string
	onAddNew?: () => void
	addNewLabel?: string
}

export function DataTable<TData, TValue>({
	columns,
	data,
	searchKey,
	searchPlaceholder = 'Tìm kiếm...',
	showColumnToggle = true,
	showPagination = true,
	loading = false,
	title,
	description,
	onAddNew,
	addNewLabel = 'Thêm mới'
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = React.useState({})

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection
		}
	})

	return (
		<div className="w-full h-full flex flex-col">
			{/* Header Section */}
			{(title || description) && (
				<div className="space-y-2 flex-shrink-0 mb-6">
					{title && <h2 className="text-2xl font-bold tracking-tight">{title}</h2>}
					{description && <p className="text-muted-foreground">{description}</p>}
				</div>
			)}

			{/* Controls Section */}
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between flex-shrink-0 mb-6">
				<div className="flex flex-1 items-center space-x-2">
					{searchKey && (
						<div className="relative max-w-sm">
							<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								placeholder={searchPlaceholder}
								value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
								onChange={(event) => table.getColumn(searchKey)?.setFilterValue(event.target.value)}
								className="pl-9 w-[300px]"
								disabled={loading}
							/>
						</div>
					)}
				</div>

				<div className="flex items-center space-x-2">
					{showColumnToggle && (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" size="sm" disabled={loading} className="h-8 bg-transparent">
									<Settings2 className="mr-2 h-4 w-4" />
									Cột hiển thị
									<ChevronDown className="ml-2 h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-[200px]">
								{table
									.getAllColumns()
									.filter((column) => column.getCanHide())
									.map((column) => {
										return (
											<DropdownMenuCheckboxItem
												key={column.id}
												className="capitalize"
												checked={column.getIsVisible()}
												onCheckedChange={(value) => column.toggleVisibility(!!value)}
											>
												{column.id}
											</DropdownMenuCheckboxItem>
										)
									})}
							</DropdownMenuContent>
						</DropdownMenu>
					)}

					{onAddNew && (
						<Button onClick={onAddNew} disabled={loading}>
							<CirclePlus />
							{addNewLabel}
						</Button>
					)}
				</div>
			</div>

			{/* Table Section - Takes remaining space */}
			<div className="rounded-lg border bg-card flex-1 flex flex-col min-h-0">
				{/* Table Content - Both horizontal and vertical scroll */}
				<div className="flex-1 overflow-auto">
					<Table className="min-w-max overflow-x-auto">
						<TableHeader className="sticky top-0 bg-background z-10">
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id} className="hover:bg-transparent border-b">
									{headerGroup.headers.map((header) => {
										return (
											<TableHead
												key={header.id}
												className="h-12 px-4 text-left align-middle font-medium text-muted-foreground whitespace-nowrap"
												style={{ width: header.getSize() ? `${header.getSize()}px` : 'auto' }}
											>
												{header.isPlaceholder
													? null
													: flexRender(header.column.columnDef.header, header.getContext())}
											</TableHead>
										)
									})}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{loading ? (
								<TableRow>
									<TableCell colSpan={columns.length} className="h-32 text-center">
										<div className="flex flex-col items-center justify-center space-y-3">
											<Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
											<p className="text-sm text-muted-foreground">Đang tải dữ liệu...</p>
										</div>
									</TableCell>
								</TableRow>
							) : table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow
										key={row.id}
										data-state={row.getIsSelected() && 'selected'}
										className="borer border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell
												key={cell.id}
												className="px-4 py-3 whitespace-nowrap"
												style={{
													width: cell.column.getSize() ? `${cell.column.getSize()}px` : 'auto'
												}}
											>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan={columns.length} className="h-32 text-center">
										<div className="flex flex-col items-center justify-center space-y-3">
											<div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
												<Search className="h-5 w-5 text-muted-foreground" />
											</div>
											<div className="space-y-1">
												<p className="text-sm font-medium">Không tìm thấy kết quả</p>
												<p className="text-xs text-muted-foreground">
													Thử thay đổi bộ lọc hoặc tìm kiếm khác
												</p>
											</div>
										</div>
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>

				{/* Pagination Footer - Inside table with border separator */}
				{showPagination && (
					<div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex-shrink-0">
						<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-4">
							<div className="text-sm text-muted-foreground">
								<span>Tổng số bản ghi: {table.getFilteredRowModel().rows.length}</span>
							</div>

							<div className="flex items-center space-x-6 lg:space-x-8">
								<div className="flex items-center space-x-2">
									<p className="text-sm font-medium">Hàng mỗi trang</p>
									<Select
										value={table.getState().pagination.pageSize.toString()}
										onValueChange={(value) => table.setPageSize(Number(value))}
										disabled={loading}
									>
										<SelectTrigger className="w-[120px] h-8">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{[10, 20, 30, 40, 50].map((size) => (
												<SelectItem key={size} value={size.toString()}>
													{size} hàng
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div className="flex w-[100px] items-center justify-center text-sm font-medium">
									Trang {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
								</div>

								<div className="flex items-center space-x-2">
									<Button
										variant="outline"
										size="sm"
										onClick={() => table.previousPage()}
										disabled={!table.getCanPreviousPage() || loading}
										className="h-8 w-8 p-0"
									>
										←
									</Button>
									<Button
										variant="outline"
										size="sm"
										onClick={() => table.nextPage()}
										disabled={!table.getCanNextPage() || loading}
										className="h-8 w-8 p-0"
									>
										→
									</Button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
