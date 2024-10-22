import React from 'react';
import './Patent.css'; // CSS 파일 연결
import { FaCheckCircle } from 'react-icons/fa'; // 체크 아이콘을 사용하기 위해 react-icons 패키지 사용
import patentImage from '../../../images/image/ce_06.png'; // 특허 이미지 불러오기

const Patent = () => {

  // "Top" 버튼을 클릭하면 상단으로 스크롤하는 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0, // 상단으로 스크롤
      behavior: 'smooth' // 스무스 스크롤 동작
    });
  };

  return (
    <div className="patent-overview-container">
    {/* 특허 상단 인사말 */}
    <div className="patent-overview-header">
      <FaCheckCircle className="check-icon" /> {/* 체크 아이콘 */}
      <h1 className="patent-overview-title">특허</h1>
      <button className="top-link" onClick={scrollToTop}>Top</button> {/* "Top" 버튼 클릭 시 scrollToTop 함수 호출 */}
    </div>

    {/* 특허 이미지를 8개 보여주는 섹션 */}
    <div className="patent-overview-content">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="patent-item">
          <img src={patentImage} alt={`Patent ${index + 1}`} className="patent-image" /> {/* 특허 이미지 */}
          <p className="patent-caption">특허 제 {index + 1} 호</p> {/* 특허 설명 */}
        </div>
      ))}
    </div>
  </div>
  );
};

export default Patent;