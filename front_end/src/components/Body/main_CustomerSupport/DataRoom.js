import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSave, FaTrash } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import styles from "./DataRoom.module.css"; // CSS Modules import

const DataRoom = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [columnWidths] = useState({
    id: 50,
    title: 500,
    author: 100,
    date: 200,
    views: 50,
    actions: 100,
  });
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8001/api/dataroom");

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

  const handleRowClick = async (jobId) => {
    try {
      const response = await axios.post("http://localhost:8001/api/dataroom/update-views", { id: jobId });
      const selectedData = response.data.data.find((row) => row.job_id === jobId);
      if (selectedData) {
        navigate(`/DataRoom/Detail/${selectedData.job_id}`, { state: { data: selectedData } });
      } else {
        console.error("❌ 일치하는 데이터가 없습니다.");
      }
    } catch (error) {
      console.error("❌ 서버 요청 실패:", error.message);
    }
  };

  const handleEdit = (jobid) => {
    console.log(`✏️ 수정 클릭: ${jobid}`);
  };

  const handleDelete =  async (jobId) => {
    try {
      console.log(`🗑️ 삭제 클릭: ${jobId}`);

      // 서버에 삭제 요청 보내기
      const response = await axios.post("http://localhost:8001/api/dataroom/delete", { job_id: jobId });

      if (response.status === 200) {
        //console.log("✅ 삭제 완료:", jobId);

        // 서버 응답에서 삭제된 `file_title` 가져오기
        const { file_title } = response.data;

        // 삭제된 데이터를 제외하고 상태 업데이트
        setData((prevData) => prevData.filter((item) => item.job_id !== jobId));
        //console.log(`📁 삭제된 폴더 경로: Storege/Category/dataroom/${file_title}`);
      }
    } catch (error) {
      console.error("❌ 삭제 실패:", error.message);
    }
  };

  return (
    <div className={styles.dataRoomContainer}>
      <div className={styles.dataRoomHeader}>
        <h1 className={styles.dataRoomTitle}>자료실</h1>
        {isAdmin && (
          <Link to="/DataRoom/CreateFile" className={styles.addDataRoomButton}>
            + 자료 추가
          </Link>
        )}
      </div>
      <table className={styles.dataTable}>
        <thead>
          <tr>
            <th style={{ width: columnWidths.id }}>ID</th>
            <th style={{ width: columnWidths.title }} className={styles.titleColumn}>제목</th>
            <th style={{ width: columnWidths.author }}>등록자</th>
            <th style={{ width: columnWidths.date }}>날짜</th>
            <th style={{ width: columnWidths.views }}>조회수</th>
            {isAdmin && <th style={{ width: columnWidths.actions }}>수정 / 삭제</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id} onClick={() => handleRowClick(item.job_id)}>
              <td>{index + 1}</td>
              <td className={styles.titleColumn}>
                {item.file_title}
                {item.file_count > 0 && <FaSave style={{ color: "#DB7093", marginLeft: "5px" }} />}
              </td>
              <td>{item.user_id}</td>
                  <td>
                      {item.date
                          ? new Date(item.date)
                              .toISOString()
                              .replace("T", " ")
                              .slice(0, 16)
                              .replace(/-/g, ".")
                          : ""}
                  </td>
                  <td>{item.view_count}</td>
              {isAdmin && (
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
                    <div
                      className={`${styles.iconButton} ${styles.deleteIcon}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.job_id);
                      }}
                    >
                      <FaTrash />
                    </div>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataRoom;