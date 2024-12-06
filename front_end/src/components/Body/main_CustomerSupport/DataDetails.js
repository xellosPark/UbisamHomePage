import React from "react";
import {useParams, useLocation, Link } from "react-router-dom";
import "./DataDetails.css";
import axios from "axios"; // axios 모듈을 불러옵니다.

const DataDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  console.log("전달받은 상태(state):", state);
  console.log("전달받은 상태(id):", id);

  // state가 null 또는 undefined인 경우를 처리
  if (!state || !state.item) {
    return (
      <div className="data-detail-container">
        <h1 className="detail-title">오류</h1>
        <p>올바른 데이터를 찾을 수 없습니다. 다시 시도해주세요.</p>
        <Link to="/DataRoom" className="back-button">
          목록으로 돌아가기
        </Link>
      </div>
    );
  }
  const { item } = state;

    // 다운로드 가능한 파일 목록
  const attachments = ["Text1.txt", "Text2.txt", "Text3.txt", "Text4.txt"];

  //   // 한글로 콘솔 출력
  console.log("전달받은 상태(state):", state);
  console.log("전달받은 항목(item):", item);

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
            <td>{item.id}</td>
          </tr>
          <tr>
            <td className="detail-label">제목</td>
            <td>{item.title}</td>
          </tr>
          <tr>
            <td className="detail-label">작성자</td>
            <td>{item.author}</td>
          </tr>
          <tr>
            <td className="detail-label">날짜</td>
            <td>{item.date}</td>
          </tr>
          <tr>
            <td className="detail-label">조회수</td>
            <td>{item.views}</td>
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
            to={`/DataRoom/Detail/${item.id - 1}`} // 경로를 라우터와 일치하도록 수정
            className="navigation-link"
          >
            &lt; Previous
          </Link>

          {/* 다음 버튼 */}
          <Link
            to={`/DataRoom/Detail/${item.id + 1}`} // 경로를 라우터와 일치하도록 수정
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
