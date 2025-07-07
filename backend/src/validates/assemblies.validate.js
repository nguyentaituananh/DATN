import Joi from "joi";
export const assemblySchema = Joi.object({
  product_id: Joi.string().required().messages({
    "any.required": "Mã sản phẩm là bắt buộc.",
    "string.base": "Mã sản phẩm phải là chuỗi.",
  }),
  instructions: Joi.string().max(2000).required().messages({
    "any.required": "Hướng dẫn lắp ráp là bắt buộc.",
    "string.base": "Hướng dẫn phải là chuỗi.",
    "string.max": "Hướng dẫn tối đa 2000 ký tự.",
  }),
});

export const assemblyUpdateSchema = assemblySchema.fork(
  Object.keys(assemblySchema.describe().keys),
  (schema) => schema.optional()
).min(1).messages({
  "object.min": "Phải có ít nhất một trường để cập nhật.",
});