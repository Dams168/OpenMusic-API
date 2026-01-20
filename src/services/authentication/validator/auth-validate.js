import Joi from 'joi';

export const createAuthPayloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const updateAuthPayloadSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

export const deleteAuthPayloadSchema = Joi.object({
  refreshToken: Joi.string().required(),
});
