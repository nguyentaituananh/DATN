'use strict'

import ProductService from '../services/product.service.js'
import { OK, CREATED } from '../core/success.response.js'
import asyncHandler from '../helpers/asyncHandler.js'

class ProductController {
	// Tạo sản phẩm mới
	createProduct = asyncHandler(async (req, res, next) => {
		const newProduct = await ProductService.createProduct(req.body)

		new CREATED({
			message: 'Tạo sản phẩm thành công',
			metadata: newProduct
		}).send(res)
	})

	// Cập nhật sản phẩm
	updateProduct = asyncHandler(async (req, res, next) => {
		const { productId } = req.params
		const updatedProduct = await ProductService.updateProduct(productId, req.body)

		new OK({
			message: 'Cập nhật sản phẩm thành công',
			metadata: updatedProduct
		}).send(res)
	})

	// Xuất bản sản phẩm
	publishProduct = asyncHandler(async (req, res, next) => {
		const { productId } = req.params
		const result = await ProductService.publishProduct({ product_id: productId })

		new OK({
			message: 'Xuất bản sản phẩm thành công',
			metadata: result
		}).send(res)
	})

	// Hủy xuất bản sản phẩm
	unPublishProduct = asyncHandler(async (req, res, next) => {
		const { productId } = req.params
		const result = await ProductService.unPublishProduct({ product_id: productId })

		new OK({
			message: 'Hủy xuất bản sản phẩm thành công',
			metadata: result
		}).send(res)
	})

	// Lấy tất cả sản phẩm bản nháp
	getAllDrafts = asyncHandler(async (req, res, next) => {
		const { limit = 50, skip = 0 } = req.query
		const products = await ProductService.getAllDrafts({
			limit: parseInt(limit),
			skip: parseInt(skip)
		})

		new OK({
			message: 'Lấy danh sách sản phẩm bản nháp thành công',
			metadata: products
		}).send(res)
	})

	// Lấy tất cả sản phẩm đã xuất bản
	getAllPublished = asyncHandler(async (req, res, next) => {
		const { limit = 50, skip = 0 } = req.query
		const products = await ProductService.getAllPublished({
			limit: parseInt(limit),
			skip: parseInt(skip)
		})

		new OK({
			message: 'Lấy danh sách sản phẩm đã xuất bản thành công',
			metadata: products
		}).send(res)
	})

	// Tìm kiếm sản phẩm
	searchProducts = asyncHandler(async (req, res, next) => {
		const { q: keySearch } = req.query
		const products = await ProductService.searchProducts({ keySearch })

		new OK({
			message: 'Tìm kiếm sản phẩm thành công',
			metadata: products
		}).send(res)
	})

	// Lấy tất cả sản phẩm với phân trang
	getAllProducts = asyncHandler(async (req, res, next) => {
		const { limit = 50, sort = 'ctime', page = 1, category_id, min_price, max_price } = req.query

		// Tạo filter từ query params
		let filter = { isPublish: true }

		if (category_id) {
			filter.category_id = category_id
		}

		if (min_price || max_price) {
			filter.price = {}
			if (min_price) filter.price.$gte = parseInt(min_price)
			if (max_price) filter.price.$lte = parseInt(max_price)
		}

		const products = await ProductService.getAllProducts({
			limit: parseInt(limit),
			sort,
			page: parseInt(page),
			filter
		})

		new OK({
			message: 'Lấy danh sách sản phẩm thành công',
			metadata: products
		}).send(res)
	})

	// Lấy sản phẩm theo ID
	getProductById = asyncHandler(async (req, res, next) => {
		const { productId } = req.params
		const product = await ProductService.getProduct({ product_id: productId })

		new OK({
			message: 'Lấy thông tin sản phẩm thành công',
			metadata: product
		}).send(res)
	})

	// Xóa sản phẩm
	deleteProduct = asyncHandler(async (req, res, next) => {
		const { productId } = req.params
		const result = await ProductService.deleteProduct(productId)

		new OK({
			message: 'Xóa sản phẩm thành công',
			metadata: result
		}).send(res)
	})

	// Lấy sản phẩm theo danh mục
	getProductsByCategory = asyncHandler(async (req, res, next) => {
		const { categoryId } = req.params
		const { limit = 50, page = 1 } = req.query

		const products = await ProductService.getProductsByCategory({
			category_id: categoryId,
			limit: parseInt(limit),
			page: parseInt(page)
		})

		new OK({
			message: 'Lấy sản phẩm theo danh mục thành công',
			metadata: products
		}).send(res)
	})

	// Kiểm tra tính khả dụng của sản phẩm (cho giỏ hàng/đơn hàng)
	checkProductsAvailability = asyncHandler(async (req, res, next) => {
		const { products } = req.body
		const result = await ProductService.checkProductsAvailability(products)

		new OK({
			message: 'Kiểm tra sản phẩm thành công',
			metadata: result
		}).send(res)
	})
}

export default new ProductController()