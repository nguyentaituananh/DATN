

import CartService from '../services/cart.service.js'
import { OK, CREATED } from '../core/success.response.js'
import asyncHandler from '../helpers/asyncHandler.js'
class CartController {
    createCart = asyncHandler(async (req, res) => {
        const newCart = await CartService.createCart(req.body)
    
        new CREATED({
          message: 'Tạo giỏ hàng thành công',
          metadata: newCart,
        }).send(res)
      })
    
      // Lấy giỏ hàng theo ID
      getCartById = asyncHandler(async (req, res) => {
        const { cartId } = req.params
        const cart = await CartService.getCartById(cartId)
    
        new OK({
          message: 'Lấy thông tin giỏ hàng thành công',
          metadata: cart,
        }).send(res)
      })
    
      // Lấy giỏ hàng theo user_id
      getCartByUser = asyncHandler(async (req, res) => {
        const { userId } = req.params
        const cart = await CartService.getCartByUser(userId)
    
        new OK({
          message: 'Lấy giỏ hàng của người dùng thành công',
          metadata: cart,
        }).send(res)
      })
    
      // Cập nhật giỏ hàng
      updateCart = asyncHandler(async (req, res) => {
        const { cartId } = req.params
        const updatedCart = await CartService.updateCart(cartId, req.body)
    
        new OK({
          message: 'Cập nhật giỏ hàng thành công',
          metadata: updatedCart,
        }).send(res)
      })
    
      // Xóa giỏ hàng
      deleteCart = asyncHandler(async (req, res) => {
        const { cartId } = req.params
        const result = await CartService.deleteCart(cartId)
    
        new OK({
          message: 'Xóa giỏ hàng thành công',
          metadata: result,
        }).send(res)
      })
}
export default new CartController()