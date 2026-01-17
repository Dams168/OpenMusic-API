import express from 'express';
import {
  createAlbum,
  getAlbumById,
  updateAlbumById,
  deleteAlbumById,
} from '../controllers/album-controller.js';
import { albumPayloadSchema, updateAlbumPayloadSchema } from '../../../validator/album-validate.js';
import validate from '../../../middlewares/validate.js';
const route = express.Router();

route.post('/', validate(albumPayloadSchema), createAlbum);
route.get('/:id', getAlbumById);
route.put('/:id', validate(updateAlbumPayloadSchema), updateAlbumById);
route.delete('/:id', deleteAlbumById);

export default route;
