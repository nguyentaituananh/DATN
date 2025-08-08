import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import type { ICoupon } from '@/types/coupons'

interface OrderSummaryProps {
    totalPrice: number
    selectedItemsCount: number
    shippingAddress: string
    isCreatingOrder: boolean
    onSubmitOrder: () => void
    formatPrice: (price: number) => string
    validatedCoupon: ICoupon | null
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
    totalPrice,
    selectedItemsCount,
    shippingAddress,
    isCreatingOrder,
    onSubmitOrder,
    formatPrice,
    validatedCoupon
}) => {
    const calculateDiscountAmount = (coupon: ICoupon, amount: number): number => {
        if (coupon.discount_type === 'percentage') {
            const discount = (amount * coupon.discount_value) / 100
            return coupon.max_discount_amount ? Math.min(discount, coupon.max_discount_amount) : discount
        } else {
            return Math.min(coupon.discount_value, amount)
        }
    }

    const discountAmount = validatedCoupon ? calculateDiscountAmount(validatedCoupon, totalPrice) : 0
    const finalPrice = totalPrice - discountAmount

    const isOrderInvalid = selectedItemsCount === 0 || !shippingAddress.trim() || isCreatingOrder || finalPrice <= 0

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Tóm tắt đơn hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between">
                    <span>Tổng giá sản phẩm:</span>
                    <span>{formatPrice(totalPrice)}</span>
                </div>

                {validatedCoupon && (
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="flex items-center gap-2">
                                Mã giảm giá:
                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                    {validatedCoupon.code}
                                </Badge>
                            </span>
                            <span className="text-green-600">
                                -{validatedCoupon.discount_type === 'percentage'
                                    ? `${validatedCoupon.discount_value}%`
                                    : formatPrice(validatedCoupon.discount_value)
                                }
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Số tiền giảm:</span>
                            <span className="text-green-600">-{formatPrice(discountAmount)}</span>
                        </div>
                    </div>
                )}

                <div className="flex justify-between">
                    <span>Phí vận chuyển:</span>
                    <span>Miễn phí</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-xl">
                    <span>Thành tiền:</span>
                    <span className='text-red-500'>{formatPrice(finalPrice)}</span>
                </div>
                <Button
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 py-3"
                    onClick={onSubmitOrder}
                    disabled={isOrderInvalid}
                >
                    {isCreatingOrder ? 'Đang xử lý...' : 'Đặt hàng ngay'}
                </Button>
            </CardContent>
        </Card>
    )
}

export default OrderSummary
