'use strict'

import express from 'express'
import CouponController from '../../controllers/coupons.controlle.js'
import { authentication, isAdmin } from '../../middlewares/authMiddleware.js'

const router = express.Router()

// Define ALL static (non-dynamic segment) routes first, regardless of auth status,
// to ensure they are matched before any dynamic routes.

// PUBLIC STATIC ROUTES - Validation routes that don't need authentication
router.get('/validate/:code', CouponController.validateCoupon) // e.g., /api/coupons/validate/FREESHIP
router.post('/calculate/:code', CouponController.calculateDiscount) // e.g., /api/coupons/calculate/FREESHIP
router.get('/code/:code', CouponController.getCouponByCode) // e.g., /api/coupons/code/FREESHIP

// ADMIN STATIC ROUTES (These need to be explicitly placed before any dynamic :couponId if they are to be accessed by name)
// These routes will eventually be protected by isAdmin, but their *definition order* is crucial.
// We'll apply the middleware *after* defining these static paths, but *before* their dynamic counterparts.
router.post('/', CouponController.createCoupon) // e.g., /api/coupons (POST)
router.get('/getAll', CouponController.getAllCoupons) // e.g., /api/coupons/getAll
router.get('/active', CouponController.getActiveCoupons) // e.g., /api/coupons/active
router.get('/expired', CouponController.getExpiredCoupons) // e.g., /api/coupons/expired
router.get('/drafts', CouponController.getAllDraftsCoupons) // e.g., /api/coupons/drafts
router.get('/published', CouponController.getAllPublishedCoupons) // e.g., /api/coupons/published

// Apply authentication middleware for routes that require a logged-in user
router.use(authentication)

// Authenticated routes (user specific actions)
router.post('/use/:code', CouponController.useCoupon) // e.g., /api/coupons/use/FREESHIP (authenticated, non-admin)

// Apply isAdmin middleware for routes that require an admin role
router.use(isAdmin)

// ADMIN DYNAMIC ROUTES (These are protected and will only match after static admin routes)
router.put('/:couponId', CouponController.updateCoupon) // e.g., /api/coupons/123 (PUT, admin)
router.delete('/:couponId', CouponController.deleteCoupon) // e.g., /api/coupons/123 (DELETE, admin)
router.patch('/:couponId/activate', CouponController.activateCoupon) // e.g., /api/coupons/123/activate (admin)
router.patch('/:couponId/deactivate', CouponController.deactivateCoupon) // e.g., /api/coupons/123/deactivate (admin)

// THE MOST GENERAL PUBLIC DYNAMIC ROUTE - THIS MUST BE THE VERY LAST ROUTE DEFINED
// This route acts as a fallback for any path segment that wasn't matched by more specific
// static or dynamic routes above. It assumes the segment is a coupon ID.
router.get('/:couponId', CouponController.getCouponById) // e.g., /api/coupons/654321fedcba987654321098

export default router
