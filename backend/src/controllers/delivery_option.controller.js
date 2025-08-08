'use strict'

import DeliveryOptionService from '../services/delivery_options.service.js'
import { SuccessResponse, CREATED } from '../core/success.response.js'

class DeliveryOptionController {
  // Tạo tùy chọn giao hàng mới
  createDeliveryOption = async (req, res, next) => {
    try {
      const result = await DeliveryOptionService.createDeliveryOption(req.body)

      new CREATED({
        message: 'Tạo tùy chọn giao hàng thành công',
        metadata: result
      }).send(res)
    } catch (error) {
      next(error)
    }
  }

  // Lấy tất cả tùy chọn giao hàng
  getAllDeliveryOptions = async (req, res, next) => {
    try {
      const result = await DeliveryOptionService.getAllDeliveryOptions(req.query)

      new SuccessResponse({
        message: 'Lấy danh sách tùy chọn giao hàng thành công',
        metadata: result
      }).send(res)
    } catch (error) {
      next(error)
    }
  }

  // Lấy tùy chọn giao hàng theo ID
  getDeliveryOptionById = async (req, res, next) => {
    try {
      const { deliveryOptionId } = req.params
      const result = await DeliveryOptionService.getDeliveryOptionById(deliveryOptionId)

      new SuccessResponse({
        message: 'Lấy tùy chọn giao hàng thành công',
        metadata: result
      }).send(res)
    } catch (error) {
      next(error)
    }
  }

  // Cập nhật tùy chọn giao hàng
  updateDeliveryOption = async (req, res, next) => {
    try {
      const { deliveryOptionId } = req.params
      const result = await DeliveryOptionService.updateDeliveryOption(deliveryOptionId, req.body)

      new SuccessResponse({
        message: 'Cập nhật tùy chọn giao hàng thành công',
        metadata: result
      }).send(res)
    } catch (error) {
      next(error)
    }
  }

  // Xóa tùy chọn giao hàng
  deleteDeliveryOption = async (req, res, next) => {
    try {
      const { deliveryOptionId } = req.params
      const result = await DeliveryOptionService.deleteDeliveryOption(deliveryOptionId)

      new SuccessResponse({
        message: 'Xóa tùy chọn giao hàng thành công',
        metadata: result
      }).send(res)
    } catch (error) {
      next(error)
    }
  }
}

export default new DeliveryOptionController()