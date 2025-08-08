'use strict'

import DeliveryOption from '../models/delivery_options.model.js'
import Product from '../models/product.model.js'
import { BadRequestError, NotFoundError } from '../core/error.response.js'
import { getInfoData } from '../utils/index.js'

class DeliveryOptionService {
  // Tạo tùy chọn giao hàng mới
  static createDeliveryOption = async ({ product_id, method, fee, estimated_days }) => {
    try {
      // Kiểm tra product_id có tồn tại không
      const productExists = await Product.findById(product_id)
      if (!productExists) {
        throw new NotFoundError('Sản phẩm không tồn tại')
      }

      // Kiểm tra phương thức giao hàng
      if (!method || method.trim() === '') {
        throw new BadRequestError('Phương thức giao hàng không được để trống')
      }

      // Kiểm tra phí giao hàng
      if (fee === undefined || fee < 0) {
        throw new BadRequestError('Phí giao hàng phải là số không âm')
      }

      // Kiểm tra số ngày dự kiến
      if (estimated_days === undefined || estimated_days <= 0) {
        throw new BadRequestError('Số ngày dự kiến phải lớn hơn 0')
      }

      // Tạo tùy chọn giao hàng mới
      const newDeliveryOption = await DeliveryOption.create({
        product_id,
        method: method.trim(),
        fee,
        estimated_days
      })

      return {
        delivery_option: getInfoData({
          fides: ['_id', 'product_id', 'method', 'fee', 'estimated_days', 'created_at', 'updated_at'],
          object: newDeliveryOption
        })
      }
    } catch (error) {
      throw error
    }
  }

  // Lấy tất cả tùy chọn giao hàng
  static getAllDeliveryOptions = async (query = {}) => {
    try {
      const { page = 1, limit = 10, product_id, search } = query
      const filter = {}

      // Filter theo product_id
      if (product_id) {
        filter.product_id = product_id
      }

      // Search theo phương thức giao hàng
      if (search) {
        filter.method = { $regex: search, $options: 'i' }
      }

      const deliveryOptions = await DeliveryOption.find(filter)
        .populate('product_id', 'name')
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ created_at: -1 })

      const total = await DeliveryOption.countDocuments(filter)

      return {
        delivery_options: deliveryOptions.map((option) =>
          getInfoData({
            fides: ['_id', 'product_id', 'method', 'fee', 'estimated_days', 'created_at', 'updated_at'],
            object: option
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

  // Lấy tùy chọn giao hàng theo ID
  static getDeliveryOptionById = async (deliveryOptionId) => {
    try {
      const deliveryOption = await DeliveryOption.findById(deliveryOptionId)
        .populate('product_id', 'name')

      if (!deliveryOption) {
        throw new NotFoundError('Tùy chọn giao hàng không tồn tại')
      }

      return {
        delivery_option: getInfoData({
          fides: ['_id', 'product_id', 'method', 'fee', 'estimated_days', 'created_at', 'updated_at'],
          object: deliveryOption
        })
      }
    } catch (error) {
      throw error
    }
  }

  // Cập nhật tùy chọn giao hàng
  static updateDeliveryOption = async (deliveryOptionId, updateData) => {
    try {
      const { method, fee, estimated_days } = updateData

      const deliveryOption = await DeliveryOption.findById(deliveryOptionId)
      if (!deliveryOption) {
        throw new NotFoundError('Tùy chọn giao hàng không tồn tại')
      }

      // Kiểm tra phương thức giao hàng nếu có cập nhật
      if (method && method.trim() === '') {
        throw new BadRequestError('Phương thức giao hàng không được để trống')
      }

      // Kiểm tra phí giao hàng nếu có cập nhật
      if (fee !== undefined && fee < 0) {
        throw new BadRequestError('Phí giao hàng phải là số không âm')
      }

      // Kiểm tra số ngày dự kiến nếu có cập nhật
      if (estimated_days !== undefined && estimated_days <= 0) {
        throw new BadRequestError('Số ngày dự kiến phải lớn hơn 0')
      }

      // Cập nhật tùy chọn giao hàng
      const updatedDeliveryOption = await DeliveryOption.findByIdAndUpdate(
        deliveryOptionId,
        {
          ...(method && { method: method.trim() }),
          ...(fee !== undefined && { fee }),
          ...(estimated_days !== undefined && { estimated_days })
        },
        { new: true }
      ).populate('product_id', 'name')

      return {
        delivery_option: getInfoData({
          fides: ['_id', 'product_id', 'method', 'fee', 'estimated_days', 'created_at', 'updated_at'],
          object: updatedDeliveryOption
        })
      }
    } catch (error) {
      throw error
    }
  }

  // Xóa tùy chọn giao hàng
  static deleteDeliveryOption = async (deliveryOptionId) => {
    try {
      const deliveryOption = await DeliveryOption.findById(deliveryOptionId)
      if (!deliveryOption) {
        throw new NotFoundError('Tùy chọn giao hàng không tồn tại')
      }

      await DeliveryOption.findByIdAndDelete(deliveryOptionId)

      return { message: 'Xóa tùy chọn giao hàng thành công' }
    } catch (error) {
      throw error
    }
  }
}

export default DeliveryOptionService