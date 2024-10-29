import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import './Notice.css'; 
const Notice = () => {
  return (
    <div className="notice-board-container">
       <div className="notice-overview-header">
           <FaCheckCircle className="check-icon" /> 
           <h1 className="notice-overview-title">공지사항 / 뉴스</h1>
       </div>

      <div className="table-info">
        Total <strong>0</strong>건 1 페이지
      </div>

      <table className="notice-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>글쓴이</th>
            <th>날짜</th>
            <th>조회</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="5" className="no-data">게시물이 없습니다.</td>
          </tr>
        </tbody>
      </table>

      <div className="search-section">
        <select className="search-category">
          <option>제목</option>
          <option>내용</option>
          <option>제목+내용</option>
          <option>글쓴이</option>
        </select>
        <input type="text" className="search-input" placeholder="검색어를 입력하세요" />
        <button className="search-button">검색</button>
      </div>
    </div>
  );
};

export default Notice;