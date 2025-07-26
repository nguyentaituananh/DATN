import ReviewService from '../services/review.service.js'
import { OK, CREATED } from '../core/success.response.js'
import asyncHandler from '../helpers/asyncHandler.js'

class ReviewController {
  // Tạo đánh giá mới
  createReview = asyncHandler(async (req, res) => {
    const newReview = await ReviewService.createReview(req.body)

    new CREATED({
      message: 'Tạo đánh giá thành công',
      metadata: newReview,
    }).send(res)
  })

  // Lấy tất cả đánh giá
  getAllReviews = asyncHandler(async (req, res) => {
    const { limit = 50, skip = 0 } = req.query
    const reviews = await ReviewService.getAllReviews({
      limit: parseInt(limit),
      skip: parseInt(skip),
    })

    new OK({
      message: 'Lấy danh sách đánh giá thành công',
      metadata: reviews,
    }).send(res)
  })

  // Lấy đánh giá theo ID
  getReviewById = asyncHandler(async (req, res) => {
    const { reviewId } = req.params
    const review = await ReviewService.getReviewById(reviewId)

    new OK({
      message: 'Lấy thông tin đánh giá thành công',
      metadata: review,
    }).send(res)
  })

  // Cập nhật đánh giá
  updateReview = asyncHandler(async (req, res) => {
    const { reviewId } = req.params
    const updatedReview = await ReviewService.updateReview(reviewId, req.body)

    new OK({
      message: 'Cập nhật đánh giá thành công',
      metadata: updatedReview,
    }).send(res)
  })

  // Xóa đánh giá
  deleteReview = asyncHandler(async (req, res) => {
    const { reviewId } = req.params
    const result = await ReviewService.deleteReview(reviewId)

    new OK({
      message: 'Xóa đánh giá thành công',
      metadata: result,
    }).send(res)
  })

  // Lấy đánh giá theo sản phẩm
  getReviewsByProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params
    const { limit = 50, skip = 0 } = req.query
    const reviews = await ReviewService.getReviewsByProduct({
      product_id: productId,
      limit: parseInt(limit),
      skip: parseInt(skip),
    })

    new OK({
      message: 'Lấy danh sách đánh giá theo sản phẩm thành công',
      metadata: reviews,
    }).send(res)
  })
}

export default new ReviewController()