import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Package, Search, Eye } from 'lucide-react'
import { useGetMyOrders, useSearchOrders } from '@/hooks/orders'
import { OrderUtils } from '@/utils/orderUtils'
import type { OrderStatus } from '@/types/orders'
import { formatPrice } from '@/utils/format'

export const MyOrdersPage: React.FC = () => {
    const navigate = useNavigate()
    const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all')
    const [searchTerm, setSearchTerm] = useState('')

    // Lấy đơn hàng của user
    const { data: ordersData, isLoading, error } = useGetMyOrders({
        limit: 50,
        skip: 0,
        status: statusFilter !== 'all' ? statusFilter : undefined
    })

    // Tìm kiếm đơn hàng
    const { data: searchResults, isLoading: isSearching } = useSearchOrders(
        { q: searchTerm, limit: 20, skip: 0 },
        searchTerm.length >= 2
    )

    const orders = searchTerm.length >= 2 ? searchResults?.orders : ordersData?.orders
    const loading = searchTerm.length >= 2 ? isSearching : isLoading

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Đang tải đơn hàng...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center py-8">
                    <p className="text-red-600 mb-4">Có lỗi xảy ra khi tải đơn hàng</p>
                    <Button onClick={() => window.location.reload()}>Thử lại</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Đơn hàng của tôi</h1>
                <p className="text-gray-600">Theo dõi và quản lý các đơn hàng của bạn</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder="Tìm kiếm theo mã đơn hàng hoặc sản phẩm..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Select
                    value={statusFilter}
                    onValueChange={(value) => setStatusFilter(value as OrderStatus | 'all')}
                >
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Lọc theo trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tất cả đơn hàng</SelectItem>
                        <SelectItem value="pending">Chờ xác nhận</SelectItem>
                        <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                        <SelectItem value="processing">Đang xử lý</SelectItem>
                        <SelectItem value="shipped">Đang giao hàng</SelectItem>
                        <SelectItem value="delivered">Đã giao hàng</SelectItem>
                        <SelectItem value="cancelled">Đã hủy</SelectItem>
                        <SelectItem value="refunded">Đã hoàn tiền</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Orders List */}
            {!orders || orders.length === 0 ? (
                <div className="text-center py-12">
                    <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {searchTerm ? 'Không tìm thấy đơn hàng' : 'Chưa có đơn hàng nào'}
                    </h3>
                    <p className="text-gray-600 mb-4">
                        {searchTerm
                            ? 'Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc'
                            : 'Bạn chưa có đơn hàng nào. Hãy bắt đầu mua sắm!'
                        }
                    </p>
                    {!searchTerm && (
                        <Button onClick={() => navigate('/')}>
                            Mua sắm ngay
                        </Button>
                    )}
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <Card key={order._id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                    <div className="flex items-center gap-3">
                                        <CardTitle className="text-lg">
                                            Đơn hàng #{order.order_code}
                                        </CardTitle>
                                        <Badge className={OrderUtils.getStatusColor(order.status)}>
                                            {OrderUtils.getStatusText(order.status)}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-500">
                                            {new Date(order.order_date).toLocaleDateString('vi-VN')}
                                        </span>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => navigate(`/order/${order.order_code}`)}
                                        >
                                            <Eye className="h-4 w-4 mr-1" />
                                            Xem chi tiết
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-2">Sản phẩm</h4>
                                        <div className="space-y-1">
                                            {order.products.slice(0, 2).map((product, index) => (
                                                <p key={index} className="text-sm text-gray-600">
                                                    {product.product_name} x {product.quantity}
                                                </p>
                                            ))}
                                            {order.products.length > 2 && (
                                                <p className="text-sm text-gray-500">
                                                    +{order.products.length - 2} sản phẩm khác
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-2">Địa chỉ giao hàng</h4>
                                        <p className="text-sm text-gray-600">
                                            {order.shipping_address}
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-2">Tổng tiền</h4>
                                        <p className="text-lg font-semibold text-orange-600">
                                            {formatPrice(order.total_amount)}
                                        </p>
                                        {order.discount_amount > 0 && (
                                            <p className="text-sm text-green-600">
                                                Đã giảm: {formatPrice(order.discount_amount)}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Payment Info */}
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm text-gray-600">
                                                Thanh toán:
                                                <span className="ml-1 font-medium">
                                                    {OrderUtils.getPaymentStatusText(order.payment_status)}
                                                </span>
                                            </span>
                                            {order.tracking_number && (
                                                <span className="text-sm text-gray-600">
                                                    Mã vận đơn:
                                                    <span className="ml-1 font-mono">
                                                        {order.tracking_number}
                                                    </span>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MyOrdersPage
