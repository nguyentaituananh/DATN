import Joi from "joi";

export const couponSchema = Joi.object({
  code: Joi.string().required().messages({
    "any.required": "Mã giảm giá là bắt buộc.",
    "string.base": "Mã giảm giá phải là chuỗi.",
  }),
  discount_percent: Joi.number().min(1).max(100).required().messages({
    "any.required": "Phần trăm giảm giá là bắt buộc.",
    "number.base": "Phần trăm giảm giá phải là số.",
    "number.min": "Phần trăm tối thiểu là 1%.",
    "number.max": "Phần trăm tối đa là 100%.",
  }),
  valid_from: Joi.date().required().messages({
    "any.required": "Ngày bắt đầu áp dụng là bắt buộc.",
    "date.base": "Ngày bắt đầu phải là định dạng ngày.",
  }),
  valid_to: Joi.date().required().greater(Joi.ref("valid_from")).messages({
    "any.required": "Ngày kết thúc áp dụng là bắt buộc.",
    "date.base": "Ngày kết thúc phải là định dạng ngày.",
    "date.greater": "Ngày kết thúc phải sau ngày bắt đầu.",
  }),
  usage_limit: Joi.number().integer().min(1).required().messages({
    "any.required": "Số lượt sử dụng là bắt buộc.",
    "number.base": "Số lượt sử dụng phải là số.",
    "number.integer": "Số lượt sử dụng phải là số nguyên.",
    "number.min": "Số lượt sử dụng tối thiểu là 1.",
  }),
});

export const couponUpdateSchema = Joi.object({
  code: Joi.string().messages({
    "string.base": "Mã giảm giá phải là chuỗi.",
  }),
  discount_percent: Joi.number().min(1).max(100).messages({
    "number.base": "Phần trăm giảm giá phải là số.",
    "number.min": "Phần trăm tối thiểu là 1%.",
    "number.max": "Phần trăm tối đa là 100%.",
  }),
  valid_from: Joi.date().messages({
    "date.base": "Ngày bắt đầu phải là định dạng ngày.",
  }),
  valid_to: Joi.date().messages({
    "date.base": "Ngày kết thúc phải là định dạng ngày.",
  }),
  usage_limit: Joi.number().integer().min(1).messages({
    "number.base": "Số lượt sử dụng phải là số.",
    "number.integer": "Số lượt sử dụng phải là số nguyên.",
    "number.min": "Số lượt sử dụng tối thiểu là 1.",
  }),
}).min(1).messages({
  "object.min": "Phải có ít nhất một trường để cập nhật.",
});
