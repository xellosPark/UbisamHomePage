import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import styles from "./DataDetails.module.css"; // CSS 모듈 import
import axios from "axios";

const BASE_PATH = "Storege/Category/dataroom";

const DataDetail = () => {
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

  return (
    <div className={styles.dataDetailContainer}>
      <div className={styles.detailTitleContainer}>
        <h1 className={styles.detailTitle}>자료 상세 정보</h1>
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
                <table>
                  <tbody>
                    {formData.file_name.length > 0 ? (
                      formData.file_name.map((file, index) => (
                        <tr key={index}>
                          <td>
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
            <td className={styles.contentCell}>{formData.file_description}</td>
          </tr>
        </tbody>
      </table>
      <div className={styles.buttonContainer}>
        <Link to="/DataRoom" className={styles.backButton}>
          목록으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default DataDetail;
