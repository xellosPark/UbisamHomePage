// import { Router } from 'express';
// const router = Router();
// import { login, refreshToken, logout, Test } from '../controller/authController.js';
// import { verifyAccessToken } from '../middlewares/authMiddleware.js';
//import { Router } from 'express';
const express = require("express");
const router = express();
//import { login, refreshToken, logout, Test } from '../controller/authController.js';
//import { verifyAccessToken } from '../middlewares/authMiddleware.js';
const { login, refreshToken, logout, Test } = require("../controller/authController.js");

// 로그인 라우트
router.post('/login', login);

// Access Token 갱신 라우트
router.post('/refresh', refreshToken);

// 로그아웃 라우트
router.post('/logout', logout);

//router.get('/test', verifyAccessToken, Test);
router.get('/test', Test);

module.exports = router;