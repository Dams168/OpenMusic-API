import { Router } from 'express';
import { exportSongs } from '../controllers/export-controller.js';
import authenticateToken from '../../../middlewares/auth.js  ';
import validate from '../../../middlewares/validate.js';
import { exportPayloadSchema } from '../validator/export-validate.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Export
 *   description: Export playlist songs via email (JWT protected)
 */

/**
 * @swagger
 * /export/playlists/{playlistId}:
 *   post:
 *     summary: Export playlist songs to email
 *     tags: [Export]
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
 *               - targetEmail
 *             properties:
 *               targetEmail:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       201:
 *         description: Export request accepted and being processed
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Playlist not found
 */

router.post(
  '/playlists/:playlistId',
  authenticateToken,
  validate(exportPayloadSchema),
  exportSongs,
);

export default router;
