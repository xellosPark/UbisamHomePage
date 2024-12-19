//import mysql from "mysql2/promise"; // 본 Promise API 제공하여 변경
import mysql from "mysql"; // MySQL 모듈 로드

// // MySQL 데이터베이스 연결 설정
export const pool = mysql.createPool({ //MySQL 연결을 Connection Pool로 설정하면 동시 연결 성능이 향상
  host: process.env.MYSQL_HOST || "localhost", // MySQL 서버 주소 (환경 변수 사용 가능)
  user: process.env.MYSQL_USER || "root", // MySQL 사용자 이름
  password: process.env.MYSQL_PASSWORD || "sujeong", //ubisam8877 MySQL 비밀번호
  database: process.env.MYSQL_DATABASE || "ub_homepage", // MySQL 데이터베이스 이름
  port: process.env.MYSQL_PORT || "3306", // MySQL 서버 포트 (기본값: 3306)
  connectionLimit: 10,
});

export function checkDatabaseConnection() {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("DB 연결 실패:", err.message || err.stack);
    } else {
      console.log("DB 연결 성공! 연결 ID:", connection.threadId);
      connection.release(); // 연결 반환
    }
  });
}


// 쿼리 실행 함수
export function query(sql, params) {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

  // SQL 쿼리를 통해 테이블을 생성 (이미 존재하지 않는 경우에만 생성)
const createUserTableQuery = `
CREATE TABLE IF NOT EXISTS UserTable (
  id INT AUTO_INCREMENT PRIMARY KEY,               -- 기본 키, 자동 증가
  user_id VARCHAR(45) NOT NULL,               -- 사용자 ID (필수)
  user_pw VARCHAR(100) NOT NULL,                            -- 사용자 PW (필수)
  user_name VARCHAR(20) NOT NULL,
  admin BOOLEAN DEFAULT FALSE,                         -- 관리자 여부 (기본값: FALSE)
  job_position VARCHAR(100),                           -- 직책
  create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 생성 시간 (현재 시간 기본값)
  update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- 수정 시간 (업데이트 시 자동 변경)
  delete_time TIMESTAMP NULL                      -- 삭제 시간 (NULL 허용)
);
`;

// ALTER TABLE DataRoomTable DROP COLUMN view_count;

// 쿼리를 실행하여 테이블 생성
export async function CreateTable() {
  pool.query(createUserTableQuery, (err, results) => {
    if (err) {
      console.error("테이블 생성 중 오류 발생:", err.message);
      return;
    }
    console.log("테이블 'UserTable'이 생성되었거나 이미 존재합니다.");
  });
}