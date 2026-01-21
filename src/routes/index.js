import express from 'express';
import albumRoutes from '../services/album/routes/album-route.js';
import songRoutes from '../services/song/routes/song-route.js';
import userRoutes from '../services/users/routes/index.js';
import authRoutes from '../services/authentication/routes/index.js';
import playlistRoutes from '../services/playlist/routes/index.js';
import collaborationRoutes from '../services/collaborations/routes/index.js';
import activityRoutes from '../services/activity/routes/index.js';
import likeRoutes from '../services/likes/routes/index.js';

const router = express.Router();

router.use('/albums', albumRoutes);
router.use('/songs', songRoutes);
router.use('/users', userRoutes);
router.use('/authentications', authRoutes);
router.use('/playlists', playlistRoutes);
router.use('/collaborations', collaborationRoutes);
router.use('/playlists', activityRoutes);
router.use('/albums', likeRoutes);

export default router;
