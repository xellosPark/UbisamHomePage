import React, { useEffect, useState } from 'react';
import styles from './NoticeUnitView.module.css';
import { Link, useLocation, useParams } from 'react-router-dom';

const NoticeUnitView = () => {
    const { id } = useParams();
    const location = useLocation();
    const data = location.state?.data || [];

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
            const { id_num, user_id, job_id, notice_type, title, view_count, description, created_time, update_time,delete_time,
            } = data;

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
              <td>{formData.file_title}</td>
            </tr>
            <tr>
              <td className={styles.detailLabel}>작성자</td>
              <td>Admin</td>
            </tr>
            <tr>
              <td className={styles.detailLabel}>날짜</td>
              <td>
                {formData.date}
              </td>
            </tr>
            <tr>
              <td className={styles.detailLabel}>조회수</td>
              <td>{formData.view_count}</td>
            </tr>
            <tr>
              <td className={styles.detailLabel}>내용</td>
              <td className={styles.contentCell}>{formData.file_description}</td>
            </tr>
          </tbody>
        </table>
        <div className={styles.buttonContainer}>
          <Link to="/support" className={styles.backButton}>
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  };

export default NoticeUnitView;
