import { Router } from 'express';
import { uploadImage } from '../controllers/upload-controller.js';
import { upload, uploadErrorHandler } from '../storage/storage-config.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: Upload album cover
 */

/**
 * @swagger
 * /albums/{id}/covers:
 *   post:
 *     summary: Upload cover image for an album
 *     tags: [Upload]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Album ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - cover
 *             properties:
 *               cover:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Cover uploaded successfully
 *       400:
 *         description: Invalid file
 *       404:
 *         description: Album not found
 */

router.post('/:id/covers', upload.single('cover'), uploadImage, uploadErrorHandler);

export default router;
