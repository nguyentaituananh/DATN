'use strict'

import express from 'express'
import CouponController from '../../controllers/coupons.controlle.js'
import { authentication, isAdmin } from '../../middlewares/authMiddleware.js'

const router = express.Router()

// Public routes (không cần authentication)
router.get('/:couponId', CouponController.getCouponById)
router.get('/code/:code', CouponController.getCouponByCode)

// Protected routes (cần authentication)
router.use(authentication)

// Routes cho user đã đăng nhập
router.post('/:couponId/use', CouponController.useCoupon)

// Admin routes (cần quyền admin)
router.use(isAdmin)

// CRUD operations (chỉ admin)
router.post('/', CouponController.createCoupon)
router.get('/', CouponController.getAllCoupons)
router.put('/:couponId', CouponController.updateCoupon)
router.delete('/:couponId', CouponController.deleteCoupon)

export default router