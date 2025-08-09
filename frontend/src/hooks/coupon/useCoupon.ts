import { couponApis } from '@/services/coups/coupons'
import type { ICouponData } from '@/types/coupons'
import type { IObjectFilter } from '@/types/index'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

interface ApiError {
	response?: {
		data?: {
			message?: string
		}
	}
}

export const useCreateCoupon = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (data: ICouponData) => couponApis.createCoupon(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['coupons'] })
			queryClient.invalidateQueries({ queryKey: ['draft-coupons'] })
		}
	})
}

export const useGetCoupons = (options: IObjectFilter) => {
	return useQuery({
		queryKey: ['coupons', options],
		queryFn: () => couponApis.getCoupons(options)
	})
}

export const useUpdateCoupon = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ couponId, data }: { couponId: string; data: ICouponData }) =>
			couponApis.updateCoupon(couponId, data),
		onSuccess: (_, { couponId }) => {
			toast.success('Cập nhật mã giảm giá thành công')
			queryClient.invalidateQueries({ queryKey: ['coupons'] })
			queryClient.invalidateQueries({ queryKey: ['draft-coupons'] })
			queryClient.invalidateQueries({ queryKey: ['published-coupons'] })
			queryClient.invalidateQueries({ queryKey: ['coupon', couponId] })
		}
	})
}

export const useDeleteCoupon = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (couponId: string) => couponApis.deleteCoupon(couponId),
		onSuccess: () => {
			toast.success('Xoá mã giảm giá thành công')
			queryClient.invalidateQueries({ queryKey: ['coupons'] })
			queryClient.invalidateQueries({ queryKey: ['draft-coupons'] })
			queryClient.invalidateQueries({ queryKey: ['published-coupons'] })
		}
	})
}

export const useGetAllCoupons = () => {
	return useQuery({
		queryKey: ['coupons'],
		queryFn: async () => couponApis.getAllCoupons()
	})
}

export const useValidateCoupon = () => {
	return useMutation({
		mutationFn: async (code: string) => couponApis.validateCoupon(code),
		onError: (error: unknown) => {
			const errorMessage = (error as ApiError)?.response?.data?.message || 'Mã giảm giá không hợp lệ'
			toast.error(errorMessage)
		}
	})
}
