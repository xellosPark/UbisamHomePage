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

  // // 서버에서 데이터 가져오기
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await api.get("/api/noticeboard");
  //       if (response.data.success) {
  //         // console.log("데이터 가져오기 성공!"); // 성공 메시지
  //         // console.log("가져온 데이터:", response.data.notices); // 데이터 출력
  //         setData(response.data.notices);
  //       } else {
  //         console.error("공지사항 데이터를 불러오지 못했습니다.");
  //       }
  //     } catch (error) {
  //       console.error("데이터 가져오기 실패:", error.message);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // 서버에서 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/noticeboard");

        if (response.data.success) {
          // delete_time이 null인 데이터만 필터링
          const filteredData = response.data.notices.filter((item) => !item.delete_time);

          // 콘솔에 필터링된 데이터 출력
          console.log("📥 필터링된 데이터:", filteredData);

          // 상태에 필터링된 데이터 저장
          setData(filteredData);
        } else {
          console.error("공지사항 데이터를 불러오지 못했습니다.");
        }
      } catch (error) {
        console.error("데이터 가져오기 실패:", error.message);
      }
    };

    fetchData();
  }, []);

  // const currentItems = data ? data?.slice(indexOfFirstItem, indexOfLastItem) : [];

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

  const handleDelete = async (JobId) => {
    try {
      console.log(`🗑️ 삭제 클릭: ${JobId}`);

      // 서버에 삭제 요청 보내기
      const response = await api.post("/api/Notice/delete", { job_id: JobId });

      if (response.status === 200) {
        //console.log("✅ 삭제 완료:", jobId);

        // 서버 응답에서 삭제된 `title` 가져오기
        //const { title } = response.data;

        // 삭제된 데이터를 제외하고 상태 업데이트
        setData((prevData) => prevData.filter((item) => item.job_id !== JobId));
        //console.log(`📁 삭제된 폴더 경로: Storege/Category/dataroom/${file_title}`);
      }
    } catch (error) {
      console.error("❌ 삭제 실패:", error.message);
      if (error.status === 403) {
        alert('사용자 인증이 만료되었습니다. 로그인 후 다시 시도해 주십시오');
      }
    }
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
          {[
            ...(currentPage === 1
              ? data
                .filter((item) => item.notice_type === "공지") // 공지 데이터만 필터링
                .sort((a, b) => b.id_num - a.id_num) // 공지 데이터 최신순 정렬
                .concat(
                  data
                    .filter((item) => item.notice_type === "알림") // 알림 데이터만 필터링
                    .sort((a, b) => b.id_num - a.id_num) // 알림 데이터 최신순 정렬
                )
              : []),
            ...data
              .filter((item) => item.notice_type === "일반") // 일반 데이터만 필터링
              .sort((a, b) => b.id_num - a.id_num) // 최신 순으로 정렬
              .slice(
                currentPage === 1
                  ? 0
                  : (currentPage - 1) * itemsPerPage - data.filter((x) => x.notice_type === "공지" || x.notice_type === "알림").length, // 공지/알림 개수를 뺀 슬라이싱 시작점
                currentPage * itemsPerPage - data.filter((x) => x.notice_type === "공지" || x.notice_type === "알림").length // 공지/알림 개수를 뺀 슬라이싱 종료점
              ),
          ].map((item, index, allItems) => {
            const totalItems = data.length; // 전체 데이터 개수
            const currentIndex = index + (currentPage - 1) * itemsPerPage; // 현재 페이지에서의 인덱스
            const descendingOrder = totalItems - currentIndex; // 총 데이터에서 현재 인덱스를 뺀 값으로 내림차순 계산

            return (
              <tr key={item.id_num} onClick={() => handleRowClick(item)}>
                <td>
                  {/* 공지와 알림은 notice_type 표시, 일반은 순번 */}
                  {item.notice_type === "공지" || item.notice_type === "알림" ? (
                      <span className={getTagClass(item.notice_type)}>
                        {item.notice_type}
                      </span>
                    ) : (
                      descendingOrder // 일반 타입에 대한 순번
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
                              handleDelete(item.job_id); // 삭제 핸들러 호출
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
