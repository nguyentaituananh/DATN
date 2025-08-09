'use strict'

import Favorite from '../models/favorites.model.js'
import { BadRequestError, NotFoundError } from '../core/error.response.js'

class FavoriteService {
	// Thêm sản phẩm vào danh sách yêu thích
	static async addFavorite(user_id, payload) {
		const { product_id } = payload

		if (!product_id) {
			throw new BadRequestError('Thiếu thông tin bắt buộc của sản phẩm yêu thích')
		}

		const existingFavorite = await Favorite.findOne({ user_id, product_id })

		if (existingFavorite) {
			throw new BadRequestError('Sản phẩm đã có trong danh sách yêu thích')
		}

		const newFavorite = await Favorite.create({
			user_id,
			product_id
		})

		if (!newFavorite) {
			throw new BadRequestError('Thêm sản phẩm yêu thích thất bại')
		}

		return newFavorite
	}

	// Lấy tất cả sản phẩm yêu thích
	static async getAllFavorites({ limit = 50, skip = 0, filter = {} }) {
		return await Favorite.find(filter)
			.populate('user_id product_id')
			.limit(limit)
			.skip(skip)
			.sort({ created_at: -1 })
			.lean()
	}

	// Lấy sản phẩm yêu thích theo ID
	static async getFavoriteById(favorite_id) {
		if (!favorite_id) {
			throw new BadRequestError('Thiếu ID sản phẩm yêu thích')
		}

		const favorite = await Favorite.findById(favorite_id).populate('user_id product_id').lean()

		if (!favorite) {
			throw new NotFoundError('Không tìm thấy sản phẩm yêu thích')
		}

		return favorite
	}

	// Xóa sản phẩm yêu thích
	static async deleteFavorite(favorite_id) {
		if (!favorite_id) {
			throw new BadRequestError('Thiếu ID sản phẩm yêu thích')
		}

		const deletedFavorite = await Favorite.findByIdAndDelete(favorite_id)

		if (!deletedFavorite) {
			throw new NotFoundError('Không tìm thấy sản phẩm yêu thích để xóa')
		}

		return { success: true, message: 'Xóa sản phẩm yêu thích thành công' }
	}

	// Lấy sản phẩm yêu thích theo user_id
	static async getFavoritesByUser(user_id, { limit = 50, skip = 0 } = {}) {
		if (!user_id) {
			throw new BadRequestError('Thiếu ID người dùng')
		}

		return await Favorite.find({ user_id })
			.populate('user_id product_id')
			.limit(limit)
			.skip(skip)
			.sort({ created_at: -1 })
			.lean()
	}

	// Xóa sản phẩm yêu thích theo user_id và product_id
	static async deleteFavoriteByUserAndProduct(user_id, product_id) {
		if (!product_id) {
			throw new BadRequestError('Thiếu ID sản phẩm')
		}

		const deletedFavorite = await Favorite.findOneAndDelete({ user_id, product_id })

		if (!deletedFavorite) {
			throw new NotFoundError('Không tìm thấy sản phẩm yêu thích để xóa')
		}

		return { success: true, message: 'Xóa sản phẩm yêu thích thành công' }
	}
}

export default FavoriteService
