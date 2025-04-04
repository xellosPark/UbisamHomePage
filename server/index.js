require("dotenv").config(); // 환경 변수 로드
const https = require("https");
let express = require("express"); // Express 모듈 로드
const cors = require("cors"); // CORS 설정을 위한 모듈 로드
const path = require("path"); // 경로 처리를 위한 path 모듈 로드
const mysql = require("mysql"); // MySQL 모듈 로드
const fs = require("fs");
const multer = require("multer");
//import dotenv from "dotenv"; // 환경 변수 로드
//dotenv.config();
//import express from "express"; // Express 모듈 로드
//import cors from "cors"; // CORS 설정을 위한 모듈 로드
//import path from "path"; // 경로 처리를 위한 path 모듈 로드
//import fs from "fs"; // 파일 시스템 모듈 추가
//import multer from "multer";
//import mysql from "mysql"; // MySQL 모듈 로드
//import { fileURLToPath } from "url";
//import authRoutes from "./back_end/routes/authRoutes.js";
//import userRoutes from "./back_end/routes/userRoutes.js"
//const { checkDatabaseConnection, CreateTable } = require("./src/query/tableQuery.js");
const db = require("./src/query/tableQuery.js");
const authRoutes = require("./src/routes/authRoutes.js");
const userRoutes = require("./src/routes/userRoutes.js");
const dataRoutes = require("./src/routes/dataRoutes.js");
const { verifyAccessToken } = require('./src/middlewares/authMiddleware.js');

const app = express(); // Express 애플리케이션 생성
const PORT = process.env.PORT || 8001; // 서버 포트 설정

// CORS 설정
app.use(
  cors({
    origin: ["http://localhost:3000", "https://www.ubisam.com", "http://ubisam.com", "https://ubisam.com"], // 허용할 도메인
    methods: ["GET", "POST", "PUT", "DELETE"], // 허용할 HTTP 메서드
    allowedHeaders: ["Content-Type", "Authorization"], // 허용할 헤더
  })
);

// JSON 및 URL-encoded 데이터 파싱 미들웨어 설정
app.use(express.json()); // JSON 요청 데이터 파싱
app.use(express.urlencoded({ extended: true })); // URL-encoded 데이터 파싱

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// storege 폴더 정적 제공
// 이렇게 사용하지 않음 기본 path는 http://localhost:8001/build 가 기본 path로 정해짐
app.use('/Storege', express.static(path.join(__dirname, 'Storege')));

// 파일 저장 경로 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderName = req.body.file_title || "default"; // 폴더 이름이 없으면 'default' 사용

    // 경로에 한글이 포함되어도 문제없이 처리하도록 설정
    const uploadPath = path.join(__dirname, "../Storege/Category/dataroom", folderName);

    // 콘솔 로그 추가: 폴더명과 생성 경로
    console.log(`[요청된 폴더명] file_title: ${folderName}`);
    console.log(`[파일 저장 경로 설정] 저장될 경로: ${uploadPath}`);

    // 폴더가 존재하지 않으면 생성
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); // 하위 폴더까지 생성
      //console.log(`[폴더 생성] 저장될 폴더 경로: ${uploadPath}`);
    }

    //console.log(`[파일 저장 경로 설정] 저장될 경로: ${uploadPath}`);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // 한글 깨짐 방지를 위해 utf8로 처리
    const originalName = Buffer.from(file.originalname, "latin1").toString("utf8");
    //console.log(`[파일 이름 생성] 저장될 파일 이름: ${originalName}`); // 파일 이름 로그 출력

    cb(null, originalName); // 원본 파일 이름 그대로 사용
  },
});

const upload = multer({ storage });

// // MySQL 데이터베이스 연결 설정
// (async () => {
//   await checkDatabaseConnection();
//   await CreateTable();
// })();

// const connection = mysql.createConnection({
//   host: process.env.MYSQL_HOST || "localhost", // MySQL 서버 주소 (환경 변수 사용 가능)
//   user: process.env.MYSQL_USER || "root", // MySQL 사용자 이름
//   password: process.env.MYSQL_PASSWORD || "ubisam8877", //ubisam8877 MySQL 비밀번호
//   database: process.env.MYSQL_DATABASE || "ub_homepage", // MySQL 데이터베이스 이름
//   port: process.env.MYSQL_PORT || "3306", // MySQL 서버 포트 (기본값: 3306)
// });
// const connection = mysql.createConnection({
//   host: process.env.MYSQL_HOST || "ubihomepage.cafe24app.com", // MySQL 서버 주소 (환경 변수 사용 가능)
//   user: process.env.MYSQL_USER || "ubisam", // MySQL 사용자 이름
//   password: process.env.MYSQL_PASSWORD || "samtech0719!", // MySQL 비밀번호
//   database: process.env.MYSQL_DATABASE || "ubisam", // MySQL 데이터베이스 이름
//   port: process.env.MYSQL_PORT || "3306", // MySQL 서버 포트 (기본값: 3306)
// });

// // 데이터베이스 연결
// connection.connect((err) => {
//   if (err) {
//     console.error("MySQL 연결 실패:", err.stack);
//     return;
//   }
//   console.log("MySQL 연결 성공. 연결 ID:", connection.threadId);
// });

// const client = new Client({
//   host: 'localhost',
//   port: 5432,
//   user: 'postgres',
//   password: 'ub8877',
//   database: 'ubisam_homepage',
// });

// client.connect()
//   .then(() => console.log('PostgreSQL connected!'))
//   .catch(err => console.error('Connection error', err.stack));

// SQL 쿼리를 통해 테이블을 생성 (이미 존재하지 않는 경우에만 생성)
// const createTableQuery = `
//   CREATE TABLE IF NOT EXISTS DataRoomTable (
//     job_id VARCHAR(255) NOT NULL PRIMARY KEY,        -- job ID (필수, 기본 키)
//     user_id VARCHAR(255) NOT NULL,                   -- 사용자 ID (필수)
//     date DATE NOT NULL,                              -- 날짜 (필수)
//     file_title VARCHAR(255) NOT NULL,                -- 파일 제목 (최대 255자, 필수)
//     file_description TEXT,                           -- 파일 설명 (텍스트 필드)
//     file_name VARCHAR(255) NOT NULL,                 -- 파일 이름 (최대 255자, 필수)
//     file_count INT DEFAULT 0,                        -- 파일 개수 (기본값: 0)
//     view_count INT DEFAULT 0,                        -- 조회 수 (기본값: 0)
//     create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 생성 시간 (현재 시간 기본값)
//     update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- 수정 시간 (업데이트 시 자동 변경)
//     delete_time TIMESTAMP NULL                      -- 삭제 시간 (NULL 허용)
//   );
// `;

//쿼리를 실행하여 테이블 생성
// connection.query(createTableQuery, (err, results) => {
//   if (err) {
//     console.error("테이블 생성 중 오류 발생:", err.message); // 테이블 생성 중 오류 메시지 출력
//   } else {
//     console.log("테이블 'DataRoomTable'이 생성되었거나 이미 존재합니다."); // 테이블 생성 완료 또는 이미 존재 메시지 출력
//   }
// });

// SQL 쿼리를 통해 noticeboardTable을 생성 (이미 존재하지 않는 경우에만 생성)
// const createNoticeboardTableQuery = `
//   CREATE TABLE IF NOT EXISTS noticeboardTable (
//     id_num INT AUTO_INCREMENT PRIMARY KEY,            -- 고유 ID
//     user_id VARCHAR(255) NOT NULL,                    -- 사용자 ID
//     job_id VARCHAR(255) NOT NULL,                     -- 작업 ID
//     notice_type VARCHAR(255) NOT NULL,                -- 공지 유형
//     title VARCHAR(255) NOT NULL,                      -- 제목
//     view_count INT DEFAULT 0,                         -- 조회수
//     description TEXT,                                 -- 설명
//     created_time DATETIME DEFAULT CURRENT_TIMESTAMP,  -- 생성 시간
//     update_time DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP, -- 수정 시간
//     delete_time DATETIME DEFAULT NULL                 -- 삭제 시간
//   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
// `;

// noticeboardTable 생성 쿼리 실행
// connection.query(createNoticeboardTableQuery, (err, results) => {
//   if (err) {
//     console.error("noticeboardTable 생성 중 오류 발생:", err.message);
//   } else {
//     console.log("테이블 'noticeboardTable'이 생성되었거나 이미 존재합니다.");
//   }
// });

// connection.query('SELECT * FROM ubisma', function(err, results, fields) {
//   if (err) {
//     console.log(err);
//   }
//   console.log(results);
// });

// 1. DB 연결 확인 (선택 사항)
db.checkDatabaseConnection();

// 2. 테이블 생성
db.CreateTable();

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/data", dataRoutes);

// POST 요청 처리
// app.post("/api/dataroom", (req, res) => {
//   const {
//     job_id, user_id, date, file_title, file_description, file_name, file_count, view_count,
//   } = req.body;
//   console.log('req.body', req.body);
  
//   // 요청 데이터 확인 로그
//   console.log("🔍 Incoming data, req:", {
//     job_id, user_id, date, file_title, file_description, file_name, file_count, view_count,
//   });

//   // SQL 쿼리
//   const insertQuery = `
//     INSERT INTO DataRoomTable (
//       job_id,user_id,date,file_title,file_description,file_name,file_count,view_count
//     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
//   `;

//   // 데이터베이스에 값 삽입
//   connection.query(
//     insertQuery,
//     [
//       job_id, user_id, date, file_title, file_description, file_name, file_count, view_count,
//     ],
//     (err, results) => {
//       if (err) {
//         console.error("데이터 삽입 오류:", err.message);
//         return res.status(500).json({ error: "데이터 삽입 실패" });
//       }
//       console.log("✅ 데이터 삽입 성공!");
//       res.status(201).json({ message: "데이터 삽입 성공!", data: results });
//     }
//   );
// });

//app.use("/api", verifyAccessToken);

//자료실 데이터 메일 화면 데이터 가져오는 부분
app.post("/api/dataroom", verifyAccessToken, upload.array("files"), async (req, res) => {
  const {
    job_id, user_id, date, file_title, file_description, file_count, view_count, } = req.body;

  try {
    // 업로드된 파일 이름 리스트 생성 (원본 파일 이름 유지)
    const fileNames = req.files
    .map((file) => Buffer.from(file.originalname, "latin1").toString("utf8"))
    .join(", ");

    // console.log("🔍 Incoming data:", {
    //   job_id,user_id,date,file_title,file_description,file_count,view_count,fileNames,
    // });

    // SQL 쿼리
    // const insertQuery = `
    //   INSERT INTO dataroomtable (
    //     job_id, user_id, date, file_title, file_description, file_name, file_count, view_count
    //   ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    // `;

    // // 데이터베이스에 값 삽입
    // db.query(
    //   insertQuery,
    //   [ job_id, user_id, date, file_title, file_description, fileNames, file_count, view_count, ],
    //   (err, results) => {
    //     if (err) {
    //       console.error("❌ 데이터 삽입 오류:", err.message);
    //       return res.status(500).json({ error: "데이터 삽입 실패" });
    //     }
    //     console.log("✅ 데이터 삽입 성공!");
    //     res.status(201).json({ message: "데이터 삽입 성공!", data: results });
    //   }
    // );
    const insertQuery = `
      INSERT INTO dataroomtable (
        job_id, user_id, date, file_title, file_description, file_name, file_count, view_count
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `;
    // db.query( insertQuery, [job_id, user_id, date, file_title, file_description, fileNames, file_count, view_count],
    //   (err, results) => {
    //     if (err) {
    //       console.error("❌ 데이터 삽입 오류:", err.message);
    //       return res.status(500).json({ error: "데이터 삽입 실패" });
    //     } 
    //     console.log("✅ 데이터 삽입 성공!");
    //     res.status(201).json({ message: "데이터 삽입 성공!", data: results });
    //   }
    // );
    const result = await db.query(insertQuery, [
      job_id,
      user_id,
      date,
      file_title,
      file_description,
      fileNames,
      file_count,
      view_count,
    ]);

    res.status(201).json({ message: "데이터 삽입 성공!", data: result });

  } catch (error) {
    console.error("❌ 서버 처리 오류:", error.message);
    res.status(500).json({ error: "서버 처리 실패" });
  }
});
//자료실 데이터 메일 화면 데이터 가져오는 부분
// app.get("/api/dataroom", (req, res) => {
//   const selectQuery = `
//     SELECT 
//       job_id, 
//       file_title, 
//       user_id, 
//       DATE_FORMAT(CONVERT_TZ(date, '+00:00', '+09:00'), '%Y-%m-%d %H:%i:%s') AS date, 
//       file_count, 
//       DATE_FORMAT(CONVERT_TZ(delete_time, '+00:00', '+09:00'), '%Y-%m-%d %H:%i:%s') AS delete_time, 
//       view_count 
//     FROM DataRoomTable
//     ORDER BY create_time DESC;
//   `;

//   db.query(selectQuery, (err, results) => {
//     if (err) {
//       console.error("❌ dataroom 데이터 조회 오류:", err.message);
//       return res.status(500).json({ error: "데이터 조회 실패" });
//     }

//     res.status(200).json(results); // 변환된 데이터 반환
//   });
// });

// app.get("/api/dataroom", (req, res) => {
//   const selectQuery = `
//     SELECT 
//       job_id, 
//       file_title, 
//       user_id, 
//       TO_CHAR(date AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Seoul', 'YYYY-MM-DD HH24:MI:SS') AS date, 
//       file_count, 
//       TO_CHAR(delete_time AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Seoul', 'YYYY-MM-DD HH24:MI:SS') AS delete_time, 
//       view_count 
//     FROM dataroomtable
//     ORDER BY create_time DESC;
//   `;

//   db.query(selectQuery, (err, results) => {
//     if (err) {
//       console.error("❌ dataroom 데이터 조회 오류:", err.message);
//       return res.status(500).json({ error: "데이터 조회 실패" });
//     }

//     res.status(200).json(results.rows); // PostgreSQL은 결과가 rows에 담김
//   });
// });
app.get("/api/dataroom", async (req, res) => {
  const selectQuery = `
    SELECT 
      job_id, 
      file_title, 
      user_id, 
      TO_CHAR(date AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Seoul', 'YYYY-MM-DD HH24:MI:SS') AS date, 
      file_count, 
      TO_CHAR(delete_time AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Seoul', 'YYYY-MM-DD HH24:MI:SS') AS delete_time, 
      view_count 
    FROM dataroomtable
    ORDER BY create_time DESC;
  `;

  try {
    const result = await db.query(selectQuery);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("❌ dataroom 데이터 조회 오류:", err.message);
    res.status(500).json({ error: "데이터 조회 실패" });
  }
});



//자료실 데이터 조회수 증가하는
// app.post("/api/dataroom/update-views", (req, res) => {
//   const { id } = req.body;

//   const updateQuery = `
//       UPDATE dataroomtable
//       SET view_count = view_count + 1
//       WHERE job_id = ?;
//   `;

//   db.query(updateQuery, [id], (err) => {
//       if (err) {
//           console.error("❌ 조회수 업데이트 오류:", err.message);
//           return res.status(500).json({ error: "조회수 업데이트 실패" });
//       }

//       // 조회수 업데이트 후 전체 데이터를 반환
//       const selectQuery = "SELECT * FROM dataroomtable";

//       db.query(selectQuery, (err, results) => {
//           if (err) {
//               console.error("❌ update-views 데이터 조회 오류:", err.message);
//               return res.status(500).json({ error: "데이터 조회 실패" });
//           }
//           res.status(200).json({
//               message: "조회수 업데이트 및 데이터 조회 성공!",
//               data: results, // 전체 데이터 반환
//           });
//       });
//   });
// });
app.post("/api/dataroom/update-views", async (req, res) => {
  const { id } = req.body;

  try {
    const updateQuery = `
      UPDATE dataroomtable
      SET view_count = view_count + 1
      WHERE job_id = $1;
    `;
    await db.query(updateQuery, [id]);
    console.log("✅ 조회수 업데이트 성공:", id);

    const selectQuery = "SELECT * FROM dataroomtable";
    const result = await db.query(selectQuery);

    return res.status(200).json({
      message: "조회수 업데이트 및 데이터 조회 성공!",
      data: result.rows,
    });
  } catch (err) {
    console.error("❌ 조회수 업데이트 또는 조회 중 오류:", err.message);
    return res.status(500).json({ error: "조회수 업데이트 또는 데이터 조회 실패" });
  }
});



// 파일 다운로드 API
app.post("/api/download", (req, res) => {
  const { path: filePath } = req.body;              // 요청에서 파일 경로 받기
  // const fullPath = path.join(__dirname, filePath);  // 절대 경로 생성
  const fullPath = path.isAbsolute(filePath) ? filePath : path.join(__dirname, '../', filePath);
  //const folderPath = path.join(__dirname, "../Storege/Category/dataroom", fileTitle);

  //console.log('filePath', filePath, __dirname, path.isAbsolute(filePath));

  //파일 경로 검증 (디렉터리 탈출 방지)
  if (filePath.includes("..")) {
    return res.status(400).send("잘못된 파일 경로입니다.");
  }

  // 파일 전송
  res.download(fullPath, (err) => {
    if (err) {
      console.error("❌ 파일 전송 실패:", err.message);
      res.status(500).send("파일 다운로드 실패");
    }
  });
});


// 자료 삭제 API
// app.post("/api/dataroom/delete", verifyAccessToken, async (req, res) => {
//   const { job_id } = req.body;

//   if (!job_id) {
//     return res.status(400).json({ status: "error", message: "job_id가 필요합니다." });
//   }

//   // const selectQuery = "SELECT file_title FROM dataroomtable WHERE job_id = ? AND delete_time IS NULL";
//   // const updateQuery = "UPDATE dataroomtable SET delete_time = NOW() WHERE job_id = ?";

//   // db.query(selectQuery, [job_id], (err, results) => {
//   //   if (err) {
//   //     console.error("❌ delete 후 데이터 조회 오류:", err.message);
//   //     return res.status(500).json({ status: "error", message: "데이터 조회 중 오류 발생" });
//   //   }

//   //   if (results.length === 0) {
//   //     return res.status(404).json({ status: "error", message: "유효하지 않은 job_id거나 이미 삭제된 데이터입니다." });
//   //   }

//   //   const fileTitle = results[0].file_title;
//   //   const folderPath = path.join(__dirname, "Storege/Category/dataroom", fileTitle);

//   //   // 데이터베이스 delete_time 업데이트
//   //   db.query(updateQuery, [job_id], async (updateErr) => {
//   //     if (updateErr) {
//   //       console.error("❌ delete_time 업데이트 오류:", updateErr.message);
//   //       return res.status(500).json({ status: "error", message: "delete_time 업데이트 실패" });
//   //     }

//   //     try {
//   //       // 동기적으로 폴더 삭제
//   //       if (fs.existsSync(folderPath)) {
//   //         fs.rmSync(folderPath, { recursive: true, force: true });
//   //         console.log(`📁 폴더 삭제 성공: ${folderPath}`);
//   //       } else {
//   //         console.log(`⚠️ 폴더를 찾을 수 없음: ${folderPath}`);
//   //       }

//   //       res.status(200).json({
//   //         status: "success",
//   //         message: "삭제 처리 완료",
//   //         job_id,
//   //         file_title: fileTitle,
//   //       });
//   //     } catch (folderErr) {
//   //       console.error("❌ 폴더 삭제 실패:", folderErr.message);
//   //       res.status(500).json({ status: "error", message: "폴더 삭제 중 오류 발생" });
//   //     }
//   //   });
//   // });
//   const selectQuery = "SELECT file_title FROM dataroomtable WHERE job_id = $1 AND delete_time IS NULL";
// const updateQuery = "UPDATE dataroomtable SET delete_time = NOW() WHERE job_id = $1";

// db.query(selectQuery, [job_id], (err, result) => {
//   if (err) {
//     console.error("❌ delete 후 데이터 조회 오류:", err.message);
//     return res.status(500).json({ status: "error", message: "데이터 조회 중 오류 발생" });
//   }

//   if (result.rows.length === 0) {
//     return res.status(404).json({ status: "error", message: "유효하지 않은 job_id거나 이미 삭제된 데이터입니다." });
//   }

//   const fileTitle = result.rows[0].file_title;
//   const folderPath = path.join(__dirname, "Storege/Category/dataroom", fileTitle);

//   // 데이터베이스 delete_time 업데이트
//   db.query(updateQuery, [job_id], async (updateErr) => {
//     if (updateErr) {
//       console.error("❌ delete_time 업데이트 오류:", updateErr.message);
//       return res.status(500).json({ status: "error", message: "delete_time 업데이트 실패" });
//     }

//     try {
//       // 동기적으로 폴더 삭제
//       if (fs.existsSync(folderPath)) {
//         fs.rmSync(folderPath, { recursive: true, force: true });
//         console.log(`📁 폴더 삭제 성공: ${folderPath}`);
//       } else {
//         console.log(`⚠️ 폴더를 찾을 수 없음: ${folderPath}`);
//       }

//       res.status(200).json({
//         status: "success",
//         message: "삭제 처리 완료",
//         job_id,
//         file_title: fileTitle,
//       });
//       } catch (folderErr) {
//         console.error("❌ 폴더 삭제 실패:", folderErr.message);
//         res.status(500).json({ status: "error", message: "폴더 삭제 중 오류 발생" });
//       }
//     });
//   });
// });
app.post("/api/dataroom/delete", verifyAccessToken, async (req, res) => {
  const { job_id } = req.body;

  if (!job_id) {
    return res.status(400).json({ status: "error", message: "job_id가 필요합니다." });
  }

  try {
    // 1. 삭제 대상 존재 여부 확인
    const selectQuery = "SELECT file_title FROM dataroomtable WHERE job_id = $1 AND delete_time IS NULL";
    const selectResult = await db.query(selectQuery, [job_id]);

    if (selectResult.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "유효하지 않은 job_id거나 이미 삭제된 데이터입니다.",
      });
    }

    const fileTitle = selectResult.rows[0].file_title;
    const folderPath = path.join(__dirname, "../Storege/Category/dataroom", fileTitle);

    // 2. delete_time 업데이트
    const updateQuery = "UPDATE dataroomtable SET delete_time = NOW() WHERE job_id = $1";
    await db.query(updateQuery, [job_id]);
    console.log("✅ delete_time 업데이트 성공");

    // 3. 폴더 삭제 시도
    if (fs.existsSync(folderPath)) {
      fs.rmSync(folderPath, { recursive: true, force: true });
      console.log(`📁 폴더 삭제 성공: ${folderPath}`);
    } else {
      console.log(`⚠️ 폴더를 찾을 수 없음: ${folderPath}`);
    }

    // 4. 응답 반환
    return res.status(200).json({
      status: "success",
      message: "삭제 처리 완료",
      job_id,
      file_title: fileTitle,
    });

  } catch (error) {
    console.error("❌ 삭제 처리 중 오류 발생:", error.message);
    return res.status(500).json({
      status: "error",
      message: "삭제 처리 중 오류가 발생했습니다.",
    });
  }
});


// 공지사항 생성 API
// app.post('/api/createnoticeboard', verifyAccessToken, (req, res) => {

//   const { job_id, user_id, notice_type, title, view_count, description, created_time, update_time, delete_time } = req.body;

//   const query = `
//     INSERT INTO noticeboardtable 
//     (job_id, user_id, notice_type, title, view_count, description, created_time, update_time, delete_time) 
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//   const values = [job_id, user_id, notice_type, title, view_count, description, created_time, update_time, delete_time];

//   db.query(query, values, (err, result) => {
//     if (err) {
//       console.error('공지사항 생성 중 오류 발생:', err.message);
//       return res.status(500).json({
//         success: false,
//         message: '공지사항 생성 중 오류가 발생했습니다.',
//         error: err.message,
//       });
//     }

//     console.log('공지사항 생성 성공:', result);
//     res.status(200).json({
//       success: true,
//       message: '공지사항이 성공적으로 생성되었습니다.',
//     });
//   });
// });

app.post('/api/createnoticeboard', verifyAccessToken, async (req, res) => {
  const { job_id, user_id, notice_type, title, view_count, description, created_time, update_time, delete_time, } = req.body;

  const query = `
    INSERT INTO noticeboardtable 
    (job_id, user_id, notice_type, title, view_count, description, created_time, update_time, delete_time) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  `;

  const values = [ job_id, user_id, notice_type, title, view_count, description, created_time, update_time, delete_time, ];

  try {
    const result = await db.query(query, values);

    console.log('✅ 공지사항 생성 성공:', result.command); // INSERT
    return res.status(200).json({
      success: true,
      message: '공지사항이 성공적으로 생성되었습니다.',
    });
  } catch (err) {
    console.error('❌ 공지사항 생성 중 오류:', err.message);
    return res.status(500).json({
      success: false,
      message: '공지사항 생성 중 오류가 발생했습니다.',
      error: err.message,
    });
  }
});



// 공지사항 데이터 가져오기 API
// app.get('/api/noticeboard', (req, res) => {

//   const query = `SELECT id_num, user_id, job_id, notice_type, title, view_count, description, created_time, update_time, delete_time FROM noticeboardtable`;
//   db.query(query, (err, results) => {
//     if (err) {
//       console.error('공지사항 데이터를 불러오는 중 오류 발생:', err.message);
//       return res.status(500).json({
//         success: false,
//         message: '공지사항 데이터를 불러오는 중 오류가 발생했습니다.',
//       });
//     }

//     console.log('공지사항 데이터를 성공적으로 불러왔습니다.');
//     res.status(200).json({
//       success: true,
//       notices: results,
//     });
//   });
// });
app.get('/api/noticeboard', async (req, res) => {
  const query = `
    SELECT 
      id_num, user_id, job_id, notice_type, title, view_count, 
      description, created_time, update_time, delete_time 
    FROM noticeboardtable
  `;

  try {
    const result = await db.query(query);

    console.log('✅ 공지사항 데이터를 성공적으로 불러왔습니다.');
    return res.status(200).json({
      success: true,
      notices: result.rows,
    });
  } catch (err) {
    console.error('❌ 공지사항 데이터를 불러오는 중 오류 발생:', err.message);
    return res.status(500).json({
      success: false,
      message: '공지사항 데이터를 불러오는 중 오류가 발생했습니다.',
    });
  }
});



// 자료 삭제 API
// app.post("/api/notice/delete", verifyAccessToken, async (req, res) => {
//   const { job_id } = req.body;

//   // job_id 값 확인 로그
//   if (!job_id) {
//     console.error("❌ 요청 오류: job_id 값이 전달되지 않았습니다.");
//     return res.status(400).json({ status: "error", message: "job_id가 필요합니다." });
//   }
//   console.log(`✅ 요청 받은 job_id: ${job_id}`);

//   try {
//     // job_id가 유효한지 확인
//     const selectQuery = "SELECT title FROM noticeboardtable WHERE job_id = ? AND delete_time IS NULL";
//     const results = await new Promise((resolve, reject) => {
//       db.query(selectQuery, [job_id], (err, results) => {
//         if (err) {
//           console.error("❌ 데이터 조회 오류:", err.message);
//           return reject(err);
//         }
//         console.log("✅ 데이터 조회 성공:", results);
//         resolve(results);
//       });
//     });

//     if (!results || results.length === 0) {
//       console.error("❌ 데이터 조회 실패: 유효하지 않은 job_id거나 이미 삭제된 데이터입니다.");
//       return res.status(404).json({ status: "error", message: "유효하지 않은 job_id거나 이미 삭제된 데이터입니다." });
//     }

//     // delete_time 업데이트
//     const updateQuery = "UPDATE noticeboardtable SET delete_time = NOW() WHERE job_id = ?";
//     await new Promise((resolve, reject) => {
//       db.query(updateQuery, [job_id], (err) => {
//         if (err) {
//           console.error("❌ delete_time 업데이트 오류:", err.message);
//           return reject(err);
//         }
//         console.log("✅ delete_time 업데이트 성공: job_id =", job_id);
//         resolve();
//       });
//     });

//     // 성공 응답 반환
//     console.log("✅ 데이터 삭제 완료: job_id =", job_id);
//     return res.status(200).json({ status: "success", message: "데이터 삭제 완료" });
//   } catch (error) {
//     console.error("❌ 데이터 삭제 처리 중 오류:", error.message);
//     return res.status(500).json({ status: "error", message: "데이터 삭제 처리 중 오류 발생" });
//   }
// });

app.post("/api/notice/delete", verifyAccessToken, async (req, res) => {
  const { job_id } = req.body;

  if (!job_id) {
    console.error("❌ 요청 오류: job_id 값이 전달되지 않았습니다.");
    return res.status(400).json({ status: "error", message: "job_id가 필요합니다." });
  }
  console.log(`✅ 요청 받은 job_id: ${job_id}`);

  try {
    // job_id가 유효한지 확인
    const selectQuery = "SELECT title FROM noticeboardtable WHERE job_id = $1 AND delete_time IS NULL";
    console.log("진행");

    const result = await db.query(selectQuery, [job_id]);
    console.log("진행 후 rows:", result.rows);

    if (!result.rows || result.rows.length === 0) {
      console.error("❌ 데이터 조회 실패: 유효하지 않은 job_id거나 이미 삭제된 데이터입니다.");
      return res.status(404).json({
        status: "error",
        message: "유효하지 않은 job_id거나 이미 삭제된 데이터입니다.",
      });
    }

    const updateQuery = "UPDATE noticeboardtable SET delete_time = NOW() WHERE job_id = $1";
    await db.query(updateQuery, [job_id]);
    console.log("✅ delete_time 업데이트 성공: job_id =", job_id);

    return res.status(200).json({
      status: "success",
      message: "데이터 삭제 완료",
    });
  } catch (error) {
    console.error("❌ 데이터 삭제 처리 중 오류:", error.message);
    return res.status(500).json({ status: "error", message: "데이터 삭제 처리 중 오류 발생" });
  }
});


//자료실 데이터 조회수 증가하는
// app.post("/api/DataRoom/NoticeUnitView", (req, res) => {
//   const { id } = req.body;

//   const updateQuery = `
//       UPDATE noticeboardtable
//       SET view_count = view_count + 1
//       WHERE job_id = ?;
//   `;

//   db.query(updateQuery, [id], (err) => {
//       if (err) {
//           console.error("❌ 조회수 업데이트 오류:", err.message);
//           return res.status(500).json({ error: "조회수 업데이트 실패" });
//       }

//       // 조회수 업데이트 후 전체 데이터를 반환
//       const selectQuery = "SELECT * FROM noticeboardtable";

//       db.query(selectQuery, (err, results) => {
//           if (err) {
//               console.error("❌ NoticeUnitView 데이터 조회 오류:", err.message);
//               return res.status(500).json({ error: "데이터 조회 실패" });
//           }
//           res.status(200).json({
//               message: "조회수 업데이트 및 데이터 조회 성공!",
//               data: results, // 전체 데이터 반환
//           });
//       });
//   });
// });
app.post("/api/DataRoom/NoticeUnitView", async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "job_id가 필요합니다." });
  }

  try {
    const updateQuery = `
      UPDATE noticeboardtable
      SET view_count = view_count + 1
      WHERE job_id = $1;
    `;
    await db.query(updateQuery, [id]);
    console.log(`✅ 조회수 업데이트 성공: job_id = ${id}`);

    const selectQuery = "SELECT * FROM noticeboardtable";
    const result = await db.query(selectQuery);

    return res.status(200).json({
      message: "조회수 업데이트 및 데이터 조회 성공!",
      data: result.rows,
    });
  } catch (err) {
    console.error("❌ NoticeUnitView 처리 중 오류:", err.message);
    return res.status(500).json({ error: "서버 처리 중 오류 발생" });
  }
});



// 데이터 업데이트 API
// app.post("/api/dataroom/Notice/update", upload.none(), (req, res) => {
//   const { job_id, description } = req.body;

//   if (!job_id || !description) {
//       return res.status(400).json({ error: "job_id 또는 description이 누락되었습니다." });
//   }

//   // 업데이트 쿼리 생성
//   const query = "UPDATE noticeboardtable SET description = ? WHERE job_id = ?";
//   const values = [description, job_id];

//   // 쿼리 실행
//   db.query(query, values, (err, results) => {
//       if (err) {
//           console.error("데이터베이스 업데이트 실패:", err);
//           return res.status(500).json({ error: "데이터베이스 업데이트 실패" });
//       }

//       if (results.affectedRows === 0) {
//           return res.status(404).json({ error: "job_id에 해당하는 데이터가 없습니다." });
//       }

//       console.log("데이터 업데이트 성공:", results);
//       res.status(200).json({ message: "데이터 수정 성공", job_id });
//     });
//   });
app.post("/api/dataroom/Notice/update", upload.none(), async (req, res) => {
  const { job_id, description } = req.body;

  if (!job_id || !description) {
    return res.status(400).json({ error: "job_id 또는 description이 누락되었습니다." });
  }

  const query = "UPDATE noticeboardtable SET description = $1 WHERE job_id = $2";
  const values = [description, job_id];

  try {
    const result = await db.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "job_id에 해당하는 데이터가 없습니다." });
    }

    console.log("✅ 데이터 업데이트 성공:", result.command);
    return res.status(200).json({ message: "데이터 수정 성공", job_id });
  } catch (err) {
    console.error("❌ 데이터베이스 업데이트 실패:", err.message);
    return res.status(500).json({ error: "데이터베이스 업데이트 실패" });
  }
});




// 파일 저장 디렉토리 경로 (다운로드할 파일들이 저장된 경로)
//const FILE_DIRECTORY = path.join(__dirname, "Storege/Category/dataroom/UbiGEMSECS");

// // GET 요청 처리 (파일 다운로드)
// app.get("/downloads/:filename", (req, res) => {
//   const filename = req.params.filename; // 클라이언트가 요청한 파일 이름
//   console.log(`[요청 처리 시작] 클라이언트가 요청한 파일 이름: ${filename}`);

//   const filePath = path.join(FILE_DIRECTORY, filename); // 파일의 전체 경로 생성
//   console.log(`[파일 경로 생성 완료] 전체 파일 경로: ${filePath}`);

//   // 파일 다운로드 처리
//   res.download(filePath, filename, (err) => {
//     if (err) {
//       console.error(`[다운로드 오류 발생] 파일을 다운로드할 수 없습니다: ${err.message}`); // 오류 로그 출력
//       res.status(404).send("파일을 찾을 수 없습니다."); // 파일이 없을 경우 404 응답
//     } else {
//       console.log(`[다운로드 성공] 클라이언트에 파일 전송 완료: ${filename}`); // 다운로드 성공 로그 출력
//     }
//   });
// });

// app.post("/api/Editupload", verifyAccessToken, upload.array("files"), async (req, res) => {
//   const { job_id, file_description, file_title, file_count, existing_files } = req.body;

//   // console.log("=== 시작: /api/Editupload 요청 처리 ===");
//   // console.log(`수신된 job_id: ${job_id}`);
//   // console.log(`수신된 file_description: ${file_description}`);
//   // console.log(`수신된 file_title: ${file_title}`);
//   // console.log(`수신된 file_count: ${file_count}`);
//   // console.log(`수신된 existing_files: ${existing_files}`);

//   // 기존 파일 목록과 새로 업로드된 파일 목록 병합
//   const existingFileList = existing_files
//     ? existing_files.split(",").map(name => name.trim()).filter(name => name)
//     : [];
//   //console.log("파싱된 기존 파일 목록: ", existingFileList);

//   // 업로드된 파일 이름 가져오기
//   //console.log("요청에서 받은 파일 객체 배열 (req.files):", req.files); // 파일 배열 출력

//   // 업로드된 파일 이름 가져오기
//   const uploadedFileNames = req.files.map(file => {
//     const originalName = Buffer.from(file.originalname, "latin1").toString("utf8");
//     return originalName.trim();
//   });
//   //console.log("업로드된 파일 이름: ", uploadedFileNames);

//   // 전체 파일 목록 생성 (기존 파일 + 새 파일, 중복 제거)
//   const allFiles = [...new Set([...existingFileList, ...uploadedFileNames])];
//   //console.log("병합된 파일 목록: ", allFiles);

//   // DB 업데이트 쿼리
//   const query = `
//     UPDATE dataroomtable
//     SET file_description = ?, file_name = ?, file_count = ?, update_time = NOW()
//     WHERE job_id = ?
//   `;
//   const values = [file_description, allFiles.join(", "), allFiles.length, job_id];

//   //console.log("=== 데이터베이스 쿼리 준비 완료 ===");
//   //console.log("쿼리: ", query);
//   //console.log("값: ", values);

//   db.query(query, values, (err, results) => {
//     if (err) {
//       console.error("데이터 업데이트 에러 발생!");
//       console.error("에러 메시지: ", err.message);
//       return res.status(500).json({ success: false, message: "데이터 업데이트 실패", error: err.message });
//     }

//     //console.log("데이터베이스 업데이트 성공. 영향을 받은 행: ", results.affectedRows);

//     // 파일이 저장될 폴더 경로 설정
//     const folderPath = path.join(__dirname, "Storege/Category/dataroom", file_title);
//     //console.log(`대상 폴더 경로: ${folderPath}`);

//     // 폴더 생성 (존재하지 않을 경우)
//     if (!fs.existsSync(folderPath)) {
//       console.log("폴더가 존재하지 않습니다. 폴더를 생성합니다...");
//       fs.mkdirSync(folderPath, { recursive: true });
//       console.log("폴더 생성 완료.");
//     }

//     // 업로드된 파일을 folderPath에 저장
//     req.files.forEach((file, index) => {
//       //console.log(`파일 처리 중 (${index + 1}/${req.files.length})`);
    
//       // 파일 이름 변환 및 저장 경로 설정
//       const originalName = Buffer.from(file.originalname, "latin1").toString("utf8");
//       const uniqueName = `${Date.now()}_${originalName}`; // 중복 방지용 고유 이름 추가
//       const destinationPath = path.join(folderPath, uniqueName);
    
//       //console.log(`원래 파일 이름: ${file.originalname}`);
//       //console.log(`디코딩된 파일 이름: ${originalName}`);
//       //console.log(`고유 파일 이름: ${uniqueName}`);
//       //console.log(`저장 경로: ${destinationPath}`);
    
//       try {
//         const fileContent = fs.readFileSync(file.path); // 업로드된 파일 읽기
//         fs.writeFileSync(destinationPath, fileContent); // 대상 경로에 파일 저장
//         //console.log(`파일 저장 성공: ${destinationPath}`);
//       } catch (err) {
//         console.error(`파일 저장 실패 (${originalName} -> ${destinationPath}):`, err.message);
//       }
//     });
    
//     // 폴더 내 기존 파일 목록 가져오기
//     const existingFilesInFolder = fs.readdirSync(folderPath);
//     //console.log(`폴더 내 기존 파일 목록: ${existingFilesInFolder.join(", ")}`);

//     // 요청된 파일 목록에 없는 파일 삭제
//     existingFilesInFolder.forEach(file => {
//       if (!allFiles.includes(file)) {
//         const filePathToRemove = path.join(folderPath, file);
//         try {
//           fs.unlinkSync(filePathToRemove);
//           //console.log(`파일 삭제됨: ${filePathToRemove}`);
//         } catch (err) {
//           console.error(`파일 삭제 실패 (${filePathToRemove}):`, err.message);
//         }
//       }
//     });

//     // 성공적으로 작업 완료 후 클라이언트에 응답
//     return res.json({ success: true, message: "데이터 업데이트 및 파일 동기화 성공", affectedRows: results.affectedRows });
//   });
// });
app.post("/api/Editupload", verifyAccessToken, upload.array("files"), async (req, res) => {
  const { job_id, file_description, file_title, file_count, existing_files } = req.body;

  try {
    // 1. 기존 및 새 파일 목록 병합
    const existingFileList = existing_files
      ? existing_files.split(",").map(name => name.trim()).filter(name => name)
      : [];

    const uploadedFileNames = req.files.map(file => {
      const originalName = Buffer.from(file.originalname, "latin1").toString("utf8");
      return originalName.trim();
    });

    const allFiles = [...new Set([...existingFileList, ...uploadedFileNames])];
    const fileNamesStr = allFiles.join(", ");

    // 2. DB 업데이트
    const query = `
      UPDATE dataroomtable
      SET file_description = $1, file_name = $2, file_count = $3, update_time = NOW()
      WHERE job_id = $4
    `;
    const values = [file_description, fileNamesStr, allFiles.length, job_id];
    const result = await db.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: "job_id에 해당하는 데이터가 없습니다." });
    }

    // 3. 파일 저장 경로 설정
    const folderPath = path.join(__dirname, "../Storege/Category/dataroom", file_title);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log("📁 폴더 생성 완료:", folderPath);
    }

    // 4. 업로드된 파일 저장
    req.files.forEach((file) => {
      const originalName = Buffer.from(file.originalname, "latin1").toString("utf8");
      const uniqueName = `${Date.now()}_${originalName}`;
      const destinationPath = path.join(folderPath, uniqueName);

      try {
        const fileContent = fs.readFileSync(file.path);
        fs.writeFileSync(destinationPath, fileContent);
        console.log(`✅ 파일 저장: ${destinationPath}`);
      } catch (err) {
        console.error(`❌ 파일 저장 실패: ${destinationPath}`, err.message);
      }
    });

    // 5. 기존 폴더 내에 있는 불필요한 파일 삭제
    const existingFilesInFolder = fs.readdirSync(folderPath);

    existingFilesInFolder.forEach(file => {
      if (!allFiles.includes(file)) {
        const filePathToRemove = path.join(folderPath, file);
        try {
          fs.unlinkSync(filePathToRemove);
          console.log(`🗑️ 파일 삭제됨: ${filePathToRemove}`);
        } catch (err) {
          console.error(`❌ 파일 삭제 실패: ${filePathToRemove}`, err.message);
        }
      }
    });

    // 6. 성공 응답
    return res.status(200).json({
      success: true,
      message: "데이터 업데이트 및 파일 동기화 성공",
      affectedRows: result.rowCount,
    });

  } catch (err) {
    console.error("❌ 서버 처리 중 오류:", err.message);
    return res.status(500).json({
      success: false,
      message: "데이터 업데이트 처리 중 오류가 발생했습니다.",
      error: err.message,
    });
  }
});



// MySQL 데이터 조회 API (예: books 테이블에서 데이터 가져오기)
// app.get("/api/books", (req, res) => {
//   console.log("[GET 요청 수신] /api/books"); // 요청 로그 출력

//   db.query("SELECT * FROM books", (error, results) => {
//     if (error) {
//       console.error("[쿼리 오류]", error); // 쿼리 실행 중 오류 로그 출력
//       return res.status(500).json({
//         error: "데이터 조회 중 오류가 발생했습니다.", // 에러 메시지 응답
//       });
//     }

//     // 쿼리 결과를 JSON으로 응답
//     res.status(200).json({
//       message: "데이터 조회 성공",
//       data: results, // 쿼리 결과
//     });
//   });
// });
app.get("/api/books", async (req, res) => {
  console.log("[GET 요청 수신] /api/books");

  const query = "SELECT * FROM books";

  try {
    const result = await db.query(query);

    return res.status(200).json({
      message: "데이터 조회 성공",
      data: result.rows,
    });
  } catch (error) {
    console.error("❌ [쿼리 오류]", error.message);
    return res.status(500).json({
      error: "데이터 조회 중 오류가 발생했습니다.",
    });
  }
});



// 예제 API 엔드포인트
app.post("/api/example", (req, res) => {
  const { name, value } = req.body;

  console.log("[POST 요청 수신] /api/example"); // POST 요청 로그
  console.log("요청 데이터:", { name, value }); // 요청 데이터 출력

  // 필드 누락 확인
  if (!name || !value) {
    console.error("[에러] name 또는 value 필드가 누락되었습니다."); // 에러 로그
    return res.status(400).json({
      error: "name과 value 필드는 필수입니다.", // 에러 메시지 응답
    });
  }

  res.status(201).json({
    message: "POST 요청 성공!", // 성공 메시지
    data: { name, value }, // 응답 데이터
  });
});

// React 정적 파일 서빙 설정
app.use(express.static(path.join(__dirname, "public"))); // 빌드된 클라이언트 파일 제공

// React 클라이언트의 index.html 서빙
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html")); // 클라이언트의 index.html 반환
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`🚀 서버가 http://localhost:${PORT}에서 실행 중입니다.`); // 서버 실행 로그
});

// https.createServer(httpsOptions, app).listen(443, () => {
//   console.log("HTTPS 서버 실행 중: https://localhost");
//});
