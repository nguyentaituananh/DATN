'use strict'

import express from 'express'
import OrderController from '../../controllers/order.controller.js'
import { authentication, isAdmin } from '../../middlewares/authMiddleware.js'

const router = express.Router()

// Public routes (không cần authentication)
router.get('/code/:orderCode', OrderController.getOrderByCode)

// Protected routes (cần authentication)
router.use(authentication)

// Routes cho user đã đăng nhập
router.get('/my-orders', OrderController.getMyOrders)
router.get('/search', OrderController.searchOrders)
router.get('/stats', OrderController.getOrderStats)
router.get('/:orderId/history', OrderController.getOrderStatusHistory)
router.post('/', OrderController.createOrder)

// Admin routes (cần quyền admin) - đặt các route cụ thể trước route có parameter
router.get('/export', isAdmin, OrderController.exportOrders)
router.get('/report', isAdmin, OrderController.generateOrderReport)
router.get('/all', isAdmin, OrderController.getAllOrders)
router.get('/user/:userId', isAdmin, OrderController.getOrdersByUser)
router.put('/:orderId/status', isAdmin, OrderController.updateOrderStatus)
router.put('/:orderId/delivery', isAdmin, OrderController.updateDeliveryInfo)
router.put('/:orderId/payment', isAdmin, OrderController.updatePaymentInfo)
router.put('/bulk/status', isAdmin, OrderController.updateMultipleOrdersStatus)

// Route có parameter phải đặt cuối cùng
router.get('/:orderId', OrderController.getOrderById)

export default router
