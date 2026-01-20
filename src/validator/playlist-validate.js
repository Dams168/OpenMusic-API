import Joi from 'joi';

export const createPlaylistPayloadSchema = Joi.object({
  name: Joi.string().required(),
});

export const addSongToPlaylistPayloadSchema = Joi.object({
  songId: Joi.string().required(),
});
