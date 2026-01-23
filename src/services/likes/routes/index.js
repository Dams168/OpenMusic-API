import { Router } from 'express';

import { addLike, deleteLike, getCountLikes } from '../controllers/like-controllers.js';
import validate from '../../../middlewares/validate.js';
import authenticateToken from '../../../middlewares/auth.js';
import { likePayloadSchema, deletePayloadSchema } from '../../../validator/like-validate.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Album Likes
 *   description: Like and unlike albums
 */

/**
 * @swagger
 * /albums/{albumId}/likes:
 *   post:
 *     summary: Like an album
 *     tags: [Album Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: albumId
 *         required: true
 *         schema:
 *           type: string
 *         description: Album ID
 *     responses:
 *       201:
 *         description: Album liked successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Album not found
 *
 *   delete:
 *     summary: Unlike an album
 *     tags: [Album Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: albumId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Album unliked successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Album not found
 *
 *   get:
 *     summary: Get total likes of an album
 *     tags: [Album Likes]
 *     parameters:
 *       - in: path
 *         name: albumId
 *         required: true
 *         schema:
 *           type: string
 *         description: Album ID
 *     responses:
 *       200:
 *         description: Total likes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 likes:
 *                   type: integer
 *                   example: 25
 *       404:
 *         description: Album not found
 */

router.post('/:albumId/likes', authenticateToken, validate(likePayloadSchema, 'params'), addLike);
router.delete(
  '/:albumId/likes',
  authenticateToken,
  validate(deletePayloadSchema, 'params'),
  deleteLike,
);
router.get('/:albumId/likes', getCountLikes);

export default router;
