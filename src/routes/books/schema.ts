import Joi from "joi";

export default {
  addBook: Joi.object().keys({
    name: Joi.string().required(),
    author: Joi.string().required(),
    price: Joi.number().precision(2).min(1).required(),
    description: Joi.string().max(2000),
  }),
};
