// src/validations/product.validate.js
import Joi from "joi";
import mongoose from "mongoose";

// Hàm kiểm tra ObjectId hợp lệ
const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
}, "ObjectId Validation");

// ✅ Schema tạo sản phẩm mới
export const createProductSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Tên sản phẩm không được để trống",
    "any.required": "Tên sản phẩm là bắt buộc",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Mô tả không được để trống",
    "any.required": "Mô tả là bắt buộc",
  }),
  price: Joi.number().required().min(0).messages({
    "number.base": "Giá phải là số",
    "any.required": "Giá là bắt buộc",
    "number.min": "Giá phải lớn hơn hoặc bằng 0",
  }),
  discount_price: Joi.number().min(0).optional(),
  category_id: objectId.required().messages({
    "any.invalid": "ID danh mục không hợp lệ",
    "any.required": "ID danh mục là bắt buộc",
  }),
  related_products: Joi.array().items(objectId).optional(),
  size: Joi.string().allow(null, ""),
  color: Joi.string().allow(null, ""),
  dimensions: Joi.string().allow(null, ""),
});

// ✅ Schema cập nhật sản phẩm
export const updateProductSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  price: Joi.number().min(0).optional(),
  discount_price: Joi.number().min(0).optional(),
  category_id: objectId.optional(),
  related_products: Joi.array().items(objectId).optional(),
  size: Joi.string().allow(null, "").optional(),
  color: Joi.string().allow(null, "").optional(),
  dimensions: Joi.string().allow(null, "").optional(),
});
