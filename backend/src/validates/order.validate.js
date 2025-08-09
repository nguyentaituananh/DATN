// src/validations/order.validate.js
import Joi from "joi";
import mongoose from "mongoose";

// Hàm kiểm tra ObjectId hợp lệ
const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
}, "ObjectId Validation");

// ✅ Validate cho sản phẩm trong đơn hàng
const productItem = Joi.object({
  product_id: objectId.required().messages({
    "any.invalid": "ID sản phẩm không hợp lệ",
    "any.required": "ID sản phẩm là bắt buộc",
  }),
  quantity: Joi.number().min(1).required().messages({
    "number.base": "Số lượng phải là số",
    "number.min": "Số lượng phải ít nhất là 1",
    "any.required": "Số lượng là bắt buộc",
  }),
});

// ✅ Schema tạo đơn hàng
export const createOrderSchema = Joi.object({
  user_id: objectId.required().messages({
    "any.invalid": "ID người dùng không hợp lệ",
    "any.required": "ID người dùng là bắt buộc",
  }),
  products: Joi.array().items(productItem).min(1).required().messages({
    "array.min": "Phải có ít nhất 1 sản phẩm trong đơn hàng",
    "any.required": "Danh sách sản phẩm là bắt buộc",
  }),
  total_price: Joi.number().min(0).required().messages({
    "number.base": "Tổng giá phải là số",
    "any.required": "Tổng giá là bắt buộc",
    "number.min": "Tổng giá không được nhỏ hơn 0",
  }),
  status: Joi.string().valid("pending", "processing", "shipped", "delivered", "cancelled").optional(),
  shipping_address: Joi.string().required().messages({
    "string.base": "Địa chỉ giao hàng phải là chuỗi",
    "any.required": "Địa chỉ giao hàng là bắt buộc",
  }),
  payment_method: Joi.string().allow("", null),
  coupon_code: Joi.string().optional().messages({
    "string.base": "Mã giảm giá phải là chuỗi",
  }),
});

// ✅ Schema cập nhật đơn hàng
export const updateOrderSchema = Joi.object({
  products: Joi.array().items(productItem).optional(),
  total_price: Joi.number().min(0).optional(),
  status: Joi.string().valid("pending", "processing", "shipped", "delivered", "cancelled").optional(),
  shipping_address: Joi.string().allow("", null).optional(),
  payment_method: Joi.string().allow("", null).optional(),
});
