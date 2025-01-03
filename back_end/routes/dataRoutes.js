const express = require("express");
const router = express();

const { verifyAccessToken } = require('../middlewares/authMiddleware.js');
const { createInquire } = require("../controller/dataController.js");

router.post('/create/inquire', createInquire);

module.exports = router;