import express from 'express'
import CartController from '../../controllers/cart.controller.js'
import { authentication, isAdmin } from '../middlewares/authMiddleware.js'

const router = express.Router()

// Public routes (không cần authentication)
router.get('/:cartId', CartController.getCartById)

// Protected routes (cần authentication)
router.use(authentication)

// Routes cho user đã đăng nhập
router.get('/user/:userId', CartController.getCartByUser)
router.post('/', CartController.createCart)
router.put('/:cartId', CartController.updateCart)
router.delete('/:cartId', CartController.deleteCart)

// Admin routes (cần quyền admin)
router.use(isAdmin)

// Không có admin routes cho carts vì không cần quản lý toàn bộ giỏ hàng bởi admin

export default router