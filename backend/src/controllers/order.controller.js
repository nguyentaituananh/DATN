import OrderService from '../services/order.service.js'
import { OK, CREATED } from '../core/success.response.js'
import asyncHandler from '../helpers/asyncHandler.js'

class OrderController {
  // Tạo đơn hàng mới
  createOrder = asyncHandler(async (req, res) => {
    const newOrder = await OrderService.createOrder(req.body)

    new CREATED({
      message: 'Tạo đơn hàng thành công',
      metadata: newOrder,
    }).send(res)
  })

  // Lấy tất cả đơn hàng
  getAllOrders = asyncHandler(async (req, res) => {
    const { limit = 50, skip = 0 } = req.query
    const orders = await OrderService.getAllOrders({
      limit: parseInt(limit),
      skip: parseInt(skip),
    })

    new OK({
      message: 'Lấy danh sách đơn hàng thành công',
      metadata: orders,
    }).send(res)
  })

  // Lấy đơn hàng theo ID
  getOrderById = asyncHandler(async (req, res) => {
    const { orderId } = req.params
    const order = await OrderService.getOrderById(orderId)

    new OK({
      message: 'Lấy thông tin đơn hàng thành công',
      metadata: order,
    }).send(res)
  })

  // Cập nhật đơn hàng
  updateOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.params
    const updatedOrder = await OrderService.updateOrder(orderId, req.body)

    new OK({
      message: 'Cập nhật đơn hàng thành công',
      metadata: updatedOrder,
    }).send(res)
  })

  // Xóa đơn hàng
  deleteOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.params
    const result = await OrderService.deleteOrder(orderId)

    new OK({
      message: 'Xóa đơn hàng thành công',
      metadata: result,
    }).send(res)
  })

  // Lấy đơn hàng theo người dùng
  getOrdersByUser = asyncHandler(async (req, res) => {
    const { userId } = req.params
    const { limit = 50, skip = 0 } = req.query
    const orders = await OrderService.getOrdersByUser({
      user_id: userId,
      limit: parseInt(limit),
      skip: parseInt(skip),
    })

    new OK({
      message: 'Lấy danh sách đơn hàng của người dùng thành công',
      metadata: orders,
    }).send(res)
  })
}

export default new OrderController()