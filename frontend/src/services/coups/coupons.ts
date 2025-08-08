import axiosClient from '@/configs/axios'
import type { ICoupon, ICouponData, IDiscountCalculation } from '@/types/coupons'
import type { IObjectFilter, IResponseData } from '@/types'

export const couponApis = {
	createCoupon: async (data: ICouponData) => axiosClient.post('/coupons', data),
	getCoupons: async (options: IObjectFilter): Promise<IResponseData<ICoupon[]>> =>
		axiosClient.get('/coupons', { params: options }),
	getActiveCoupons: async (options: IObjectFilter): Promise<IResponseData<ICoupon[]>> =>
		axiosClient.get('/coupons/active', { params: options }),
	getExpiredCoupons: async (options: IObjectFilter): Promise<IResponseData<ICoupon[]>> =>
		axiosClient.get('/coupons/expired', { params: options }),
	updateCoupon: async (couponId: string, data: ICouponData) => axiosClient.put(`/coupons/${couponId}`, data),
	deleteCoupon: async (couponId: string) => axiosClient.delete(`/coupons/${couponId}`),
	getAllCoupons: async (): Promise<IResponseData<ICoupon[]>> => axiosClient.get('/coupons/getAll'),
	validateCoupon: async (code: string, orderAmount?: number): Promise<IResponseData<ICoupon>> => {
		const params = orderAmount ? { order_amount: orderAmount } : {}
		return axiosClient.get(`/coupons/validate/${code}`, { params })
	},
	calculateDiscount: async (code: string, orderAmount: number): Promise<IResponseData<IDiscountCalculation>> =>
		axiosClient.post(`/coupons/calculate/${code}`, { order_amount: orderAmount }),
	activateCoupon: async (couponId: string) => axiosClient.patch(`/coupons/${couponId}/activate`),
	deactivateCoupon: async (couponId: string) => axiosClient.patch(`/coupons/${couponId}/deactivate`)
}
