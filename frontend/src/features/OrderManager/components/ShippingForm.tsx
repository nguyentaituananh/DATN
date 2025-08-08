import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { CheckCircle, AlertCircle } from 'lucide-react'
import type { ICoupon } from '@/types/coupons'

interface ShippingFormProps {
    shippingAddress: string
    setShippingAddress: (address: string) => void
    couponCode: string
    setCouponCode: (code: string) => void
    onValidateCoupon: () => void
    isValidatingCoupon: boolean
    validatedCoupon: ICoupon | null
    couponError: string | null
}

export const ShippingForm: React.FC<ShippingFormProps> = ({
    shippingAddress,
    setShippingAddress,
    couponCode,
    setCouponCode,
    onValidateCoupon,
    isValidatingCoupon,
    validatedCoupon,
    couponError
}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Thông tin giao hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Label htmlFor="shippingAddress">Địa chỉ giao hàng</Label>
                    <Textarea
                        id="shippingAddress"
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        placeholder="Nhập địa chỉ giao hàng của bạn"
                        rows={3}
                        className="mt-1"
                    />
                </div>
                <div>
                    <Label htmlFor="couponCode">Mã giảm giá (nếu có)</Label>
                    <div className="flex gap-2 mt-1">
                        <Input
                            id="couponCode"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder="Nhập mã giảm giá"
                            className="flex-1"
                        />
                        <Button
                            onClick={onValidateCoupon}
                            disabled={!couponCode.trim() || isValidatingCoupon}
                            variant="outline"
                        >
                            {isValidatingCoupon ? 'Đang kiểm tra...' : 'Kiểm tra'}
                        </Button>
                    </div>

                    {/* Hiển thị kết quả validate */}
                    {validatedCoupon && (
                        <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <div className="text-sm text-green-800">
                                <p className="font-medium">Mã giảm giá hợp lệ!</p>
                                <p>
                                    {validatedCoupon.discount_type === 'percentage'
                                        ? `Giảm ${validatedCoupon.discount_value}% đơn hàng`
                                        : `Giảm ${validatedCoupon.discount_value.toLocaleString('vi-VN')} VND`
                                    }
                                    {validatedCoupon.max_discount_amount && validatedCoupon.discount_type === 'percentage' &&
                                        ` (tối đa ${validatedCoupon.max_discount_amount.toLocaleString('vi-VN')} VND)`
                                    }
                                </p>
                                {validatedCoupon.min_order_amount > 0 && (
                                    <p className="text-xs text-green-600">
                                        Áp dụng cho đơn hàng từ {validatedCoupon.min_order_amount.toLocaleString('vi-VN')} VND
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {couponError && (
                        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-red-600" />
                            <p className="text-sm text-red-800">{couponError}</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default ShippingForm
