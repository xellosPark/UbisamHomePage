import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './NoticeUnitView.module.css';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import api from "../../../api/api";
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ImageResize } from "quill-image-resize-module-ts";

if (typeof window !== 'undefined' && window.Quill) {
  window.Quill = Quill;
} //2. Quill을 window 전역 객체에 할당하여 전역으로 사용

Quill.register('modules/ImageResize', ImageResize);

const NoticeUnitView = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const { id } = useParams();
  const location = useLocation();
  const { data, mode } = location.state || {};

  const [formData, setFormData] = useState({
    id_num: null,          // 고유 ID
    user_id: "",           // 사용자 ID
    job_id: "",            // 작업 ID
    notice_type: "",       // 공지 유형 (공지, 알림, 일반)
    title: "",             // 제목
    view_count: 0,         // 조회수
    // description: "",       // 설명
    created_time: "",      // 생성 시간
    update_time: "",       // 수정 시간
    delete_time: "",       // 삭제 시간
  });
  const quillRef = useRef(null); // ReactQuill의 ref 생성
  const [content, setContent] = useState('');


  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      const { id_num, user_id, job_id, notice_type, title, view_count, description, created_time, update_time, delete_time } = data;
      
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

      // console.log("한국어 로그:");
      // console.log("ID 번호:", id_num || "값이 없습니다.");
      // console.log("사용자 ID:", user_id || "값이 없습니다.");
      // console.log("작업 ID:", job_id || "값이 없습니다.");
      // console.log("알림 유형:", notice_type || "값이 없습니다.");
      // console.log("제목:", title || "값이 없습니다.");
      // console.log("조회수:", view_count || "0");
      // console.log("설명:", description || "값이 없습니다.");
      // console.log("생성 시간:", created_time ? formatDateTime(created_time) : "값이 없습니다.");
      // console.log("업데이트 시간:", update_time ? formatDateTime(update_time) : "값이 없습니다.");
      // console.log("삭제 시간:", delete_time ? formatDateTime(delete_time) : "값이 없습니다.");

      setFormData({
        id_num: id_num || null,
        user_id: user_id || "",
        job_id: job_id || "",
        notice_type: notice_type || "",
        title: title || "",
        view_count: view_count || 0,
        // description: description || "",
        created_time: created_time ? formatDateTime(created_time) : "",
        update_time: update_time ? formatDateTime(update_time) : "",
        delete_time: delete_time ? formatDateTime(delete_time) : "",
      });

      setContent(description);
    }
  }, [data]);

  const handleUpload = async () => {
    try {
        const formDataToSend = new FormData();
        formDataToSend.append("job_id", data.job_id); // job_id 추가
        formDataToSend.append("description", content); // 수정된 description 추가

        // 서버로 POST 요청
        const response = await api.post("/api/dataroom/Notice/update", formDataToSend, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (response.status === 200) {
            console.log("✅ 데이터 수정 성공");
            // alert("수정이 완료되었습니다.");
            navigate('/support');
           
        } else {
            console.error("❌ 서버 응답 오류");
        }
    } catch (error) {
        console.error("❌ 업로드 실패:", error.message);
        alert("업로드 중 문제가 발생했습니다.");
    }
};

  const handleDescriptionChange = (e) => {
    //setFormData(prev => ({ ...prev, description: e.target.value }));
    setContent(e);
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

  // 이미지 업로드 핸들러 (새로운 이미지가 추가될때만 실행)
  const handleImageUpload = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('https://www.ubisam.com/api/data/board/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      const imageUrl = data.imageUrl;

      // 반환된 URL 확인
      console.log('이미지 URL:', imageUrl);

      // Quill 인스턴스 가져오기
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection();
      quill.insertEmbed(range.index, 'image', imageUrl);
    };
  };

  const modules = useMemo(() => {
        return {
          toolbar: {
            container: [
              [{ header: [1, 2, false] }, ], //{ header: "2" }, { font: [String] }],
              // [{ size: [String] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              ["link", "image", "code-block"],
              ["clean"],
            ],
            handlers: {
              image: handleImageUpload, // 이미지 업로드 핸들러 연결
            },
          },
          ImageResize: {
            modules: ['Resize', 'DisplaySize']
          },
    
        };
      }, []);
    
      // ReactQuill에서 사용할 포맷 정의
      const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'link',
        'image',
        'list',
        'bullet',
        'align',
      ];

  return (
    <div className={styles.dataDetailContainer}>
      <div className={styles.detailTitleContainer}>
        <h1 className={styles.detailTitle}>게시판 상세 정보</h1>
      </div>
      <table className={styles.detailTable}>
        <tbody>
          {/* <tr>
            <td className={styles.detailLabel}>ID</td>
            <td>{formData.job_id}</td>
          </tr> */}
          <tr>
            <td className={styles.detailLabel}>제목</td>
            <td>{formData.title}</td>
          </tr>
          <tr>
            <td className={styles.detailLabel}>작성자</td>
            <td>Admin</td>
          </tr>
          <tr>
            <td className={styles.detailLabel}>날짜</td>
            <td>
              {formData.created_time}
            </td>
          </tr>
          <tr>
            <td className={styles.detailLabel}>조회수</td>
            <td>{formData.view_count}</td>
          </tr>
          <tr>
            <td className={styles.detailLabel}>내용</td>
            <td className={styles.contentCell}>
              {mode === 'edit' ? (
                // <textarea
                //   defaultValue={parseHTML(data?.description)}
                //   onChange={handleDescriptionChange}
                //   className={styles.descriptionTextarea}
                // />
                <ReactQuill
                            ref={quillRef}
                            modules={modules}
                            formats={formats}
                            theme="snow" className={styles.qlEditor} style={{ height: '400px'}}
                            value={content || ""}
                            onChange={handleDescriptionChange}
                          />
              ) : (
                parseHTML(content)
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <div className={styles.buttonContainer}>
        <Link to="/support" className={styles.backButton}>
          목록으로 돌아가기
        </Link>

        {/* mode가 'edit'일 때만 업로드 버튼 표시 */}
        {mode === 'edit' && (
          <button
            type="submit"
            className={styles.upLodeButton}
            onClick={handleUpload}
          >
            업로드
          </button>
        )}
      </div>
    </div>
  );
};

export default NoticeUnitView;
