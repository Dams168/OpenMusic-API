import { Router } from 'express';
import { addCollaboration, deleteCollaboration } from '../controllers/collab-controllers.js';
import validate from '../../../middlewares/validate.js';
import authenticateToken from '../../../middlewares/auth.js';
import {
  collaborationsPayloadSchema,
  deleteCollaborationsPayloadSchema,
} from '../../../validator/collab-validate.js';

const router = Router();

router.post('/', authenticateToken, validate(collaborationsPayloadSchema), addCollaboration);

router.delete(
  '/',
  authenticateToken,
  validate(deleteCollaborationsPayloadSchema),
  deleteCollaboration,
);

export default router;
