import React from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogBody } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import type { ICoupon } from '@/types/coupons'

interface OrderConfirmationDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    selectedItemsCount: number
    totalPrice: number
    shippingAddress: string
    isCreatingOrder: boolean
    onConfirm: () => void
    formatPrice: (price: number) => string
    validatedCoupon: ICoupon | null
}

export const OrderConfirmationDialog: React.FC<OrderConfirmationDialogProps> = ({
    open,
    onOpenChange,
    selectedItemsCount,
    totalPrice,
    shippingAddress,
    isCreatingOrder,
    onConfirm,
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
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-center">Xác nhận đặt hàng</DialogTitle>
                </DialogHeader>

                <DialogBody>
                    <div className="py-6 space-y-4">
                        <div className="text-center">
                            <p className="text-gray-600 mb-6">
                                Bạn có chắc chắn muốn đặt hàng với <span className="font-semibold text-gray-800">{selectedItemsCount} sản phẩm</span> được chọn?
                            </p>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 p-4 rounded-lg space-y-3">
                            <h4 className="font-medium text-gray-800 text-sm">Chi tiết đơn hàng:</h4>

                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Số lượng sản phẩm:</span>
                                    <span className="font-medium">{selectedItemsCount} sản phẩm</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tổng giá trị:</span>
                                    <span className="font-medium">{formatPrice(totalPrice)}</span>
                                </div>

                                {/* Hiển thị thông tin giảm giá */}
                                {validatedCoupon && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            Giảm giá ({validatedCoupon.discount_type === 'percentage'
                                                ? `${validatedCoupon.discount_value}%`
                                                : formatPrice(validatedCoupon.discount_value)
                                            }):
                                        </span>
                                        <span className="font-medium text-green-600">-{formatPrice(discountAmount)}</span>
                                    </div>
                                )}

                                <div className="flex justify-between">
                                    <span className="text-gray-600">Phí vận chuyển:</span>
                                    <span className="font-medium text-green-600">Miễn phí</span>
                                </div>
                                <div className="border-t border-orange-200 pt-2">
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-gray-800">Thành tiền:</span>
                                        <span className="font-bold text-lg text-red-600">{formatPrice(finalPrice)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address Preview */}
                        {shippingAddress && (
                            <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg">
                                <p className="text-xs text-gray-500 mb-1">Địa chỉ giao hàng:</p>
                                <p className="text-sm text-gray-700">{shippingAddress}</p>
                            </div>
                        )}

                        {/* Coupon Preview */}
                        {validatedCoupon && (
                            <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                                <p className="text-xs text-green-600 mb-1">Mã giảm giá được áp dụng:</p>
                                <div className="flex items-center gap-2">
                                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                                        {validatedCoupon.code}
                                    </Badge>
                                    <span className="text-sm text-green-700">
                                        Giảm {validatedCoupon.discount_type === 'percentage'
                                            ? `${validatedCoupon.discount_value}%`
                                            : formatPrice(validatedCoupon.discount_value)
                                        }
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </DialogBody>

                <DialogFooter className="gap-3">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="flex-1"
                    >
                        Hủy bỏ
                    </Button>
                    <Button
                        onClick={onConfirm}
                        disabled={isCreatingOrder}
                        className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                        {isCreatingOrder ? 'Đang xử lý...' : 'Xác nhận đặt hàng'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default OrderConfirmationDialog
