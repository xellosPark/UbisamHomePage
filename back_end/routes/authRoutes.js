import { Router } from 'express';
const router = Router();
import { login, refreshToken, logout, Test } from '../controller/authController.js';
import { verifyAccessToken } from '../middlewares/authMiddleware.js';

// 로그인 라우트
router.post('/login', login);

// Access Token 갱신 라우트
router.post('/refresh', refreshToken);

// 로그아웃 라우트
router.post('/logout', logout);

router.get('/test', verifyAccessToken, Test);

export default router;