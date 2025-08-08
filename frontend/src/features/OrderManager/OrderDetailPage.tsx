import React from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Package, MapPin, Calendar, CreditCard } from 'lucide-react'
import type { IOrderProduct } from '@/types/orders'
import { OrderSuccessBanner } from './components/OrderSuccessBanner'
import { useGetOrderByCode, useGetOrderById } from '@/hooks/orders'
import { formatPrice } from '@/utils/format'

const getStatusColor = (status: string) => {
    switch (status) {
        case 'pending':
            return 'bg-yellow-100 text-yellow-800 border-yellow-300'
        case 'confirmed':
            return 'bg-blue-100 text-blue-800 border-blue-300'
        case 'processing':
            return 'bg-purple-100 text-purple-800 border-purple-300'
        case 'shipped':
            return 'bg-indigo-100 text-indigo-800 border-indigo-300'
        case 'delivered':
            return 'bg-green-100 text-green-800 border-green-300'
        case 'cancelled':
            return 'bg-red-100 text-red-800 border-red-300'
        case 'refunded':
            return 'bg-gray-100 text-gray-800 border-gray-300'
        default:
            return 'bg-gray-100 text-gray-800 border-gray-300'
    }
}

const getStatusText = (status: string) => {
    switch (status) {
        case 'pending':
            return 'Chờ xác nhận'
        case 'confirmed':
            return 'Đã xác nhận'
        case 'processing':
            return 'Đang xử lý'
        case 'shipped':
            return 'Đang giao hàng'
        case 'delivered':
            return 'Đã giao hàng'
        case 'cancelled':
            return 'Đã hủy'
        case 'refunded':
            return 'Đã hoàn tiền'
        default:
            return status
    }
}

const getPaymentStatusText = (status: string) => {
    switch (status) {
        case 'pending':
            return 'Chờ thanh toán'
        case 'paid':
            return 'Đã thanh toán'
        case 'failed':
            return 'Thanh toán thất bại'
        case 'refunded':
            return 'Đã hoàn tiền'
        default:
            return status
    }
}

export const OrderDetailPage: React.FC = () => {
    const { orderCode, orderId } = useParams<{ orderCode?: string; orderId?: string }>()
    const navigate = useNavigate()
    const location = useLocation()

    // Xác định xem đây là admin route hay user route
    const isAdminRoute = !!orderId
    const isUserRoute = !!orderCode

    // Sử dụng hook phù hợp
    const { data: orderDataByCode, isLoading: isLoadingByCode, error: errorByCode } = useGetOrderByCode(orderCode || '', isUserRoute)
    const { data: orderDataById, isLoading: isLoadingById, error: errorById } = useGetOrderById(orderId || '', isAdminRoute)

    // Chọn data phù hợp
    const orderData = isAdminRoute ? orderDataById : orderDataByCode
    const isLoading = isAdminRoute ? isLoadingById : isLoadingByCode
    const error = isAdminRoute ? errorById : errorByCode

    // Kiểm tra xem có phải vừa tạo đơn hàng không (từ query params hoặc state)
    const isNewOrder = location.state?.isNewOrder || location.search.includes('new=true')

    if (isLoading) {
        return (
            <div className="container max-w-4xl mx-auto px-4 py-8">
                <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Đang tải thông tin đơn hàng...</p>
                </div>
            </div>
        )
    }

    if (error || !orderData) {
        return (
            <div className="container max-w-4xl mx-auto px-4 py-8">
                <div className="text-center py-8">
                    <p className="text-red-600 mb-4">Không tìm thấy đơn hàng hoặc có lỗi xảy ra</p>
                    <Button onClick={() => navigate('/')} variant="outline">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Quay về trang chủ
                    </Button>
                </div>
            </div>
        )
    }

    const order = orderData

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="container max-w-6xl mx-auto px-4 py-8">
                {/* Success Banner cho đơn hàng mới */}
                {isNewOrder && order && (
                    <div className="mb-8">
                        <OrderSuccessBanner order={order} />
                    </div>
                )}

                {/* Header */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    if (isAdminRoute) {
                                        navigate('/dashboard/orders')
                                    } else {
                                        navigate('/my-orders')
                                    }
                                }}
                                className="hover:bg-gray-50 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Quay lại
                            </Button>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                                    Chi tiết đơn hàng
                                </h1>
                                <p className="text-gray-600 text-sm md:text-base">
                                    Mã đơn hàng: <span className="font-semibold text-gray-800">{order.order_code}</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-start md:justify-end">
                            <Badge className={`px-4 py-2 text-sm font-medium rounded-full border-2 shadow-sm ${getStatusColor(order.status)}`}>
                                {getStatusText(order.status)}
                            </Badge>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Thông tin đơn hàng */}
                    <div className="xl:col-span-2 space-y-6">
                        {/* Sản phẩm */}
                        <Card className="shadow-sm border-gray-200 hover:shadow-md transition-shadow">
                            <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-gray-100">
                                <CardTitle className="flex items-center gap-3 text-gray-800">
                                    <div className="p-2 bg-orange-100 rounded-lg">
                                        <Package className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <span className="text-lg font-semibold">Sản phẩm đã đặt</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    {order.products.map((product: IOrderProduct, index: number) => (
                                        <div key={index} className="group p-4 border border-gray-200 rounded-xl hover:border-orange-200 hover:bg-orange-50/30 transition-all duration-200">
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-orange-700 transition-colors">
                                                        {product.product_name}
                                                    </h3>
                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                                                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                                                            Đơn giá: {formatPrice(product.product_price)}
                                                        </span>
                                                        <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-200">
                                                            Số lượng: {product.quantity}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="ml-4 text-right">
                                                    <p className="text-xl font-bold text-red-600">
                                                        {formatPrice(product.subtotal)}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">Thành tiền</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Địa chỉ giao hàng */}
                        <Card className="shadow-sm border-gray-200 hover:shadow-md transition-shadow">
                            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                                <CardTitle className="flex items-center gap-3 text-gray-800">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <MapPin className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <span className="text-lg font-semibold">Địa chỉ giao hàng</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                                    <p className="text-gray-800 leading-relaxed font-medium">
                                        {order.shipping_address}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Thông tin thanh toán */}
                    <div className="space-y-6">
                        {/* Tóm tắt đơn hàng */}
                        <Card className="shadow-sm border-gray-200 hover:shadow-md transition-shadow">
                            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-100">
                                <CardTitle className="flex items-center gap-3 text-gray-800">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <CreditCard className="w-5 h-5 text-green-600" />
                                    </div>
                                    <span className="text-lg font-semibold">Thông tin thanh toán</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-gray-600">Tạm tính:</span>
                                        <span className="font-semibold text-gray-800">{formatPrice(order.subtotal)}</span>
                                    </div>

                                    {order.coupon_data && (
                                        <div className="flex justify-between items-center py-2 px-3 bg-green-50 rounded-lg border border-green-200">
                                            <span className="text-green-700 font-medium">
                                                Giảm giá ({order.coupon_data.coupon_code}):
                                            </span>
                                            <span className="font-semibold text-green-600">
                                                -{formatPrice(order.discount_amount)}
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-gray-600">Phí vận chuyển:</span>
                                        <span className="font-semibold text-green-600">Miễn phí</span>
                                    </div>

                                    <Separator className="my-4" />

                                    <div className="flex justify-between items-center py-3 px-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200">
                                        <span className="text-lg font-bold text-gray-800">Tổng cộng:</span>
                                        <span className="text-2xl font-bold text-red-600">{formatPrice(order.total_amount)}</span>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100">
                                        <p className="text-sm text-gray-600 mb-3 font-medium">Trạng thái thanh toán:</p>
                                        <Badge className={`px-4 py-2 text-sm font-medium rounded-full border-2 ${order.payment_status === 'paid'
                                            ? 'bg-green-100 text-green-800 border-green-300'
                                            : order.payment_status === 'failed'
                                                ? 'bg-red-100 text-red-800 border-red-300'
                                                : 'bg-yellow-100 text-yellow-800 border-yellow-300'
                                            }`}>
                                            {getPaymentStatusText(order.payment_status)}
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>                    {/* Thông tin thời gian */}
                        <Card className="shadow-sm border-gray-200 hover:shadow-md transition-shadow">
                            <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-gray-100">
                                <CardTitle className="flex items-center gap-3 text-gray-800">
                                    <div className="p-2 bg-purple-100 rounded-lg">
                                        <Calendar className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <span className="text-lg font-semibold">Thông tin thời gian</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                        <p className="text-sm text-gray-600 mb-2 font-medium">Ngày đặt hàng:</p>
                                        <p className="font-semibold text-gray-800 text-lg">
                                            {new Date(order.order_date).toLocaleString('vi-VN')}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                                        <p className="text-sm text-blue-600 mb-2 font-medium">Cập nhật lần cuối:</p>
                                        <p className="font-semibold text-blue-800 text-lg">
                                            {new Date(order.updated_at).toLocaleString('vi-VN')}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetailPage
