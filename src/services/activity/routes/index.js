import { Router } from 'express';
import { getActivityPlaylist } from '../controllers/activity-controller.js';
import authenticateToken from '../../../middlewares/auth.js';
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Playlist Activities
 *   description: Activity history of playlist (JWT protected)
 */

/**
 * @swagger
 * /playlists/{playlistId}/activities:
 *   get:
 *     summary: Get playlist activity history
 *     tags: [Playlist Activities]
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
 *         description: Playlist activities retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 playlistId:
 *                   type: string
 *                   example: playlist-123
 *                 activities:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       username:
 *                         type: string
 *                         example: johndoe
 *                       title:
 *                         type: string
 *                         example: Fix You
 *                       action:
 *                         type: string
 *                         example: add
 *                       time:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-01-23T10:15:30.000Z
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Playlist not found
 */

router.get('/:playlistId/activities', authenticateToken, getActivityPlaylist);

export default router;
