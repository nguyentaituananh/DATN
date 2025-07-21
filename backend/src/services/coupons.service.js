import Coupon from '../models/coupons.model.js'
import { BadRequestError, NotFoundError } from '../core/error.response.js'
import { removeUndefinedObject } from '../utils/index.js'

class CouponService {
  // Tạo mã giảm giá mới
  static async createCoupon(payload) {
    const { code, discount_percent, valid_from, valid_to, usage_limit } = payload

    if (!code || !discount_percent || !valid_from || !valid_to || !usage_limit) {
      throw new BadRequestError('Thiếu thông tin bắt buộc của mã giảm giá')
    }

    const existingCoupon = await Coupon.findOne({ code })
    if (existingCoupon) {
      throw new BadRequestError('Mã giảm giá đã tồn tại')
    }

    const newCoupon = await Coupon.create({
      code,
      discount_percent,
      valid_from,
      valid_to,
      usage_limit,
      used_count: 0,
    })

    if (!newCoupon) {
      throw new BadRequestError('Tạo mã giảm giá thất bại')
    }

    return newCoupon
  }

  // Lấy tất cả mã giảm giá
  static async getAllCoupons({ limit = 50, skip = 0, filter = {} }) {
    return await Coupon.find(filter)
      .limit(limit)
      .skip(skip)
      .sort({ created_at: -1 })
      .lean()
  }

  // Lấy mã giảm giá theo ID
  static async getCouponById(coupon_id) {
    if (!coupon_id) {
      throw new BadRequestError('Thiếu ID mã giảm giá')
    }

    const coupon = await Coupon.findById(coupon_id).lean()

    if (!coupon) {
      throw new NotFoundError('Không tìm thấy mã giảm giá')
    }

    return coupon
  }

  // Lấy mã giảm giá theo code
  static async getCouponByCode(code) {
    if (!code) {
      throw new BadRequestError('Thiếu mã giảm giá')
    }

    const coupon = await Coupon.findOne({ code }).lean()

    if (!coupon) {
      throw new NotFoundError('Không tìm thấy mã giảm giá')
    }

    return coupon
  }

  // Cập nhật mã giảm giá
  static async updateCoupon(coupon_id, payload) {
    if (!coupon_id) {
      throw new BadRequestError('Thiếu ID mã giảm giá')
    }

    const cleanPayload = removeUndefinedObject(payload)
    const updatedCoupon = await Coupon.findByIdAndUpdate(coupon_id, cleanPayload, {
      new: true,
    }).lean()

    if (!updatedCoupon) {
      throw new NotFoundError('Không tìm thấy mã giảm giá để cập nhật')
    }

    return updatedCoupon
  }

  // Xóa mã giảm giá
  static async deleteCoupon(coupon_id) {
    if (!coupon_id) {
      throw new BadRequestError('Thiếu ID mã giảm giá')
    }

    const deletedCoupon = await Coupon.findByIdAndDelete(coupon_id)

    if (!deletedCoupon) {
      throw new NotFoundError('Không tìm thấy mã giảm giá để xóa')
    }

    return { success: true, message: 'Xóa mã giảm giá thành công' }
  }

  // Sử dụng mã giảm giá
  static async useCoupon(coupon_id) {
    if (!coupon_id) {
      throw new BadRequestError('Thiếu ID mã giảm giá')
    }

    const coupon = await Coupon.findById(coupon_id)
    if (!coupon) {
      throw new NotFoundError('Không tìm thấy mã giảm giá')
    }

    if (coupon.used_count >= coupon.usage_limit) {
      throw new BadRequestError('Mã giảm giá đã hết lượt sử dụng')
    }

    if (new Date() < coupon.valid_from || new Date() > coupon.valid_to) {
      throw new BadRequestError('Mã giảm giá không còn hiệu lực')
    }

    const updatedCoupon = await Coupon.findByIdAndUpdate(
      coupon_id,
      { $inc: { used_count: 1 } },
      { new: true }
    ).lean()

    return updatedCoupon
  }
}

export default CouponService