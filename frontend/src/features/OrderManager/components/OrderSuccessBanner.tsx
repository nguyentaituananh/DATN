import React from 'react'
import { CheckCircle, Package, Clock, CreditCard } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { formatPrice } from '@/utils/format'
import type { IOrder } from '@/types/orders'

interface OrderSuccessBannerProps {
    order: IOrder
}

export const OrderSuccessBanner: React.FC<OrderSuccessBannerProps> = ({ order }) => {
    return (
        <Card className="mb-8 border-green-200 bg-green-50">
            <CardContent className="p-6">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-green-100 rounded-full">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-green-800 mb-2">
                            Đặt hàng thành công!
                        </h2>
                        <p className="text-green-700 mb-4">
                            Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đã được tiếp nhận và đang được xử lý.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <Package className="w-4 h-4 text-green-600" />
                                <span className="text-green-700">
                                    Mã đơn hàng: <strong>{order.order_code}</strong>
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <CreditCard className="w-4 h-4 text-green-600" />
                                <span className="text-green-700">
                                    Tổng tiền: <strong>{formatPrice(order.total_amount)}</strong>
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-green-600" />
                                <span className="text-green-700">
                                    Trạng thái: <strong>Chờ xác nhận</strong>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default OrderSuccessBanner
