import CartItem from '../models/cartItem.model.js'
import { BadRequestError, NotFoundError } from '../core/error.response.js'
import { removeUndefinedObject } from '../utils/index.js'

class CartItemService {
  // Tạo mục trong giỏ hàng mới
  static async createCartItem(payload) {
    const { cart_id, product_id, variant_id, quantity } = payload

    if (!cart_id || !product_id || !quantity) {
      throw new BadRequestError('Thiếu thông tin bắt buộc của mục trong giỏ hàng')
    }

    if (quantity < 1) {
      throw new BadRequestError('Số lượng phải lớn hơn 0')
    }

    const newCartItem = await CartItem.create({
      cart_id,
      product_id,
      variant_id,
      quantity,
    })

    if (!newCartItem) {
      throw new BadRequestError('Tạo mục trong giỏ hàng thất bại')
    }

    return newCartItem
  }

  // Lấy tất cả mục trong giỏ hàng
  static async getAllCartItems({ limit = 50, skip = 0, filter = {} }) {
    return await CartItem.find(filter)
      .populate('cart_id product_id variant_id')
      .limit(limit)
      .skip(skip)
      .sort({ added_at: -1 })
      .lean()
  }

  // Lấy mục trong giỏ hàng theo ID
  static async getCartItemById(cart_item_id) {
    if (!cart_item_id) {
      throw new BadRequestError('Thiếu ID mục trong giỏ hàng')
    }

    const cartItem = await CartItem.findById(cart_item_id)
      .populate('cart_id product_id variant_id')
      .lean()

    if (!cartItem) {
      throw new NotFoundError('Không tìm thấy mục trong giỏ hàng')
    }

    return cartItem
  }

  // Cập nhật mục trong giỏ hàng
  static async updateCartItem(cart_item_id, payload) {
    if (!cart_item_id) {
      throw new BadRequestError('Thiếu ID mục trong giỏ hàng')
    }

    if (payload.quantity && payload.quantity < 1) {
      throw new BadRequestError('Số lượng phải lớn hơn 0')
    }

    const cleanPayload = removeUndefinedObject(payload)
    const updatedCartItem = await CartItem.findByIdAndUpdate(cart_item_id, cleanPayload, {
      new: true,
    }).lean()

    if (!updatedCartItem) {
      throw new NotFoundError('Không tìm thấy mục trong giỏ hàng để cập nhật')
    }

    return updatedCartItem
  }

  // Xóa mục trong giỏ hàng
  static async deleteCartItem(cart_item_id) {
    if (!cart_item_id) {
      throw new BadRequestError('Thiếu ID mục trong giỏ hàng')
    }

    const deletedCartItem = await CartItem.findByIdAndDelete(cart_item_id)

    if (!deletedCartItem) {
      throw new NotFoundError('Không tìm thấy mục trong giỏ hàng để xóa')
    }

    return { success: true, message: 'Xóa mục trong giỏ hàng thành công' }
  }

  // Lấy mục trong giỏ hàng theo cart_id
  static async getCartItemsByCart({ cart_id, limit = 50, skip = 0 }) {
    if (!cart_id) {
      throw new BadRequestError('Thiếu ID giỏ hàng')
    }

    return await CartItem.find({ cart_id })
      .populate('cart_id product_id variant_id')
      .limit(limit)
      .skip(skip)
      .sort({ added_at: -1 })
      .lean()
  }
}

export default CartItemService