'use strict'

import express from 'express'
import notificationController from '../../controllers/notification.controller.js'

const router = express.Router()

// Tạo thông báo mới
router.post('/', notificationController.createNotification)

// Lấy tất cả thông báo
router.get('/', notificationController.getAllNotifications)

// Lấy thông báo theo ID
router.get('/:notificationId', notificationController.getNotificationById)

// Cập nhật thông báo
router.patch('/:notificationId', notificationController.updateNotification)

// Xóa thông báo
router.delete('/:notificationId', notificationController.deleteNotification)

// Lấy thông báo chưa đọc của một người dùng
router.get('/unread/:userId', notificationController.getUnreadNotifications)

export default router