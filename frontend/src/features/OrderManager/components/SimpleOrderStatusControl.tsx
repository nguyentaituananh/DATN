/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Dialog,
    DialogBody,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Settings, AlertCircle } from 'lucide-react'
import { useUpdateOrderStatus } from '@/hooks/orders'
import type { OrderStatus } from '@/types/orders'

interface SimpleOrderStatusControlProps {
    orderId: string
    currentStatus: OrderStatus
    orderCode: string
}

const statusOptions: { value: OrderStatus; label: string; color: string }[] = [
    { value: 'pending', label: 'Chờ xử lý', color: 'outline' },
    { value: 'confirmed', label: 'Đã xác nhận', color: 'secondary' },
    { value: 'processing', label: 'Đang xử lý', color: 'secondary' },
    { value: 'shipped', label: 'Đã giao hàng', color: 'secondary' },
    { value: 'delivered', label: 'Đã nhận hàng', color: 'default' },
    { value: 'cancelled', label: 'Đã hủy', color: 'destructive' },
    { value: 'refunded', label: 'Đã hoàn tiền', color: 'destructive' },
]

export const SimpleOrderStatusControl: React.FC<SimpleOrderStatusControlProps> = ({
    orderId,
    currentStatus,
    orderCode
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(currentStatus)
    const [note, setNote] = useState('')

    const { mutate: updateStatus, isPending } = useUpdateOrderStatus()

    const handleUpdateStatus = () => {
        if (selectedStatus === currentStatus) {
            setIsOpen(false)
            return
        }

        updateStatus(
            {
                orderId,
                params: {
                    status: selectedStatus,
                    note: note.trim() || undefined
                }
            },
            {
                onSuccess: () => {
                    setIsOpen(false)
                    setNote('')
                },
                onError: (error) => {
                    console.error('Lỗi cập nhật trạng thái:', error)
                }
            }
        )
    }

    const currentStatusOption = statusOptions.find(option => option.value === currentStatus)

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                    <Settings className="h-4 w-4" />
                    Cập nhật
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Cập nhật trạng thái đơn hàng</DialogTitle>
                    <DialogDescription>
                        Thay đổi trạng thái cho đơn hàng <span className="font-mono font-medium">{orderCode}</span>
                    </DialogDescription>
                </DialogHeader>

                <DialogBody>
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium">Trạng thái hiện tại</label>
                            <div>
                                <Badge variant={currentStatusOption?.color as any} className="text-xs">
                                    {currentStatusOption?.label}
                                </Badge>
                            </div>
                        </div>

                        <div className="space-y-2 w-full">
                            <label className="text-sm font-medium w-full">Trạng thái mới</label>
                            <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as OrderStatus)}>
                                <SelectTrigger className='w-full'>
                                    <SelectValue placeholder="Chọn trạng thái mới" />
                                </SelectTrigger>
                                <SelectContent >
                                    {statusOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Ghi chú (tùy chọn)</label>
                            <Textarea
                                placeholder="Nhập ghi chú về việc thay đổi trạng thái..."
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                rows={3}
                            />
                        </div>

                        {selectedStatus !== currentStatus && (
                            <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                                <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                <div className="text-sm text-blue-800">
                                    <p className="font-medium">Xác nhận thay đổi</p>
                                    <p>
                                        Trạng thái sẽ được thay đổi từ <strong>{currentStatusOption?.label}</strong> thành{' '}
                                        <strong>{statusOptions.find(s => s.value === selectedStatus)?.label}</strong>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </DialogBody>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isPending}>
                        Hủy
                    </Button>
                    <Button
                        onClick={handleUpdateStatus}
                        disabled={isPending || selectedStatus === currentStatus}
                    >
                        {isPending ? 'Đang cập nhật...' : 'Cập nhật trạng thái'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
