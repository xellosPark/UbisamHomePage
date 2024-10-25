import React, { useState, useRef, useEffect } from 'react';
import './ControlSolution.css'; // CSS 파일 연결
import mcframework from '../../../images/image/03_01.png';
import mcframeworksystem from '../../../images/image/03_02.png';
import { FaCheckCircle } from 'react-icons/fa';
import step1Image from '../../../images/image/03_03.png';
import step2Image from '../../../images/image/03_04.png';
import step3Image from '../../../images/image/03_05.png';
import step4Image from '../../../images/image/03_06.png';
import step5Image from  '../../../images/image/03_07.png';
import step6Image from  '../../../images/image/03_08.png';
import step7Image from  '../../../images/image/03_09.png';
import step8Image from  '../../../images/image/03_10.png';
import step9Image from  '../../../images/image/03_11.png';
import step10Image from  '../../../images/image/03_12.png';
import step11Image from  '../../../images/image/03_13.png';


const ControlSolution = () => {
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

  // 스크롤에 따른 버튼 상태 업데이트
  useEffect(() => {

    const mcFrameworkNode = mcFrameworkRef.current;
    const vmSimulatorNode = vmSimulatorRef.current;
    const driversNode = driversRef.current;
  
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3, // 요소의 10%가 화면에 보일 때 활성화
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === 'mcFrameworkSection') {
            setActiveButton('mcFramework');
          } else if (entry.target.id === 'vmSimulatorSection') {
            setActiveButton('vmSimulator');
          } else if (entry.target.id === 'driversSection') {
            setActiveButton('Drivers');
          }
        }
      });
    }, observerOptions);

    // 각 섹션을 관찰
    if (mcFrameworkNode) observer.observe(mcFrameworkNode);
    if (vmSimulatorNode) observer.observe(vmSimulatorNode);
    if (driversNode) observer.observe(driversNode);

    return () => {
      // 컴포넌트 언마운트 시 observer 해제
      // Cleanup observer when component is unmounted
      if (mcFrameworkNode) observer.unobserve(mcFrameworkNode);
      if (vmSimulatorNode) observer.unobserve(vmSimulatorNode);
      if (driversNode) observer.unobserve(driversNode);
    };
  }, []);

  return (
    <div className="control-solution-container">
      <div className="control-solution-overview-container">
        <div className="control-solution-overview-header">
          <FaCheckCircle className="check-icon" /> {/* 체크 아이콘 */}
          <h1 className="business-overview-title">사업개요</h1>
          <button className="top-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Top
          </button> {/* "Top" 버튼 클릭 시 스크롤 위로 */}
        </div>


        {/* 콘텐츠 섹션 */}
        <div className="content-area">
          {/* mcFramework 섹션 */}
          <div id="mcFrameworkSection" ref={mcFrameworkRef}> {/* mcFramework 섹션에 useRef 연결 */}
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

              <div className="top-section">
                <h2>
                  mcFramework - <span className="small-text">Machine Control Software Development Framework</span>
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
                <h3><span className="red-symbol">▨</span> Framework architecture</h3>
                <img src={mcframeworksystem} alt="mcFramework-system-image2" className="framework-image" />
              </div>
              <div className="framework-section">
                <h3><span className="red-symbol">▨</span> Software Development in a Nutshell</h3>
                <ul>
                  <li>제어 대상 장비를 지원하는 템플릿 선택</li>
                  <li>실제 장비에서 변경된 부분에 대한 코드 수정</li>
                  <li>UI/UX 컨트롤을 사용하여 사용자 화면 제작</li>
                  <li>UI/UX 제작 편의를 위한 프로그래밍 도구</li>
                  <li>VisualStudio™를 사용하여 빌드 및 배포</li>
                </ul>
              </div>

              <div className="steps-container">
                <div className="step-item">
                  <p>Step 1: Sequence Design ( Design Processes with main and sub sequence items )</p>
                  <div className="step-content">
                    <img src={step1Image} alt="Step 1" className="step-image" />
                    <ul className="step-list">
                      <li>Sequence Control - Visual, Simple, Reusable</li>
                      <li>Template Oriented - Fast Development, Consistent Quality</li>
                    </ul>
                  </div>

                  <div className="step-item">
                    <p>Step 2: Apply action ( Draw action flows and script commands )</p>
                    <div className="step-content">
                      <img src={step2Image} alt="Step 2" className="step-image" />
                      <ul>
                        <li>Open Architecture - 100% Embracement of Customer Codes</li>
                      </ul>
                    </div>
                  </div>

                  <div className="step-item">
                    <p>Step 3: Attach UI/UX Controls</p>
                    <div className="step-content">
                      <img src={step3Image} alt="Step 3" className="step-image"/>
                      <ul>
                        <li>Rapid Prototyping - Ready-Made UI/UX Controls</li>
                        <li>Familiar Environment - Fully Integrated Into VisualStudio™</li>
                      </ul>
                    </div>
                  </div>

                  <div className="step-item">
                    <p>Step 4: Build & Go!</p>
                    <div className="step-content">
                      <img src={step4Image} alt="Step 4" className="step-image2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* vmSimulator 섹션 */}
          <div id="vmSimulatorSection" ref={vmSimulatorRef} style={{ marginTop: '50px' }}> {/* vmSimulator 섹션에 useRef 연결 */}

            {/* 버튼 그룹 */}
            <div className="button-group">
              <button
                className={`solution-button ${activeButton === 'mcFramework' ? '' : ''}`}
                onClick={() => handleButtonClick('mcFramework', mcFrameworkRef)} // mcFramework 버튼 클릭 시 mcFrameworkRef로 스크롤
              >
                mcFramework
              </button>
              <button
                className={`solution-button ${activeButton === 'vmSimulator' ? 'active' : 'active'}`}
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

            <div className="content-layout">
              <div className="top-section">
                <h2> vmSimulator - <span className="small-text">Machine Control Software Development Simulator </span> </h2>
                <p>제어시스템 개발에 꼭 필요한 장비와 장치 시뮬레이터 ( Cloud 환경 제공 )</p>
              </div>
              <div className="simulator-container">
                <div className="simulator-image">
                  <img src={step5Image} alt="PLC, Camera, Motor, Sensor" />
                </div>

                <div className="simulator-text">
                  <ul>
                    <li>PLC/Camera/Sensor/Motor 등의 simulator</li>
                    <li>장비 제작 전 제어 프로그램 Test 가능</li>
                    <li>MES/ECS/ERP 등 Host System 과의 Interface simulator</li>
                  </ul>
                </div>

                <div className="simulator-image2">
                  <img src={step6Image} alt="Storage, Managed Services, Infrastructure" />
                </div>
              </div>
              <div className="framework-section">
                <h3><span className="red-symbol">▨</span> Framework architecture</h3>
              </div>
              <div className="simulator-image3">
                  <img src={step7Image} alt="Storage, Managed Services, Infrastructure" />
                </div>
                <div className="simulator-image3">
                  <img src={step8Image} alt="Storage, Managed Services, Infrastructure" />
                </div>
                <div className="simulator-image3">
                  <img src={step9Image} alt="Storage, Managed Services, Infrastructure" />
                </div>
            </div>
            
          </div>

          {/* Drivers 섹션 */}
          <div id="driversSection" ref={driversRef} style={{ marginTop: '50px' }}> {/* Drivers 섹션에 useRef 연결 */}
            <div className="button-group">
              <button
                className={`solution-button ${activeButton === 'mcFramework' ? '' : ''}`}
                onClick={() => handleButtonClick('mcFramework', mcFrameworkRef)} // mcFramework 버튼 클릭 시 mcFrameworkRef로 스크롤
              >
                mcFramework
              </button>
              <button
                className={`solution-button ${activeButton === 'vmSimulator' ? '' : ''}`}
                onClick={() => handleButtonClick('vmSimulator', vmSimulatorRef)} // vmSimulator 버튼 클릭 시 vmSimulatorRef로 스크롤
              >
                vmSimulator
              </button>
              <button
                className={`solution-button ${activeButton === 'Drivers' ? 'active' : 'active'}`}
                onClick={() => handleButtonClick('Drivers', driversRef)} // Drivers 버튼 클릭 시 driversRef로 스크롤
              >
                Drivers
              </button>
            </div>

            <div className="content-layout">
              <div className="top-section">
                  <h2> Drivers - <span className="small-text">Equipment & Host interface developing software kit </span> </h2>
                  <p>SEMI 표준인 반도체 장비 통신 표준(Semiconductor Equipment Communication Standard)을 간단하고 쉽게 개발할 수 있도록 도와 주는 소프트웨어 개발 킷</p>
              </div>

              <div className="framework-section">
                <h3><span className="red-symbol">▨</span> ubiCom.net</h3>
                <p>반도체 제조 장비의 표준 통신 프로토콜인 SECS/HSMS을 지원하는 통신 드라이버 솔루션</p>
              </div>

              <img src={step10Image} alt="Step 10" className="step-image2" />
              <div className="gui-environment">
                <ul>
                  <li>손쉬운 GUI 환경</li>
                  <ul>
                    <li>통신 설정 지원</li>
                    <li>SECS 메시지 드래그 & 드롭 구성</li>
                  </ul>
                  <li> SEMI 표준 메시지 구조 템플릿 제공</li>
                  <li> 래퍼 생성 기능</li>
                  <ul>
                    <li>메시지 구조 기반 래퍼 생성 -{'>'} 생산성 향상</li>
                    <li>(.net, C++/CLI, 네이티브 C++ 지원)</li>
                  </ul>
                </ul>
              </div>

              <div className="framework-section">
                <h3><span className="red-symbol">▨</span>  ubiCom.net Simulator</h3>
                <p>ubiCom.net을 이용하여 통신 software 개발을 위해 활용할 수 있는 Host 및 장비 통신 simulator</p>
              </div>
              <img src={step11Image} alt="Step 11" className="step-image2" />
              <div className="gui-environment">
                <ul>
                  <li>손쉬운 GUI 통신 설정 환경 지원</li>
                  <li>간편한 Message Structure 수정 기능</li>
                </ul>
              </div>
              <div className="framework-section">
                <h3><span className="red-symbol">▨</span>  ubiGem.net</h3>
                <p>SECS-GEM 프로토콜을 지원하는 일반 제조장비용 통신 드라이버 솔루션</p>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default ControlSolution;








