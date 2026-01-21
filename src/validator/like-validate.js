import Joi from 'joi';

export const likePayloadSchema = Joi.object({
  albumId: Joi.string().required(),
  userId: Joi.string().required(),
});

export const deletePayloadSchema = Joi.object({
  albumId: Joi.string().required(),
  userId: Joi.string().required(),
});
