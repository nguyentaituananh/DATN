// src/validations/cart.validate.js
import Joi from "joi";
import mongoose from "mongoose";

// Kiểm tra ObjectId
const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
}, "ObjectId Validation");

// ✅ Thêm hoặc cập nhật sản phẩm trong giỏ hàng
export const addToCartSchema = Joi.object({
  user_id: objectId.required().messages({
    "any.required": "ID người dùng là bắt buộc",
    "any.invalid": "ID người dùng không hợp lệ",
  }),
  product_id: objectId.required().messages({
    "any.required": "ID sản phẩm là bắt buộc",
    "any.invalid": "ID sản phẩm không hợp lệ",
  }),
  quantity: Joi.number().min(1).required().messages({
    "number.base": "Số lượng phải là số",
    "number.min": "Số lượng ít nhất là 1",
    "any.required": "Số lượng là bắt buộc",
  }),
});

// ✅ Cập nhật số lượng sản phẩm trong giỏ
export const updateCartItemSchema = Joi.object({
  quantity: Joi.number().min(1).required().messages({
    "number.base": "Số lượng phải là số",
    "number.min": "Số lượng ít nhất là 1",
    "any.required": "Số lượng là bắt buộc",
  }),
});
