import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import styles from "./DataDetails.module.css"; // CSS 모듈 import
import api from "../../../api/api";

const BASE_PATH = "Storege/Category/dataroom";

const DataDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const data = location.state?.data || [];

  const [formData, setFormData] = useState({
    job_id: "",
    user_id: "",
    date: "",
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

      const dateSet = new Date(date);
      const dateTime = dateSet.getFullYear() +
        "-" +
        String(dateSet.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(dateSet.getDate()).padStart(2, "0") +
        " " +
        String(dateSet.getHours()).padStart(2, "0") +
        ":" +
        String(dateSet.getMinutes()).padStart(2, "0") +
        ":" +
        String(dateSet.getSeconds()).padStart(2, "0");

      const dateFormat = item.date.replace(/-/g, ".").slice(0, 16);

      setFormData({
        job_id,
        user_id,
        date: dateFormat,
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

  const parseHTML = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const elements = [];

    // 이미지 태그 추출
    const images = doc.querySelectorAll('img');
    images.forEach((img) => {
      elements.push(
        <img
          key={img.src}
          src={img.src}
          alt="이미지"
          width={img.width || 'auto'}
          style={{ ...img.style }}
        />
      );
    });

    // 텍스트 추출 (p 태그 안의 텍스트)
    const paragraphs = doc.querySelectorAll('p');
    paragraphs.forEach((p) => {
      const text = p.textContent.trim();
      if (text) {
        elements.push(<p key={text}>{text}</p>);
      }
    });

    return elements;
  };

  return (
    <div className={styles.dataDetailContainer}>
      <div className={styles.detailTitleContainer}>
        <h1 className={styles.detailTitle}>자료 상세 정보</h1>
      </div>
      <table className={styles.detailTable}>
        <tbody>
          {/* <tr>
            <td className={styles.detailLabel}>ID</td>
            <td>{formData.job_id}</td>
          </tr> */}
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
            <td className={styles.contentCell}>{parseHTML(formData.file_description)}</td>
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
