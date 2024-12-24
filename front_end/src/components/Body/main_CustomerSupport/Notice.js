import React, { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import styles from './Notice.module.css';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { FaSave, FaTrash } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faBullhorn, faBell } from "@fortawesome/free-solid-svg-icons";
import Pagination from '../../Pagination/Pagination';
import axios from 'axios';
import api from '../../../api/api';

const Notice = () => {
  const now = new Date();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]); // 서버에서 가져올 데이터
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // 서버에서 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/noticeboard");
        if (response.data.success) {
          // console.log("데이터 가져오기 성공!"); // 성공 메시지
          // console.log("가져온 데이터:", response.data.notices); // 데이터 출력
          setData(response.data.notices);
        } else {
          console.error("공지사항 데이터를 불러오지 못했습니다.");
        }
      } catch (error) {
        console.error("데이터 가져오기 실패:", error.message);
      }
    };

    fetchData();
  }, []);

  const currentItems = data ? data?.slice(indexOfFirstItem, indexOfLastItem) : [];

  const [columnWidths] = useState(
    isAuthenticated
      ? { 번호: '7%', 구분: '10%', 제목: '50%', 게시일: '13%', 조회: '10%', '수정/삭제': '10%' }
      : { 번호: '7%', 구분: '10%', 제목: '50%', 게시일: '13%', 조회: '10%' }
  );


  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const handleRowClick = (item) => {
    navigate(`/DataRoom/NoticeUnitView/${item.id}`);
  };

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
          <Link to="/DataRoom/Notice" className={styles.addDataNoticeButton}>
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
          {currentItems
            .sort((a, b) => {
              // 공지 > 알림 > 일반 순으로 정렬
              const typeOrder = { "공지": 1, "알림": 2, "일반": 3 };
              return typeOrder[a.notice_type] - typeOrder[b.notice_type];
            })
            .map((item, index, sortedItems) => {
              // "일반" 타입에 대한 순번 계산
              const generalItems = data.filter((x) => x.notice_type === "일반"); // "일반" 타입만 필터링
              const generalIndex =
              item.notice_type === "일반"
                ? generalItems.length - generalItems.indexOf(item) // 내림차순 순번 계산
                : null;

              return (
                <tr key={item.id_num} onClick={() => handleRowClick(item)}>
                  <td>
                    {/* 공지와 알림은 notice_type 표시, 일반은 순번 */}
                    {item.notice_type === "공지" || item.notice_type === "알림" ? (
                      <span className={getTagClass(item.notice_type)}>{item.notice_type}</span>
                    ) : (
                      generalIndex // 일반 타입에 대한 순번
                    )}
                  </td>
                  <td>{item.notice_type}</td>
                  <td>
                    {item.notice_type === "공지" ? (
                      <>
                        <FontAwesomeIcon
                          icon={faBullhorn} // 스피커 아이콘
                          style={{ color: "#ffc107", marginRight: "8px" }}
                        />
                        {item.title}
                      </>
                    ) : item.notice_type === "알림" ? (
                      <>
                        <FontAwesomeIcon
                          icon={faBell} // 종 아이콘
                          style={{ color: "#17a2b8", marginRight: "8px" }}
                        />
                        {item.title}
                      </>
                    ) : (
                      item.title // 일반일 경우 제목만 표시
                    )}
                  </td>
                  <td>
                    {new Date(item.created_time)
                      .toLocaleString("en-CA", {
                        timeZone: "Asia/Seoul",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hourCycle: "h23",
                      })
                      .replace(",", "")}
                  </td>
                  <td>{item.view_count}</td>
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

                        {/* 삭제 아이콘 */}
                        {isAuthenticated && (
                          <div
                            className={`${styles.iconButton} ${styles.deleteIcon}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              // handleDelete(item.job_id); // 삭제 핸들러 호출
                            }}
                          >
                            <FaTrash />
                          </div>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
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
