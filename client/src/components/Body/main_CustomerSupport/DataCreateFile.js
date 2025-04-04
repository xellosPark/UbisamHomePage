import React, { useMemo, useRef, useState } from "react";
import style from './DataCreateFile.module.css'; // CSS 모듈 불러오기
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // uuid 라이브러리 임포트
import api from "../../../api/api";

import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ImageResize } from "quill-image-resize-module-ts";

if (typeof window !== 'undefined' && window.Quill) {
  window.Quill = Quill;
} //2. Quill을 window 전역 객체에 할당하여 전역으로 사용

Quill.register('modules/ImageResize', ImageResize);

const DataCreateFile = () => {
  const now = new Date();
  // const formattedTime = now.toISOString().slice(11, 19); // HH:MM:SS 형식으로 시간 표시
  const dateTime = now.toLocaleString("en-CA", { timeZone: "Asia/Seoul", hour12: false }).replace(",", "");

  const [formData, setFormData] = useState({
    job_id: "101",
    user_id: "Admin",
    date: dateTime,
    file_title: "",
    file_name: [], // 파일 이름 목록
    files: [],     // 실제 선택된 파일 객체
    file_count: 0,
    view_count: 0,
    create_time: "",
    update_time: "",
    delete_time: "",
  });
  const navigate = useNavigate();
  const quillRef = useRef(null); // ReactQuill의 ref 생성
  const [content, setContent] = useState('');

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
    uploadData.append("file_description", content);//formData.file_description);
    uploadData.append("file_count", formData.file_count);
    uploadData.append("view_count", formData.view_count);
    uploadData.append("create_time", formattedTime);
    uploadData.append("update_time", formattedTime);
    uploadData.append("delete_time", formData.delete_time);

    console.log('file_description', formData.file_description);

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
    console.log('post 진행');
    
    try {
      // axios를 사용하여 FormData 전송
      const response = await api.post("/api/dataroom", uploadData, {
        headers: {
          "Content-Type": "multipart/form-data", // 필수: multipart/form-data 설정
        },
      });
      console.log('진행됨');
      
      // 업로드 성공 처리
      alert("데이터 업로드 성공!");
      // console.log("서버 응답:", response.data);
      navigate('/DataRoom');
    } catch (error) {
      // 업로드 실패 처리
      if (error.status === 403) {
        alert('사용자 인증이 만료되었습니다. 로그인 후 다시 시도해 주십시오');
        return;
      }
      console.error("데이터 업로드 실패:", error.message);
      alert("데이터 업로드에 실패했습니다.");
    }
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

  const handleContentChange = (value) => {
    setContent(value);
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
          <ReactQuill
            ref={quillRef}
            modules={modules}
            formats={formats}
            theme="snow" className={style.qlEditor} style={{ height: '400px'}}
            value={content}
            onChange={handleContentChange}
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
