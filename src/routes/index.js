import express from 'express';
import albumRoutes from '../services/album/routes/album-route.js';
import songRoutes from '../services/song/routes/song-route.js';
import userRoutes from '../services/users/routes/index.js';

const router = express.Router();

router.use('/albums', albumRoutes);
router.use('/songs', songRoutes);
router.use('/users', userRoutes);
export default router;
