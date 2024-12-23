import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import styles from './Notice.module.css'; 
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const Notice = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  return (
    <div className={styles.noticeBoardContainer}>
      <div className={styles.noticeOverviewHeader}>
        <FaCheckCircle className={styles.checkIcon} /> 
        <h1 className={styles.noticeOverviewTitle}>공지사항 / 뉴스</h1>
      </div>

      <div className={styles.tableInfoContainer}>
        <div className={styles.tableInfo}>
          Total <strong>0</strong>건 1 페이지
        </div>

        {/* 자료 추가 버튼 */}
        {isAuthenticated && (
          <Link to="/DataRoom/CreateFile" className={styles.addDataNoticeButton}>
            + 자료 추가
          </Link>
        )}
      </div>

      <table className={styles.noticeTable}>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>글쓴이</th>
            <th>날짜</th>
            <th>조회</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="5" className={styles.noData}>게시물이 없습니다.</td>
          </tr>
        </tbody>
      </table>

      <div className={styles.searchSection}>
        <select className={styles.searchCategory}>
          <option>제목</option>
          <option>내용</option>
          <option>제목+내용</option>
          <option>글쓴이</option>
        </select>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="검색어를 입력하세요"
        />
        <button className={styles.searchButton}>검색</button>
      </div>
    </div>
  );
};

export default Notice;
