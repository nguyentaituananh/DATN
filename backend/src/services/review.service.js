import Review from '../models/review.model.js'
import { BadRequestError, NotFoundError } from '../core/error.response.js'
import { removeUndefinedObject } from '../utils/index.js'

class ReviewService {
  // Tạo đánh giá mới
  static async createReview(payload) {
    const { user_id, product_id, rating, comment } = payload

    if (!user_id || !product_id || !rating) {
      throw new BadRequestError('Thiếu thông tin bắt buộc của đánh giá')
    }

    if (rating < 1 || rating > 5) {
      throw new BadRequestError('Điểm đánh giá phải từ 1 đến 5')
    }

    const newReview = await Review.create({
      user_id,
      product_id,
      rating,
      comment,
    })

    if (!newReview) {
      throw new BadRequestError('Tạo đánh giá thất bại')
    }

    return newReview
  }

  // Lấy tất cả đánh giá
  static async getAllReviews({ limit = 50, skip = 0, filter = {} }) {
    return await Review.find(filter)
      .populate('user_id product_id')
      .limit(limit)
      .skip(skip)
      .sort({ created_at: -1 })
      .lean()
  }

  // Lấy đánh giá theo ID
  static async getReviewById(review_id) {
    if (!review_id) {
      throw new BadRequestError('Thiếu ID đánh giá')
    }

    const review = await Review.findById(review_id)
      .populate('user_id product_id')
      .lean()

    if (!review) {
      throw new NotFoundError('Không tìm thấy đánh giá')
    }

    return review
  }

  // Cập nhật đánh giá
  static async updateReview(review_id, payload) {
    if (!review_id) {
      throw new BadRequestError('Thiếu ID đánh giá')
    }

    if (payload.rating && (payload.rating < 1 || payload.rating > 5)) {
      throw new BadRequestError('Điểm đánh giá phải từ 1 đến 5')
    }

    const cleanPayload = removeUndefinedObject(payload)
    const updatedReview = await Review.findByIdAndUpdate(review_id, cleanPayload, {
      new: true,
    }).lean()

    if (!updatedReview) {
      throw new NotFoundError('Không tìm thấy đánh giá để cập nhật')
    }

    return updatedReview
  }

  // Xóa đánh giá
  static async deleteReview(review_id) {
    if (!review_id) {
      throw new BadRequestError('Thiếu ID đánh giá')
    }

    const deletedReview = await Review.findByIdAndDelete(review_id)

    if (!deletedReview) {
      throw new NotFoundError('Không tìm thấy đánh giá để xóa')
    }

    return { success: true, message: 'Xóa đánh giá thành công' }
  }

  // Lấy đánh giá theo sản phẩm
  static async getReviewsByProduct({ product_id, limit = 50, skip = 0 }) {
    if (!product_id) {
      throw new BadRequestError('Thiếu ID sản phẩm')
    }

    return await Review.find({ product_id })
      .populate('user_id product_id')
      .limit(limit)
      .skip(skip)
      .sort({ created_at: -1 })
      .lean()
  }
}

export default ReviewService