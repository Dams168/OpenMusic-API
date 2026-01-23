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

/**
 * @swagger
 * tags:
 *   name: Playlists
 *   description: Playlist management (JWT protected)
 */

/**
 * @swagger
 * /playlists:
 *   post:
 *     summary: Create a new playlist
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: My Favorite Songs
 *     responses:
 *       201:
 *         description: Playlist created successfully
 *       401:
 *         description: Unauthorized
 *
 *   get:
 *     summary: Get user playlists
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user playlists
 *       401:
 *         description: Unauthorized
 *
 * /playlists/{playlistId}:
 *   delete:
 *     summary: Delete playlist by ID
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: string
 *         description: Playlist ID
 *     responses:
 *       200:
 *         description: Playlist deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Playlist not found
 *
 * /playlists/{playlistId}/songs:
 *   post:
 *     summary: Add song to playlist
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: string
 *         description: Playlist ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - songId
 *             properties:
 *               songId:
 *                 type: string
 *                 example: song-123
 *     responses:
 *       201:
 *         description: Song added to playlist
 *       401:
 *         description: Unauthorized
 *
 *   get:
 *     summary: Get songs from playlist
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Songs retrieved successfully
 *       401:
 *         description: Unauthorized
 *
 *   delete:
 *     summary: Remove song from playlist
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - songId
 *             properties:
 *               songId:
 *                 type: string
 *                 example: song-123
 *     responses:
 *       200:
 *         description: Song removed from playlist
 *       401:
 *         description: Unauthorized
 */

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
