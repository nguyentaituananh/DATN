import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Edit, Package, Truck, CreditCard } from 'lucide-react'
import {
    useUpdateOrderStatus,
    useUpdateDeliveryInfo,
    useUpdatePaymentInfo,
    useGetOrderStatusHistory
} from '@/hooks/orders'
import { OrderUtils } from '@/utils/orderUtils'
import type { IOrder, OrderStatus, PaymentStatus, PaymentMethod } from '@/types/orders'

interface AdminOrderControlsProps {
    order: IOrder
}

export const AdminOrderControls: React.FC<AdminOrderControlsProps> = ({ order }) => {
    const [statusDialogOpen, setStatusDialogOpen] = useState(false)
    const [deliveryDialogOpen, setDeliveryDialogOpen] = useState(false)
    const [paymentDialogOpen, setPaymentDialogOpen] = useState(false)

    const updateStatusMutation = useUpdateOrderStatus()
    const updateDeliveryMutation = useUpdateDeliveryInfo()
    const updatePaymentMutation = useUpdatePaymentInfo()
    const { data: statusHistory } = useGetOrderStatusHistory(order._id)

    // Status Update Form
    const [newStatus, setNewStatus] = useState<OrderStatus>(order.status)
    const [statusNote, setStatusNote] = useState('')

    // Delivery Update Form
    const [trackingNumber, setTrackingNumber] = useState(order.tracking_number || '')
    const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState('')
    const [deliveryFee, setDeliveryFee] = useState('')
    const [deliveryNotes, setDeliveryNotes] = useState(order.notes || '')

    // Payment Update Form
    const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(order.payment_status)
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(order.payment_method || 'cash')

    const handleUpdateStatus = async () => {
        if (newStatus === order.status) {
            console.error('Trạng thái mới phải khác trạng thái hiện tại')
            return
        }

        try {
            await updateStatusMutation.mutateAsync({
                orderId: order._id,
                params: {
                    status: newStatus,
                    note: statusNote
                }
            })
            console.log('Cập nhật trạng thái thành công!')
            setStatusDialogOpen(false)
            setStatusNote('')
        } catch (error) {
            console.error('Error updating status:', error)
        }
    }

    const handleUpdateDelivery = async () => {
        try {
            await updateDeliveryMutation.mutateAsync({
                orderId: order._id,
                params: {
                    tracking_number: trackingNumber,
                    estimated_delivery_date: estimatedDeliveryDate || undefined,
                    delivery_fee: deliveryFee ? Number(deliveryFee) : undefined,
                    notes: deliveryNotes
                }
            })
            console.log('Cập nhật thông tin giao hàng thành công!')
            setDeliveryDialogOpen(false)
        } catch (error) {
            console.error('Error updating delivery:', error)
        }
    }

    const handleUpdatePayment = async () => {
        try {
            await updatePaymentMutation.mutateAsync({
                orderId: order._id,
                params: {
                    payment_status: paymentStatus,
                    payment_method: paymentMethod
                }
            })
            console.log('Cập nhật thông tin thanh toán thành công!')
            setPaymentDialogOpen(false)
        } catch (error) {
            console.error('Error updating payment:', error)
        }
    }

    const nextStatuses = OrderUtils.getNextStatuses(order.status)

    return (
        <div className="space-y-4">
            {/* Current Status */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        Trạng thái đơn hàng
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <Badge className={OrderUtils.getStatusColor(order.status)}>
                            {OrderUtils.getStatusText(order.status)}
                        </Badge>

                        {nextStatuses.length > 0 && (
                            <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="sm">
                                        <Edit className="h-4 w-4 mr-1" />
                                        Cập nhật trạng thái
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Cập nhật trạng thái đơn hàng</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <div>
                                            <Label>Trạng thái mới</Label>
                                            <Select value={newStatus} onValueChange={(value) => setNewStatus(value as OrderStatus)}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {nextStatuses.map((status) => (
                                                        <SelectItem key={status} value={status}>
                                                            {OrderUtils.getStatusText(status)}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label>Ghi chú</Label>
                                            <Textarea
                                                placeholder="Ghi chú về việc thay đổi trạng thái..."
                                                value={statusNote}
                                                onChange={(e) => setStatusNote(e.target.value)}
                                            />
                                        </div>
                                        <Button
                                            onClick={handleUpdateStatus}
                                            disabled={updateStatusMutation.isPending}
                                            className="w-full"
                                        >
                                            {updateStatusMutation.isPending ? 'Đang cập nhật...' : 'Cập nhật'}
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Delivery Info */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Truck className="h-5 w-5" />
                        Thông tin giao hàng
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {order.tracking_number && (
                            <p className="text-sm">
                                <span className="font-medium">Mã vận đơn:</span> {order.tracking_number}
                            </p>
                        )}
                        <p className="text-sm">
                            <span className="font-medium">Địa chỉ:</span> {order.shipping_address}
                        </p>
                        {order.notes && (
                            <p className="text-sm">
                                <span className="font-medium">Ghi chú:</span> {order.notes}
                            </p>
                        )}
                    </div>

                    <Separator className="my-3" />

                    <Dialog open={deliveryDialogOpen} onOpenChange={setDeliveryDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-1" />
                                Cập nhật giao hàng
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Cập nhật thông tin giao hàng</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                                <div>
                                    <Label>Mã vận đơn</Label>
                                    <Input
                                        placeholder="Nhập mã vận đơn..."
                                        value={trackingNumber}
                                        onChange={(e) => setTrackingNumber(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>Ngày giao dự kiến</Label>
                                    <Input
                                        type="date"
                                        value={estimatedDeliveryDate}
                                        onChange={(e) => setEstimatedDeliveryDate(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>Phí giao hàng</Label>
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        value={deliveryFee}
                                        onChange={(e) => setDeliveryFee(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>Ghi chú</Label>
                                    <Textarea
                                        placeholder="Ghi chú về giao hàng..."
                                        value={deliveryNotes}
                                        onChange={(e) => setDeliveryNotes(e.target.value)}
                                    />
                                </div>
                                <Button
                                    onClick={handleUpdateDelivery}
                                    disabled={updateDeliveryMutation.isPending}
                                    className="w-full"
                                >
                                    {updateDeliveryMutation.isPending ? 'Đang cập nhật...' : 'Cập nhật'}
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>

            {/* Payment Info */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Thông tin thanh toán
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <p className="text-sm">
                            <span className="font-medium">Trạng thái:</span> {OrderUtils.getPaymentStatusText(order.payment_status)}
                        </p>
                        {order.payment_method && (
                            <p className="text-sm">
                                <span className="font-medium">Phương thức:</span> {order.payment_method}
                            </p>
                        )}
                    </div>

                    <Separator className="my-3" />

                    <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-1" />
                                Cập nhật thanh toán
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Cập nhật thông tin thanh toán</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                                <div>
                                    <Label>Trạng thái thanh toán</Label>
                                    <Select value={paymentStatus} onValueChange={(value) => setPaymentStatus(value as PaymentStatus)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pending">Chờ thanh toán</SelectItem>
                                            <SelectItem value="paid">Đã thanh toán</SelectItem>
                                            <SelectItem value="failed">Thanh toán thất bại</SelectItem>
                                            <SelectItem value="refunded">Đã hoàn tiền</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label>Phương thức thanh toán</Label>
                                    <Select value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="cash">Tiền mặt</SelectItem>
                                            <SelectItem value="card">Thẻ tín dụng</SelectItem>
                                            <SelectItem value="bank_transfer">Chuyển khoản</SelectItem>
                                            <SelectItem value="e_wallet">Ví điện tử</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button
                                    onClick={handleUpdatePayment}
                                    disabled={updatePaymentMutation.isPending}
                                    className="w-full"
                                >
                                    {updatePaymentMutation.isPending ? 'Đang cập nhật...' : 'Cập nhật'}
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>

            {/* Status History */}
            {statusHistory && (
                <Card>
                    <CardHeader>
                        <CardTitle>Lịch sử trạng thái</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {statusHistory.history.map((item, index) => (
                                <div key={index} className="flex items-start justify-between border-l-2 border-gray-200 pl-4">
                                    <div>
                                        <Badge className={OrderUtils.getStatusColor(item.status)}>
                                            {OrderUtils.getStatusText(item.status)}
                                        </Badge>
                                        {item.note && (
                                            <p className="text-sm text-gray-600 mt-1">{item.note}</p>
                                        )}
                                    </div>
                                    <span className="text-xs text-gray-500">
                                        {new Date(item.timestamp).toLocaleString('vi-VN')}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

export default AdminOrderControls
