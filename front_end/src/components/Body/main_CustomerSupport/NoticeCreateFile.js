import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import style from './NoticeCreateFile.module.css'; 
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios"; // axios 모듈을 불러옵니다.
import { v4 as uuidv4 } from "uuid"; // uuid 라이브러리 임포트

const NoticeCreateFile = () => {
  const now = new Date();
  // const formattedTime = now.toISOString().slice(11, 19); // HH:MM:SS 형식으로 시간 표시
  const dateTime = now.toLocaleString("en-CA", { timeZone: "Asia/Seoul", hour12: false }).replace(",", "");

  const [formData, setFormData] = useState({
    job_id: "101",
    user_id: "Admin",
    date: dateTime,
    file_title: "",
    file_description: "",
    file_name: [], // 파일 이름 목록
    files: [],     // 실제 선택된 파일 객체
    file_count: 0,
    view_count: 0,
    create_time: "",
    update_time: "",
    delete_time: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    
  };

  const handleFileDelete = (fileName) => {
    
  };


  // 업로드 버튼 이벤트 핸들러
  const handleUpload = async () => {
    const now = new Date();
    const formattedTime = now.toISOString().slice(0, 19).replace("T", " ");

    // job_id를 UUID로 설정
    //const uniqueJobId = uuidv4();
    // job_id를 5자리로 생성
    const uniqueJobId = uuidv4().replace(/-/g, "").slice(0, 5); // UUID를 5자리로 잘라서 사용

    // FormData 객체 생성
    const uploadData = new FormData();

    // FormData에 필드 추가
    uploadData.append("job_id", uniqueJobId); // UUID를 job_id로 추가
    uploadData.append("user_id", formData.user_id);
    uploadData.append("date", formData.date);
    uploadData.append("file_title", formData.file_title);
    uploadData.append("file_description", formData.file_description);
    uploadData.append("file_count", formData.file_count);
    uploadData.append("view_count", formData.view_count);
    uploadData.append("create_time", formattedTime);
    uploadData.append("update_time", formattedTime);
    uploadData.append("delete_time", formData.delete_time);

    // 파일 이름 목록 생성
    const fileNames = formData.files.map((file) => file.name);

    // FormData에 파일 이름 추가
    uploadData.append("file_name", fileNames.join(", ")); // 쉼표로 구분된 파일 이름 목록


    // 파일 객체 추가
    formData.files.forEach((file, index) => {
      uploadData.append(`files`, file); // 파일 추가 (키 이름은 'files')
    });

    // 서버에 보내기 전에 FormData 확인
    //console.log("FormData 객체에 포함된 내용:");
    // for (let [key, value] of uploadData.entries()) {
    //   console.log(`${key}:`, value);
    // }

    try {
      // axios를 사용하여 FormData 전송
      const response = await axios.post("http://localhost:8001/api/dataroom", uploadData, {
        headers: {
          "Content-Type": "multipart/form-data", // 필수: multipart/form-data 설정
        },
      });

      // 업로드 성공 처리
      alert("데이터 업로드 성공!");
      // console.log("서버 응답:", response.data);
      navigate('/DataRoom');
    } catch (error) {
      // 업로드 실패 처리
      console.error("데이터 업로드 실패:", error.message);
      alert("데이터 업로드에 실패했습니다.");
    }
  };

  return (
    <div className={style.createContainer}>
      <div className={style.createFile}>
        <h4>자료 업로드</h4>
        <form>
          <label>제목</label>
          <input
            type="text"
            name="file_title"
            value={formData.file_title}
            onChange={handleInputChange}
            required
          />

          <label>설명</label>
          <textarea
            name="file_description"
            value={formData.file_description}
            onChange={handleInputChange}
            rows={10}
            required
          />
         

          <div className={style.buttoncontainer}>
            {/* 목록으로 돌아가기 버튼 */}
            <Link to="/DataRoom" className={style.backbutton}>
              목록으로 돌아가기
            </Link>
            <button type="submit"
              className={style.upLodeButton}
              onClick={handleUpload}
            >업로드
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default NoticeCreateFile;
