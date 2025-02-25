import Joi from "joi";

export const validateUser = Joi.object({
  email: Joi.string().email().required().trim().messages({
    "any.required": "Dien du thong tin !",
    "string.empty": "email khong bo trong !",
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "Dien du thong tin !",
    "string.empty": "password khong bo trong !",
    "string.min": "password > 6!",
  }),
});
