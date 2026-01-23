import { Router } from 'express';
import { createUser, getUserById } from '../controller/user-controller.js';
import validate from '../../../middlewares/validate.js';
import { userPayloadSchema } from '../validator/user-validate.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management API
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - fullname
 *             properties:
 *               username:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 30
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 maxLength: 50
 *                 example: secret123
 *               fullname:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *                 example: John Doe
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 */

router.post('/', validate(userPayloadSchema), createUser);

export default router;
