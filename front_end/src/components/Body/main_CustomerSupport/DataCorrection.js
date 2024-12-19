import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
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

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      const { job_id, user_id, date, file_title, file_description, file_name, view_count } = data;
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
    const files = Array.from(e.target.files).map(file => file.name);
    setFormData(prev => ({ ...prev, file_name: [...prev.file_name, ...files] }));
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

    // 기존 첨부 파일 정보 가져오기 (file_name 배열에서 가져옴)
    const existingFiles = formData.file_name || []; // formData.file_name은 기존 파일 목록 배열
    console.log("기존 첨부 파일: ", existingFiles);

  // 새로운 파일 추가 데이터 가져오기
  const fileInput = document.querySelector("input[type='file']");
  const newFiles = fileInput?.files ? Array.from(fileInput.files) : [];
  console.log("새로 추가된 파일: ", newFiles);

  // 기존 첨부 파일을 FormData에 추가
  if (existingFiles.length > 0) {
    formDataToSend.append("existing_files", existingFiles.join(","));
  } else {
    formDataToSend.append("existing_files", ""); // 기존 파일이 없을 경우 빈 값 추가
  }

  // 새로운 파일을 FormData에 추가
  newFiles.forEach(file => {
    formDataToSend.append("files", file);
  });

  // 파일 개수 (기존 파일 + 새 파일) 계산 및 추가
  formDataToSend.append("file_count", existingFiles.length + newFiles.length);

  // 기타 데이터 추가
  formDataToSend.append("job_id", formData.job_id);
  formDataToSend.append("file_description", formData.file_description);
  formDataToSend.append("file_title", formData.file_title);

  // 서버로 전송
  try {
    const response = await axios.post("http://localhost:8001/api/Editupload", formDataToSend, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.data.success) {
      alert("업로드 성공!");
    } else {
      alert("업로드 실패!");
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
            <td>{formData.user_id}</td>
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
                    {formData.file_name.length > 0 ? (
                      formData.file_name.map((file, index) => (
                        <tr key={index}>
                           <td style={{ width: "90%" }}>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                downloadFile(formData.file_title, file);
                              }}
                              className={styles.downloadButton}
                            >
                              {file}
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() => handleFileDeletion(file)}
                              className={styles.deleteButton}
                            >
                              삭제
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td>첨부된 파일이 없습니다.</td>
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
