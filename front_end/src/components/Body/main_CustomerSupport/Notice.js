import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import styles from './Notice.module.css'; 
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { FaSave, FaTrash } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import Pagination from '../../Pagination/Pagination';

const Notice = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [columnWidths] = useState(
    isAuthenticated
      ? { 번호: '7%', 구분: '15%', 제목: '30%', 게시일: '20%', 조회: '15%', '수정/삭제': '20%' }
      : { 번호: '7%', 구분: '15%', 제목: '30%', 게시일: '20%', 조회: '15%' }
  );

  // 샘플 데이터 5개
  const [data] = useState([
    { id: 1, type: "공지", title: "작업안내", date: "2024-12-23", views: 123 },
    { id: 2, type: "공지", title: "서비스 점검", date: "2024-12-22", views: 98 },
    { id: 3, type: "알림", title: "긴급 공지", date: "2024-12-20", views: 156 },
    { id: 4, type: "일반", title: "서비스 정책 변경 안내", date: "2024-12-19", views: 76 },
    { id: 5, type: "일반", title: "FAQ 업데이트 소식", date: "2024-12-18", views: 85 },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data ? data?.slice(indexOfFirstItem, indexOfLastItem) : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);



  const getTagClass = (type) => {
    if (type === "공지") return `${styles.tag} ${styles.notice}`;
    if (type === "알림") return `${styles.tag} ${styles.alert}`;
    return null; // 일반일 경우 스타일 없음
  };

  return (
    <div className={styles.noticeBoardContainer}>
      <div className={styles.noticeOverviewHeader}>
        <FaCheckCircle className={styles.checkIcon} />
        <h1 className={styles.noticeOverviewTitle}>공지사항 / 뉴스</h1>
      </div>

      <div className={styles.tableInfoContainer}>
        <div className={styles.tableInfo}>
          Total <strong>{data.length}</strong>건 게시물 있습니다.
        </div>

        {/* 자료 추가 버튼 */}
        {isAuthenticated && (
          <Link to="/DataRoom/CreateFile" className={styles.addDataNoticeButton}>
            게시물 추가
          </Link>
        )}
      </div>

      <table className={styles.noticeTable}>
        <thead>
          <tr>
            <th style={{ width: columnWidths.번호 }}>번호</th>
            <th style={{ width: columnWidths.구분 }}>구분</th>
            <th style={{ width: columnWidths.제목 }}>제목</th>
            <th style={{ width: columnWidths.게시일 }}>게시일</th>
            <th style={{ width: columnWidths.조회 }}>조회</th>
            {isAuthenticated && <th style={{ width: columnWidths['수정/삭제'] }}>수정/삭제</th>}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>
                {item.type === "공지" || item.type === "알림" ? (
                  <span className={getTagClass(item.type)}>{item.type}</span>
                ) : (
                  item.id
                )}
              </td>
              <td>{item.type}</td>
              <td>{item.title}</td>
              <td>{item.date}</td>
              <td>{item.views}</td>
              {isAuthenticated && (
                <td>
                  <div className={styles.actionsColumn}>
                    {/* 수정 아이콘 */}
                    <div
                      className={`${styles.iconButton} ${styles.editIcon}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        // handleEdit(item.job_id); // 수정 핸들러 호출
                      }}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </div>

                    {/* 삭제 아이콘 (role === 1일 경우에만 표시) */}
                    {isAuthenticated  && (
                      <div
                        className={`${styles.iconButton} ${styles.deleteIcon}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          //handleDelete(item.job_id); // 삭제 핸들러 호출
                        }}
                      >
                        <FaTrash />
                      </div>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      

      <div className={styles.searchSection}>
        <select className={styles.searchCategory}>
          <option>제목</option>
          <option>내용</option>
          <option>제목+내용</option>
          <option>구분</option>
        </select>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="검색어를 입력하세요"
        />
        <button className={styles.searchButton}>검색</button>
      </div>
      <div className={styles.paginationContainer}>
        <Pagination postsPerPage={itemsPerPage} totalPosts={data.length} paginate={paginate} currentPage={currentPage} />
      </div>
    </div>
  );
};

export default Notice;
