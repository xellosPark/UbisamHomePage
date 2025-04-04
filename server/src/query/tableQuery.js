//import mysql from "mysql2/promise"; // 본 Promise API 제공하여 변경
//import mysql from "mysql"; // MySQL 모듈 로드
const mysql = require("mysql");
const { Pool } = require("pg");

// // MySQL 데이터베이스 연결 설정
// const pool = mysql.createConnection({
//   host: process.env.MYSQL_HOST || "localhost", // MySQL 서버 주소 (환경 변수 사용 가능)
//   user: process.env.MYSQL_USER || "root", // MySQL 사용자 이름
//   password: process.env.MYSQL_PASSWORD || "ubisam8877", //ubisam8877 MySQL 비밀번호
//   database: process.env.MYSQL_DATABASE || "ub_homepage", // MySQL 데이터베이스 이름
//   port: process.env.MYSQL_PORT || "3306", // MySQL 서버 포트 (기본값: 3306)
//   connectionLimit: 10,
// });
// const pool = mysql.createConnection({
//   host: process.env.MYSQL_HOST || "ubihomepage.cafe24app.com", // MySQL 서버 주소 (환경 변수 사용 가능)
//   user: process.env.MYSQL_USER || "ubisam", // MySQL 사용자 이름
//   password: process.env.MYSQL_PASSWORD || "samtech0719!", // MySQL 비밀번호
//   database: process.env.MYSQL_DATABASE || "ubisam", // MySQL 데이터베이스 이름
//   port: process.env.MYSQL_PORT || "3306", // MySQL 서버 포트 (기본값: 3306)
// });
// function checkDatabaseConnection() {
//   pool.connect((err) => {
//     if (err) {
//       console.error("MySQL 연결 실패:", err.stack);
//       return;
//     }
//     console.log("MySQL 연결 성공. 연결 ID:", pool.threadId);
//   });
// }

  // SQL 쿼리를 통해 테이블을 생성 (이미 존재하지 않는 경우에만 생성)
  // const createUserTableQuery = `
  // CREATE TABLE IF NOT EXISTS UserTable (
  //   id INT AUTO_INCREMENT PRIMARY KEY,               -- 기본 키, 자동 증가
  //   user_id VARCHAR(45) NOT NULL,               -- 사용자 ID (필수)
  //   user_pw VARCHAR(100) NOT NULL,                            -- 사용자 PW (필수)
  //   user_name VARCHAR(20) NOT NULL,
  //   admin TINYINT(1) DEFAULT 0,                         -- 관리자 여부 (기본값: FALSE)
  //   job_position VARCHAR(100),                           -- 직책
  //   create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 생성 시간 (현재 시간 기본값)
  //   update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- 수정 시간 (업데이트 시 자동 변경)
  //   delete_time TIMESTAMP NULL                      -- 삭제 시간 (NULL 허용)
  // );
  // `;
  
  // const createInquireTableQuery = `
  // CREATE TABLE IF NOT EXISTS InquireTable (
  //   id INT AUTO_INCREMENT PRIMARY KEY,               -- 기본 키, 자동 증가
  //   name VARCHAR(100) NOT NULL,                      -- 사용자 이름 (필수)
  //   email VARCHAR(100) NOT NULL,                     -- 사용자 이메일 (필수)
  //   phone VARCHAR(20) NOT NULL,                      -- 전화번호 (필수)
  //   tech VARCHAR(20) NOT NULL,                       -- 기술 정보 (필수)
  //   title VARCHAR(200),                              -- 제목
  //   content TEXT,                                    -- 내용
  //   view_check TINYINT(1) DEFAULT 0,                    -- 확인 여부 (0: false, 1: true) boolean은 TINYINT(1) 필히 사용
  //   create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- 생성 시간
  // );
  // `;
  
  // 쿼리를 실행하여 테이블 생성
  //async function CreateTable() {
    // pool.query(createUserTableQuery, (err, results) => {
    //   if (err) {
    //     console.error("테이블 생성 중 오류 발생:", err.message);
    //     return;
    //   }
    //   console.log("테이블 'UserTable'이 생성되었거나 이미 존재합니다.");
  
    //   pool.query(createInquireTableQuery, (err, results) => {
    //     if (err) {
    //       console.error("테이블 생성 중 오류 발생:", err.message);
    //       return;
    //     }
    //     console.log("테이블 'InquireTable'이 생성되었거나 이미 존재합니다.");
    //   });
    // });
  //}
  
  // module.exports = {
  //   pool,
  //   checkDatabaseConnection,
  //   query,
  //   CreateTable,
  // };

/*PostgreSQL 연결 설정 */
const pool = new Pool({
  host: process.env.PG_HOST || "localhost",
  user: process.env.PG_USER || "postgres",
  password: process.env.PG_PASSWORD || "ub8877",
  database: process.env.PG_DATABASE || "ubisam_homepage",
  port: process.env.PG_PORT || 5432,
  max: 10, // 연결 풀 최대 커넥션 수
});

// DB 연결 확인
function checkDatabaseConnection() {
  pool.connect((err, client, release) => {
    if (err) {
      console.error("PostgreSQL 연결 실패:", err.stack);
      return;
    }
    console.log("PostgreSQL 연결 성공");
    release(); // 연결 반환
  });
}

// 쿼리 실행 함수 (Promise 기반)
function query(sql, params) {
  return pool.query(sql, params);
}

// 테이블 생성 쿼리 (PostgreSQL 문법에 맞게 수정)
const createUserTableQuery = `
CREATE TABLE IF NOT EXISTS usertable (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(45) NOT NULL,
  user_pw VARCHAR(100) NOT NULL,
  user_name VARCHAR(20) NOT NULL,
  admin BOOLEAN DEFAULT FALSE,
  job_position VARCHAR(100),
  create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  delete_time TIMESTAMP
);
`;

const createInquireTableQuery = `
CREATE TABLE IF NOT EXISTS inquiretable (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  tech VARCHAR(20) NOT NULL,
  title VARCHAR(200),
  content TEXT,
  view_check BOOLEAN DEFAULT FALSE,
  create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const createDataRoomTable = `
CREATE TABLE IF NOT EXISTS dataroomtable (
  job_id VARCHAR(255) NOT NULL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  file_title VARCHAR(255) NOT NULL,
  file_description TEXT,
  file_name VARCHAR(255) NOT NULL,
  file_count INT DEFAULT 0,
  view_count INT DEFAULT 0,
  create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  delete_time TIMESTAMP
);
`;

const createNoticeboardTable = `
CREATE TABLE IF NOT EXISTS noticeboardtable (
  id_num SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  job_id VARCHAR(255) NOT NULL,
  notice_type VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  view_count INT DEFAULT 0,
  description TEXT,
  created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_time TIMESTAMP,
  delete_time TIMESTAMP
);
`;


// 테이블 생성
async function CreateTable() {
  try {
    await pool.query(createUserTableQuery);
    console.log("테이블 'UserTable'이 생성되었거나 이미 존재합니다.");

    await pool.query(createInquireTableQuery);
    console.log("테이블 'InquireTable'이 생성되었거나 이미 존재합니다.");

    await pool.query(createDataRoomTable);
    console.log("테이블 'DataRoomTable'이 생성되었거나 이미 존재합니다.");

    await pool.query(createNoticeboardTable);
    console.log("테이블 'NoticeboardTable'이 생성되었거나 이미 존재합니다.");
  } catch (err) {
    console.error("테이블 생성 중 오류 발생:", err.message);
  }
}

module.exports = {
  pool,
  checkDatabaseConnection,
  query,
  CreateTable,
};