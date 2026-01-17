import express from 'express';
import albumRoutes from '../services/album/routes/album-route.js';

const router = express.Router();

router.use('/albums', albumRoutes);

export default router;
