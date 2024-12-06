import React from "react";
import {useParams, useLocation, Link } from "react-router-dom";
import "./DataDetails.css";

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

  const attachments = ["Test1.tex", "Test2.pdf", "Test3.docx", "Test3.docx", "Test3.docx"]; 

  //   // 한글로 콘솔 출력
  console.log("전달받은 상태(state):", state);
  console.log("전달받은 항목(item):", item);
  

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
                    {attachments.map((attachment, index) => (
                      <tr key={index}>
                        <td>
                          <a
                            href={`/downloads/${attachment}`} // Specify the download URL
                            download={attachment} // Force download
                            className="attachment-link"
                          >
                            {`${index + 1}. ${attachment}`}
                          </a>
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
