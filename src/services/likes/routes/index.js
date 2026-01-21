import { Router } from 'express';

import { addLike, deleteLike, getCountLikes } from '../controllers/like-controllers.js';
import validate from '../../../middlewares/validate.js';
import authenticateToken from '../../../middlewares/auth.js';
import { likePayloadSchema, deletePayloadSchema } from '../../../validator/like-validate.js';

const router = Router();

router.post('/:albumId/likes', authenticateToken, validate(likePayloadSchema, 'params'), addLike);
router.delete(
  '/:albumId/likes',
  authenticateToken,
  validate(deletePayloadSchema, 'params'),
  deleteLike,
);
router.get('/:albumId/likes', getCountLikes);

export default router;
