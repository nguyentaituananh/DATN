// src/validations/review.validate.js
import Joi from "joi";
import mongoose from "mongoose";

// Kiểm tra ObjectId hợp lệ
const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
}, "ObjectId Validation");

// ✅ Schema tạo đánh giá
export const createReviewSchema = Joi.object({
  user_id: objectId.required().messages({
    "any.required": "ID người dùng là bắt buộc",
    "any.invalid": "ID người dùng không hợp lệ",
  }),
  product_id: objectId.required().messages({
    "any.required": "ID sản phẩm là bắt buộc",
    "any.invalid": "ID sản phẩm không hợp lệ",
  }),
  rating: Joi.number().min(1).max(5).required().messages({
    "number.base": "Đánh giá phải là số",
    "number.min": "Đánh giá tối thiểu là 1",
    "number.max": "Đánh giá tối đa là 5",
    "any.required": "Điểm đánh giá là bắt buộc",
  }),
  comment: Joi.string().allow("", null).optional(),
});

// ✅ Schema cập nhật đánh giá
export const updateReviewSchema = Joi.object({
  rating: Joi.number().min(1).max(5).optional().messages({
    "number.base": "Đánh giá phải là số",
    "number.min": "Đánh giá tối thiểu là 1",
    "number.max": "Đánh giá tối đa là 5",
  }),
  comment: Joi.string().allow("", null).optional(),
});
