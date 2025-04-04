import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSave, FaTrash } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import styles from "./DataRoom.module.css"; // CSS Modules import
import { useAuth } from "../../../context/AuthContext";
import Pagination from '../../Pagination/Pagination';
import api from "../../../api/api";

const DataRoom = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true);


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data ? data?.slice(indexOfFirstItem, indexOfLastItem) : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [columnWidths] = useState(
      isAuthenticated
        ? { 번호: '7%', 제목: '50%', 등록자: '10%', 게시일: '13%', 조회: '10%', '수정/삭제': '10%' }
        : { 번호: '7%', 제목: '50%', 등록자: '10%', 게시일: '13%', 조회: '10%' }
    );


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/dataroom");

        // delete_time이 null인 데이터만 필터링
        const filteredData = response.data.filter((item) => !item.delete_time);

        // 콘솔에 필터링된 데이터 출력
        //console.log("📥 필터링된 데이터:", filteredData);

        // 상태에 필터링된 데이터 저장
        setData(filteredData);
      } catch (err) {
        console.error("❌ 데이터 가져오기 오류:", err.message);
        setError("데이터를 가져오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRowClick = async (JobId) => {
    try {
      const response = await api.post("/api/dataroom/update-views", { id: JobId });
      console.log('response', response);
      
      const selectedData = response.data.data.find((row) => row.job_id === JobId);
      console.log('selectedData', selectedData);
      
      if (selectedData) {
        navigate(`/DataRoom/Detail/${selectedData.job_id}`, { state: { data: selectedData } });
      } else {
        console.error("❌ 일치하는 데이터가 없습니다.");
      }
    } catch (error) {
      console.error("❌ 서버 요청 실패:", error.message);
    }
  };

  const handleEdit = async (JobId) => {
    try {
      const response = await api.post("/api/dataroom/update-views", { id: JobId });

      console.log('선택된 데이터: ', response);
      const selectedData = response.data.data.find((row) => row.job_id === JobId);
      console.log('선택된 데이터 :', selectedData);
      if (selectedData) {
        navigate(`/DataRoom/DataCorrection/${selectedData.job_id}`, { state: { data: selectedData } });
      } else {
        console.error("❌ 일치하는 데이터가 없습니다.");
      }
    } catch (error) {
      console.error("❌ 서버 요청 실패:", error.message);
    }
  };

  const handleDelete = async (JobId) => {
     // 사용자에게 확인 대화상자 표시
     const isConfirmed = window.confirm("정말 삭제하시겠습니까?");
     if (!isConfirmed) {
         console.log("🚫 삭제 취소됨");
         return; // 사용자가 아니오를 선택했을 경우 함수 종료
     }
    try {
      // 서버에 삭제 요청 보내기
      const response = await api.post("/api/dataroom/delete", { job_id: JobId });

      if (response.status === 200) {
        //console.log("✅ 삭제 완료:", jobId);

        // 서버 응답에서 삭제된 `file_title` 가져오기
        const { file_title } = response.data;

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

  const getTime = (dateStr) => {
    const date = new Date(dateStr);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    return `${yyyy}.${mm}.${dd} ${hh}:${min}`;
  }

  return (
    <div className={styles.dataRoomContainer}>
      <div className={styles.dataRoomHeader}>
        <h1 className={styles.dataRoomTitle}>자료실</h1>
        {isAuthenticated && (
          <Link to="/DataRoom/CreateFile" className={styles.addDataRoomButton}>
            + 자료 추가
          </Link>
        )}
      </div>
      <table className={styles.dataTable}>
        <thead>
          <tr>
            <th style={{ width: columnWidths.번호 }}>ID</th>
            <th style={{ width: columnWidths.제목 }} className={styles.titleColumn}>제목</th>
            <th style={{ width: columnWidths.등록자 }}>등록자</th>
            <th style={{ width: columnWidths.게시일 }}>날짜</th>
            <th style={{ width: columnWidths.조회 }}>조회수</th>
            {isAuthenticated && <th style={{ width: columnWidths['수정/삭제'] }}>수정 / 삭제</th>}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index} onClick={() => handleRowClick(item.job_id)}>
              <td>{`${data.length - (currentPage - 1) * itemsPerPage - index}`}</td>
              <td className={styles.titleColumn}>
                {item.file_title}
                {item.file_count > 0 && <FaSave style={{ color: "#DB7093", marginLeft: "5px" }} />}
              </td>
              <td>Admin</td>
              <td>
                { item.date ? item.date.replace(/-/g, ".").slice(0, 16) : "" }
              </td>
              <td>{item.view_count}</td>
              {isAuthenticated && (
                <td>
                  <div className={styles.actionsColumn}>
                    <div
                      className={`${styles.iconButton} ${styles.editIcon}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(item.job_id);
                      }}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </div>
                    {user.role === true &&
                      <div
                        className={`${styles.iconButton} ${styles.deleteIcon}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.job_id);
                        }}
                      >
                        <FaTrash />
                      </div>
                    }
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.paginationContainer}>
        <Pagination postsPerPage={itemsPerPage} totalPosts={data.length} paginate={paginate} currentPage={currentPage} />
      </div>
    </div>
  );
};

export default DataRoom;