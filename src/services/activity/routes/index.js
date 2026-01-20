import { Router } from 'express';
import { getActivityPlaylist } from '../controllers/activity-controller.js';
import authenticateToken from '../../../middlewares/auth.js';
const router = Router();

router.get('/:playlistId/activities', authenticateToken, getActivityPlaylist);

export default router;
