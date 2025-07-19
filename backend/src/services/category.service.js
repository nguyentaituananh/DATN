'use strict'

import Category from '../models/category.model.js'
import { BadRequestError, NotFoundError, ConflictRequestError } from '../core/error.response.js'
import { getInfoData } from '../utils/index.js'

class CategoryService {
	// Tạo category mới
	static createCategory = async ({ name, description, parent_category_id, images }) => {
		try {
			// Kiểm tra tên category đã tồn tại chưa
			const existingCategory = await Category.findOne({ name: name.trim() })
			if (existingCategory) {
				throw new ConflictRequestError('Category name already exists')
			}

			// Kiểm tra parent category có tồn tại không (nếu có)
			if (parent_category_id) {
				const parentCategory = await Category.findById(parent_category_id)
				if (!parentCategory) {
					throw new NotFoundError('Parent category not found')
				}
			}

			// Tạo category mới
			const newCategory = await Category.create({
				name: name.trim(),
				description: description?.trim() || '',
				parent_category_id: parent_category_id || null,
				images: images || null
			})

			return {
				category: getInfoData({
					fides: ['_id', 'name', 'description', 'parent_category_id', 'images', 'createdAt', 'updatedAt'],
					object: newCategory
				})
			}
		} catch (error) {
			throw error
		}
	}

	// Lấy tất cả categories
	static getAllCategories = async (query = {}) => {
		try {
			const { page = 1, limit = 10, parent_category_id, search } = query
			const filter = {}

			// Filter theo parent category
			if (parent_category_id !== undefined) {
				filter.parent_category_id = parent_category_id === 'null' ? null : parent_category_id
			}

			// Search theo tên
			if (search) {
				filter.name = { $regex: search, $options: 'i' }
			}

			const categories = await Category.find(filter)
				.populate('parent_category_id', 'name')
				.limit(limit * 1)
				.skip((page - 1) * limit)
				.sort({ createdAt: -1 })

			const total = await Category.countDocuments(filter)

			return {
				categories: categories.map((category) =>
					getInfoData({
						fides: ['_id', 'name', 'description', 'parent_category_id', 'images', 'createdAt', 'updatedAt'],
						object: category
					})
				),
				pagination: {
					page: parseInt(page),
					limit: parseInt(limit),
					total,
					pages: Math.ceil(total / limit)
				}
			}
		} catch (error) {
			throw error
		}
	}

	// Lấy category theo ID
	static getCategoryById = async (categoryId) => {
		try {
			const category = await Category.findById(categoryId).populate('parent_category_id', 'name')

			if (!category) {
				throw new NotFoundError('Category not found')
			}

			// Lấy các subcategories
			const subCategories = await Category.find({ parent_category_id: categoryId })

			return {
				category: getInfoData({
					fides: ['_id', 'name', 'description', 'parent_category_id', 'images', 'createdAt', 'updatedAt'],
					object: category
				}),
				subCategories: subCategories.map((sub) =>
					getInfoData({
						fides: ['_id', 'name', 'description', 'images'],
						object: sub
					})
				)
			}
		} catch (error) {
			throw error
		}
	}

	// Cập nhật category
	static updateCategory = async (categoryId, updateData) => {
		try {
			const { name, description, parent_category_id, images } = updateData

			const category = await Category.findById(categoryId)
			if (!category) {
				throw new NotFoundError('Category not found')
			}

			// Kiểm tra tên category đã tồn tại chưa (nếu thay đổi tên)
			if (name && name.trim() !== category.name) {
				const existingCategory = await Category.findOne({
					name: name.trim(),
					_id: { $ne: categoryId }
				})
				if (existingCategory) {
					throw new ConflictRequestError('Danh mục đã tồn tại')
				}
			}

			// Kiểm tra parent category có tồn tại không (nếu có)
			if (parent_category_id && parent_category_id !== category.parent_category_id?.toString()) {
				// Không cho phép set parent là chính nó hoặc con của nó
				if (parent_category_id === categoryId) {
					throw new BadRequestError('Danh mục không thể là cha của chính nó')
				}

				const parentCategory = await Category.findById(parent_category_id)
				if (!parentCategory) {
					throw new NotFoundError('Danh mục cha không tồn tại')
				}

				// Kiểm tra không tạo thành vòng lặp
				const isDescendant = await CategoryService.checkIfDescendant(categoryId, parent_category_id)
				if (isDescendant) {
					throw new BadRequestError('Không thể đặt danh mục con làm cha')
				}
			}

			// Cập nhật category
			const updatedCategory = await Category.findByIdAndUpdate(
				categoryId,
				{
					...(name && { name: name.trim() }),
					...(description !== undefined && { description: description?.trim() || '' }),
					...(parent_category_id !== undefined && { parent_category_id: parent_category_id || null }),
					...(images !== undefined && { images: images || null })
				},
				{ new: true }
			).populate('parent_category_id', 'name')

			return {
				category: getInfoData({
					fides: ['_id', 'name', 'description', 'parent_category_id', 'images', 'createdAt', 'updatedAt'],
					object: updatedCategory
				})
			}
		} catch (error) {
			throw error
		}
	}

	// Xóa category
	static deleteCategory = async (categoryId) => {
		try {
			const category = await Category.findById(categoryId)
			if (!category) {
				throw new NotFoundError('Category not found')
			}

			// Kiểm tra có subcategories không
			const subCategories = await Category.find({ parent_category_id: categoryId })
			if (subCategories.length > 0) {
				throw new BadRequestError('Không thể xóa danh mục có danh mục con')
			}

			// TODO: Kiểm tra có products trong category này không
			// const products = await Product.find({ category_id: categoryId })
			// if (products.length > 0) {
			//     throw new BadRequestError('Cannot delete category that has products')
			// }

			await Category.findByIdAndDelete(categoryId)

			return { message: 'Category deleted successfully' }
		} catch (error) {
			throw error
		}
	}

	// Lấy category tree (hierarchy)
	static getCategoryTree = async () => {
		try {
			// Lấy tất cả categories
			const allCategories = await Category.find().sort({ name: 1 })

			// Tạo tree structure
			const categoryMap = new Map()
			const rootCategories = []

			// Tạo map cho tất cả categories
			allCategories.forEach((category) => {
				const categoryData = getInfoData({
					fides: ['_id', 'name', 'description', 'parent_category_id', 'images'],
					object: category
				})
				categoryData.children = []
				categoryMap.set(category._id.toString(), categoryData)
			})

			// Xây dựng tree
			allCategories.forEach((category) => {
				const categoryData = categoryMap.get(category._id.toString())

				if (category.parent_category_id) {
					const parent = categoryMap.get(category.parent_category_id.toString())
					if (parent) {
						parent.children.push(categoryData)
					}
				} else {
					rootCategories.push(categoryData)
				}
			})

			return { categoryTree: rootCategories }
		} catch (error) {
			throw error
		}
	}

	// Helper: Kiểm tra xem category A có phải là con của category B không
	static checkIfDescendant = async (categoryId, potentialAncestorId) => {
		try {
			const category = await Category.findById(potentialAncestorId)
			if (!category) return false

			if (category.parent_category_id) {
				if (category.parent_category_id.toString() === categoryId) {
					return true
				}
				return await CategoryService.checkIfDescendant(categoryId, category.parent_category_id.toString())
			}

			return false
		} catch (error) {
			return false
		}
	}
}

export default CategoryService
