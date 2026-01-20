import { Router } from 'express';
import validate from '../../../middlewares/validate.js';
import {
  createPlaylistPayloadSchema,
  addSongToPlaylistPayloadSchema,
} from '../../../validator/playlist-validate.js';
import {
  addSongToPlaylist,
  createPlaylist,
  deletePlaylistById,
  getPlaylists,
  getSongsFromPlaylist,
  removeSongFromPlaylistById,
} from '../controller/playlist-controller.js';
import authenticateToken from '../../../middlewares/auth.js';

const router = Router();

router.post('/', authenticateToken, validate(createPlaylistPayloadSchema), createPlaylist);
router.get('/', authenticateToken, getPlaylists);
router.delete('/:playlistId', authenticateToken, deletePlaylistById);
router.post(
  '/:playlistId/songs',
  authenticateToken,
  validate(addSongToPlaylistPayloadSchema),
  addSongToPlaylist,
);
router.get('/:playlistId/songs', authenticateToken, getSongsFromPlaylist);
router.delete(
  '/:playlistId/songs',
  authenticateToken,
  validate(addSongToPlaylistPayloadSchema),
  removeSongFromPlaylistById,
);

export default router;
