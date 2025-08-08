'use strict'
import slugify from 'slugify'

import Product from '../models/product.model.js'
import { BadRequestError, NotFoundError } from '../core/error.response.js'
import {
	findAllDraftsShop,
	findAllPublishShop,
	searchProductByUser,
	publicProductByShop,
	unPublicProductByShop,
	findAllProducts,
	findProduct,
	updateProductById,
	getProductById,
	checkProductByServer
} from '../models/repositories/product.js'
import { removeUndefinedObject, updateNestedObjectParser } from '../utils/index.js'

class ProductService {
	// Create new product
	static async createProduct(payload) {
		const { name, description, price, quantity, images = [], category_id, related_products = [] } = payload

		if (!name || !description || !price || !quantity || !category_id) {
			throw new BadRequestError('Thiếu thông tin bắt buộc của sản phẩm')
		}

		const slug = slugify(name, { lower: true })

		const newProduct = await Product.create({
			name,
			description,
			price,
			quantity,
			images,
			category_id,
			related_products,
			isDraft: true,
			isPublish: false,
			slug
		})

		if (!newProduct) {
			throw new BadRequestError('Tạo sản phẩm thất bại')
		}

		return newProduct
	}

	// Update product
	static async updateProduct(productId, payload) {
		if (!productId) {
			throw new BadRequestError('Thiếu ID sản phẩm')
		}

		// Remove undefined/null values
		const cleanPayload = removeUndefinedObject(payload)

		// Parse nested objects for update
		const bodyUpdate = updateNestedObjectParser(cleanPayload)

		const updatedProduct = await updateProductById({
			productId,
			bodyUpdate,
			model: Product,
			isNew: true
		})

		if (!updatedProduct) {
			throw new NotFoundError('Không tìm thấy sản phẩm để cập nhật')
		}

		return updatedProduct
	}

	// Publish product (make it public)
	static async publishProduct({ product_id }) {
		if (!product_id) {
			throw new BadRequestError('Thiếu ID sản phẩm')
		}

		const result = await publicProductByShop({ product_id })

		if (!result) {
			throw new BadRequestError('Xuất bản sản phẩm thất bại')
		}

		return { success: true, message: 'Sản phẩm đã được xuất bản' }
	}

	// Unpublish product (make it draft)
	static async unPublishProduct({ product_id }) {
		if (!product_id) {
			throw new BadRequestError('Thiếu ID sản phẩm')
		}

		const result = await unPublicProductByShop({ product_id })

		if (!result) {
			throw new BadRequestError('Hủy xuất bản sản phẩm thất bại')
		}

		return { success: true, message: 'Sản phẩm đã được chuyển về bản nháp' }
	}

	// Get all draft products
	static async getAllDrafts({ limit = 50, skip = 0 }) {
		const query = { isDraft: true }
		return await findAllDraftsShop({ query, limit, skip })
	}

	// Get all published products
	static async getAllPublished({ limit = 50, skip = 0 }) {
		const query = { isPublish: true }
		return await findAllPublishShop({ query, limit, skip })
	}

	// Search products by keyword
	static async searchProducts({ keySearch }) {
		if (!keySearch) {
			throw new BadRequestError('Thiếu từ khóa tìm kiếm')
		}

		return await searchProductByUser({ keySearch })
	}

	// Get all products with pagination and filtering
	static async getAllProducts({
		limit = 50,
		sort = 'ctime',
		page = 1,
		filter = { isPublish: true },
		select = [
			'name',
			'price',
			'category_id',
			'quantity',
			'rating_average',
			'isPublish',
			'isDraft',
			'images',
			'createdAt'
		]
	}) {
		return await findAllProducts({
			limit,
			sort,
			page,
			filter,
			select
		})
	}

	// Get single product by ID
	static async getProduct({ product_id, unSelect = ['__v'] }) {
		if (!product_id) {
			throw new BadRequestError('Thiếu ID sản phẩm')
		}

		const product = await findProduct({ product_id, unSelect })

		if (!product) {
			throw new NotFoundError('Không tìm thấy sản phẩm')
		}

		return product
	}

	// Get product by ID (alternative method)
	static async getProductById(productId) {
		if (!productId) {
			throw new BadRequestError('Thiếu ID sản phẩm')
		}

		const product = await getProductById(productId)

		if (!product) {
			throw new NotFoundError('Không tìm thấy sản phẩm')
		}

		return product
	}

	// Delete product
	static async deleteProduct(productId) {
		if (!productId) {
			throw new BadRequestError('Thiếu ID sản phẩm')
		}

		const deletedProduct = await Product.findByIdAndDelete(productId)

		if (!deletedProduct) {
			throw new NotFoundError('Không tìm thấy sản phẩm để xóa')
		}

		return { success: true, message: 'Xóa sản phẩm thành công' }
	}

	// Get products by category
	static async getProductsByCategory({
		category_id,
		limit = 50,
		page = 1,
		select = ['name', 'price', 'rating_average']
	}) {
		if (!category_id) {
			throw new BadRequestError('Thiếu ID danh mục')
		}

		const filter = { category_id, isPublish: true }

		return await findAllProducts({
			limit,
			page,
			filter,
			select,
			sort: 'ctime'
		})
	}

	// Check products availability for cart/order
	static async checkProductsAvailability(products = []) {
		if (!products || products.length === 0) {
			throw new BadRequestError('Danh sách sản phẩm trống')
		}

		return await checkProductByServer(products)
	}
}

export default ProductService