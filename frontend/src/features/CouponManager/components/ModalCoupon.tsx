import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogBody
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import type { IModelProps } from '@/types'
import { useEffect, useId, useState } from 'react'
import { useForm, type SubmitHandler, Controller } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ICoupon, ICouponData } from '@/types/coupons'
import { useCreateCoupon, useUpdateCoupon } from '@/hooks/coupon/useCoupon'

// Helper function to format Date to YYYY-MM-DD string for input type="date"
const formatDateToYYYYMMDD = (date: Date) => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0') // Months are 0-indexed
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const couponSchema = z.object({
  code: z.string().min(1, 'Mã giảm giá không được để trống').max(20, 'Mã giảm giá không được quá 20 ký tự'),
  name: z.string().min(1, 'Tên mã giảm giá không được để trống').max(100, 'Tên không được quá 100 ký tự'),
  description: z.string().optional(),
  discount_type: z.enum(['percentage', 'fixed']),
  discount_value: z.string().min(1, 'Giá trị giảm không được để trống').regex(/^\d+(\.\d{1,2})?$/, 'Phải là số thập phân hợp lệ (tối đa 2 chữ số thập phân)'),
  max_discount_amount: z.string().optional().refine((val) => !val || /^\d+(\.\d{1,2})?$/.test(val), 'Phải là số thập phân hợp lệ'),
  min_order_amount: z.string().optional().refine((val) => !val || /^\d+(\.\d{1,2})?$/.test(val), 'Phải là số thập phân hợp lệ'),
  valid_from: z.string().min(1, 'Ngày bắt đầu không được để trống').date({ message: 'Phải là định dạng ngày giờ hợp lệ' }),
  valid_to: z.string().min(1, 'Ngày kết thúc không được để trống').date({ message: 'Phải là định dạng ngày giờ hợp lệ' }),
  usage_limit: z.string().min(1, 'Giới hạn sử dụng không được để trống').regex(/^\d+$/, 'Phải là số nguyên dương'),
}).refine((data) => {
  if (data.discount_type === 'percentage') {
    const value = parseFloat(data.discount_value)
    return value > 0 && value <= 100
  }
  return parseFloat(data.discount_value) > 0
}, {
  message: 'Giá trị giảm phần trăm phải từ 1-100%, giá trị giảm cố định phải > 0',
  path: ['discount_value']
}).refine((data) => {
  return new Date(data.valid_to) > new Date(data.valid_from)
}, {
  message: 'Ngày kết thúc phải sau ngày bắt đầu',
  path: ['valid_to']
})

export type ICouponForm = z.infer<typeof couponSchema>

interface ModalCouponProps extends IModelProps {
  couponData?: ICoupon | null
  mode?: 'create' | 'edit'
}

const ModalCoupon = ({ isOpen, onClose, couponData, mode = 'create' }: ModalCouponProps) => {
  const id = useId()
  const { mutateAsync: createCoupon } = useCreateCoupon()
  const { mutateAsync: updateCoupon } = useUpdateCoupon()
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage')

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    control,
    formState: { isSubmitting, errors }
  } = useForm<ICouponForm>({ resolver: zodResolver(couponSchema) })

  const watchDiscountType = watch('discount_type')

  useEffect(() => {
    setDiscountType(watchDiscountType || 'percentage')
  }, [watchDiscountType])

  const isEditMode = mode === 'edit' && couponData

  const onSubmit: SubmitHandler<ICouponForm> = async (data) => {
    const values: ICouponData = {
      code: data.code.toUpperCase(),
      name: data.name,
      description: data.description || undefined,
      discount_type: data.discount_type,
      discount_value: parseFloat(data.discount_value),
      max_discount_amount: data.max_discount_amount ? parseFloat(data.max_discount_amount) : undefined,
      min_order_amount: data.min_order_amount ? parseFloat(data.min_order_amount) : undefined,
      valid_from: new Date(data.valid_from),
      valid_to: new Date(data.valid_to),
      usage_limit: parseInt(data.usage_limit)
    }

    if (isEditMode) {
      await updateCoupon({
        couponId: couponData._id,
        data: values
      })
    } else {
      await createCoupon(values)
    }

    onClose()
    reset()
  }

  useEffect(() => {
    if (isOpen) {
      if (isEditMode && couponData) {
        setValue('code', couponData.code)
        setValue('name', couponData.name)
        setValue('description', couponData.description || '')
        setValue('discount_type', couponData.discount_type)
        setValue('discount_value', couponData.discount_value.toString())
        setValue('max_discount_amount', couponData.max_discount_amount?.toString() || '')
        setValue('min_order_amount', couponData.min_order_amount?.toString() || '')
        setValue('valid_from', formatDateToYYYYMMDD(couponData.valid_from))
        setValue('valid_to', formatDateToYYYYMMDD(couponData.valid_to))
        setValue('usage_limit', couponData.usage_limit.toString())
      } else {
        reset()
      }
    }
  }, [isOpen, isEditMode, couponData, setValue, reset])

  const handleClose = () => {
    onClose()
    reset()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] w-full overflow-y-auto" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Cập nhật mã giảm giá' : 'Thêm mới mã giảm giá'}
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} id={id}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                {...register('code')}
                placeholder="VD: FREESHIP"
                className="uppercase"
                error={errors?.code?.message}
                label="Mã giảm giá"
              />
              <Input
                {...register('name')}
                placeholder="VD: Miễn phí vận chuyển"
                error={errors?.name?.message}
                label="Tên mã giảm giá"
              />
            </div>
            <Textarea
              {...register('description')}
              placeholder="Mô tả chi tiết về mã giảm giá..."
              rows={3}
              className="resize-none"
              error={errors?.description?.message}
              label="Mô tả"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Loại giảm giá *
                </Label>
                <Controller
                  name="discount_type"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Chọn loại giảm giá" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">
                          <div className="flex items-center space-x-2">
                            <span>📊</span>
                            <span>Phần trăm (%)</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="fixed">
                          <div className="flex items-center space-x-2">
                            <span>💰</span>
                            <span>Số tiền cố định (VND)</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors?.discount_type && (
                  <p className="text-red-500 text-xs mt-1">{errors.discount_type.message}</p>
                )}
              </div>


              <Input
                {...register('discount_value')}
                type="number"
                step="0.01"
                placeholder={discountType === 'percentage' ? 'VD: 10' : 'VD: 50000'}
                error={errors?.discount_value?.message}
                label={`Giá trị giảm * ${discountType === 'percentage' ? '(%)' : '(VND)'}`}
              />

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                {...register('max_discount_amount')}
                type="number"
                step="0.01"
                placeholder="VD: 100000"
                disabled={discountType !== 'percentage'}
                className={discountType !== 'percentage' ? 'bg-gray-50 text-gray-400' : ''}
                error={errors?.max_discount_amount?.message}
                label="Giảm tối đa (VND)"
              />
              <Input
                {...register('min_order_amount')}
                type="number"
                step="0.01"
                placeholder="VD: 200000"
                error={errors?.min_order_amount?.message}
                label="Đơn hàng tối thiểu (VND)"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                {...register('valid_from')}
                type="date"
                error={errors?.valid_from?.message}
                label='Hiệu lực từ *'
              />

              <Input
                {...register('valid_to')}
                type="date"
                error={errors?.valid_to?.message}
                label='Hiệu lực đến *'
              />
            </div>
            <Input
              {...register('usage_limit')}
              type="number"
              placeholder="VD: 100"
              error={errors?.usage_limit?.message}
              className="max-w-xs"
              label='Giới hạn sử dụng (số lần)'
            />
          </form>
        </DialogBody>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isSubmitting} onClick={handleClose}>
              Huỷ
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isSubmitting} form={id}>
            {isSubmitting ? 'Đang xử lý...' : (isEditMode ? 'Cập nhật mã giảm giá' : 'Thêm mã giảm giá')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ModalCoupon