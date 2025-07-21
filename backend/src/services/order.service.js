import Order from '../models/order.model.js'
import { BadRequestError, NotFoundError } from '../core/error.response.js'

class OrderService {
  // Tạo đơn hàng mới
  static async createOrder(payload) {
    const { user_id, products, status, order_date, shipping_address } = payload

    if (!user_id || !products || !status || !order_date || !shipping_address) {
      throw new BadRequestError('Thiếu thông tin bắt buộc của đơn hàng')
    }

    const newOrder = await Order.create({
      user_id,
      products,
      status,
      order_date,
      shipping_address,
    })

    if (!newOrder) {
      throw new BadRequestError('Tạo đơn hàng thất bại')
    }

    return newOrder
  }

  // Lấy tất cả đơn hàng
  static async getAllOrders({ limit = 50, skip = 0, filter = {} }) {
    return await Order.find(filter)
      .populate('user_id')
      .limit(limit)
      .skip(skip)
      .sort({ created_at: -1 })
      .lean()
  }

  // Lấy đơn hàng theo ID
  static async getOrderById(order_id) {
    if (!order_id) {
      throw new BadRequestError('Thiếu ID đơn hàng')
    }

    const order = await Order.findById(order_id).populate('user_id').lean()

    if (!order) {
      throw new NotFoundError('Không tìm thấy đơn hàng')
    }

    return order
  }

  // Cập nhật đơn hàng
  static async updateOrder(order_id, payload) {
    if (!order_id) {
      throw new BadRequestError('Thiếu ID đơn hàng')
    }

    const cleanPayload = removeUndefinedObject(payload)
    const updatedOrder = await Order.findByIdAndUpdate(order_id, cleanPayload, {
      new: true,
    }).lean()

    if (!updatedOrder) {
      throw new NotFoundError('Không tìm thấy đơn hàng để cập nhật')
    }

    return updatedOrder
  }

  // Xóa đơn hàng
  static async deleteOrder(order_id) {
    if (!order_id) {
      throw new BadRequestError('Thiếu ID đơn hàng')
    }

    const deletedOrder = await Order.findByIdAndDelete(order_id)

    if (!deletedOrder) {
      throw new NotFoundError('Không tìm thấy đơn hàng để xóa')
    }

    return { success: true, message: 'Xóa đơn hàng thành công' }
  }

  // Lấy đơn hàng theo người dùng
  static async getOrdersByUser({ user_id, limit = 50, skip = 0 }) {
    if (!user_id) {
      throw new BadRequestError('Thiếu ID người dùng')
    }

    return await Order.find({ user_id })
      .populate('user_id')
      .limit(limit)
      .skip(skip)
      .sort({ created_at: -1 })
      .lean()
  }
}

export default OrderService