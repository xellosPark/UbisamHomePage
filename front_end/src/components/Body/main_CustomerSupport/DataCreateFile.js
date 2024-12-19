import React, { useState } from "react";
import style from './DataCreateFile.module.css'; // CSS 모듈 불러오기
import { Link } from "react-router-dom";
import axios from "axios"; // axios 모듈을 불러옵니다.
import { v4 as uuidv4 } from "uuid"; // uuid 라이브러리 임포트

const DataCreateFile = () => {
  const now = new Date();
  const formattedTime = now.toISOString().slice(11, 19); // HH:MM:SS 형식으로 시간 표시

  const [formData, setFormData] = useState({
    job_id: "101",
    user_id: "202",
    date: new Date().toISOString().slice(0, 10),
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

  // const [formData, setFormData] = useState({
  //   title: "",
  //   description: "",
  //   files: [], // 선택된 파일들
  // });

  // 입력 값이 변경될 때마다 formData 상태를 업데이트
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  // // 파일 선택 시 처리하는 함수
  // const handleFileChange = (e) => {
  //   const files = e.target.files;
  //   console.log("handleFileChange files", files);

  //   if (!files) {
  //     return; // 파일이 없다면 아무것도 하지 않음
  //   }
  //   // 선택한 파일들을 기존 파일 목록에 추가
  //   const selectedFiles = Array.from(e.target.files);
  
  //   // 기존 파일 목록에 새로 선택한 파일을 추가하여 상태 업데이트
  //   setFormData({
  //     ...formData,
  //     files: [...formData.files, ...selectedFiles], // 기존 파일 목록 + 새로 선택한 파일
  //   });
  
  //   // 파일 선택 후 파일 탐색기 다시 닫는 방식 (자동으로 처리)
  //   e.target.value = null;
  // };
  // // 파일 삭제 함수
  // const handleFileDelete = (fileName) => {
  //   setFormData({
  //     ...formData,
  //     files: formData.files.filter((file) => file.name !== fileName), // 해당 파일 삭제
  //   });
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (!files) return;
  
    const selectedFiles = Array.from(files);
  
    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...selectedFiles], // 파일 객체 추가
      file_name: [...prev.file_name, ...selectedFiles.map((file) => file.name)], // 파일 이름 추가
      file_count: prev.file_count + selectedFiles.length, // 파일 개수 업데이트
    }));
  
    e.target.value = null; // 파일 선택기 초기화
  };

  const handleFileDelete = (fileName) => {
    setFormData((prev) => {
      // file_name에서 해당 파일을 제외한 새로운 배열 생성
      const updatedFileNames = prev.file_name.filter((name) => name !== fileName);
  
      // files 배열에서도 fileName에 해당하는 파일을 제외
      const updatedFiles = prev.files.filter((file) => file.name !== fileName);
  
      // console.log("삭제된 파일:", fileName); // 삭제된 파일 이름 로그
      // console.log("업데이트된 파일 목록:", updatedFiles); // 업데이트된 파일 객체 로그
      // console.log("업데이트된 파일 이름 목록:", updatedFileNames); // 업데이트된 파일 이름 목록 로그
      // console.log("파일 개수:", updatedFiles.length); // 파일 개수 로그
  
      // 업데이트된 상태 반환
      return {
        ...prev,
        files: updatedFiles, // files 배열 업데이트
        file_name: updatedFileNames, // file_name 배열 업데이트
        file_count: updatedFiles.length, // 파일 개수 업데이트
      };
    });
  };
  // 폼 제출 시 처리하는 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("업로드된 데이터:", formData);
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
        <form onSubmit={handleSubmit}>
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
          {/* 파일 업로드 */}
          <div className={style.fileContainer}>
            <label>첨부 파일</label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }} // 숨겨진 파일 선택기
              multiple
              onChange={handleFileChange}
            />
            <button
              type="button"
              className={style.addButton}
              onClick={() => document.getElementById("fileInput").click()} // 버튼 클릭 시 파일 선택 열기
            >
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
