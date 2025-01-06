const express = require("express");
const multer = require('multer');
const path = require('path');
const fs = require("fs");
const router = express();

const { verifyAccessToken } = require('../middlewares/authMiddleware.js');
const { createInquire, uploadImage } = require("../controller/dataController.js");

// Multer 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    const folderName = req.body.file_title || "default"; // 폴더 이름이 없으면 'default' 사용

    const uploadPath = path.join(__dirname, "../../Storege/Category/Board");
    //const uploadPath = path.join(__dirname, "../../");
    console.log('uploadpath', uploadPath);

    if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true }); // 하위 폴더까지 생성
          //console.log(`[폴더 생성] 저장될 폴더 경로: ${uploadPath}`);
        }
    
    cb(null, uploadPath); // 업로드 폴더
    },
    filename: (req, file, cb) => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const date = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const formattedTime = `${year}${month}${date}${hours}${minutes}${seconds}`;

      cb(null, formattedTime + "_" + file.originalname); // 파일명 설정
    },
  });
  const upload = multer({ storage });

router.post('/create/inquire', createInquire);
// 이미지 업로드 라우트
router.post('/board/upload', upload.single('image'), uploadImage);

module.exports = router;