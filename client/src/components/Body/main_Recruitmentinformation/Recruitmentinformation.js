import React, { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import './Recruitmentinformation.css'; // CSS 파일 임포트
import step1Image from '../../../images/image/vision_02.png';

const RecruitmentInformation = () => {
  return (
    <div className="recruitment-overview-container">
      <div className="recruitment-overview-header">
        <FaCheckCircle className="check-icon" />
        <h1 className="recruitment-overview-title">채용정보</h1>
        <button className="top-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Top
        </button> {/* "Top" 버튼 클릭 시 스크롤 위로 */}
      </div>
      <div className="intro-text">
        <p>
          <strong>개인의 무한한 가능성</strong>을 이끌어 내어 <strong>꿈을 현실</strong>로 이루는 기업, <br />
          <strong>유비샘</strong>과 미래를 함께할 <strong>인재</strong>를 모십니다.
        </p>
      </div>
      <img src={step1Image} alt="step1Image" className="RecruitmentInformation-image" />
    </div>
  );
};

export default RecruitmentInformation;