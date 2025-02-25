import Joi from "joi";

export const validateStudent = Joi.object({
  name: Joi.string().min(6).required().trim().messages({
    "any.required": "Dien du thong tin !",
    "string.empty": "Name khong bo trong !",
    "string.min": "Toi thieu 6 ky tu !",
  }),
  age: Joi.number().min(1).required().messages({
    "any.required": "Dien du thong tin !",
    "number.empty": "Age khong bo trong !",
    "number.min": "Age khong am !",
  }),
});
