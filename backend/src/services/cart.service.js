import Cart from '../models/cart.model.js'
import { BadRequestError, NotFoundError } from '../core/error.response.js'
import { removeUndefinedObject } from '../utils/index.js'

class CartService {
    static async createCart(payload) {
        const { user_id } = payload
    
        if (!user_id) {
          throw new BadRequestError('Thiếu ID người dùng')
          const newCart = await Cart.create({
            user_id,
          })
        }
          if (!newCart) {
            throw new BadRequestError('Tạo giỏ hàng thất bại')
          }
      
          return newCart
        }
      
        // Lấy giỏ hàng theo ID
        static async getCartById(cart_id) {
          if (!cart_id) {
            throw new BadRequestError('Thiếu ID giỏ hàng')
        }
        const cart = await Cart.findById(cart_id).populate('user_id').lean()

        if (!cart) {
          throw new NotFoundError('Không tìm thấy giỏ hàng')

        }

        return cart
      }
    
      // Lấy giỏ hàng theo user_id
      static async getCartByUser(user_id) {
        if (!user_id) {
          throw new BadRequestError('Thiếu ID người dùng')
        }

        const cart = await Cart.findOne({ user_id }).populate('user_id').lean()
    
        if (!cart) {
          throw new NotFoundError('Không tìm thấy giỏ hàng')
        }

        return cart
      }
    
      // Cập nhật giỏ hàng
      static async updateCart(cart_id, payload) {
        if (!cart_id) {
          throw new BadRequestError('Thiếu ID giỏ hàng')
        }
    
        const cleanPayload = removeUndefinedObject(payload)
        const updatedCart = await Cart.findByIdAndUpdate(cart_id, cleanPayload, {
          new: true,
        }).lean()
    
        if (!updatedCart) {
          throw new NotFoundError('Không tìm thấy giỏ hàng để cập nhật')
        }
    
        return updatedCart
      }
    
      // Xóa giỏ hàng
      static async deleteCart(cart_id) {
        if (!cart_id) {
          throw new BadRequestError('Thiếu ID giỏ hàng')
        }
    
        const deletedCart = await Cart.findByIdAndDelete(cart_id)
    
        if (!deletedCart) {
          throw new NotFoundError('Không tìm thấy giỏ hàng để xóa')
        }

        return { success: true, message: 'Xóa giỏ hàng thành công' }
      }

}

export default CartService