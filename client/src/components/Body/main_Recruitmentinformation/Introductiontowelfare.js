import React, { useState, useRef, useEffect } from 'react';
import './Introductiontowelfare.css'; // CSS 파일 임포트
import { FaCheckCircle } from 'react-icons/fa';

// 컴포넌트 이름을 IntroductionToWelfare로 변경
const IntroductionToWelfare = () => {
  // background="images/recruit.png"
  return (
    <div className="introduction-welfare-container">
      <div className="introduction-overview-header">
        <FaCheckCircle className="check-icon" />
        <h1 className="introduction-overview-title">복지소개</h1>
        <button className="top-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Top
        </button> {/* "Top" 버튼 클릭 시 스크롤 위로 */}
      </div>

      <div className="body-list">
        <ul>
          <li>4대 보험 가입 (국민연금, 건강보험, 고용보험, 산재보험)</li>
          <li>정기 종합 건강검진 실시</li>
          <li>자기계발 및 건강비용 지원</li>
          <br></br>
          <li>퇴직연금 운영</li>
          <li>휴일(연장) 수당 지급</li>
          <li>명절 선물(귀향비) 지급</li>
          <li>장기근속 및 우수사원 포상</li>
          <li>사내 동호회 및 사우회 지원 (경조사 포함)</li>
          <li>장거리 통근자 기숙사 운영</li>
          <br></br>
          <li>교육/훈련 및 도서 구입비 지원</li>
          <li>휴양시설 숙박비 지원 (대명, 한화, 리솜 등)</li>
          <li>정기 워크숍 및 단합 대회 (MT), 시/종회 행사</li>
          <li>생활 법률 상담 지원</li>
        </ul>
      </div>
    </div>

    
  );
};

export default IntroductionToWelfare; // 컴포넌트 이름 변경에 따른 export 업데이트