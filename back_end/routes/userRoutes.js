const express = require("express");
const router = express();

//import { verifyAccessToken } from '../middlewares/authMiddleware.js';
//import { createUser } from '../controller/userController.js';
const { createUser } = require("../controller/userController.js");

router.post('/create', createUser);

module.exports = router;