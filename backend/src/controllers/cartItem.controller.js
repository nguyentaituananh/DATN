import CartItemService from '../services/cartItem.service.js'
import { OK, CREATED } from '../core/success.response.js'
import asyncHandler from '../helpers/asyncHandler.js'

class CartItemController {
  // Tạo mục trong giỏ hàng mới
  createCartItem = asyncHandler(async (req, res) => {
    const newCartItem = await CartItemService.createCartItem(req.body)

    new CREATED({
      message: 'Tạo mục trong giỏ hàng thành công',
      metadata: newCartItem,
    }).send(res)
  })

  // Lấy tất cả mục trong giỏ hàng
  getAllCartItems = asyncHandler(async (req, res) => {
    const { limit = 50, skip = 0 } = req.query
    const cartItems = await CartItemService.getAllCartItems({
      limit: parseInt(limit),
      skip: parseInt(skip),
    })

    new OK({
      message: 'Lấy danh sách mục trong giỏ hàng thành công',
      metadata: cartItems,
    }).send(res)
  })

  // Lấy mục trong giỏ hàng theo ID
  getCartItemById = asyncHandler(async (req, res) => {
    const { cartItemId } = req.params
    const cartItem = await CartItemService.getCartItemById(cartItemId)

    new OK({
      message: 'Lấy thông tin mục trong giỏ hàng thành công',
      metadata: cartItem,
    }).send(res)
  })

  // Cập nhật mục trong giỏ hàng
  updateCartItem = asyncHandler(async (req, res) => {
    const { cartItemId } = req.params
    const updatedCartItem = await CartItemService.updateCartItem(cartItemId, req.body)

    new OK({
      message: 'Cập nhật mục trong giỏ hàng thành công',
      metadata: updatedCartItem,
    }).send(res)
  })

  // Xóa mục trong giỏ hàng
  deleteCartItem = asyncHandler(async (req, res) => {
    const { cartItemId } = req.params
    const result = await CartItemService.deleteCartItem(cartItemId)

    new OK({
      message: 'Xóa mục trong giỏ hàng thành công',
      metadata: result,
    }).send(res)
  })

  // Lấy mục trong giỏ hàng theo cart_id
  getCartItemsByCart = asyncHandler(async (req, res) => {
    const { cartId } = req.params
    const { limit = 50, skip = 0 } = req.query
    const cartItems = await CartItemService.getCartItemsByCart({
      cart_id: cartId,
      limit: parseInt(limit),
      skip: parseInt(skip),
    })

    new OK({
      message: 'Lấy danh sách mục trong giỏ hàng theo giỏ hàng thành công',
      metadata: cartItems,
    }).send(res)
  })
}

export default new CartItemController()