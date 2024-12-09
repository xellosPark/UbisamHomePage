import React, { useState } from "react";
import style from './DataCreateFile.module.css'; // CSS 모듈 불러오기
import { Link } from "react-router-dom";
import axios from "axios"; // axios 모듈을 불러옵니다.

const DataCreateFile = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    files: [], // 선택된 파일들
  });

  // 입력 값이 변경될 때마다 formData 상태를 업데이트
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 파일 선택 시 처리하는 함수
  const handleFileChange = (e) => {
    const files = e.target.files;

    if (!files) {
      return; // 파일이 없다면 아무것도 하지 않음
    }
    // 선택한 파일들을 기존 파일 목록에 추가
    const selectedFiles = Array.from(e.target.files);
  
    // 기존 파일 목록에 새로 선택한 파일을 추가하여 상태 업데이트
    setFormData({
      ...formData,
      files: [...formData.files, ...selectedFiles], // 기존 파일 목록 + 새로 선택한 파일
    });
  
    // 파일 선택 후 파일 탐색기 다시 닫는 방식 (자동으로 처리)
    e.target.value = null;
  };
  // 파일 삭제 함수
  const handleFileDelete = (fileName) => {
    setFormData({
      ...formData,
      files: formData.files.filter((file) => file.name !== fileName), // 해당 파일 삭제
    });
  };

  // 폼 제출 시 처리하는 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("업로드된 데이터:", formData);
  };

   // 업로드 버튼 이벤트 핸들러
   const handleUpload = async () => {

      // 현재 시간을 ISO 형식으로 변환
  const now = new Date();
     const formattedTime = now.toISOString().slice(0, 19).replace("T", " "); // MySQL 형식으로 변환 (YYYY-MM-DD HH:mm:ss)

     const testData = {
       job_id: 101, // 테스트 job ID
       user_id: 202, // 테스트 사용자 ID
       date: now.toISOString().slice(0, 10), // 오늘 날짜 (YYYY-MM-DD 형식)
       file_title: "테스트 파일 제목", // 테스트 파일 제목
       file_description: "이것은 테스트 파일 설명입니다.", // 테스트 파일 설명
       file_name: "test_file.pdf", // 테스트 파일 이름
       file_count: 5, // 테스트 파일 개수
       view_count: 0, // 테스트 조회수
       create_time: formattedTime, // 현재 시간
       update_time: formattedTime, // 현재 시간
       delete_time: null, // 삭제 시간이 없는 경우 (null)
     };

    //  const testData = {
    //   job_id: uuidv4(), // UUID 생성
    //   user_id: 202,
    //   date: now.toISOString().slice(0, 10), // 오늘 날짜 (YYYY-MM-DD)
    //   file_title: formData.title,
    //   file_description: formData.description,
    //   file_name: formData.files.map((file) => file.name).join(", "), // 파일 이름 목록
    //   file_count: formData.files.length, // 파일 개수
    //   view_count: 0,
    //   create_time: formattedTime,
    //   update_time: formattedTime,
    //   delete_time: null,
    // };


     try {
       // 서버로 데이터 전송 (POST 요청)
       const response = await axios.post("http://localhost:8001/api/dataroom", testData);

       // 업로드 성공 시 알림 및 콘솔 출력
       alert("데이터 업로드 성공!");
       console.log("서버 응답:", response.data); // 서버 응답 출력
     } catch (error) {
       // 업로드 실패 시 에러 알림 및 콘솔 출력
       console.error("데이터 업로드 실패:", error.message); // 에러 메시지 출력
       alert("데이터 업로드에 실패했습니다."); // 실패 알림
     }
   };

  return (
    <div className={style.createContainer}>
      <div className={style.createFile}>
        <h4>자료 업로드</h4>
        <form onSubmit={handleSubmit}>
          <label>제목</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />

          <label>설명</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={10}
            required
          />
          <div className={style.fileContainer}>
            <label>첨부 파일</label>
            <button type="button" className={style.addButton} onClick={(e) => handleFileChange(e)} >
              + ADD
            </button>

          </div>
         
          {/* 선택된 파일 이름을 테이블 형식으로 출력 */}
          {formData.files.length > 0 && (
            <div className={style.fileListContainer}>
              <table className={style.fileListTable}>
                <tbody>
                  {formData.files.map((file, index) => (
                    <tr key={index} >
                      <td>{index+1}</td>
                      <td>{file.name}</td>
                      <td>
                        <button
                          type="button"
                          className={style.deleteButton}  // CSS 모듈을 사용한 클래스 참조
                          onClick={() => handleFileDelete(file.name)}
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

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

export default DataCreateFile;
