import { Router } from 'express';
import { addCollaboration, deleteCollaboration } from '../controllers/collab-controllers.js';
import validate from '../../../middlewares/validate.js';
import authenticateToken from '../../../middlewares/auth.js';
import {
  collaborationsPayloadSchema,
  deleteCollaborationsPayloadSchema,
} from '../../../validator/collab-validate.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Collaborations
 *   description: Playlist collaboration management
 */

/**
 * @swagger
 * /collaborations:
 *   post:
 *     summary: Add collaborator to playlist
 *     tags: [Collaborations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - playlistId
 *               - userId
 *             properties:
 *               playlistId:
 *                 type: string
 *                 example: playlist-123
 *               userId:
 *                 type: string
 *                 example: user-456
 *     responses:
 *       201:
 *         description: Collaboration added successfully
 *       401:
 *         description: Unauthorized (Invalid or missing token)
 *       403:
 *         description: Forbidden
 *
 *   delete:
 *     summary: Remove collaborator from playlist
 *     tags: [Collaborations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - playlistId
 *               - userId
 *             properties:
 *               playlistId:
 *                 type: string
 *                 example: playlist-123
 *               userId:
 *                 type: string
 *                 example: user-456
 *     responses:
 *       200:
 *         description: Collaboration removed successfully
 *       401:
 *         description: Unauthorized (Invalid or missing token)
 *       403:
 *         description: Forbidden
 */

router.post('/', authenticateToken, validate(collaborationsPayloadSchema), addCollaboration);

router.delete(
  '/',
  authenticateToken,
  validate(deleteCollaborationsPayloadSchema),
  deleteCollaboration,
);

export default router;
