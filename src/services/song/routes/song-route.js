import express from 'express';
const route = express.Router();

import {
  createSong,
  getSongs,
  getSongById,
  updateSongById,
  deleteSongById,
} from '../controllers/song-controller.js';
import { songPayloadSchema, updateSongPayloadSchema } from '../../../validator/song-validate.js';
import validate from '../../../middlewares/validate.js';

route.post('/', validate(songPayloadSchema), createSong);
route.get('/', getSongs);
route.get('/:id', getSongById);
route.put('/:id', validate(updateSongPayloadSchema), updateSongById);
route.delete('/:id', deleteSongById);

export default route;
