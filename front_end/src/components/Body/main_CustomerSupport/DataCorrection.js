import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import styles from "./DataCorrection.module.css"; // CSS 모듈 import
import axios from "axios";
import api from "../../../api/api";

const BASE_PATH = "Storege/Category/dataroom";

const DataCorrection = () => {
  const { id } = useParams();
  const location = useLocation();
  const data = location.state?.data || [];

  const [formData, setFormData] = useState({
    job_id: "",
    user_id: "",
    date: new Date().toISOString().slice(0, 10),
    file_title: "",
    file_description: "",
    file_name: [],
    file_count: 0,
    view_count: 0,
    create_time: "",
    update_time: "",
    delete_time: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      const { job_id, user_id, date, file_title, file_description, file_name, view_count } = data;
      //console.log('server data', file_name.length);
      
      setFormData({
        job_id,
        user_id,
        date,
        file_title,
        file_description,
        file_name: typeof file_name === "string" ? file_name.split(",").map(f => f.trim()) : [],
        view_count,
      });
    }
  }, [data]);

  const handleFileAddition = (e) => {
    const files = Array.from(e.target.files); // File 객체 배열로 변환
    const fileNames = files
      .map(file => file.name.trim()) // 파일 이름 추출 및 공백 제거
      .filter(name => name !== ""); // 빈 문자열 제거
    console.log("추가된 파일들:", fileNames);
  
    // 상태에 파일 이름과 파일 객체 추가
    setFormData(prev => {
      const currentData = prev || { file_name: [], files: [] }; // 초기 상태 확인 및 기본값 설정
  
      // 기존 파일 이름과 새로운 파일 이름 병합 및 중복 제거 (빈 문자열 제거)
      const updatedFileName = [
        ...new Set([
          ...(currentData.file_name || []).filter(name => name.trim() !== ""), // 기존 파일에서 빈 문자열 제거
          ...fileNames, // 새 파일 이름 추가
        ]),
      ];
  
      // `file_name` 기준으로 중복되지 않은 새로운 파일만 추가
      const updatedFiles = [
        ...(currentData.files || []),
        ...files.filter(file => !currentData.file_name.includes(file.name.trim())), // 중복되지 않은 파일만 추가
      ];
  
      console.log("최종 파일 이름 목록:", updatedFileName);
      console.log("최종 File 객체 목록:", updatedFiles);
  
      return {
        ...currentData,
        file_name: updatedFileName,
        files: updatedFiles,
      };
    });
  };

  const handleFileDeletion = (fileToDelete) => {
    setFormData(prev => {
      // 초기 상태 확인 및 기본값 설정
      const currentData = prev || { file_name: [], files: [] }; 
      const updatedFileName = (currentData.file_name || []).filter(file => file !== fileToDelete); // file_name 배열 필터링
      const updatedFiles = (currentData.files || []).filter(file => file.name !== fileToDelete); // files 배열 필터링
  
      // 디버깅 로그
      // console.log("삭제 요청 파일:", fileToDelete);
      // console.log("삭제 후 남은 파일 이름 목록:", updatedFileName);
      // console.log("삭제 후 남은 File 객체 목록:", updatedFiles);
  
      // 업데이트된 상태 반환
      return {
        ...currentData,
        file_name: updatedFileName,
        files: updatedFiles,
      };
    });
  };

  const handleDescriptionChange = (e) => {
    setFormData(prev => ({ ...prev, file_description: e.target.value }));
  };

  const downloadFile = async (title, fileName) => {
    try {
      const filePath = `${BASE_PATH}/${title}/${fileName}`;
      const response = await api.post("/api/download",
        { path: filePath },
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("파일 다운로드 실패:", error.message);
    }
  };

  const handleUpload = async () => {
    const formDataToSend = new FormData();
  
    // 기존 첨부 파일 정보 가져오기
    const existingFiles = (formData.file_name || [])
      .filter(file => file && file.trim() !== "") // 빈 값 제거
      .map(file => file.trim()); // 파일 이름 정규화
    // console.log("필터링된 기존 파일: ", existingFiles);
  
    // 새로운 파일 가져오기
    const newFiles = formData.files || []; // 새 파일 객체 가져오기
    // console.log("새 파일들: ", newFiles.map(file => file.name)); // 새 파일 이름 디버깅
  
    // 기존 파일 개수 및 새 파일 추가
    formDataToSend.append("file_title", formData.file_title);
    formDataToSend.append("file_count", existingFiles.length); // 기존 파일 개수 + 새 파일 개수
    // console.log("전체 파일 개수: ", existingFiles.length);
  
    // 기존 첨부 파일을 FormData에 추가
    if (existingFiles.length > 0) {
      formDataToSend.append("existing_files", existingFiles.join(",")); // 기존 파일 이름 전송
    } else {
      formDataToSend.append("existing_files", ""); // 기존 파일이 없을 경우 빈 값 추가
    }
  
    // 새 파일을 FormData에 추가
    newFiles.forEach(file => {
      formDataToSend.append("files", file); // 새 파일 추가
      // console.log(`FormData에 추가된 새 파일: ${file.name}`);
    });
  
    // 기타 데이터 추가
    formDataToSend.append("job_id", formData.job_id);
    formDataToSend.append("file_description", formData.file_description);
    // console.log(`파일 설명: ${formData.file_description}`);
  
    // // 업로드 전 전체 FormData 내용 확인 (디버깅용)
    // console.log("FormData 내용:");
    // for (const [key, value] of formDataToSend.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
  
    // 서버로 전송
    try {
      const response = await api.post("/api/Editupload", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (response.data.success) {
        alert("업로드 성공!");
        //console.log("Server Response: ", response.data);
        navigate(`/DataRoom`);
      } else {
        alert("업로드 실패!");
        // console.error("서버 오류: ", response.data.message);
      }
    } catch (error) {
      // console.error("업로드 중 에러:", error);
      if (error.status === 403) {
        alert('사용자 인증이 만료되었습니다. 로그인 후 다시 시도해 주십시오');
        return
      }
      alert("업로드 중 오류가 발생했습니다.");
      
    }
  };

  return (
    <div className={styles.dataDetailContainer}>
      <div className={styles.detailTitleContainer}>
        <h1 className={styles.detailTitle}>자료 EDIT</h1>
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
              {formData.date
                ? new Date(formData.date)
                    .toISOString()
                    .replace("T", " ")
                    .slice(0, 16)
                    .replace(/-/g, ".")
                : ""}
            </td>
          </tr>
          <tr>
            <td className={styles.detailLabel}>조회수</td>
            <td>{formData.view_count}</td>
          </tr>
          <tr>
            <td className={styles.detailLabel}>첨부 파일</td>
            <td>
              <div className={styles.attachmentsWrapper}>
                <input
                  type="file"
                  multiple
                  onChange={handleFileAddition}
                  className={styles.fileInput}
                />
                <table>
                  <tbody>
                    {formData.file_name && formData.file_name.length > 0 ? (
                      formData.file_name
                        .filter(file => file && file.trim() !== "") // 유효한 파일만 필터링
                        .map((file, index) => {
                          //console.log(`Rendering file at index ${index}:`, file); // 각 파일 로그 출력
                          return (
                            <tr key={index}>
                              <td style={{ width: "90%" }}>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    //console.log(`Downloading file: ${file}`); // 다운로드 클릭 로그 출력
                                    downloadFile(formData.file_title, file);
                                  }}
                                  className={styles.downloadButton}
                                >
                                  {file}
                                </button>
                              </td>
                              <td>
                                <button
                                  onClick={() => {
                                    console.log(`Deleting file: ${file}`); // 삭제 클릭 로그 출력
                                    handleFileDeletion(file);
                                  }}
                                  className={styles.deleteButton}
                                >
                                  삭제
                                </button>
                              </td>
                            </tr>
                          );
                        })
                    ) : (
                      <tr>
                        {console.log("No files available in formData.file_name")} {/* 파일 없을 경우 로그 출력 */}
                        <td colSpan="2">첨부된 파일이 없습니다.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
          <tr>
            <td className={styles.detailLabel}>내용</td>
            <td className={styles.contentCell}>
              <textarea
                value={formData.file_description}
                onChange={handleDescriptionChange}
                className={styles.descriptionTextarea}
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
      <div className={styles.buttonContainer}>
        <Link to="/DataRoom" className={styles.backButton}>
          목록으로 돌아가기
        </Link>

        <button type="submit"
          className={styles.upLodeButton}
          onClick={handleUpload}
        >업로드
        </button>
      </div>
    </div>
  );
};

export default DataCorrection;
