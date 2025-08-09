import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  type HeaderGroup,
  type Header,
  type Row,
  type Cell,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

import NoData from "@/assets/images/no-data.jpg"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  showPagination?: boolean
  pageSize?: number
  isLoading?: boolean
  emptyMessage?: string
  className?: string
  showSTT?: boolean
  height?: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  showPagination = true,
  pageSize = 10,
  isLoading = false,
  emptyMessage = "No Data Found.",
  className,
  showSTT = true,
  height = "80vh",
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  // Tạo cột STT
  const sttColumn: ColumnDef<TData, TValue> = {
    id: "stt",
    header: "STT",
    cell: ({ row }) => {
      const currentPage = table.getState().pagination.pageIndex
      const pageSize = table.getState().pagination.pageSize
      return <div className="font-medium text-center">{currentPage * pageSize + row.index + 1}</div>
    },
    size: 40,
    minSize: 40,
    maxSize: 40,
  }

  // Kết hợp cột STT với các cột khác
  const finalColumns = React.useMemo(() => {
    if (showSTT) {
      return [sttColumn, ...columns]
    }
    return columns
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns, showSTT])

  const table = useReactTable({
    data,
    columns: finalColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: showPagination ? getPaginationRowModel() : undefined,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
  })

  return (
    <div className={`flex flex-col border rounded-lg overflow-hidden bg-card ${className || ""}`} style={{ height }}>
      {/* Container với overflow để hỗ trợ cuộn ngang và dọc */}
      <div className="flex-1 relative overflow-x-auto overflow-y-auto h-full">
        <Table className="w-full border-collapse">
          {/* Sticky Header */}
          <TableHeader className="sticky top-0 z-10 bg-accent">
            {table.getHeaderGroups().map((headerGroup: HeaderGroup<TData>) => (
              <TableRow key={headerGroup.id} className="border-b border-border hover:bg-transparent">
                {headerGroup.headers.map((header: Header<TData, unknown>) => {
                  const isSTTColumn = header.id === "stt"
                  return (
                    <TableHead
                      key={header.id}
                      className="border-r border-b last:border-r-0 px-4 py-3 font-semibold bg-slate-200 dark:bg-slate-100 text-left border-border dark:text-black"
                      style={{
                        width: isSTTColumn ? "50px" : "50px",
                        minWidth: isSTTColumn ? "50px" : "50px",
                        maxWidth: isSTTColumn ? "50px" : "50px",
                      }}
                    >
                      <div className="truncate">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          {/* Table Body */}
          <TableBody className="h-full">
            {!isLoading && table.getRowModel().rows?.length
              ? table.getRowModel().rows.map((row: Row<TData>) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell: Cell<TData, unknown>) => {
                    const isSTTColumn = cell.column.id === "stt"
                    return (
                      <TableCell
                        key={cell.id}
                        className="border-r last:border-r-0 px-4 py-2 bg-muted"
                        style={{
                          width: isSTTColumn ? "50px" : cell.column.columnDef.size || "200px",
                          minWidth: isSTTColumn ? "50px" : cell.column.columnDef.minSize || "150px",
                          maxWidth: isSTTColumn ? "50px" : cell.column.columnDef.maxSize || "250px",
                        }}
                      >
                        <div className="truncate">{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
              : null}
          </TableBody>
        </Table>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-20">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="text-sm text-muted-foreground">Loading Data...</span>
            </div>
          </div>
        )}

        {/* Empty State Overlay */}
        {!isLoading && !table.getRowModel().rows?.length && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="w-32 h-32 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                <img src={NoData} alt="No data" className="w-full h-full object-cover opacity-50" />
              </div>
              <h3 className="text-lg text-foreground font-semibold">{emptyMessage ?? "Data not found"}</h3>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Footer với Pagination */}
      {showPagination && (
        <div className="flex-shrink-0 bg-muted/30 px-4 py-3 border-t">
          <div className="flex items-center justify-between">
            {/* Thông tin bên trái */}
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span className="font-medium">
                Showing {table.getRowModel().rows.length} of {data.length} entries
              </span>
              {table.getFilteredSelectedRowModel().rows.length > 0 && (
                <span>({table.getFilteredSelectedRowModel().rows.length} selected)</span>
              )}
            </div>

            {/* Pagination controls bên phải */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Rows per page</p>
                <Select
                  value={table.getState().pagination.pageSize.toString()}
                  onValueChange={(value) => {
                    table.setPageSize(Number(value))
                  }}
                >
                  <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {[10, 20, 30, 40, 50].map((size) => (
                      <SelectItem key={size} value={size.toString()}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex bg-transparent"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to first page</span>
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0 bg-transparent"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to previous page</span>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0 bg-transparent"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to next page</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex bg-transparent"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to last page</span>
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}