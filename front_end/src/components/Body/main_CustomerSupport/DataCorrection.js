import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import styles from "./DataCorrection.module.css"; // CSS 모듈 import
import axios from "axios";

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
      console.log('server data', file_name.length);
      
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
    const fileNames = files.map(file => file.name); // 파일 이름만 추출
    console.log("Adding files:", fileNames);
  
    // 상태에 파일 이름과 파일 객체 추가
    setFormData(prev => ({
      ...prev,
      file_name: [...prev.file_name, ...fileNames],
      files: [...(prev.files || []), ...files], // File 객체 추가
    }));
  };
  const handleFileDeletion = (fileToDelete) => {
    setFormData(prev => ({
      ...prev,
      file_name: prev.file_name.filter(file => file !== fileToDelete)
    }));
  };

  const handleDescriptionChange = (e) => {
    setFormData(prev => ({ ...prev, file_description: e.target.value }));
  };

  const downloadFile = async (title, fileName) => {
    try {
      const filePath = `${BASE_PATH}/${title}/${fileName}`;
      const response = await axios.post(
        "http://localhost:8001/api/download",
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
      .map(file => file.trim().toLowerCase()); // 파일 이름 정규화
    console.log("Filtered existing files: ", existingFiles);
  
    // 새로운 파일 정보 가져오기
    const newFiles = formData.files || []; // 상태에서 파일 객체 가져오기
    console.log("New files to upload:", newFiles.map(file => file.name));
  
    // 기존 파일과 새로운 파일 병합 (중복 제거)
    const combinedFileList = [...existingFiles, ...newFiles.map(file => file.name.trim().toLowerCase())];
    const uniqueFileList = [...new Set(combinedFileList)];
    console.log("Combined unique file list: ", uniqueFileList);

    formDataToSend.append("file_title", formData.file_title);
  
    // 파일 개수 계산 및 FormData에 추가
    formDataToSend.append("file_count", uniqueFileList.length); // 고유 파일 개수 추가
    console.log("Total file count: ", uniqueFileList.length);
  
    // 기존 첨부 파일을 FormData에 추가
    if (existingFiles.length > 0) {
      formDataToSend.append("existing_files", existingFiles.join(",")); // 기존 파일 이름 전송
    } else {
      formDataToSend.append("existing_files", ""); // 기존 파일이 없을 경우 빈 값 추가
    }
  
    // 새로운 파일을 FormData에 추가
    newFiles.forEach(file => {
      formDataToSend.append("files", file);
      console.log(`Adding file to FormData: ${file.name}`);
    });
  
    // 기타 데이터 추가
    formDataToSend.append("job_id", formData.job_id);
    formDataToSend.append("file_description", formData.file_description);
      
    // 업로드 전 전체 FormData 내용 확인 (디버깅용)
    console.log("FormData contents:");
    for (const [key, value] of formDataToSend.entries()) {
      console.log(`${key}: ${value}`);
    }
  
    // 서버로 전송
    try {
      const response = await axios.post("http://localhost:8001/api/Editupload", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (response.data.success) {
        alert("업로드 성공!");
        console.log("Server Response: ", response.data);
      } else {
        alert("업로드 실패!");
        console.error("Server Error: ", response.data.message);
      }
    } catch (error) {
      console.error("업로드 에러:", error);
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
                          console.log(`Rendering file at index ${index}:`, file); // 각 파일 로그 출력
                          return (
                            <tr key={index}>
                              <td style={{ width: "90%" }}>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    console.log(`Downloading file: ${file}`); // 다운로드 클릭 로그 출력
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
