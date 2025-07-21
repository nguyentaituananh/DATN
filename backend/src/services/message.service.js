'use strict'

import Message from '../models/message.model.js'
import User from '../models/user.model.js' // Thêm import User model
import { BadRequestError, NotFoundError, ConflictRequestError } from '../core/error.response.js'
import { getInfoData } from '../utils/index.js'

class MessageService {
	// Tạo tin nhắn mới
	static createMessage = async ({ sender_id, receiver_id, content }) => {
		try {
			// Kiểm tra sender_id và receiver_id có tồn tại trong collection User không
			const senderExists = await User.findById(sender_id)
			const receiverExists = await User.findById(receiver_id)
			if (!senderExists || !receiverExists) {
				throw new NotFoundError('Người gửi hoặc người nhận không tồn tại')
			}

			// Kiểm tra nội dung tin nhắn
			if (!content || content.trim() === '') {
				throw new BadRequestError('Nội dung tin nhắn không được để trống')
			}

			// Tạo tin nhắn mới
			const newMessage = await Message.create({
				sender_id,
				receiver_id,
				content: content.trim(),
				is_read: false,
				sent_at: Date.now()
			})

			return {
				message: getInfoData({
					fides: ['_id', 'sender_id', 'receiver_id', 'content', 'is_read', 'sent_at', 'createdAt', 'updatedAt'],
					object: newMessage
				})
			}
		} catch (error) {
			throw error
		}
	}

	// Lấy tất cả tin nhắn
	static getAllMessages = async (query = {}) => {
		try {
			const { page = 1, limit = 10, sender_id, receiver_id, is_read, search } = query
			const filter = {}

			// Filter theo sender_id hoặc receiver_id
			if (sender_id) {
				filter.sender_id = sender_id
			}
			if (receiver_id) {
				filter.receiver_id = receiver_id
			}

			// Filter theo trạng thái đọc
			if (is_read !== undefined) {
				filter.is_read = is_read === 'true'
			}

			// Search theo nội dung
			if (search) {
				filter.content = { $regex: search, $options: 'i' }
			}

			const messages = await Message.find(filter)
				.populate('sender_id', 'name')
				.populate('receiver_id', 'name')
				.limit(limit * 1)
				.skip((page - 1) * limit)
				.sort({ sent_at: -1 })

			const total = await Message.countDocuments(filter)

			return {
				messages: messages.map((message) =>
					getInfoData({
						fides: ['_id', 'sender_id', 'receiver_id', 'content', 'is_read', 'sent_at', 'createdAt', 'updatedAt'],
						object: message
					})
				),
				pagination: {
					page: parseInt(page),
					limit: parseInt(limit),
					total,
					pages: Math.ceil(total / limit)
				}
			}
		} catch (error) {
			throw error
		}
	}

	// Lấy tin nhắn theo ID
	static getMessageById = async (messageId) => {
		try {
			const message = await Message.findById(messageId)
				.populate('sender_id', 'name')
				.populate('receiver_id', 'name')

			if (!message) {
				throw new NotFoundError('Tin nhắn không tồn tại')
			}

			return {
				message: getInfoData({
					fides: ['_id', 'sender_id', 'receiver_id', 'content', 'is_read', 'sent_at', 'createdAt', 'updatedAt'],
					object: message
				})
			}
		} catch (error) {
			throw error
		}
	}

	// Cập nhật tin nhắn
	static updateMessage = async (messageId, updateData) => {
		try {
			const { content, is_read } = updateData

			const message = await Message.findById(messageId)
			if (!message) {
				throw new NotFoundError('Tin nhắn không tồn tại')
			}

			// Kiểm tra nội dung tin nhắn nếu có cập nhật
			if (content && content.trim() === '') {
				throw new BadRequestError('Nội dung tin nhắn không được để trống')
			}

			// Cập nhật tin nhắn
			const updatedMessage = await Message.findByIdAndUpdate(
				messageId,
				{
					...(content && { content: content.trim() }),
					...(is_read !== undefined && { is_read: is_read })
				},
				{ new: true }
			).populate('sender_id', 'name').populate('receiver_id', 'name')

			return {
				message: getInfoData({
					fides: ['_id', 'sender_id', 'receiver_id', 'content', 'is_read', 'sent_at', 'createdAt', 'updatedAt'],
					object: updatedMessage
				})
			}
		} catch (error) {
			throw error
		}
	}

	// Xóa tin nhắn
	static deleteMessage = async (messageId) => {
		try {
			const message = await Message.findById(messageId)
			if (!message) {
				throw new NotFoundError('Tin nhắn không tồn tại')
			}

			await Message.findByIdAndDelete(messageId)

			return { message: 'Xóa tin nhắn thành công' }
		} catch (error) {
			throw error
		}
	}

	// Lấy tin nhắn giữa hai người dùng
	static getMessagesBetweenUsers = async (senderId, receiverId, query = {}) => {
		try {
			const { page = 1, limit = 10, search } = query
			const filter = {
				$or: [
					{ sender_id: senderId, receiver_id: receiverId },
					{ sender_id: receiverId, receiver_id: senderId }
				]
			}

			// Search theo nội dung
			if (search) {
				filter.content = { $regex: search, $options: 'i' }
			}

			const messages = await Message.find(filter)
				.populate('sender_id', 'name')
				.populate('receiver_id', 'name')
				.limit(limit * 1)
				.skip((page - 1) * limit)
				.sort({ sent_at: -1 })

			const total = await Message.countDocuments(filter)

			return {
				messages: messages.map((message) =>
					getInfoData({
						fides: ['_id', 'sender_id', 'receiver_id', 'content', 'is_read', 'sent_at', 'createdAt', 'updatedAt'],
						object: message
					})
				),
				pagination: {
					page: parseInt(page),
					limit: parseInt(limit),
					total,
					pages: Math.ceil(total / limit)
				}
			}
		} catch (error) {
			throw error
		}
	}

	// Lấy danh sách tin nhắn chưa đọc của một người dùng
	static getUnreadMessages = async (userId, query = {}) => {
		try {
			const { page = 1, limit = 10, search } = query
			const filter = {
				receiver_id: userId,
				is_read: false
			}

			// Search theo nội dung
			if (search) {
				filter.content = { $regex: search, $options: 'i' }
			}

			const messages = await Message.find(filter)
				.populate('sender_id', 'name')
				.populate('receiver_id', 'name')
				.limit(limit * 1)
				.skip((page - 1) * limit)
				.sort({ sent_at: -1 })

			const total = await Message.countDocuments(filter)

			return {
				messages: messages.map((message) =>
					getInfoData({
						fides: ['_id', 'sender_id', 'receiver_id', 'content', 'is_read', 'sent_at', 'createdAt', 'updatedAt'],
						object: message
					})
				),
				pagination: {
					page: parseInt(page),
					limit: parseInt(limit),
					total,
					pages: Math.ceil(total / limit)
				}
			}
		} catch (error) {
			throw error
		}
	}
}

export default MessageService