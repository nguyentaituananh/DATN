import express from 'express'
import OrderItemController from '../controllers/order_items.controller.js'
import { authentication, isAdmin } from '../middlewares/authMiddleware.js'

const router = express.Router()

// Public routes (không cần authentication)
router.get('/:orderItemId', OrderItemController.getOrderItemById)
router.get('/order/:orderId', OrderItemController.getOrderItemsByOrder)

// Protected routes (cần authentication)
router.use(authentication)

// Routes cho user đã đăng nhập
router.post('/', OrderItemController.createOrderItem)

// Admin routes (cần quyền admin)
router.use(isAdmin)

// CRUD operations (chỉ admin)
router.get('/', OrderItemController.getAllOrderItems)
router.put('/:orderItemId', OrderItemController.updateOrderItem)
router.delete('/:orderItemId', OrderItemController.deleteOrderItem)

export default router