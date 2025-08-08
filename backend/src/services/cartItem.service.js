'use strict'

import CartItem from '../models/cartItem.model.js'
import { BadRequestError, NotFoundError } from '../core/error.response.js'
import { removeUndefinedObject } from '../utils/index.js'
import { getProductById } from '../models/repositories/product.js'

class CartItemService {
	static async createCartItem(payload) {
		const { cart_id, product_id, quantity } = payload

		if (!cart_id || !product_id || !quantity) {
			throw new BadRequestError('Thiếu thông tin bắt buộc')
		}

		// 1. Check if product exists
		const product = await getProductById(product_id)
		if (!product) {
			throw new NotFoundError('Sản phẩm không tồn tại')
		}

		// 2. Check if product is already in the cart
		const existingCartItem = await CartItem.findOne({
			cart_id,
			product_id
		})

		if (existingCartItem) {
			// If it exists, update the quantity
			const newQuantity = existingCartItem.quantity + quantity
			if (newQuantity > product.quantity) {
				throw new BadRequestError('Số lượng sản phẩm trong kho không đủ')
			}
			existingCartItem.quantity = newQuantity
			return await existingCartItem.save()
		} else {
			// If it doesn't exist, create a new cart item
			if (quantity > product.quantity) {
				throw new BadRequestError('Số lượng sản phẩm trong kho không đủ')
			}
			const newCartItem = await CartItem.create({
				cart_id,
				product_id,
				quantity
			})
			if (!newCartItem) {
				throw new BadRequestError('Thêm sản phẩm vào giỏ hàng thất bại')
			}
			return newCartItem
		}
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

		const cartItem = await CartItem.findById(cart_item_id).populate('cart_id product_id variant_id').lean()

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
			// Setting quantity to 0 or less should be a delete operation
			return await CartItemService.deleteCartItem(cart_item_id);
		}

		const cleanPayload = removeUndefinedObject(payload)
		const updatedCartItem = await CartItem.findByIdAndUpdate(cart_item_id, cleanPayload, {
			new: true
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
			.populate({
				path: 'product_id',
				select: 'name price quantity images' // Select specific fields
			})
			.limit(limit)
			.skip(skip)
			.sort({ added_at: -1 })
			.lean()
	}
}

export default CartItemService
