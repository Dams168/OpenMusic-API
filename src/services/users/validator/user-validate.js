import Joi from 'joi';

export const userPayloadSchema = Joi.object({
  username: Joi.string().required().min(3).max(30),
  password: Joi.string().required().min(6).max(50),
  fullname: Joi.string().required().min(3).max(100),
});
