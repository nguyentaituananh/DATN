import CouponService from '../services/coupons.service.js'
import { OK, CREATED } from '../core/success.response.js'
import { BadRequestError } from '../core/error.response.js'
import asyncHandler from '../helpers/asyncHandler.js'

class CouponController {
	// Tạo mã giảm giá mới
	createCoupon = asyncHandler(async (req, res) => {
		const newCoupon = await CouponService.createCoupon(req.body)

		new CREATED({
			message: 'Tạo mã giảm giá thành công',
			metadata: newCoupon
		}).send(res)
	})

	// Lấy tất cả mã giảm giá
	getAllCoupons = asyncHandler(async (req, res) => {
		const { limit = 50, skip = 0 } = req.query
		const coupons = await CouponService.getAllCoupons({
			limit: parseInt(limit),
			skip: parseInt(skip)
		})

		new OK({
			message: 'Lấy danh sách mã giảm giá thành công',
			metadata: coupons
		}).send(res)
	})

	// Lấy mã giảm giá đang hoạt động
	getActiveCoupons = asyncHandler(async (req, res) => {
		const { limit = 50, skip = 0 } = req.query
		const coupons = await CouponService.getActiveCoupons({
			limit: parseInt(limit),
			skip: parseInt(skip)
		})

		new OK({
			message: 'Lấy danh sách mã giảm giá đang hoạt động thành công',
			metadata: coupons
		}).send(res)
	})

	// Lấy mã giảm giá đã hết hạn
	getExpiredCoupons = asyncHandler(async (req, res) => {
		const { limit = 50, skip = 0 } = req.query
		const coupons = await CouponService.getExpiredCoupons({
			limit: parseInt(limit),
			skip: parseInt(skip)
		})

		new OK({
			message: 'Lấy danh sách mã giảm giá đã hết hạn thành công',
			metadata: coupons
		}).send(res)
	})

	getAllDraftsCoupons = asyncHandler(async (req, res) => {
		const { limit = 50, skip = 0 } = req.query
		const coupons = await CouponService.getAllDraftsCoupons({
			limit: parseInt(limit),
			skip: parseInt(skip)
		})

		new OK({
			message: 'Lấy danh sách mã giảm giá nháp thành công',
			metadata: coupons
		}).send(res)
	})

	getAllPublishedCoupons = asyncHandler(async (req, res) => {
		const { limit = 50, skip = 0 } = req.query
		const coupons = await CouponService.getAllPublishedCoupons({
			limit: parseInt(limit),
			skip: parseInt(skip)
		})

		new OK({
			message: 'Lấy danh sách mã giảm giá đã xuất bản thành công',
			metadata: coupons
		}).send(res)
	})

	// Lấy mã giảm giá theo ID
	getCouponById = asyncHandler(async (req, res) => {
		const { couponId } = req.params
		const coupon = await CouponService.getCouponById(couponId)

		new OK({
			message: 'Lấy thông tin mã giảm giá thành công',
			metadata: coupon
		}).send(res)
	})

	// Validate mã giảm giá
	validateCoupon = asyncHandler(async (req, res) => {
		const { code } = req.params
		const { order_amount } = req.query

		const coupon = await CouponService.validateCoupon(code, parseFloat(order_amount) || 0)

		new OK({
			message: 'Mã giảm giá hợp lệ',
			metadata: coupon
		}).send(res)
	})

	// Tính toán giảm giá cho đơn hàng
	calculateDiscount = asyncHandler(async (req, res) => {
		const { code } = req.params
		const { order_amount } = req.body

		if (!order_amount || order_amount <= 0) {
			throw new BadRequestError('Số tiền đơn hàng không hợp lệ')
		}

		const discountCalculation = await CouponService.calculateDiscount(code, order_amount)

		new OK({
			message: 'Tính toán giảm giá thành công',
			metadata: discountCalculation
		}).send(res)
	})

	// Lấy mã giảm giá theo code
	getCouponByCode = asyncHandler(async (req, res) => {
		const { code } = req.params
		const coupon = await CouponService.getCouponByCode(code)

		new OK({
			message: 'Lấy thông tin mã giảm giá thành công',
			metadata: coupon
		}).send(res)
	})

	// Cập nhật mã giảm giá
	updateCoupon = asyncHandler(async (req, res) => {
		const { couponId } = req.params
		const updatedCoupon = await CouponService.updateCoupon(couponId, req.body)

		new OK({
			message: 'Cập nhật mã giảm giá thành công',
			metadata: updatedCoupon
		}).send(res)
	})

	// Xóa mã giảm giá
	deleteCoupon = asyncHandler(async (req, res) => {
		const { couponId } = req.params
		const result = await CouponService.deleteCoupon(couponId)

		new OK({
			message: 'Xóa mã giảm giá thành công',
			metadata: result
		}).send(res)
	})

	// Sử dụng mã giảm giá
	useCoupon = asyncHandler(async (req, res) => {
		const { code } = req.params
		const { order_amount } = req.body

		const updatedCoupon = await CouponService.useCoupon(code, order_amount)

		new OK({
			message: 'Sử dụng mã giảm giá thành công',
			metadata: updatedCoupon
		}).send(res)
	})

	// Kích hoạt mã giảm giá
	activateCoupon = asyncHandler(async (req, res) => {
		const { couponId } = req.params
		const result = await CouponService.activateCoupon(couponId)

		new OK({
			message: result.message,
			metadata: result
		}).send(res)
	})

	// Vô hiệu hóa mã giảm giá
	deactivateCoupon = asyncHandler(async (req, res) => {
		const { couponId } = req.params
		const result = await CouponService.deactivateCoupon(couponId)

		new OK({
			message: result.message,
			metadata: result
		}).send(res)
	})
}

export default new CouponController()
