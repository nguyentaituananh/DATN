import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useGetOrderStats } from '@/hooks/orders'
import { OrderUtils } from '@/utils/orderUtils'
import { formatPrice } from '@/utils/format'
import {
    Package,
    Clock,
    Truck,
    CheckCircle,
    XCircle,
    TrendingUp,
    Users,
    DollarSign
} from 'lucide-react'

export const OrderStatsWidget: React.FC = () => {
    const { data: stats, isLoading, error } = useGetOrderStats()

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                        <CardHeader className="pb-2">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-full"></div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        )
    }

    if (error || !stats) {
        return (
            <Card>
                <CardContent className="p-6">
                    <p className="text-center text-red-600">Không thể tải thống kê đơn hàng</p>
                </CardContent>
            </Card>
        )
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending':
                return <Clock className="h-4 w-4" />
            case 'confirmed':
            case 'processing':
                return <Package className="h-4 w-4" />
            case 'shipped':
                return <Truck className="h-4 w-4" />
            case 'delivered':
                return <CheckCircle className="h-4 w-4" />
            case 'cancelled':
            case 'refunded':
                return <XCircle className="h-4 w-4" />
            default:
                return <Package className="h-4 w-4" />
        }
    }

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tổng đơn hàng</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.summary.total_orders}</div>
                        <p className="text-xs text-muted-foreground">
                            Tổng số đơn hàng trong hệ thống
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tổng doanh thu</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {formatPrice(stats.summary.total_revenue)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Doanh thu từ tất cả đơn hàng
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Giá trị TB/Đơn</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatPrice(
                                stats.summary.total_orders > 0
                                    ? stats.summary.total_revenue / stats.summary.total_orders
                                    : 0
                            )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Giá trị trung bình mỗi đơn hàng
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Status Breakdown */}
            <Card>
                <CardHeader>
                    <CardTitle>Phân tích theo trạng thái</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {stats.stats.map((stat, index) => (
                            <div key={stat._id} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {getStatusIcon(stat._id)}
                                        <span className="font-medium">
                                            {OrderUtils.getStatusText(stat._id)}
                                        </span>
                                        <Badge className={OrderUtils.getStatusColor(stat._id)}>
                                            {stat.count}
                                        </Badge>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-semibold">
                                            {formatPrice(stat.total_amount)}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {((stat.count / stats.summary.total_orders) * 100).toFixed(1)}%
                                        </div>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                                        style={{
                                            width: `${(stat.count / stats.summary.total_orders) * 100}%`
                                        }}
                                    ></div>
                                </div>

                                {index < stats.stats.length - 1 && <Separator />}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Thao tác nhanh</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <Button variant="outline" size="sm">
                            Đơn chờ xử lý
                        </Button>
                        <Button variant="outline" size="sm">
                            Cần giao hàng
                        </Button>
                        <Button variant="outline" size="sm">
                            Xuất báo cáo
                        </Button>
                        <Button variant="outline" size="sm">
                            Tìm kiếm nâng cao
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default OrderStatsWidget
