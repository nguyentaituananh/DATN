import OrderItemService from '../services/orderItem.service.js'
import { OK, CREATED } from '../core/success.response.js'
import asyncHandler from '../helpers/asyncHandler.js'

class OrderItemController {
  // Tạo chi tiết đơn hàng mới
  createOrderItem = asyncHandler(async (req, res) => {
    const newOrderItem = await OrderItemService.createOrderItem(req.body)

    new CREATED({
      message: 'Tạo chi tiết đơn hàng thành công',
      metadata: newOrderItem,
    }).send(res)
  })

  // Lấy tất cả chi tiết đơn hàng
  getAllOrderItems = asyncHandler(async (req, res) => {
    const { limit = 50, skip = 0 } = req.query
    const orderItems = await OrderItemService.getAllOrderItems({
      limit: parseInt(limit),
      skip: parseInt(skip),
    })

    new OK({
      message: 'Lấy danh sách chi tiết đơn hàng thành công',
      metadata: orderItems,
    }).send(res)
  })

  // Lấy chi tiết đơn hàng theo ID
  getOrderItemById = asyncHandler(async (req, res) => {
    const { orderItemId } = req.params
    const orderItem = await OrderItemService.getOrderItemById(orderItemId)

    new OK({
      message: 'Lấy thông tin chi tiết đơn hàng thành công',
      metadata: orderItem,
    }).send(res)
  })

  // Cập nhật chi tiết đơn hàng
  updateOrderItem = asyncHandler(async (req, res) => {
    const { orderItemId } = req.params
    const updatedOrderItem = await OrderItemService.updateOrderItem(orderItemId, req.body)

    new OK({
      message: 'Cập nhật chi tiết đơn hàng thành công',
      metadata: updatedOrderItem,
    }).send(res)
  })

  // Xóa chi tiết đơn hàng
  deleteOrderItem = asyncHandler(async (req, res) => {
    const { orderItemId } = req.params
    const result = await OrderItemService.deleteOrderItem(orderItemId)

    new OK({
      message: 'Xóa chi tiết đơn hàng thành công',
      metadata: result,
    }).send(res)
  })

  // Lấy chi tiết đơn hàng theo order_id
  getOrderItemsByOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.params
    const { limit = 50, skip = 0 } = req.query
    const orderItems = await OrderItemService.getOrderItemsByOrder({
      order_id: orderId,
      limit: parseInt(limit),
      skip: parseInt(skip),
    })

    new OK({
      message: 'Lấy danh sách chi tiết đơn hàng theo đơn hàng thành công',
      metadata: orderItems,
    }).send(res)
  })
}

export default new OrderItemController()