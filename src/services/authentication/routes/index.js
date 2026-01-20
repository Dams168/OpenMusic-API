import { Router } from 'express';
import { login, logout, refreshToken } from '../controller/auth-controller.js';
import validate from '../../../middlewares/validate.js';
import {
  createAuthPayloadSchema,
  deleteAuthPayloadSchema,
  updateAuthPayloadSchema,
} from '../validator/auth-validate.js';

const router = Router();

router.post('/', validate(createAuthPayloadSchema), login);
router.put('/', validate(updateAuthPayloadSchema), refreshToken);
router.delete('/', validate(deleteAuthPayloadSchema), logout);

export default router;
