'use strict'

import express from 'express'
import ProductController from '../../controllers/product.controller.js'
import { authentication, isAdmin } from '../../middlewares/authMiddleware.js'

const router = express.Router()

// Public routes (không cần authentication)
router.get('/', ProductController.getAllProducts)
router.get('/search', ProductController.searchProducts)
router.get('/category/:categoryId', ProductController.getProductsByCategory)
router.get('/:productId', ProductController.getProductById)

// Protected routes (cần authentication)
router.use(authentication)

// Routes cho user đã đăng nhập
router.post('/check-availability', ProductController.checkProductsAvailability)

// Admin routes (cần quyền admin)
router.use(isAdmin)

// CRUD operations (chỉ admin)
router.post('/', ProductController.createProduct)
router.put('/:productId', ProductController.updateProduct)
router.delete('/:productId', ProductController.deleteProduct)

// Publishing operations (chỉ admin)
router.patch('/:productId/publish', ProductController.publishProduct)
router.patch('/:productId/unpublish', ProductController.unPublishProduct)

// Admin dashboard routes
router.get('/admin/drafts', ProductController.getAllDrafts)
router.get('/admin/published', ProductController.getAllPublished)

export default router