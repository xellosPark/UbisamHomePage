import mysql from "mysql"; // MySQL 모듈 로드 //mysql은 더 이상 적극적으로 유지보수되지 않으므로, 최신 환경에서는 mysql2를 사용하는 것이 더 안전


// // MySQL 데이터베이스 연결 설정
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || "localhost", // MySQL 서버 주소 (환경 변수 사용 가능)
  user: process.env.MYSQL_USER || "root", // MySQL 사용자 이름
  password: process.env.MYSQL_PASSWORD || "sujeong", //ubisam8877 MySQL 비밀번호
  database: process.env.MYSQL_DATABASE || "ub_homepage", // MySQL 데이터베이스 이름
  port: process.env.MYSQL_PORT || "3306", // MySQL 서버 포트 (기본값: 3306)
});

export function dbConnection() {
  connection.connect((err) => {
    if (err) {
      console.error("MySQL 연결 실패:", err.stack);
      return;
    }
    console.log("MySQL 연결 성공. 연결 ID:", connection.threadId);
  });
} 

  // SQL 쿼리를 통해 테이블을 생성 (이미 존재하지 않는 경우에만 생성)
const createUserTableQuery = `
CREATE TABLE IF NOT EXISTS UserTable (
  id INT AUTO_INCREMENT PRIMARY KEY,               -- 기본 키, 자동 증가
  user_id VARCHAR(45) NOT NULL,               -- 사용자 ID (필수)
  user_pw VARCHAR(20) NOT NULL,                            -- 사용자 PW (필수)
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
export function CreateTable() {
  connection.query(createUserTableQuery, (err, results) => {
    if (err) {
      console.error("테이블 생성 중 오류 발생:", err.message); // 테이블 생성 중 오류 메시지 출력
    } else {
      console.log("테이블 'UserTable'이 생성되었거나 이미 존재합니다."); // 테이블 생성 완료 또는 이미 존재 메시지 출력
    }
    });
}
