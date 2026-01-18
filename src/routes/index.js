import express from 'express';
import albumRoutes from '../services/album/routes/album-route.js';
import songRoutes from '../services/song/routes/song-route.js';

const router = express.Router();

router.use('/albums', albumRoutes);
router.use('/songs', songRoutes);
export default router;
