import Joi from "joi";

export const voucherSchema = Joi.object({
  code: Joi.string().required(),
  discount: Joi.number().min(1).max(100).required(),
  expiryDate: Joi.date().iso().required(),
  quantity: Joi.number().integer().min(1).required(),
});
