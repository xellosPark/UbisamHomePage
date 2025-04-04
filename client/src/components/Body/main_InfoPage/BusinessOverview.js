import React from 'react';
import './BusinessOverview.css'; // CSS 파일 임포트
import { FaCheckCircle } from 'react-icons/fa';
import businessImage from '../../../images/image/02_01.png'

const BusinessOverview = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0, // Scroll to the top
      behavior: 'smooth' // Smooth scroll behavior
    });
  };

  return (
    <div div className="business-container">
      <div className="business-overview-container">
        {/* 상단 인사말 */}
        <div className="business-overview-header">
            <FaCheckCircle className="check-icon" /> {/* 체크 아이콘 */}
            <h1 className="business-overview-title">사업개요</h1>
            <button className="top-link" onClick={scrollToTop}>Top</button> {/* "Top" 버튼 클릭 시 scrollToTop 함수 호출 */} 
        </div>

      {/* 본문 설명 */}
      <div className="business-content">
        <p>
          다양한 <span className="highlight">장비 제어</span> 사례와 <span className="highlight">생산 자동화</span> 시스템의 구축 경험을 바탕으로
          LCD/반도체 <span className="highlight">장비 제어분야</span>의 선도 업체로 자리매김하고 있으며 지속적인 <span className="highlight">R&D</span> 활동을 통해
          Industry 4.0 시대를 리딩하는 <span className="highlight">통합 솔루션 제공자로</span> 도약하고 있습니다.
        </p>
      </div>

      {/* 장비 제어와 생산 자동화 부분 */}
      <div className="business-details">
        <div className="left-section">
          <h2 className="section-title">Equipment Control</h2>
          <ul className="section-list">
            <li>LCD, 반도체, 유기EL, 웨이퍼 공정 장비 제어</li>
            <li>장비 Protocol(SECS/HSMS) 사업화</li>
            <li>물류 반송 장치 제어(DFK, Shinko 등)</li>
            <li>Laser 장치 제어(RPR/ELA 등)</li>
            <li>MAC 및 PTN, POT, AMI 등 복합 Vision 제어</li>
            <li>Battery formation 공정 등 장비 제어</li>
          </ul>
        </div>

        <div className="right-section">
          <h2 className="section-title">Factory Automation</h2>
          <ul className="section-list">
            <li>Battery 후공정 통합 라인 관리 시스템</li>
            <li>Hitech 제조 MES/RMS 구축</li>
            <li>공장 물류 자동화 시스템 구축(AGV, CV)</li>
            <li>설비 on-line 대응 시스템 구축 (ECS, EES, EIF, ROS, MDS 등)</li>
            <li>설비 진단 및 관리 전문가 시스템 구축</li>
            <li>원격지 빅섹 비상 시스템 구축 외</li>
          </ul>
        </div>
      </div>

      {/* 이미지 */}
      <div className="business-image">
        <img src={businessImage} alt="Business Overview" />
      </div>

      {/* Solution R&D 부분 */}
      <div className="business-rnd">
        <h2 className="section-title">Solution R&D</h2>
        <ul className="section-list">
          <li>범용 장비 제어 Framework (mcFramework)</li>
          <li>Virtual device simulator</li>
          <li>장비 통신 Driver (SECS, SECS-GEM)</li>
          <li>SME PDM system</li>
        </ul>
      </div>
    </div>
    </div>
  );
};

export default BusinessOverview;