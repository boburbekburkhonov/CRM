import Joi from "joi";

export const validationLogin = Joi.object().keys({
  name: Joi.string().min(3).max(20).required(),
  password: Joi.string().required()
})