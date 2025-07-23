'use strict'

import express from 'express'
import FavoriteController from '../../controllers/favorites.controlle.js'
import { authentication, isAdmin } from '../../middlewares/authMiddleware.js'

const router = express.Router()

// Public routes (không cần authentication)
router.get('/:favoriteId', FavoriteController.getFavoriteById)

// Protected routes (cần authentication)
router.use(authentication)

// Routes cho user đã đăng nhập
router.post('/', FavoriteController.addFavorite)
router.get('/user/:userId', FavoriteController.getFavoritesByUser)
router.delete('/:favoriteId', FavoriteController.deleteFavorite)

// Admin routes (cần quyền admin)
router.use(isAdmin)

// CRUD operations (chỉ admin)
router.get('/', FavoriteController.getAllFavorites)

export default router