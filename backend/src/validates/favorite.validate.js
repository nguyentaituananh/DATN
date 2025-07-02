import Joi from "joi";

export const favoriteSchema = Joi.object({
  user_id: Joi.string().required().messages({
    "any.required": "Trường user_id là bắt buộc.",
    "string.base": "user_id phải là chuỗi.",
  }),
  product_id: Joi.string().required().messages({
    "any.required": "Trường product_id là bắt buộc.",
    "string.base": "product_id phải là chuỗi.",
  }),
});

export const favoriteUpdateSchema = favoriteSchema.fork(
  ["user_id", "product_id"],
  (field) => field.optional()
).min(1).messages({
  "object.min": "Phải có ít nhất một trường để cập nhật.",
});



