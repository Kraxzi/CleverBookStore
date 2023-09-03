import Joi from "joi";

export default {
  signup: Joi.object().keys({
    username: Joi.string().required().min(5),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
  login: Joi.object().keys({
    email: Joi.string().required().min(5),
    password: Joi.string().required().min(8),
  }),
};
