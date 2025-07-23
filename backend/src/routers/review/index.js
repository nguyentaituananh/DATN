'use strict'

import express from 'express'
import ReviewController from '../../controllers/review.controller.js'
import { authentication, isAdmin } from '../../middlewares/authMiddleware.js'

const router = express.Router()

// Public routes (không cần authentication)
router.get('/:reviewId', ReviewController.getReviewById)
router.get('/product/:productId', ReviewController.getReviewsByProduct)

// Protected routes (cần authentication)
router.use(authentication)

// Routes cho user đã đăng nhập
router.post('/', ReviewController.createReview)
router.put('/:reviewId', ReviewController.updateReview)
router.delete('/:reviewId', ReviewController.deleteReview)

// Admin routes (cần quyền admin)
router.use(isAdmin)

// CRUD operations (chỉ admin)
router.get('/', ReviewController.getAllReviews)

export default router