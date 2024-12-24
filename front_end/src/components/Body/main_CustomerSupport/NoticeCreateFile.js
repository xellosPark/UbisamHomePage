import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import style from './NoticeCreateFile.module.css';
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const NoticeCreateFile = () => {
  const now = new Date();
  const formattedTime = now.toISOString().slice(0, 19).replace("T", " ");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id_num: null,           // 고유 ID
    user_id: "202",            // 사용자 ID
    job_id: "",             // 작업 ID
    notice_type: "",        // 공지 유형
    title: "",              // 제목
    view_count: 0,          // 조회수
    description: "",        // 설명
    created_time: formattedTime, // 생성 시간
    update_time: formattedTime,  // 수정 시간
    delete_time: null,      // 삭제 시간
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      // 고유한 `job_id` 생성
      const uniqueJobId = uuidv4().replace(/-/g, "").slice(0, 5); // UUID를 5자리로 잘라 사용
      const updatedFormData = { ...formData, job_id: uniqueJobId };

      // 콘솔 로그로 확인 (한글 메시지)
      // console.log("=== 서버로 전송할 데이터 확인 ===");
      // console.log("고유 작업 ID (job_id):", updatedFormData.job_id);
      // console.log("사용자 ID (user_id):", updatedFormData.user_id);
      // console.log("공지 유형 (notice_type):", updatedFormData.notice_type);
      // console.log("제목 (title):", updatedFormData.title);
      // console.log("조회수 (view_count):", updatedFormData.view_count);
      // console.log("설명 (description):", updatedFormData.description);
      // console.log("생성 시간 (created_time):", updatedFormData.created_time);
      // console.log("수정 시간 (update_time):", updatedFormData.update_time);
      // console.log("삭제 시간 (delete_time):", updatedFormData.delete_time);

      // 서버에 데이터 전송
      const response = await axios.post("http://localhost:8001/api/createnoticeboard", updatedFormData);

      if (response.data.success) {
        alert("게시물이 성공적으로 업로드되었습니다.");
        navigate('/support');
      } else {
        alert("게시물 업로드에 실패하였습니다.");
      }
    } catch (error) {
      console.error("업로드 중 오류 발생:", error.message);
      alert("업로드에 실패했습니다.");
    }
  };

  return (
    <div className={style.createContainer}>
      <div className={style.createFile}>
        <h4>게시물 등록</h4>
        <form onSubmit={handleUpload}>
          {/* 제목 입력 */}
          <label>제목</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />

          {/* 공지 유형 드롭다운 */}
          <label>구분</label>
          <div className={style.dropdownContainer}>
            <select
              name="notice_type"
              value={formData.notice_type}
              onChange={handleInputChange}
              className={style.dropdown}
              required
            >
              <option value="">선택하세요</option>
              <option value="공지">공지</option>
              <option value="알림">알림</option>
              <option value="일반">일반</option>
            </select>
          </div>

          {/* 설명 입력 */}
          <label>설명</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={10}
            required
          />

          {/* 버튼 컨테이너 */}
          <div className={style.buttoncontainer}>
            <Link to="/noticeboard" className={style.backbutton}>
              목록으로 돌아가기
            </Link>
            <button type="submit" className={style.upLodeButton}>
              업로드
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoticeCreateFile;