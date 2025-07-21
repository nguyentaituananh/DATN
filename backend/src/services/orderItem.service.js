import OrderItem from '../models/orderItem.model.js'
import { BadRequestError, NotFoundError } from '../core/error.response.js'
import { removeUndefinedObject } from '../utils/index.js'

class OrderItemService {
  // Tạo chi tiết đơn hàng mới
  static async createOrderItem(payload) {
    const { code_order, order_id, product_id, variant_id, quantity, price, discount_price } = payload

    if (!code_order || !order_id || !product_id || !quantity || !price) {
      throw new BadRequestError('Thiếu thông tin bắt buộc của chi tiết đơn hàng')
    }

    const newOrderItem = await OrderItem.create({
      code_order,
      order_id,
      product_id,
      variant_id,
      quantity,
      price,
      discount_price,
    })

    if (!newOrderItem) {
      throw new BadRequestError('Tạo chi tiết đơn hàng thất bại')
    }

    return newOrderItem
  }

  // Lấy tất cả chi tiết đơn hàng
  static async getAllOrderItems({ limit = 50, skip = 0, filter = {} }) {
    return await OrderItem.find(filter)
      .populate('order_id product_id variant_id')
      .limit(limit)
      .skip(skip)
      .sort({ created_at: -1 })
      .lean()
  }

  // Lấy chi tiết đơn hàng theo ID
  static async getOrderItemById(order_item_id) {
    if (!order_item_id) {
      throw new BadRequestError('Thiếu ID chi tiết đơn hàng')
    }

    const orderItem = await OrderItem.findById(order_item_id)
      .populate('order_id product_id variant_id')
      .lean()

    if (!orderItem) {
      throw new NotFoundError('Không tìm thấy chi tiết đơn hàng')
    }

    return orderItem
  }

  // Cập nhật chi tiết đơn hàng
  static async updateOrderItem(order_item_id, payload) {
    if (!order_item_id) {
      throw new BadRequestError('Thiếu ID chi tiết đơn hàng')
    }

    const cleanPayload = removeUndefinedObject(payload)
    const updatedOrderItem = await OrderItem.findByIdAndUpdate(order_item_id, cleanPayload, {
      new: true,
    }).lean()

    if (!updatedOrderItem) {
      throw new NotFoundError('Không tìm thấy chi tiết đơn hàng để cập nhật')
    }

    return updatedOrderItem
  }

  // Xóa chi tiết đơn hàng
  static async deleteOrderItem(order_item_id) {
    if (!order_item_id) {
      throw new BadRequestError('Thiếu ID chi tiết đơn hàng')
    }

    const deletedOrderItem = await OrderItem.findByIdAndDelete(order_item_id)

    if (!deletedOrderItem) {
      throw new NotFoundError('Không tìm thấy chi tiết đơn hàng để xóa')
    }

    return { success: true, message: 'Xóa chi tiết đơn hàng thành công' }
  }

  // Lấy chi tiết đơn hàng theo order_id
  static async getOrderItemsByOrder({ order_id, limit = 50, skip = 0 }) {
    if (!order_id) {
      throw new BadRequestError('Thiếu ID đơn hàng')
    }

    return await OrderItem.find({ order_id })
      .populate('order_id product_id variant_id')
      .limit(limit)
      .skip(skip)
      .sort({ created_at: -1 })
      .lean()
  }
}

export default OrderItemService