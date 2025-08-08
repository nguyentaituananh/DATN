// src/validations/category.validate.js
import Joi from 'joi'
import mongoose from 'mongoose'

// Tạo hàm custom kiểm tra ObjectId
const objectId = Joi.string().custom((value, helpers) => {
	if (!mongoose.Types.ObjectId.isValid(value)) {
		return helpers.error('any.invalid')
	}
	return value
}, 'ObjectId Validation')

export const createCategorySchema = Joi.object({
	name: Joi.string().required().messages({
		'any.required': 'Tên danh mục là bắt buộc',
		'string.empty': 'Tên danh mục không được để trống'
	}),
	description: Joi.string().allow('', null),
	parent_category_id: objectId.allow(null, ''),
	images: Joi.string().allow(null, '')
})

export const updateCategorySchema = Joi.object({
	name: Joi.string().required().messages({
		'any.required': 'Tên danh mục là bắt buộc',
		'string.empty': 'Tên danh mục không được để trống'
	}),
	description: Joi.string().allow('', null),
	parent_category_id: objectId.allow(null, ''),
	images: Joi.string().allow(null, '')
})
