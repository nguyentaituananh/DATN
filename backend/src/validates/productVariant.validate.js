import Joi from "joi";

export const productVariantSchema = Joi.object({
  product_id: Joi.string().required().messages({
    "any.required": "Mã sản phẩm là bắt buộc.",
    "string.base": "Mã sản phẩm phải là chuỗi.",
  }),
  material_id: Joi.string().required().messages({
    "any.required": "Chất liệu là bắt buộc.",
    "string.base": "Chất liệu phải là chuỗi.",
  }),
  style_id: Joi.string().required().messages({
    "any.required": "Phong cách là bắt buộc.",
    "string.base": "Phong cách phải là chuỗi.",
  }),
  room_id: Joi.string().required().messages({
    "any.required": "Không gian sử dụng là bắt buộc.",
    "string.base": "Không gian sử dụng phải là chuỗi.",
  }),
  price: Joi.number().min(0).required().messages({
    "any.required": "Giá là bắt buộc.",
    "number.base": "Giá phải là số.",
    "number.min": "Giá không được nhỏ hơn 0.",
  }),
  stock: Joi.number().integer().min(0).required().messages({
    "any.required": "Số lượng tồn kho là bắt buộc.",
    "number.base": "Số lượng tồn kho phải là số.",
    "number.integer": "Số lượng tồn kho phải là số nguyên.",
    "number.min": "Số lượng tồn kho không được nhỏ hơn 0.",
  }),
});

export const productVariantUpdateSchema = productVariantSchema.fork(
  Object.keys(productVariantSchema.describe().keys),
  (schema) => schema.optional()
).min(1).messages({
  "object.min": "Phải có ít nhất một trường để cập nhật.",
});
