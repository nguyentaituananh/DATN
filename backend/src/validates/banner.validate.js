import Joi from "joi";

export const bannerSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Tiêu đề là bắt buộc.",
    "string.base": "Tiêu đề phải là chuỗi.",
  }),
  image_url: Joi.string().uri().required().messages({
    "any.required": "Ảnh banner là bắt buộc.",
    "string.base": "Ảnh phải là chuỗi.",
    "string.uri": "Ảnh phải là một đường dẫn hợp lệ.",
  }),
  link_to: Joi.string().uri().required().messages({
    "any.required": "Link chuyển hướng là bắt buộc.",
    "string.base": "Link phải là chuỗi.",
    "string.uri": "Link phải là một đường dẫn hợp lệ.",
  }),
  position: Joi.number().integer().min(0).required().messages({
    "any.required": "Vị trí là bắt buộc.",
    "number.base": "Vị trí phải là số.",
    "number.integer": "Vị trí phải là số nguyên.",
    "number.min": "Vị trí không được nhỏ hơn 0.",
  }),
});

export const bannerUpdateSchema = Joi.object({
  title: Joi.string().messages({
    "string.base": "Tiêu đề phải là chuỗi.",
  }),
  image_url: Joi.string().uri().messages({
    "string.base": "Ảnh phải là chuỗi.",
    "string.uri": "Ảnh phải là một đường dẫn hợp lệ.",
  }),
  link_to: Joi.string().uri().messages({
    "string.base": "Link phải là chuỗi.",
    "string.uri": "Link phải là một đường dẫn hợp lệ.",
  }),
  position: Joi.number().integer().min(0).messages({
    "number.base": "Vị trí phải là số.",
    "number.integer": "Vị trí phải là số nguyên.",
    "number.min": "Vị trí không được nhỏ hơn 0.",
  }),
}).min(1).messages({
  "object.min": "Phải có ít nhất một trường để cập nhật.",
});
