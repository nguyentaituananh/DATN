'use strict'

import NotificationService from '../services/notification.service.js'
import { SuccessResponse, CREATED } from '../core/success.response.js'

class NotificationController {
  // Tạo thông báo mới
  createNotification = async (req, res, next) => {
    try {
      const result = await NotificationService.createNotification(req.body)

      new CREATED({
        message: 'Tạo thông báo thành công',
        metadata: result
      }).send(res)
    } catch (error) {
      next(error)
    }
  }

  // Lấy tất cả thông báo
  getAllNotifications = async (req, res, next) => {
    try {
      const result = await NotificationService.getAllNotifications(req.query)

      new SuccessResponse({
        message: 'Lấy danh sách thông báo thành công',
        metadata: result
      }).send(res)
    } catch (error) {
      next(error)
    }
  }

  // Lấy thông báo theo ID
  getNotificationById = async (req, res, next) => {
    try {
      const { notificationId } = req.params
      const result = await NotificationService.getNotificationById(notificationId)

      new SuccessResponse({
        message: 'Lấy thông báo thành công',
        metadata: result
      }).send(res)
    } catch (error) {
      next(error)
    }
  }

  // Cập nhật thông báo
  updateNotification = async (req, res, next) => {
    try {
      const { notificationId } = req.params
      const result = await NotificationService.updateNotification(notificationId, req.body)

      new SuccessResponse({
        message: 'Cập nhật thông báo thành công',
        metadata: result
      }).send(res)
    } catch (error) {
      next(error)
    }
  }

  // Xóa thông báo
  deleteNotification = async (req, res, next) => {
    try {
      const { notificationId } = req.params
      const result = await NotificationService.deleteNotification(notificationId)

      new SuccessResponse({
        message: 'Xóa thông báo thành công',
        metadata: result
      }).send(res)
    } catch (error) {
      next(error)
    }
  }

  // Lấy thông báo chưa đọc của một người dùng
  getUnreadNotifications = async (req, res, next) => {
    try {
      const { userId } = req.params
      const result = await NotificationService.getUnreadNotifications(userId, req.query)

      new SuccessResponse({
        message: 'Lấy danh sách thông báo chưa đọc thành công',
        metadata: result
      }).send(res)
    } catch (error) {
      next(error)
    }
  }
}

export default new NotificationController()