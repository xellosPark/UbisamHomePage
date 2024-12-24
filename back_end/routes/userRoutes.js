const express = require("express");
const router = express();

const { verifyAccessToken } = require('../middlewares/authMiddleware.js');
const { createUser, getUserById } = require("../controller/userController.js");

router.post('/create', verifyAccessToken, createUser);

router.get('/:id', getUserById)

module.exports = router;