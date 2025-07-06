import Joi from "joi";

export const roomSchema = Joi.object({
  name: Joi.string().max(100).required().messages({
    "any.required": "Tên không gian là bắt buộc.",
    "string.base": "Tên không gian phải là chuỗi.",
    "string.max": "Tên không gian tối đa 100 ký tự.",
  }),
  description: Joi.string().max(255).allow('').optional().messages({
    "string.base": "Mô tả không gian phải là chuỗi.",
    "string.max": "Mô tả không gian tối đa 255 ký tự.",
  }),
});

export const roomUpdateSchema = roomSchema.fork(
  Object.keys(roomSchema.describe().keys),
  (schema) => schema.optional()
).min(1).messages({
  "object.min": "Phải có ít nhất một trường để cập nhật.",
});

export const roomIdSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "ID không gian là bắt buộc.",
    "string.base": "ID không gian phải là chuỗi.",
  }),
});

export const roomIdUpdateSchema = roomIdSchema.fork(
  Object.keys(roomIdSchema.describe().keys),
  (schema) => schema.optional()
).min(1).messages({
  "object.min": "Phải có ít nhất một trường để cập nhật.",
});