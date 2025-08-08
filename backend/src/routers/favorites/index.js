'use strict'

import express from 'express'
import FavoriteController from '../../controllers/favorites.controlle.js'
import { authentication, isAdmin } from '../../middlewares/authMiddleware.js'

const router = express.Router()

// Protected routes (cần authentication)
router.use(authentication)

// Routes cho user đã đăng nhập - đặt các route cụ thể trước
router.post('/', FavoriteController.addFavorite) // Thêm sản phẩm yêu thích
router.get('/my-favorites', FavoriteController.getFavoritesByUser) // Lấy danh sách yêu thích của user hiện tại
router.delete('/product/:productId', FavoriteController.deleteFavoriteByProduct) // Xóa sản phẩm yêu thích theo productId

// Route với parameter phải đặt sau các route cụ thể
router.get('/:favoriteId', FavoriteController.getFavoriteById) // Lấy favorite theo ID
router.delete('/:favoriteId', FavoriteController.deleteFavorite) // Xóa theo favoriteId

// Admin routes (cần quyền admin) - đặt route cụ thể trước middleware
router.get('/admin/all', isAdmin, FavoriteController.getAllFavorites) // Admin: Lấy tất cả favorites

export default router
