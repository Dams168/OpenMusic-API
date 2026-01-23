import express from 'express';
const route = express.Router();

import {
  createSong,
  getSongs,
  getSongById,
  updateSongById,
  deleteSongById,
} from '../controllers/song-controller.js';
import { songPayloadSchema, updateSongPayloadSchema } from '../../../validator/song-validate.js';
import validate from '../../../middlewares/validate.js';

/**
 * @swagger
 * tags:
 *   name: Songs
 *   description: Songs management API
 */

/**
 * @swagger
 * /songs:
 *   post:
 *     summary: Create a new song
 *     tags: [Songs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - year
 *               - performer
 *               - genre
 *             properties:
 *               title:
 *                 type: string
 *                 example: Fix You
 *               year:
 *                 type: integer
 *                 example: 2005
 *               performer:
 *                 type: string
 *                 example: Coldplay
 *               genre:
 *                 type: string
 *                 example: Alternative Rock
 *               duration:
 *                 type: integer
 *                 example: 295
 *               albumId:
 *                 type: string
 *                 description: Optional album ID associated with the song
 *                 example: album-123
 *     responses:
 *       201:
 *         description: Song created successfully
 *
 *   get:
 *     summary: Get all songs
 *     tags: [Songs]
 *     responses:
 *       200:
 *         description: List of songs
 *
 * /songs/{id}:
 *   get:
 *     summary: Get song by ID
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Song ID
 *     responses:
 *       200:
 *         description: Song details
 *       404:
 *         description: Song not found
 *
 *   put:
 *     summary: Update song by ID
 *     tags: [Songs]
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
 *               - title
 *               - year
 *               - performer
 *               - genre
 *             properties:
 *               title:
 *                 type: string
 *                 example: Yellow
 *               year:
 *                 type: integer
 *                 example: 2000
 *               performer:
 *                 type: string
 *                 example: Coldplay
 *               genre:
 *                 type: string
 *                 example: Britpop
 *               duration:
 *                 type: integer
 *                 example: 260
 *               albumId:
 *                 type: string
 *
 *                 example: album-456
 *     responses:
 *       200:
 *         description: Song updated successfully
 *       404:
 *         description: Song not found
 *
 *   delete:
 *     summary: Delete song by ID
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Song deleted successfully
 *       404:
 *         description: Song not found
 */

route.post('/', validate(songPayloadSchema), createSong);
route.get('/', getSongs);
route.get('/:id', getSongById);
route.put('/:id', validate(updateSongPayloadSchema), updateSongById);
route.delete('/:id', deleteSongById);

export default route;
