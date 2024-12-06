import React, { useState } from "react";
import style from './DataCreateFile.module.css'; // CSS 모듈 불러오기

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
    setFormData({
      ...formData,
      files: [...formData.files, ...Array.from(e.target.files)], // 기존 파일 목록에 새로 선택한 파일 추가
    });
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

  return (
    <div className={style.createContainer}>
      <div className={style.createFile}>
        <h2>자료 업로드</h2>
        <p>새로운 자료를 업로드하려면 아래 정보를 입력하세요.</p>
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
            rows={4}
            required
          />

          <label>파일 선택</label>
          <input
            type="file"
            name="files"
            onChange={handleFileChange}
            multiple
          />

          {/* 선택된 파일 이름을 테이블 형식으로 출력 */}
          {formData.files.length > 0 && (
            <div>
              <table className={style.fileListTable}>
                
                <tbody>
                  {formData.files.map((file, index) => (
                    <tr key={index}>
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

          <button type="submit">업로드</button>
        </form>
      </div>
    </div>
  );
};

export default DataCreateFile;
