import Joi from "joi";

export const styleSchema = Joi.object({
  name: Joi.string().max(100).required().messages({
    "any.required": "Tên phong cách là bắt buộc.",
    "string.base": "Tên phong cách phải là chuỗi.",
    "string.max": "Tên phong cách tối đa 100 ký tự.",
  }),
  description: Joi.string().max(255).allow('').optional().messages({
    "string.base": "Mô tả phong cách phải là chuỗi.",
    "string.max": "Mô tả phong cách tối đa 255 ký tự.",
  }),
});

export const styleUpdateSchema = styleSchema.fork(
  Object.keys(styleSchema.describe().keys),
  (schema) => schema.optional()
).min(1).messages({
  "object.min": "Phải có ít nhất một trường để cập nhật.",
});
