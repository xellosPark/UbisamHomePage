import React, { useState, useRef, useEffect } from 'react';
import './ControlBusinessPerformance.css'; // CSS 파일 임포트
import { FaCheckCircle } from 'react-icons/fa';

const ControlBusinessPerformance = () => {
    const [activeButton, setActiveButton] = useState('vmSimulator'); // 기본 활성화된 버튼 상태
    const mcFrameworkRef = useRef(null); // mcFramework 섹션 참조를 위한 useRef
    const vmSimulatorRef = useRef(null); // vmSimulator 섹션 참조를 위한 useRef
    const driversRef = useRef(null);     // Drivers 섹션 참조를 위한 useRef

    // 버튼 클릭 시 스크롤 이동 함수
    const handleButtonClick = (buttonName, ref) => {
      setActiveButton(buttonName); // 버튼 상태를 업데이트
      if (ref && ref.current) { // ref가 정의되어 있는지 확인
        ref.current.scrollIntoView({ behavior: 'smooth' }); // 스크롤 애니메이션으로 해당 섹션으로 이동
      }
    };

  return (
    <div className="control-business-performance-container">
      <div className="control-business-overview-container">
        <div className="control-business-overview-header">
          <FaCheckCircle className="check-icon" />
          <h1 className="business-overview-title">제어사업실적</h1>
          <button className="top-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Top
          </button> {/* "Top" 버튼 클릭 시 스크롤 위로 */}
        </div>
      </div>
      <div className="content-layout">
        {/* 상단 섹션: 왼쪽 이미지와 오른쪽 텍스트 */}
        {/* 버튼 그룹 */}
        <div className="button-group">
          <button
            className={`solution-button ${activeButton === 'Drivers' ? 'active' : 'active'}`}
            onClick={() => handleButtonClick('mcFramework', mcFrameworkRef)} // mcFramework 버튼 클릭 시 mcFrameworkRef로 스크롤
          >
            mcFramework
          </button>
          <button
            className={`solution-button ${activeButton === 'Drivers' ? '' : ''}`}
            onClick={() => handleButtonClick('vmSimulator', vmSimulatorRef)} // vmSimulator 버튼 클릭 시 vmSimulatorRef로 스크롤
          >
            vmSimulator
          </button>
          <button
            className={`solution-button ${activeButton === 'Drivers' ? '' : ''}`}
            onClick={() => handleButtonClick('Drivers', driversRef)} // Drivers 버튼 클릭 시 driversRef로 스크롤
          >
            Drivers
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlBusinessPerformance;