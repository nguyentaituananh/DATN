'use strict'

import Coupon from '../models/coupons.model.js'
import { BadRequestError, NotFoundError } from '../core/error.response.js'
import { removeUndefinedObject } from '../utils/index.js'

class CouponService {
	// Tạo mã giảm giá mới
	static async createCoupon(payload) {
		const {
			code,
			name,
			description,
			discount_type,
			discount_value,
			max_discount_amount,
			min_order_amount,
			valid_from,
			valid_to,
			usage_limit,
			created_by
		} = payload

		// Validate required fields
		if (!code || !name || !discount_type || !discount_value || !valid_from || !valid_to || !usage_limit) {
			throw new BadRequestError('Thiếu thông tin bắt buộc của mã giảm giá')
		}

		// Validate discount_type
		if (!['percentage', 'fixed'].includes(discount_type)) {
			throw new BadRequestError('Loại giảm giá không hợp lệ')
		}

		// Validate discount_value based on type
		if (discount_type === 'percentage' && (discount_value <= 0 || discount_value > 100)) {
			throw new BadRequestError('Phần trăm giảm giá phải từ 1-100%')
		}

		if (discount_type === 'fixed' && discount_value <= 0) {
			throw new BadRequestError('Số tiền giảm giá phải lớn hơn 0')
		}

		// Check if code already exists
		const existingCoupon = await Coupon.findOne({ code: code.toUpperCase() })
		if (existingCoupon) {
			throw new BadRequestError('Mã giảm giá đã tồn tại')
		}

		const newCoupon = await Coupon.create({
			code: code.toUpperCase(),
			name,
			description,
			discount_type,
			discount_value,
			max_discount_amount,
			min_order_amount: min_order_amount || 0,
			valid_from: new Date(valid_from),
			valid_to: new Date(valid_to),
			usage_limit,
			used_count: 0,
			is_active: true,
			created_by
		})

		if (!newCoupon) {
			throw new BadRequestError('Tạo mã giảm giá thất bại')
		}

		return newCoupon
	}

	// Lấy tất cả mã giảm giá
	static async getAllCoupons({ limit = 50, skip = 0, filter = {} }) {
		return await Coupon.find(filter)
			.populate('created_by', 'name email')
			.limit(limit)
			.skip(skip)
			.sort({ createdAt: -1 })
			.lean()
	}

	// Lấy mã giảm giá đang hoạt động
	static async getActiveCoupons({ limit = 50, skip = 0 }) {
		const now = new Date()
		return await Coupon.find({
			is_active: true,
			valid_from: { $lte: now },
			valid_to: { $gte: now },
			$expr: { $lt: ['$used_count', '$usage_limit'] }
		})
			.populate('created_by', 'name email')
			.limit(limit)
			.skip(skip)
			.sort({ createdAt: -1 })
			.lean()
	}

	// Lấy mã giảm giá đã hết hạn
	static async getExpiredCoupons({ limit = 50, skip = 0 }) {
		const now = new Date()
		return await Coupon.find({
			$or: [
				{ valid_to: { $lt: now } },
				{ $expr: { $gte: ['$used_count', '$usage_limit'] } },
				{ is_active: false }
			]
		})
			.populate('created_by', 'name email')
			.limit(limit)
			.skip(skip)
			.sort({ createdAt: -1 })
			.lean()
	}

	static async getAllDraftsCoupons({ limit = 50, skip = 0 }) {
		return await Coupon.find({ is_published: false }).limit(limit).skip(skip).sort({ created_at: -1 }).lean()
	}

	static async getAllPublishedCoupons({ limit = 50, skip = 0 }) {
		return await Coupon.find({ is_published: true }).limit(limit).skip(skip).sort({ created_at: -1 }).lean()
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

	// Validate mã giảm giá
	static async validateCoupon(code, orderAmount = 0) {
		if (!code) {
			throw new BadRequestError('Thiếu mã giảm giá')
		}

		const coupon = await Coupon.findOne({ code: code.toUpperCase() })
		if (!coupon) {
			throw new NotFoundError('Mã giảm giá không tồn tại')
		}

		// Kiểm tra tính hợp lệ
		const validation = coupon.isValid()
		if (!validation.isValid) {
			throw new BadRequestError(validation.errors.join(', '))
		}

		// Kiểm tra điều kiện đơn hàng tối thiểu nếu có orderAmount
		if (orderAmount > 0 && orderAmount < coupon.min_order_amount) {
			throw new BadRequestError(`Đơn hàng tối thiểu ${coupon.min_order_amount.toLocaleString('vi-VN')} VND`)
		}

		return coupon
	}

	// Tính toán giảm giá cho đơn hàng
	static async calculateDiscount(code, orderAmount) {
		const coupon = await this.validateCoupon(code, orderAmount)
		const discountAmount = coupon.calculateDiscount(orderAmount)

		return {
			coupon,
			original_amount: orderAmount,
			discount_amount: discountAmount,
			final_amount: orderAmount - discountAmount,
			discount_details: {
				type: coupon.discount_type,
				value: coupon.discount_value,
				...(coupon.discount_type === 'percentage' && {
					max_discount: coupon.max_discount_amount
				})
			}
		}
	}

	// Lấy mã giảm giá theo code
	static async getCouponByCode(code) {
		if (!code) {
			throw new BadRequestError('Thiếu mã giảm giá')
		}

		const coupon = await Coupon.findOne({ code: code.toUpperCase() }).populate('created_by', 'name email').lean()

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

		// Validate payload if updating discount fields
		if (payload.discount_type && !['percentage', 'fixed'].includes(payload.discount_type)) {
			throw new BadRequestError('Loại giảm giá không hợp lệ')
		}

		if (payload.discount_value !== undefined) {
			if (
				payload.discount_type === 'percentage' &&
				(payload.discount_value <= 0 || payload.discount_value > 100)
			) {
				throw new BadRequestError('Phần trăm giảm giá phải từ 1-100%')
			}
			if (payload.discount_type === 'fixed' && payload.discount_value <= 0) {
				throw new BadRequestError('Số tiền giảm giá phải lớn hơn 0')
			}
		}

		const cleanPayload = removeUndefinedObject(payload)
		if (cleanPayload.code) {
			cleanPayload.code = cleanPayload.code.toUpperCase()
		}

		const updatedCoupon = await Coupon.findByIdAndUpdate(coupon_id, cleanPayload, {
			new: true
		})
			.populate('created_by', 'name email')
			.lean()

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

	// Sử dụng mã giảm giá (tăng used_count)
	static async useCoupon(code, orderAmount) {
		const coupon = await this.validateCoupon(code, orderAmount)

		const updatedCoupon = await Coupon.findByIdAndUpdate(
			coupon._id,
			{ $inc: { used_count: 1 } },
			{ new: true }
		).lean()

		return updatedCoupon
	}

	// Kích hoạt mã giảm giá
	static async activateCoupon(coupon_id) {
		if (!coupon_id) {
			throw new BadRequestError('Thiếu ID mã giảm giá')
		}

		const foundCoupon = await Coupon.findById(coupon_id)
		if (!foundCoupon) {
			throw new NotFoundError('Không tìm thấy mã giảm giá')
		}

		foundCoupon.is_active = true
		await foundCoupon.save()

		return { message: 'Mã giảm giá đã được kích hoạt' }
	}

	// Vô hiệu hóa mã giảm giá
	static async deactivateCoupon(coupon_id) {
		if (!coupon_id) {
			throw new BadRequestError('Thiếu ID mã giảm giá')
		}

		const foundCoupon = await Coupon.findById(coupon_id)
		if (!foundCoupon) {
			throw new NotFoundError('Không tìm thấy mã giảm giá')
		}

		foundCoupon.is_active = false
		await foundCoupon.save()

		return { message: 'Mã giảm giá đã được vô hiệu hóa' }
	}
}

export default CouponService
