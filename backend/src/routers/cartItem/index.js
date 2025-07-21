import express from 'express'
import CartItemController from '../../controllers/cartItem.controller.js'
import { authentication, isAdmin } from '../middlewares/authMiddleware.js'

const router = express.Router()

// Public routes (không cần authentication)
router.get('/:cartItemId', CartItemController.getCartItemById)
router.get('/cart/:cartId', CartItemController.getCartItemsByCart)

// Protected routes (cần authentication)
router.use(authentication)

// Routes cho user đã đăng nhập
router.post('/', CartItemController.createCartItem)
router.put('/:cartItemId', CartItemController.updateCartItem)
router.delete('/:cartItemId', CartItemController.deleteCartItem)

// Admin routes (cần quyền admin)
router.use(isAdmin)

// CRUD operations (chỉ admin)
router.get('/', CartItemController.getAllCartItems)

export default router