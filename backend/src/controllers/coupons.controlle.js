import CouponService from '../services/coupons.service.js'
import { OK, CREATED } from '../core/success.response.js'
import asyncHandler from '../helpers/asyncHandler.js'

class CouponController {
  // Tạo mã giảm giá mới
  createCoupon = asyncHandler(async (req, res) => {
    const newCoupon = await CouponService.createCoupon(req.body)

    new CREATED({
      message: 'Tạo mã giảm giá thành công',
      metadata: newCoupon,
    }).send(res)
  })

  // Lấy tất cả mã giảm giá
  getAllCoupons = asyncHandler(async (req, res) => {
    const { limit = 50, skip = 0 } = req.query
    const coupons = await CouponService.getAllCoupons({
      limit: parseInt(limit),
      skip: parseInt(skip),
    })

    new OK({
      message: 'Lấy danh sách mã giảm giá thành công',
      metadata: coupons,
    }).send(res)
  })

  // Lấy mã giảm giá theo ID
  getCouponById = asyncHandler(async (req, res) => {
    const { couponId } = req.params
    const coupon = await CouponService.getCouponById(couponId)

    new OK({
      message: 'Lấy thông tin mã giảm giá thành công',
      metadata: coupon,
    }).send(res)
  })

  // Lấy mã giảm giá theo code
  getCouponByCode = asyncHandler(async (req, res) => {
    const { code } = req.params
    const coupon = await CouponService.getCouponByCode(code)

    new OK({
      message: 'Lấy thông tin mã giảm giá thành công',
      metadata: coupon,
    }).send(res)
  })

  // Cập nhật mã giảm giá
  updateCoupon = asyncHandler(async (req, res) => {
    const { couponId } = req.params
    const updatedCoupon = await CouponService.updateCoupon(couponId, req.body)

    new OK({
      message: 'Cập nhật mã giảm giá thành công',
      metadata: updatedCoupon,
    }).send(res)
  })

  // Xóa mã giảm giá
  deleteCoupon = asyncHandler(async (req, res) => {
    const { couponId } = req.params
    const result = await CouponService.deleteCoupon(couponId)

    new OK({
      message: 'Xóa mã giảm giá thành công',
      metadata: result,
    }).send(res)
  })

  // Sử dụng mã giảm giá
  useCoupon = asyncHandler(async (req, res) => {
    const { couponId } = req.params
    const updatedCoupon = await CouponService.useCoupon(couponId)

    new OK({
      message: 'Sử dụng mã giảm giá thành công',
      metadata: updatedCoupon,
    }).send(res)
  })
}

export default new CouponController()