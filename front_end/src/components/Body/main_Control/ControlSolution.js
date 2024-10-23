import React, { useState } from 'react';
import './ControlSolution.css'; // CSS 파일 연결
import mcframework from '../../../images/image/03_01.png'
import mcframeworksystem from '../../../images/image/03_02.png'
import { FaCheckCircle } from 'react-icons/fa';

const ControlSolution = () => {
  const [activeButton, setActiveButton] = useState('mcFramework'); // 버튼 상태 관리

  // 버튼 클릭 시 배경색 변경 및 컨텐츠 표시
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName); // 선택한 버튼 상태 설정
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0, // Scroll to the top
      behavior: 'smooth' // Smooth scroll behavior
    });
  };

  return (
    <div className="control-solution-container">
      <div className="control-solution-overview-container">
        <div className="control-solution-overview-header">
            <FaCheckCircle className="check-icon" /> {/* 체크 아이콘 */}
            <h1 className="business-overview-title">사업개요</h1>
            <button className="top-link" onClick={scrollToTop}>Top</button> {/* "Top" 버튼 클릭 시 scrollToTop 함수 호출 */} 
        </div>

        {/* 버튼 그룹 */}
        <div className="button-group">
          <button
            className={`solution-button ${activeButton === 'mcFramework' ? 'active' : ''}`}
            onClick={() => handleButtonClick('mcFramework')}
          >
            mcFramework
          </button>
          <button
            className={`solution-button ${activeButton === 'vmSimulator' ? 'active' : ''}`}
            onClick={() => handleButtonClick('vmSimulator')}
          >
            vmSimulator
          </button>
          <button
            className={`solution-button ${activeButton === 'Drivers' ? 'active' : ''}`}
            onClick={() => handleButtonClick('Drivers')}
          >
            Drivers
          </button>
        </div>

        {/* 선택된 컨텐츠 */}
        <div className="content-area">
          {activeButton === 'mcFramework' && (
            <div className="content-layout">
              {/* 상단 섹션: 왼쪽 이미지와 오른쪽 텍스트 */}
              <div className="top-section">
                <h2>
                  mcFramework -
                  <span className="small-text">Machine Control Software Development Framework</span>
                </h2>
                <p>제어시스템 개발에 특화된 컴포넌트 기반의 Layered Framework와 개발도구를 제공하는 패키지</p>
                <div className="content-inner">
                  <img src={mcframework} alt="mcFramework-system-image" className="framework-image" />
                  <ul>
                    <li>제어 시퀀스 제작의 시각화</li>
                    <li>구조화된 시퀀스 설계</li>
                    <li>세부적인 제어 Code를 위한 구조 제공</li>
                    <li>UI/UX 제작 편의를 위한 프로그래밍 도구</li>
                    <li>VisualStudio™와 완벽히 통합</li>
                  </ul>
                </div>
              </div>

              {/* Framework architecture 섹션 */}
              <div className="framework-section">
                <h3>▨ Framework architecture</h3>
                <img src={mcframeworksystem} alt="mcFramework-system-image2" className="framework-image" />
              </div>
              <div className="framework-section">
                <h3>▨ Software Development in a Nutshell</h3>
                <ul>
                    <li>제어 대상 장비를 지원하는 템플릿 선택</li>
                    <li>실제 장비에서 변경된 부분에 대한 코드 수정</li>
                    <li>UI/UX 컨트롤을 사용하여 사용자 화면 제작</li>
                    <li>UI/UX 제작 편의를 위한 프로그래밍 도구</li>
                    <li>VisualStudio™를 사용하여 빌드 및 배포</li>
                  </ul>
              </div>
            </div>
          )}
          {activeButton === 'vmSimulator' && (
            <div>
              <p>vmSimulator 관련 설명</p>
            </div>
          )}
          {activeButton === 'Drivers' && (
            <div>
              <p>Drivers 관련 설명</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ControlSolution;
