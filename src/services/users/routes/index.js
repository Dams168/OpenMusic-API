import { Router } from 'express';
import { createUser, getUserById } from '../controller/user-controller.js';
import validate from '../../../middlewares/validate.js';
import { userPayloadSchema } from '../validator/user-validate.js';

const router = Router();

router.post('/users', validate(userPayloadSchema), createUser);

export default router;
