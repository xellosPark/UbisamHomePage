import React from "react";
import {useParams, useLocation, Link } from "react-router-dom";
import "./DataDetails.css";
import axios from "axios"; // axios 모듈을 불러옵니다.

const DataDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const data = location.state?.data || []; // 데이터가 없으면 빈 배열 반환

  // 데이터 배열에서 첫 번째 항목 가져오기
  const detailData = data[0] || {}; // 배열의 첫 번째 요소에 접근
  console.log("✅ 상세 페이지로 전달된 데이터:", detailData);

  // 파일 목록 처리
  const fileNames = detailData?.file_name ? detailData.file_name.split(", ") : []; // 쉼표로 분할
  const fileCount = detailData?.file_count || 0; // 파일 개수 확인

  // 파일 다운로드 가능한 목록 생성
  const attachments = fileNames.length > 0 ? fileNames : [];

  console.log("✅ 파일 개수:", fileCount);
  console.log("✅ 파일 목록:", attachments);
    // 다운로드 가능한 파일 목록
  // const attachments = ["Text1.txt", "Text2.txt", "Text3.txt", "Text4.txt"];


  // 파일 다운로드 함수 (axios 사용)
  const downloadFile = async (attachment) => {
    try {
      // axios로 파일을 다운로드합니다.
      const response = await axios.get(`http://localhost:8001/downloads/${attachment}`, {
        responseType: "blob", // 파일을 Blob 형태로 받기 위해 설정
      });

      // 파일 다운로드를 위한 링크 생성
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", attachment); // 다운로드할 파일 이름 설정
      document.body.appendChild(link);
      link.click(); // 다운로드 실행

      // Blob URL을 메모리에서 해제
      window.URL.revokeObjectURL(url);
    } catch (error) {
      // 서버에서 404 오류가 발생했을 때 처리
      if (error.response && error.response.status === 404) {
        alert("파일을 찾을 수 없습니다. 파일이 존재하는지 확인해 주세요.");
      } else {
        console.error("파일 다운로드 중 오류가 발생했습니다:", error);
        alert("파일 다운로드 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };
  
  return (
    <div className="data-detail-container">
      <h1 className="detail-title">자료 상세 정보</h1>
      <table className="detail-table">
        <tbody>
          <tr>
            <td className="detail-label">ID</td>
            <td>{data.user}</td>
          </tr>
          <tr>
            <td className="detail-label">제목</td>
            <td>{data.title}</td>
          </tr>
          <tr>
            <td className="detail-label">작성자</td>
            <td>{data.author}</td>
          </tr>
          <tr>
            <td className="detail-label">날짜</td>
            <td>{data.date}</td>
          </tr>
          <tr>
            <td className="detail-label">조회수</td>
            <td>{data.views}</td>
          </tr>
          <tr>
            <td className="detail-label">첨부 파일</td>
            <td>
              <div className="attachments-wrapper">
                <table className="attachments-table">
                  <tbody>
                    {/* 첨부 파일 링크를 클릭하면 `downloadFile` 함수가 호출됩니다. */}
                    {attachments.map((attachment, index) => (
                      <tr key={index}>
                        <td>
                          <button
                            onClick={() => downloadFile(attachment)} // 버튼 클릭 시 파일 다운로드 함수 호출
                            className="attachment-link"
                          >
                            {`${index + 1}. ${attachment}`} {/* 파일 번호와 이름 출력 */}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </td>
          </tr>

          <tr>
            <td className="detail-label">내용</td>
            {/* 내용 부분 수정 */}
            <td className="content-cell">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
              Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum...
              (긴 텍스트)
            </td>
          </tr>
        </tbody>
      </table>
      {/* 버튼 섹션 */}
      <div className="button-container">
        {/* 목록으로 돌아가기 버튼 */}
        <Link to="/DataRoom" className="back-button">
          목록으로 돌아가기
        </Link>

        {/* Previous and Next Buttons */}
        <div className="navigation-buttons">
          {/* 이전 버튼 */}
          <Link
            to={`/DataRoom/Detail/${data.id - 1}`} // 경로를 라우터와 일치하도록 수정
            className="navigation-link"
          >
            &lt; Previous
          </Link>

          {/* 다음 버튼 */}
          <Link
            to={`/DataRoom/Detail/${data.id + 1}`} // 경로를 라우터와 일치하도록 수정
            className="navigation-link"
          >
            Next &gt;
          </Link>
        </div>
      </div>
    </div>
  );
};


export default DataDetail;
