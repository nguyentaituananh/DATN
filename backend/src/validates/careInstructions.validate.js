import Joi from "joi";
export const careInstructionSchema = Joi.object({
  product_id: Joi.string().required().messages({
    "any.required": "Mã sản phẩm là bắt buộc.",
    "string.base": "Mã sản phẩm phải là chuỗi.",
  }),
  content: Joi.string().max(1000).required().messages({
    "any.required": "Nội dung hướng dẫn là bắt buộc.",
    "string.base": "Nội dung phải là chuỗi.",
    "string.max": "Nội dung tối đa 1000 ký tự.",
  }),
});

export const careInstructionUpdateSchema = careInstructionSchema.fork(
  Object.keys(careInstructionSchema.describe().keys),
  (schema) => schema.optional()
).min(1).messages({
  "object.min": "Phải có ít nhất một trường để cập nhật.",
});