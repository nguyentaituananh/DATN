import React, { useMemo, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataTable } from '@/components/shared/DataTable'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useGetAllOrders, useSearchOrders } from '@/hooks/orders'
import type { OrderStatus } from '@/types/orders'
import { createOrderColumns, type Order } from '@/features/OrderManager/components/orderColumns'
import { generateRoutes } from '@/constants/routes'

const OrderManagerPage: React.FC = () => {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all')

    // API calls thay vì mock data
    const { data: ordersData, isLoading, error } = useGetAllOrders()

    const { data: searchResults, isLoading: isSearching } = useSearchOrders(
        { q: searchTerm, limit: 20, skip: 0 },
        searchTerm.length >= 2
    )

    const handleViewDetail = useCallback((orderId: string) => {
        navigate(generateRoutes.orderDetail(orderId))
    }, [navigate])

    const columns = useMemo(() => createOrderColumns(handleViewDetail), [handleViewDetail])

    // Sử dụng dữ liệu từ API
    const orders = searchTerm.length >= 2 ? searchResults?.orders : ordersData?.orders
    const loading = searchTerm.length >= 2 ? isSearching : isLoading

    // Filter theo status (chỉ khi không search)
    const filteredData = useMemo(() => {
        if (!orders) return []

        let data = orders;

        // Nếu không search thì filter theo status
        if (searchTerm.length < 2 && statusFilter !== 'all') {
            data = data.filter(order => order.status === statusFilter);
        }

        // Transform data để match với Order interface của table
        return data.map(order => {
            const user = typeof order.user_id === 'object' ? order.user_id : null
            return {
                _id: order._id, // Sử dụng _id thật của order để navigate
                customerName: user ? user.name : `User ${order._id.slice(-4)}`,
                customerEmail: user ? user.email : '',
                orderCode: order.order_code,
                totalAmount: order.total_amount,
                status: order.status as Order['status'],
                createdAt: order.order_date || order.created_at,
                paymentStatus: order.payment_status,
                productsCount: order.products.length,
                shippingAddress: order.shipping_address
            }
        });
    }, [orders, statusFilter, searchTerm]);



    if (error) {
        return (
            <div className="flex flex-col gap-4 h-full">
                <div className="text-center py-8">
                    <p className="text-red-600 mb-4">Có lỗi xảy ra khi tải đơn hàng</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
                    >
                        Thử lại
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4 h-full">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Input
                        placeholder="Tìm kiếm theo ID hoặc tên khách hàng..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-[300px]"
                    />
                    <Select
                        value={statusFilter}
                        onValueChange={(value) => setStatusFilter(value as OrderStatus | 'all')}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Lọc theo trạng thái" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tất cả</SelectItem>
                            <SelectItem value="pending">Chờ xử lý</SelectItem>
                            <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                            <SelectItem value="processing">Đang xử lý</SelectItem>
                            <SelectItem value="shipped">Đã giao hàng</SelectItem>
                            <SelectItem value="delivered">Đã nhận hàng</SelectItem>
                            <SelectItem value="cancelled">Đã hủy</SelectItem>
                            <SelectItem value="refunded">Đã hoàn tiền</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <DataTable
                columns={columns}
                data={filteredData}
                isLoading={loading}
            />
        </div>
    );
};

export default OrderManagerPage;