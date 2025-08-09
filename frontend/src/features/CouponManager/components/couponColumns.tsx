import type { ColumnDef } from '@tanstack/react-table'
import { Edit, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { ICoupon } from '@/types/coupons'
import { formatDate } from '@/utils'

interface CouponColumnsProps {
  onEdit?: (coupon: ICoupon) => void
  onDelete?: (couponId: string) => void
}

export const createCouponColumns = ({ onEdit, onDelete }: CouponColumnsProps): ColumnDef<ICoupon>[] => [
  {
    accessorKey: 'code',
    header: 'Mã giảm giá',
    cell: ({ row }) => (
      <div className="flex flex-col">
        <div className="font-mono text-sm font-semibold">{row.getValue('code')}</div>
        <div className="text-xs text-muted-foreground font-medium">{row.original.name}</div>
        {row.original.description && (
          <div className="text-xs text-muted-foreground mt-1 max-w-[200px] truncate" title={row.original.description}>
            {row.original.description}
          </div>
        )}
      </div>
    )
  },
  {
    accessorKey: 'discount_type',
    header: 'Loại giảm giá',
    cell: ({ row }) => {
      const discountType = row.getValue('discount_type') as string
      const discountValue = row.original.discount_value

      if (discountType === 'percentage') {
        return (
          <div className="flex flex-col">
            <Badge variant="secondary" className="w-fit">
              📊 Phần trăm
            </Badge>
            <div className="text-sm font-medium mt-1">{discountValue}%</div>
          </div>
        )
      } else {
        return (
          <div className="flex flex-col">
            <Badge variant="outline" className="w-fit">
              💰 Cố định
            </Badge>
            <div className="text-sm font-medium mt-1">{discountValue.toLocaleString('vi-VN')} VND</div>
          </div>
        )
      }
    }
  },
  {
    accessorKey: 'min_order_amount',
    header: 'Đơn tối thiểu',
    cell: ({ row }) => {
      const minOrder = row.getValue('min_order_amount') as number
      if (!minOrder) return <span className="text-muted-foreground">Không</span>
      return <div className="text-sm">{minOrder.toLocaleString('vi-VN')} VND</div>
    }
  },
  {
    accessorKey: 'max_discount_amount',
    header: 'Giảm tối đa',
    cell: ({ row }) => {
      const maxDiscount = row.getValue('max_discount_amount') as number
      const discountType = row.original.discount_type

      if (discountType !== 'percentage' || !maxDiscount) {
        return <span className="text-muted-foreground">Không giới hạn</span>
      }
      return <div className="text-sm">{maxDiscount.toLocaleString('vi-VN')} VND</div>
    }
  },
  {
    accessorKey: 'usage_limit',
    header: 'Sử dụng',
    cell: ({ row }) => {
      const usageLimit = row.getValue('usage_limit') as number
      const usedCount = row.original.used_count || 0
      const remaining = usageLimit - usedCount

      return (
        <div className="flex flex-col text-center">
          <div className="text-sm">
            <span className="font-medium">{usedCount}</span>
            <span className="text-muted-foreground">/{usageLimit}</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Còn lại: {remaining}
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: 'valid_from',
    header: 'Thời hạn',
    cell: ({ row }) => {
      const validFrom = row.getValue('valid_from') as string
      const validTo = row.original.valid_to
      const now = new Date()
      const fromDate = new Date(validFrom)
      const toDate = new Date(validTo)

      let status = ''
      let statusColor = ''

      if (now < fromDate) {
        status = 'Chưa hiệu lực'
        statusColor = 'text-yellow-600'
      } else if (now > toDate) {
        status = 'Hết hạn'
        statusColor = 'text-red-600'
      } else {
        status = 'Đang hiệu lực'
        statusColor = 'text-green-600'
      }

      return (
        <div className="flex flex-col">
          <div className="text-xs">
            {formatDate(validFrom, 'dd/MM/yyyy')} - {formatDate(validTo, 'dd/MM/yyyy')}
          </div>
          <Badge variant="outline" className={`w-fit text-xs ${statusColor}`}>
            {status}
          </Badge>
        </div>
      )
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Ngày tạo',
    cell: ({ row }) => {
      const createdAt = row.getValue('createdAt') as string
      return <div className="text-sm">{formatDate(createdAt, 'dd/MM/yyyy HH:mm')}</div>
    }
  },
  {
    id: 'actions',
    enableHiding: false,
    header: 'Hành động',
    cell: ({ row }) => {
      const coupon = row.original
      const handleEdit = () => {
        onEdit?.(coupon)
      }
      const handleDelete = () => {
        onDelete?.(coupon._id)
      }
      return (
        <div className="flex items-center gap-2">
          <Button onClick={handleEdit} size="icon" variant="outline" title="Chỉnh sửa">
            <Edit className="h-4 w-4" />
          </Button>
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