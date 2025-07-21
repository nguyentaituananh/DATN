'use strict'

import express from 'express'
import messageController from '../../controllers/message.controller.js'

const router = express.Router()

// Tạo tin nhắn mới
router.post('/', messageController.createMessage)

// Lấy tất cả tin nhắn
router.get('/', messageController.getAllMessages)

// Lấy tin nhắn theo ID
router.get('/:messageId', messageController.getMessageById)

// Cập nhật tin nhắn
router.patch('/:messageId', messageController.updateMessage)

// Xóa tin nhắn
router.delete('/:messageId', messageController.deleteMessage)

// Lấy tin nhắn giữa hai người dùng
router.get('/between/:senderId/:receiverId', messageController.getMessagesBetweenUsers)

// Lấy tin nhắn chưa đọc của một người dùng
router.get('/unread/:userId', messageController.getUnreadMessages)

export default router