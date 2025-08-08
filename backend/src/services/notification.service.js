'use strict'

import Notification from '../models/notification.model.js'
import User from '../models/user.model.js'
import { BadRequestError, NotFoundError } from '../core/error.response.js'
import { getInfoData } from '../utils/index.js'

class NotificationService {
  // Tạo thông báo mới
  static createNotification = async ({ user_id, type, message, link }) => {
    try {
      // Kiểm tra user_id có tồn tại không
      const userExists = await User.findById(user_id)
      if (!userExists) {
        throw new NotFoundError('Người dùng không tồn tại')
      }

      // Kiểm tra nội dung thông báo
      if (!message || message.trim() === '') {
        throw new BadRequestError('Nội dung thông báo không được để trống')
      }

      // Kiểm tra loại thông báo
      const validTypes = ['order', 'promotion', 'system', 'chat']
      if (!validTypes.includes(type)) {
        throw new BadRequestError('Loại thông báo không hợp lệ')
      }

      // Tạo thông báo mới
      const newNotification = await Notification.create({
        user_id,
        type,
        message: message.trim(),
        link: link?.trim() || null,
        is_read: false
      })

      return {
        notification: getInfoData({
          fides: ['_id', 'user_id', 'type', 'message', 'link', 'is_read', 'created_at', 'updated_at'],
          object: newNotification
        })
      }
    } catch (error) {
      throw error
    }
  }

  // Lấy tất cả thông báo
  static getAllNotifications = async (query = {}) => {
    try {
      const { page = 1, limit = 10, user_id, type, is_read, search } = query
      const filter = {}

      // Filter theo user_id
      if (user_id) {
        filter.user_id = user_id
      }

      // Filter theo loại thông báo
      if (type) {
        filter.type = type
      }

      // Filter theo trạng thái đọc
      if (is_read !== undefined) {
        filter.is_read = is_read === 'true'
      }

      // Search theo nội dung thông báo
      if (search) {
        filter.message = { $regex: search, $options: 'i' }
      }

      const notifications = await Notification.find(filter)
        .populate('user_id', 'name')
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ created_at: -1 })

      const total = await Notification.countDocuments(filter)

      return {
        notifications: notifications.map((notification) =>
          getInfoData({
            fides: ['_id', 'user_id', 'type', 'message', 'link', 'is_read', 'created_at', 'updated_at'],
            object: notification
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

  // Lấy thông báo theo ID
  static getNotificationById = async (notificationId) => {
    try {
      const notification = await Notification.findById(notificationId)
        .populate('user_id', 'name')

      if (!notification) {
        throw new NotFoundError('Thông báo không tồn tại')
      }

      return {
        notification: getInfoData({
          fides: ['_id', 'user_id', 'type', 'message', 'link', 'is_read', 'created_at', 'updated_at'],
          object: notification
        })
      }
    } catch (error) {
      throw error
    }
  }

  // Cập nhật thông báo
  static updateNotification = async (notificationId, updateData) => {
    try {
      const { type, message, link, is_read } = updateData

      const notification = await Notification.findById(notificationId)
      if (!notification) {
        throw new NotFoundError('Thông báo không tồn tại')
      }

      // Kiểm tra nội dung thông báo nếu có cập nhật
      if (message && message.trim() === '') {
        throw new BadRequestError('Nội dung thông báo không được để trống')
      }

      // Kiểm tra loại thông báo nếu có cập nhật
      if (type) {
        const validTypes = ['order', 'promotion', 'system', 'chat']
        if (!validTypes.includes(type)) {
          throw new BadRequestError('Loại thông báo không hợp lệ')
        }
      }

      // Cập nhật thông báo
      const updatedNotification = await Notification.findByIdAndUpdate(
        notificationId,
        {
          ...(type && { type }),
          ...(message && { message: message.trim() }),
          ...(link !== undefined && { link: link?.trim() || null }),
          ...(is_read !== undefined && { is_read })
        },
        { new: true }
      ).populate('user_id', 'name')

      return {
        notification: getInfoData({
          fides: ['_id', 'user_id', 'type', 'message', 'link', 'is_read', 'created_at', 'updated_at'],
          object: updatedNotification
        })
      }
    } catch (error) {
      throw error
    }
  }

  // Xóa thông báo
  static deleteNotification = async (notificationId) => {
    try {
      const notification = await Notification.findById(notificationId)
      if (!notification) {
        throw new NotFoundError('Thông báo không tồn tại')
      }

      await Notification.findByIdAndDelete(notificationId)

      return { message: 'Xóa thông báo thành công' }
    } catch (error) {
      throw error
    }
  }

  // Lấy danh sách thông báo chưa đọc của một người dùng
  static getUnreadNotifications = async (userId, query = {}) => {
    try {
      const { page = 1, limit = 10, search } = query
      const filter = {
        user_id: userId,
        is_read: false
      }

      // Search theo nội dung thông báo
      if (search) {
        filter.message = { $regex: search, $options: 'i' }
      }

      const notifications = await Notification.find(filter)
        .populate('user_id', 'name')
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ created_at: -1 })

      const total = await Notification.countDocuments(filter)

      return {
        notifications: notifications.map((notification) =>
          getInfoData({
            fides: ['_id', 'user_id', 'type', 'message', 'link', 'is_read', 'created_at', 'updated_at'],
            object: notification
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

export default NotificationService