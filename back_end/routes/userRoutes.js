import { Router } from 'express';
const router = Router();

import { verifyAccessToken } from '../middlewares/authMiddleware.js';
import { createUser } from '../controller/userController.js';

router.post('/create', createUser);

export default router;