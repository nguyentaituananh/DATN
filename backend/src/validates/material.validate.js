import Joi from "joi";

export const materialSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Tên chất liệu là bắt buộc.",
    "string.base": "Tên chất liệu phải là chuỗi.",
  }),
  description: Joi.string().allow("", null).messages({
    "string.base": "Mô tả phải là chuỗi.",
  }),
});

export const materialUpdateSchema = materialSchema.fork(
  ["name", "description"],
  (field) => field.optional()
).min(1).messages({
  "object.min": "Phải có ít nhất một trường để cập nhật.",
});
