require("dotenv").config(); // 환경 변수 로드
const express = require("express");
const cors = require("cors");
const path = require("path"); // 경로 처리를 위한 path 모듈 추가

const app = express();
const PORT = process.env.PORT || 8001; // 서버 포트 설정

// CORS 설정
app.use(
  cors({
    origin: ["http://localhost:3000", "http://ubisam.cafe24app.com", "http://ubisam.com"], // 여러 도메인 허용
    methods: ["GET", "POST", "PUT", "DELETE"], // 허용할 HTTP 메서드
    allowedHeaders: ["Content-Type"], // 허용할 헤더
  })
);

// JSON 및 URL-encoded 데이터 파싱 미들웨어 설정
app.use(express.json()); // JSON 요청 데이터 파싱
app.use(express.urlencoded({ extended: true })); // URL-encoded 데이터 파싱

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
