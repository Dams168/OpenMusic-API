import express from 'express';
import {
  createAlbum,
  getAlbumById,
  updateAlbumById,
  deleteAlbumById,
} from '../controllers/album-controller.js';

const route = express.Router();

route.post('/', createAlbum);
route.get('/:id', getAlbumById);
route.put('/:id', updateAlbumById);
route.delete('/:id', deleteAlbumById);

export default route;
