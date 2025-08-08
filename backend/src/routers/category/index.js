'use strict'

import express from 'express'
import CategoryController from '../../controllers/category.controller.js'
import { authentication, isAdmin } from '../../middlewares/authMiddleware.js'

const router = express.Router()

// Public routes (không cần authentication)
router.get('/', CategoryController.getAllCategories)
router.get('/tree', CategoryController.getCategoryTree)
router.get('/root', CategoryController.getRootCategories)
router.get('/:categoryId', CategoryController.getCategoryById)
router.get('/:categoryId/subcategories', CategoryController.getSubCategories)

// Protected routes (cần authentication và admin)
router.use(authentication)
router.use(isAdmin)

router.post('/', CategoryController.createCategory)
router.put('/:categoryId', CategoryController.updateCategory)
router.delete('/:categoryId', CategoryController.deleteCategory)

export default router
