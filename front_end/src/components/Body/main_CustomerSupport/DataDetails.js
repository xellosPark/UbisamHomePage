import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./DataDetails.css";

const DataDetail = () => {
  const { state } = useLocation();
  const { item } = state;

  const attachments = ["Test1.tex", "Test2.pdf", "Test3.docx","Test3.docx","Test3.docx"]; 

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
      <Link to="/DataRoom" className="back-button">
        목록으로 돌아가기
      </Link>
    </div>
  );
};


export default DataDetail;
