require("dotenv").config(); // 환경 변수 로드
const express = require("express"); // Express 모듈 로드
const cors = require("cors"); // CORS 설정을 위한 모듈 로드
const path = require("path"); // 경로 처리를 위한 path 모듈 로드
const mysql = require("mysql"); // MySQL 모듈 로드

const app = express(); // Express 애플리케이션 생성
const PORT = process.env.PORT || 8001; // 서버 포트 설정

// CORS 설정
app.use(
  cors({
    origin: ["http://localhost:3000", "http://ubisam.cafe24app.com", "http://ubisam.com"], // 허용할 도메인
    methods: ["GET", "POST", "PUT", "DELETE"], // 허용할 HTTP 메서드
    allowedHeaders: ["Content-Type"], // 허용할 헤더
  })
);

// JSON 및 URL-encoded 데이터 파싱 미들웨어 설정
app.use(express.json()); // JSON 요청 데이터 파싱
app.use(express.urlencoded({ extended: true })); // URL-encoded 데이터 파싱

// // MySQL 데이터베이스 연결 설정
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

// connection.query('SELECT * FROM ubisma', function(err, results, fields) {
//   if (err) {
//     console.log(err);
//   }
//   console.log(results);
// });

// 파일 저장 디렉토리 경로 (다운로드할 파일들이 저장된 경로)
const FILE_DIRECTORY = path.join(__dirname, "Storege/Category/dataroom/UbiGEMSECS");

app.get("/downloads/:filename", (req, res) => {
  const filename = req.params.filename; // 클라이언트가 요청한 파일 이름
  console.log(`[요청 처리 시작] 클라이언트가 요청한 파일 이름: ${filename}`);

  const filePath = path.join(FILE_DIRECTORY, filename); // 파일의 전체 경로 생성
  console.log(`[파일 경로 생성 완료] 전체 파일 경로: ${filePath}`);

  // 파일 다운로드 처리
  res.download(filePath, filename, (err) => {
    if (err) {
      console.error(`[다운로드 오류 발생] 파일을 다운로드할 수 없습니다: ${err.message}`); // 오류 로그 출력
      res.status(404).send("파일을 찾을 수 없습니다."); // 파일이 없을 경우 404 응답
    } else {
      console.log(`[다운로드 성공] 클라이언트에 파일 전송 완료: ${filename}`); // 다운로드 성공 로그 출력
    }
  });
});


// MySQL 데이터 조회 API (예: books 테이블에서 데이터 가져오기)
app.get("/api/books", (req, res) => {
  console.log("[GET 요청 수신] /api/books"); // 요청 로그 출력

  connection.query("SELECT * FROM books", (error, results) => {
    if (error) {
      console.error("[쿼리 오류]", error); // 쿼리 실행 중 오류 로그 출력
      return res.status(500).json({
        error: "데이터 조회 중 오류가 발생했습니다.", // 에러 메시지 응답
      });
    }

    // 쿼리 결과를 JSON으로 응답
    res.status(200).json({
      message: "데이터 조회 성공",
      data: results, // 쿼리 결과
    });
  });
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
app.use(express.static(path.join(__dirname, "build"))); // 빌드된 클라이언트 파일 제공

// React 클라이언트의 index.html 서빙
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html")); // 클라이언트의 index.html 반환
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`🚀 서버가 http://localhost:${PORT}에서 실행 중입니다.`); // 서버 실행 로그
});
