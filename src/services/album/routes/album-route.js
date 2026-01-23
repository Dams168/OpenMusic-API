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

/**
 * @swagger
 * tags:
 *   name: Albums
 *   description: Albums management API
 */

/**
 * @swagger
 * /albums:
 *   post:
 *     summary: Create a new album
 *     tags: [Albums]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - year
 *             properties:
 *               name:
 *                 type: string
 *                 example: Parachutes
 *               year:
 *                 type: integer
 *                 example: 2000
 *     responses:
 *       201:
 *         description: Album created successfully
 *
 * /albums/{id}:
 *   get:
 *     summary: Get album by ID
 *     tags: [Albums]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Album ID
 *     responses:
 *       200:
 *         description: Album details retrieved successfully
 *       404:
 *         description: Album not found
 *
 *   put:
 *     summary: Update album by ID
 *     tags: [Albums]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               - name
 *               - year
 *             properties:
 *               name:
 *                 type: string
 *                 example: A Rush of Blood to the Head
 *               year:
 *                 type: integer
 *                 example: 2002
 *     responses:
 *       200:
 *         description: Album updated successfully
 *       404:
 *         description: Album not found
 *
 *   delete:
 *     summary: Delete album by ID
 *     tags: [Albums]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Album deleted successfully
 *       404:
 *         description: Album not found
 */

route.post('/', validate(albumPayloadSchema), createAlbum);
route.get('/:id', getAlbumById);
route.put('/:id', validate(updateAlbumPayloadSchema), updateAlbumById);
route.delete('/:id', deleteAlbumById);

export default route;
