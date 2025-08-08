import Joi from "joi";

export const cartItemSchema = Joi.object({
  cart_id: Joi.string().required().messages({
    "any.required": "Mã giỏ hàng là bắt buộc.",
    "string.base": "Mã giỏ hàng phải là chuỗi.",
  }),
  product_id: Joi.string().required().messages({
    "any.required": "Mã sản phẩm là bắt buộc.",
    "string.base": "Mã sản phẩm phải là chuỗi.",
  }),
  variant_id: Joi.string().allow(null, "").messages({
    "string.base": "Mã biến thể phải là chuỗi.",
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    "any.required": "Số lượng là bắt buộc.",
    "number.base": "Số lượng phải là số.",
    "number.integer": "Số lượng phải là số nguyên.",
    "number.min": "Số lượng tối thiểu là 1.",
  }),
});

export const quantitySchema = Joi.object({
  quantity: Joi.number().integer().min(1).required().messages({
    "any.required": "Số lượng là bắt buộc.",
    "number.base": "Số lượng phải là số.",
    "number.integer": "Số lượng phải là số nguyên.",
    "number.min": "Số lượng tối thiểu là 1.",
  }),
});
