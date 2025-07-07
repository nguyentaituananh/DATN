import Joi from "joi";

export const deliveryOptionSchema = Joi.object({
  product_id: Joi.string().required().messages({
    "any.required": "Mã sản phẩm là bắt buộc.",
    "string.base": "Mã sản phẩm phải là chuỗi.",
  }),
  method: Joi.string().max(100).required().messages({
    "any.required": "Phương thức giao hàng là bắt buộc.",
    "string.base": "Phương thức phải là chuỗi.",
    "string.max": "Phương thức tối đa 100 ký tự.",
  }),
  fee: Joi.number().min(0).required().messages({
    "any.required": "Phí giao hàng là bắt buộc.",
    "number.base": "Phí giao hàng phải là số.",
    "number.min": "Phí giao hàng không được nhỏ hơn 0.",
  }),
  estimated_days: Joi.number().integer().min(0).required().messages({
    "any.required": "Số ngày dự kiến là bắt buộc.",
    "number.base": "Số ngày phải là số.",
    "number.integer": "Số ngày phải là số nguyên.",
    "number.min": "Số ngày không được âm.",
  }),
});

export const deliveryOptionUpdateSchema = deliveryOptionSchema.fork(
  Object.keys(deliveryOptionSchema.describe().keys),
  (schema) => schema.optional()
).min(1).messages({
  "object.min": "Phải có ít nhất một trường để cập nhật.",
});
