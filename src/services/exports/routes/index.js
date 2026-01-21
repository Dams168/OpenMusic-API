import { Router } from 'express';
import { exportSongs } from '../controllers/export-controller.js';
import authenticateToken from '../../../middlewares/auth.js  ';
import validate from '../../../middlewares/validate.js';
import { exportPayloadSchema } from '../validator/export-validate.js';

const router = Router();

router.post(
  '/playlists/:playlistId',
  authenticateToken,
  validate(exportPayloadSchema),
  exportSongs,
);

export default router;
