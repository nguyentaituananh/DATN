'use strict'

import CategoryService from '../services/category.service.js'
import { SuccessResponse, CREATED } from '../core/success.response.js'

class CategoryController {
	// Tạo category mới
	createCategory = async (req, res, next) => {
		try {
			const result = await CategoryService.createCategory(req.body)

			new CREATED({
				message: 'Tạo danh mục thành công',
				metadata: result
			}).send(res)
		} catch (error) {
			next(error)
		}
	}

	// Lấy tất cả categories
	getAllCategories = async (req, res, next) => {
		try {
			const result = await CategoryService.getAllCategories(req.query)

			new SuccessResponse({
				message: 'Lấy danh sách danh mục thành công',
				metadata: result
			}).send(res)
		} catch (error) {
			next(error)
		}
	}

	// Lấy category theo ID
	getCategoryById = async (req, res, next) => {
		try {
			const { categoryId } = req.params
			const result = await CategoryService.getCategoryById(categoryId)

			new SuccessResponse({
				message: 'Lấy danh mục thành công',
				metadata: result
			}).send(res)
		} catch (error) {
			next(error)
		}
	}

	// Cập nhật category
	updateCategory = async (req, res, next) => {
		try {
			const { categoryId } = req.params
			const result = await CategoryService.updateCategory(categoryId, req.body)

			new SuccessResponse({
				message: 'Cập nhật danh mục thành công',
				metadata: result
			}).send(res)
		} catch (error) {
			next(error)
		}
	}

	// Xóa category
	deleteCategory = async (req, res, next) => {
		try {
			const { categoryId } = req.params
			const result = await CategoryService.deleteCategory(categoryId)

			new SuccessResponse({
				message: 'Xóa danh mục thành công',
				metadata: result
			}).send(res)
		} catch (error) {
			next(error)
		}
	}

	// Lấy category tree
	getCategoryTree = async (req, res, next) => {
		try {
			const result = await CategoryService.getCategoryTree()

			new SuccessResponse({
				message: 'Lấy cây danh mục thành công',
				metadata: result
			}).send(res)
		} catch (error) {
			next(error)
		}
	}

	// Lấy root categories (categories không có parent)
	getRootCategories = async (req, res, next) => {
		try {
			const query = { ...req.query, parent_category_id: 'null' }
			const result = await CategoryService.getAllCategories(query)

			new SuccessResponse({
				message: 'Lấy danh mục gốc thành công',
				metadata: result
			}).send(res)
		} catch (error) {
			next(error)
		}
	}

	// Lấy subcategories của một category
	getSubCategories = async (req, res, next) => {
		try {
			const { categoryId } = req.params
			const query = { ...req.query, parent_category_id: categoryId }
			const result = await CategoryService.getAllCategories(query)

			new SuccessResponse({
				message: 'Lấy danh mục con thành công',
				metadata: result
			}).send(res)
		} catch (error) {
			next(error)
		}
	}
}

export default new CategoryController()