import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.empty": "Vui lòng nhập tên",
    "string.min": "Tên phải có ít nhất 2 ký tự",
  }),

  email: Joi.string().email().required().messages({
    "string.empty": "Vui lòng nhập email",
    "string.email": "Email không hợp lệ",
  }),

  password: Joi.string()
    .min(8)
    .pattern(/[A-Z]/, "chữ in hoa")
    .pattern(/[!@#$%^&*(),.?":{}|<>]/, "ký tự đặc biệt")
    .pattern(/[0-9]/, "chữ số")
    .required()
    .messages({
      "string.empty": "Vui lòng nhập mật khẩu",
      "string.min": "Mật khẩu phải có ít nhất 8 ký tự",
      "string.pattern.name":
        "Mật khẩu phải chứa ít nhất 1 {#name}",
    }),

  address: Joi.string().required().messages({
    "string.empty": "Vui lòng nhập địa chỉ",
  }),

  phone_number: Joi.string().required().messages({
    "string.empty": "Vui lòng nhập số điện thoại",
  }),

  role: Joi.string().optional(),
});


export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required().messages({
    "string.empty": "Vui lòng nhập mật khẩu hiện tại",
  }),

  newPassword: Joi.string()
    .min(8)
    .pattern(/[A-Z]/, "uppercase")
    .pattern(/[0-9]/, "number")
    .pattern(/[!@#$%^&*(),.?":{}|<>]/, "special")
    .required()
    .messages({
      "string.empty": "Vui lòng nhập mật khẩu mới",
      "string.min": "Mật khẩu phải có ít nhất 8 ký tự",
      "string.pattern.name": "Mật khẩu phải chứa ít nhất 1 ký tự {#name}",
    }),
});

