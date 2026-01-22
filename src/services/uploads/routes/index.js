import { Router } from 'express';
import { uploadImage } from '../controllers/upload-controller.js';
import { upload, uploadErrorHandler } from '../storage/storage-config.js';

const router = Router();

router.post('/:id/covers', upload.single('cover'), uploadImage, uploadErrorHandler);

export default router;
