import Joi from "joi";

export const orderItemSchema = Joi.object({
  order_id: Joi.string().required().messages({
    "any.required": "Mã đơn hàng là bắt buộc.",
    "string.base": "Mã đơn hàng phải là chuỗi.",
  }),
  product_id: Joi.string().required().messages({
    "any.required": "Mã sản phẩm là bắt buộc.",
    "string.base": "Mã sản phẩm phải là chuỗi.",
  }),
  variant_id: Joi.string().allow(null).messages({
    "string.base": "Mã biến thể phải là chuỗi hoặc null.",
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    "any.required": "Số lượng là bắt buộc.",
    "number.base": "Số lượng phải là số.",
    "number.integer": "Số lượng phải là số nguyên.",
    "number.min": "Số lượng phải lớn hơn 0.",
  }),
  price: Joi.number().positive().required().messages({
    "any.required": "Giá là bắt buộc.",
    "number.base": "Giá phải là số.",
    "number.positive": "Giá phải lớn hơn 0.",
  }),
  discount_price: Joi.number()
    .allow(null)
    .max(Joi.ref('price'))
    .messages({
      "number.base": "Giá khuyến mãi phải là số hoặc null.",
      "number.max": "Giá khuyến mãi không được lớn hơn giá gốc.",
    }),
});

export const orderItemUpdateSchema = orderItemSchema.fork(
  Object.keys(orderItemSchema.describe().keys),
  (schema) => schema.optional()
).min(1).messages({
  "object.min": "Phải có ít nhất một trường để cập nhật.",
});