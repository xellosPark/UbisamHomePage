import React from 'react';
import './MainCustomer.css'; // CSS 파일 연결
import { FaCheckCircle } from 'react-icons/fa'; // 체크 아이콘을 사용하기 위해 react-icons 패키지 사용
// import customerImage from '../../../images/customer_image.png'; // 고객 이미지 불러오기

const MainCustomer = () => {

  // "Top" 버튼을 클릭하면 상단으로 스크롤하는 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0, // 상단으로 스크롤
      behavior: 'smooth' // 스무스 스크롤 동작
    });
  };

  return (
    <div className="customer-overview-container">
      {/* 메인 고객 상단 인사말 */}
      <div className="customer-overview-header">
        <FaCheckCircle className="check-icon" /> {/* 체크 아이콘 */}
        <h1 className="customer-overview-title">주요고객</h1>
        <button className="top-link" onClick={scrollToTop}>Top</button> {/* "Top" 버튼 클릭 시 scrollToTop 함수 호출 */}
      </div>

      {/* 메인 고객 이미지를 8개 보여주는 섹션 */}
      <div className="customer-overview-content">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="customer-item">
            {/* <img src={customerImage} alt={`Customer ${index + 1}`} className="customer-image" /> 고객 이미지 */}
            <p className="customer-caption">고객 {index + 1}</p> {/* 고객 설명 */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainCustomer;