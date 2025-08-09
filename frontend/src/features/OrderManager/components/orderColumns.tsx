import type { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/utils'
import { ArrowUpDown, Eye } from 'lucide-react'
import { SimpleOrderStatusControl } from './SimpleOrderStatusControl'

// Updated interface for an Order based on API data
export interface Order {
  _id: string;
  customerName: string;
  customerEmail: string;
  orderCode: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  createdAt: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  productsCount: number;
  shippingAddress: string;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
}

const getStatusVariant = (status: Order['status']) => {
  switch (status) {
    case 'delivered':
      return 'default'
    case 'confirmed':
    case 'processing':
    case 'shipped':
      return 'secondary'
    case 'pending':
      return 'outline'
    case 'cancelled':
    case 'refunded':
      return 'destructive'
    default:
      return 'default'
  }
}

const getStatusText = (status: Order['status']) => {
  const statusMap = {
    pending: 'Chờ xử lý',
    confirmed: 'Đã xác nhận',
    processing: 'Đang xử lý',
    shipped: 'Đã giao hàng',
    delivered: 'Đã nhận hàng',
    cancelled: 'Đã hủy',
    refunded: 'Đã hoàn tiền',
  };
  return statusMap[status] || 'Không xác định';
};

const getPaymentStatusVariant = (status: Order['paymentStatus']) => {
  switch (status) {
    case 'paid':
      return 'default'
    case 'pending':
      return 'outline'
    case 'failed':
    case 'refunded':
      return 'destructive'
    default:
      return 'secondary'
  }
}

const getPaymentStatusText = (status: Order['paymentStatus']) => {
  const statusMap = {
    pending: 'Chờ thanh toán',
    paid: 'Đã thanh toán',
    failed: 'Thanh toán thất bại',
    refunded: 'Đã hoàn tiền',
  };
  return statusMap[status] || 'Không xác định';
};


export const createOrderColumns = (onViewDetail?: (orderId: string) => void): ColumnDef<Order>[] => [
  {
    accessorKey: 'orderCode',
    header: 'Mã đơn hàng',
    cell: ({ row }) => <div className="font-mono text-sm font-medium">{row.getValue('orderCode')}</div>,
  },
  {
    accessorKey: 'customerName',
    header: 'Khách hàng',
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.getValue('customerName')}</div>
        <div className="text-sm text-muted-foreground">{row.original.customerEmail}</div>
      </div>
    ),
  },
  {
    accessorKey: 'productsCount',
    header: 'Sản phẩm',
    cell: ({ row }) => (
      <div className="text-center">
        <Badge variant="outline">{row.getValue('productsCount')} sản phẩm</Badge>
      </div>
    ),
  },
  {
    accessorKey: 'totalAmount',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tổng tiền
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="font-medium">{formatCurrency(row.getValue('totalAmount'))}</div>,
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái đơn hàng',
    cell: ({ row }) => {
      const status = row.getValue('status') as Order['status']
      return (
        <Badge variant={getStatusVariant(status)}>
          {getStatusText(status)}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'paymentStatus',
    header: 'Thanh toán',
    cell: ({ row }) => {
      const status = row.getValue('paymentStatus') as Order['paymentStatus']
      return (
        <Badge variant={getPaymentStatusVariant(status)}>
          {getPaymentStatusText(status)}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ngày tạo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{formatDate(row.getValue('createdAt'))}</div>,
  },
  {
    id: "actions",
    header: "Thao tác",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewDetail?.(row.original._id)}
          >
            <Eye className="h-4 w-4 mr-1" />
            Xem chi tiết
          </Button>
          <SimpleOrderStatusControl
            orderId={row.original._id}
            currentStatus={row.original.status}
            orderCode={row.original.orderCode}
          />
        </div>
      )
    },
  },
]