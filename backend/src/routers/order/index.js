import express from 'express'
import OrderController from '../../controllers/order.controller.js'
import { authentication, isAdmin } from '../middlewares/authMiddleware.js'

const router = express.Router()

// Public routes (không cần authentication)
router.get('/:orderId', OrderController.getOrderById)

// Protected routes (cần authentication)
router.use(authentication)

// Routes cho user đã đăng nhập
router.get('/user/:userId', OrderController.getOrdersByUser)
router.post('/', OrderController.createOrder)

// Admin routes (cần quyền admin)
router.use(isAdmin)

// CRUD operations (chỉ admin)
router.get('/', OrderController.getAllOrders)
router.put('/:orderId', OrderController.updateOrder)
router.delete('/:orderId', OrderController.deleteOrder)

export default router