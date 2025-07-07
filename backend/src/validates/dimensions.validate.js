import Joi from "joi";

export const dimensionSchema = Joi.object({
  product_id: Joi.string().required().messages({
    "any.required": "Mã sản phẩm là bắt buộc.",
    "string.base": "Mã sản phẩm phải là chuỗi.",
  }),
  width: Joi.number().positive().required().messages({
    "any.required": "Chiều rộng là bắt buộc.",
    "number.base": "Chiều rộng phải là số.",
    "number.positive": "Chiều rộng phải lớn hơn 0.",
  }),
  height: Joi.number().positive().required().messages({
    "any.required": "Chiều cao là bắt buộc.",
    "number.base": "Chiều cao phải là số.",
    "number.positive": "Chiều cao phải lớn hơn 0.",
  }),
  depth: Joi.number().positive().required().messages({
    "any.required": "Chiều sâu là bắt buộc.",
    "number.base": "Chiều sâu phải là số.",
    "number.positive": "Chiều sâu phải lớn hơn 0.",
  }),
  weight: Joi.number().positive().required().messages({
    "any.required": "Khối lượng là bắt buộc.",
    "number.base": "Khối lượng phải là số.",
    "number.positive": "Khối lượng phải lớn hơn 0.",
  }),
});

export const dimensionUpdateSchema = dimensionSchema.fork(
  Object.keys(dimensionSchema.describe().keys),
  (schema) => schema.optional()
).min(1).messages({
  "object.min": "Phải có ít nhất một trường để cập nhật.",
});