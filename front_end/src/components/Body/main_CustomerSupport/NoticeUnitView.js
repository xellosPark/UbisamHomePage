import React, { useEffect, useState } from 'react';
import styles from './NoticeUnitView.module.css';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import api from "../../../api/api";

const NoticeUnitView = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const { id } = useParams();
  const location = useLocation();
  const { data, mode } = location.state || {};

  const [formData, setFormData] = useState({
    id_num: null,          // 고유 ID
    user_id: "",           // 사용자 ID
    job_id: "",            // 작업 ID
    notice_type: "",       // 공지 유형 (공지, 알림, 일반)
    title: "",             // 제목
    view_count: 0,         // 조회수
    description: "",       // 설명
    created_time: "",      // 생성 시간
    update_time: "",       // 수정 시간
    delete_time: "",       // 삭제 시간
  });


  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      const { id_num, user_id, job_id, notice_type, title, view_count, description, created_time, update_time, delete_time } = data;

      const formatDateTime = (date) => {
        const dateSet = new Date(date);
        return (
          dateSet.getFullYear() +
          "-" +
          String(dateSet.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(dateSet.getDate()).padStart(2, "0") +
          " " +
          String(dateSet.getHours()).padStart(2, "0") +
          ":" +
          String(dateSet.getMinutes()).padStart(2, "0") +
          ":" +
          String(dateSet.getSeconds()).padStart(2, "0")
        );
      };

      // console.log("한국어 로그:");
      // console.log("ID 번호:", id_num || "값이 없습니다.");
      // console.log("사용자 ID:", user_id || "값이 없습니다.");
      // console.log("작업 ID:", job_id || "값이 없습니다.");
      // console.log("알림 유형:", notice_type || "값이 없습니다.");
      // console.log("제목:", title || "값이 없습니다.");
      // console.log("조회수:", view_count || "0");
      // console.log("설명:", description || "값이 없습니다.");
      // console.log("생성 시간:", created_time ? formatDateTime(created_time) : "값이 없습니다.");
      // console.log("업데이트 시간:", update_time ? formatDateTime(update_time) : "값이 없습니다.");
      // console.log("삭제 시간:", delete_time ? formatDateTime(delete_time) : "값이 없습니다.");

      setFormData({
        id_num: id_num || null,
        user_id: user_id || "",
        job_id: job_id || "",
        notice_type: notice_type || "",
        title: title || "",
        view_count: view_count || 0,
        description: description || "",
        created_time: created_time ? formatDateTime(created_time) : "",
        update_time: update_time ? formatDateTime(update_time) : "",
        delete_time: delete_time ? formatDateTime(delete_time) : "",
      });
    }
  }, [data]);

  const handleUpload = async () => {
    try {
        const formDataToSend = new FormData();
        formDataToSend.append("job_id", data.job_id); // job_id 추가
        formDataToSend.append("description", formData.description); // 수정된 description 추가

        // 서버로 POST 요청
        const response = await api.post("/api/dataroom/Notice/update", formDataToSend, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (response.status === 200) {
            console.log("✅ 데이터 수정 성공");
            // alert("수정이 완료되었습니다.");
            navigate('/support');
           
        } else {
            console.error("❌ 서버 응답 오류");
        }
    } catch (error) {
        console.error("❌ 업로드 실패:", error.message);
        alert("업로드 중 문제가 발생했습니다.");
    }
};

  const handleDescriptionChange = (e) => {
    setFormData(prev => ({ ...prev, description: e.target.value }));
  };


  return (
    <div className={styles.dataDetailContainer}>
      <div className={styles.detailTitleContainer}>
        <h1 className={styles.detailTitle}>게시판 상세 정보</h1>
      </div>
      <table className={styles.detailTable}>
        <tbody>
          <tr>
            <td className={styles.detailLabel}>ID</td>
            <td>{formData.job_id}</td>
          </tr>
          <tr>
            <td className={styles.detailLabel}>제목</td>
            <td>{formData.title}</td>
          </tr>
          <tr>
            <td className={styles.detailLabel}>작성자</td>
            <td>Admin</td>
          </tr>
          <tr>
            <td className={styles.detailLabel}>날짜</td>
            <td>
              {formData.created_time}
            </td>
          </tr>
          <tr>
            <td className={styles.detailLabel}>조회수</td>
            <td>{formData.view_count}</td>
          </tr>
          <tr>
            <td className={styles.detailLabel}>내용</td>
            <td className={styles.contentCell}>
              {mode === 'edit' ? (
                <textarea
                  defaultValue={data?.description}
                  onChange={handleDescriptionChange}
                  className={styles.descriptionTextarea}
                />
              ) : (
                data?.description
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <div className={styles.buttonContainer}>
        <Link to="/support" className={styles.backButton}>
          목록으로 돌아가기
        </Link>

        {/* mode가 'edit'일 때만 업로드 버튼 표시 */}
        {mode === 'edit' && (
          <button
            type="submit"
            className={styles.upLodeButton}
            onClick={handleUpload}
          >
            업로드
          </button>
        )}
      </div>
    </div>
  );
};

export default NoticeUnitView;
