'use strict'

import MessageService from '../services/message.service.js'
import { SuccessResponse, CREATED } from '../core/success.response.js'

class MessageController {
	// Tạo tin nhắn mới
	createMessage = async (req, res, next) => {
		try {
			const result = await MessageService.createMessage(req.body)

			new CREATED({
				message: 'Gửi tin nhắn thành công',
				metadata: result
			}).send(res)
		} catch (error) {
			next(error)
		}
	}

	// Lấy tất cả tin nhắn
	getAllMessages = async (req, res, next) => {
		try {
			const result = await MessageService.getAllMessages(req.query)

			new SuccessResponse({
				message: 'Lấy danh sách tin nhắn thành công',
				metadata: result
			}).send(res)
		} catch (error) {
			next(error)
		}
	}

	// Lấy tin nhắn theo ID
	getMessageById = async (req, res, next) => {
		try {
			const { messageId } = req.params
			const result = await MessageService.getMessageById(messageId)

			new SuccessResponse({
				message: 'Lấy tin nhắn thành công',
				metadata: result
			}).send(res)
		} catch (error) {
			next(error)
		}
	}

	// Cập nhật tin nhắn
	updateMessage = async (req, res, next) => {
		try {
			const { messageId } = req.params
			const result = await MessageService.updateMessage(messageId, req.body)

			new SuccessResponse({
				message: 'Cập nhật tin nhắn thành công',
				metadata: result
			}).send(res)
		} catch (error) {
			next(error)
		}
	}

	// Xóa tin nhắn
	deleteMessage = async (req, res, next) => {
		try {
			const { messageId } = req.params
			const result = await MessageService.deleteMessage(messageId)

			new SuccessResponse({
				message: 'Xóa tin nhắn thành công',
				metadata: result
			}).send(res)
		} catch (error) {
			next(error)
		}
	}

	// Lấy tin nhắn giữa hai người dùng
	getMessagesBetweenUsers = async (req, res, next) => {
		try {
			const { senderId, receiverId } = req.params
			const result = await MessageService.getMessagesBetweenUsers(senderId, receiverId, req.query)

			new SuccessResponse({
				message: 'Lấy tin nhắn giữa hai người dùng thành công',
				metadata: result
			}).send(res)
		} catch (error) {
			next(error)
		}
	}

	// Lấy danh sách tin nhắn chưa đọc của một người dùng
	getUnreadMessages = async (req, res, next) => {
		try {
			const { userId } = req.params
			const query = { ...req.query, receiver_id: userId, is_read: false }
			const result = await MessageService.getAllMessages(query)

			new SuccessResponse({
				message: 'Lấy danh sách tin nhắn chưa đọc thành công',
				metadata: result
			}).send(res)
		} catch (error) {
			next(error)
		}
	}
}

export default new MessageController()