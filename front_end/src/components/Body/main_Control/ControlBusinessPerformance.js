import React, { useState, useRef, useEffect } from 'react';
import './ControlBusinessPerformance.css'; // CSS 파일 임포트
import { FaCheckCircle } from 'react-icons/fa';

import ela_image from '../../../images/image/03_16.png';
import laser_cutting_image from '../../../images/image/03_14.png';
import laser_cutting2_image from '../../../images/image/03_15.png';

import patternRef_image1 from '../../../images/image/03_17.png';
import patternRef_image2 from '../../../images/image/03_18.png';

const ControlBusinessPerformance = () => {
  // 각 섹션에 대한 useRef 생성
  const laserRef = useRef(null);     // 레이저군 섹션 참조
  const patternRef = useRef(null);   // 패턴군 섹션 참조
  const batteryRef = useRef(null);   // 2차전지 섹션 참조
  const otherRef = useRef(null);     // 기타 섹션 참조

  const [activeButton, setActiveButton] = useState('레이저군'); // 기본 활성화된 버튼 상태

  // 버튼 클릭 시 스크롤 이동 함수
  const handleButtonClick = (buttonName, ref) => {
    setActiveButton(buttonName); // Update button state
    if (ref && ref.current) {
      const paddingOffset = 50; // Adjust this value to control the padding
      const elementPosition = ref.current.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - paddingOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
  
      console.log(`Scrolled to section: ${buttonName}, with padding of ${paddingOffset}px`);
    }
  };

  // 스크롤에 따른 버튼 상태 업데이트
  useEffect(() => {

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3, // 요소의 30%가 화면에 보일 때 활성화
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === 'laserSection') {
            setActiveButton('레이저군');
          } else if (entry.target.id === 'patternSection') {
            setActiveButton('패턴군');
          } else if (entry.target.id === 'batterySection') {
            setActiveButton('2차전지');
          } else if (entry.target.id === 'otherSection') {
            setActiveButton('기타');
          }
        }
      });
    }, observerOptions);

    const laserNode = laserRef.current;
    const patternNode = patternRef.current;
    const batteryNode = batteryRef.current;
    const otherNode = otherRef.current;

    // 각 섹션을 관찰
    if (laserNode) observer.observe(laserNode);
    if (patternNode) observer.observe(patternNode);
    if (batteryNode) observer.observe(batteryNode);
    if (otherNode) observer.observe(otherNode);

    return () => {
      // 컴포넌트 언마운트 시 observer 해제
      if (laserNode) observer.unobserve(laserNode);
      if (patternNode) observer.unobserve(patternNode);
      if (batteryNode) observer.unobserve(batteryNode);
      if (otherNode) observer.unobserve(otherNode);
    };
  }, []);

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

      {/*  레이져 Laser */}
      <div className="content-layout">
        <div className="button-group">
          <div id="laserSection" ref={laserRef} style={{ marginTop: '50px' }}>
            <div className="button-group">
              <button
                className={`solution-button ${activeButton === '레이저군' ? 'active' : ''}`}
                onClick={() => handleButtonClick('레이저군', laserRef)}
              >
                레이저군
              </button>
              <button
                className={`solution-button ${activeButton === '패턴군' ? '' : ''}`}
                onClick={() => handleButtonClick('패턴군', patternRef)}
              >
                패턴군
              </button>
              <button
                className={`solution-button ${activeButton === '2차전지' ? '' : ''}`}
                onClick={() => handleButtonClick('2차전지', batteryRef)}
              >
                2차전지
              </button>
              <button
                className={`solution-button ${activeButton === '기타' ? '' : ''}`}
                onClick={() => handleButtonClick('기타', otherRef)}
              >
                기타
              </button>

            </div>

            <div className="content-layout">
              <div className="top-section">
                  <h2> ELA - <span className="small-text">(Excimer Laser Annealing) System </span> </h2>
                  <p> ▨ - OLED LTPS공정에서 Excimer Laser를 이용하여 글라스 표면을 가열 후 냉각하는 방식을 통해 후 공정에서 전자의 흐름을 원활하게 만들기 위한 장비</p>
                  <img src={ela_image} alt="ELA-system-image" className="system-image" />
              </div>

              <div className="top-section">
                  <h2> 증착 회로 - <span className="small-text">Laser Cutting 수리 장비</span> </h2>
                  <p> ▨ - GLASS에 증착된 회로의 불량을 Review하여 Laser를 이용하여 Cutting 하는 장비</p>
                  <img src={laser_cutting_image} alt="Laser_cutting_-image" className="system-image" />
              </div>

              <div className="top-section">
                  <h2> 증착 회로 - <span className="small-text">Laser Cutting / 증착 수리 장비</span> </h2>
                  <p> ▨ - GLASS에 증착된 회로의 불량을 Laser를 이용하여 Cutting 하거나 증착 하는 장비</p>
                  <img src={laser_cutting2_image} alt="Laser_cutting_-image" className="system-image" />
              </div>

              <div className="achievements-container">
                <div className="achievements-header">
                  <span>주요</span>
                  <span>사업</span>
                  <span>실적</span>
                </div>
                <div className="achievements-content">
                  CVD 공정 laser repair 장비 / Laser power 및 Gas para interlocking / CRP 장비 제어 및 고도화 / CRP scratch 개선 / TCRP 제어 / CRP UMAC s/w / ELA s/w 제작 / Twin Viper 대응 / ELA Mura 검사기 / LTPS ELA 제어 / Auto Defect Judge s/w / RPR 자동 판정 s/w 개발 및 고도화 / 다면체 대응 / 투과조명 처리 / RMS 제어 대응 / RRP UMAC s/w / IR 조명 제어 / TRPR s/w / Laser scriber s/w / 강화유리 scriber s/w / Freeform scriber s/w
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/*  패턴군 */}
      <div className="content-layout">
        <div className="button-group">
          <div id="patternSection" ref={patternRef} style={{ marginTop: '50px' }}> 
            <div className="button-group">
              <button
                className={`solution-button ${activeButton === '레이저군' ? '' : ''}`}
                onClick={() => handleButtonClick('레이저군', laserRef)}
              >
                레이저군
              </button>
              <button
                className={`solution-button ${activeButton === '패턴군' ? 'active' : ''}`}
                onClick={() => handleButtonClick('패턴군', patternRef)}
              >
                패턴군
              </button>
              <button
                className={`solution-button ${activeButton === '2차전지' ? '' : ''}`}
                onClick={() => handleButtonClick('2차전지', batteryRef)}
              >
                2차전지
              </button>
              <button
                className={`solution-button ${activeButton === '기타' ? '' : ''}`}
                onClick={() => handleButtonClick('기타', otherRef)}
              >
                기타
              </button>

            </div>

            <div className="content-layout">
              <div className="top-section">
                  <h2> 증착 회로 - <span className="small-text">Pattern Vision 검사기 System </span> </h2>
                  <p> ▨ - GLASS에 증착된 회로 Pattern을 Vision을 이용하여 검사하는 장비</p>
                  <img src={patternRef_image1} alt="ELA-system-image" className="system-image" />
              </div>

              <div className="top-section">
                  <h2> 원장점등검사기 - <span className="small-text">(계측)</span> </h2>
                  <p> ▨ - OLED공정에서 증착 후 원장 상태에서 점등을 하여 검사를 수행하는 장비 </p>
                  <img src={patternRef_image2} alt="Laser_cutting_-image" className="system-image" />
              </div>

              <div className="achievements-container">
                <div className="achievements-header">
                  <span>주요</span>
                  <span>사업</span>
                  <span>실적</span>
                </div>
                <div className="achievements-content">
                  패턴검사기 운영 s/w / PIC PTN s/w / pOT PTN s/w / Photo inline PTN 검사기 제어 / TPTN 검사기 s/w / LTPS PTN 검사기 / TFT/CF 혼용 PTN검사기 s/w /
                  iPTN s/w / uPTN s/w / Pannel inline Macro 운영 s/w / PAC iMac s/w / Macro 검사기 image handling / Dual channel MDS 대응 / GLSS 생산 최종 검사기 /
                  Wafer 검사기 / Ingot mounter / Goniometer / POLED 이물 검사기 / Cell 합착 Vision 검사기 / MASK 검사기 / 합착정도 검사기 / 원장 점등 검사기
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2차전지 */}
      <div className="content-layout">
        <div className="button-group">
          <div id="batterySection" ref={batteryRef} style={{ marginTop: '50px' }}>
            <div className="button-group">
              <button
                className={`solution-button ${activeButton === '레이저군' ? '' : ''}`}
                onClick={() => handleButtonClick('레이저군', laserRef)}
              >
                레이저군
              </button>
              <button
                className={`solution-button ${activeButton === '패턴군' ? '' : ''}`}
                onClick={() => handleButtonClick('패턴군', patternRef)}
              >
                패턴군
              </button>
              <button
                className={`solution-button ${activeButton === '2차전지' ? 'active' : ''}`}
                onClick={() => handleButtonClick('2차전지', batteryRef)}
              >
                2차전지
              </button>
              <button
                className={`solution-button ${activeButton === '기타' ? '' : ''}`}
                onClick={() => handleButtonClick('기타', otherRef)}
              >
                기타
              </button>

            </div>

            <div className="content-layout">
              <div className="top-section">
                  <br></br>
                  <h1> 2차 전지 장비 </h1>
                  <br></br>
                  <h3> ▨ 핸드폰용 전지(각형) 외관 검사기</h3>
                  <p>  - 핸드폰용 전지(각형)의 치수(전장 / 전폭 / 탭 길이 / 테이프 돌출 길이 / 탭 간격 / 두께)를 Vision 및 두께 게이지를 이용하여 측정 및 검사하는 장비 </p>
                  <p>   ( 2012년부터 17호기 확산 전개 중 ) </p>
              </div>
              <div className="top-section">
                  <h3> ▨ 자동차용 중대형 전지 외관 자동 검사기</h3>
                  <p>  - 자동차용 중대형 전지의 치수(전장 / 전폭 / 탭 길이 / 테이프 돌출 길이 / 탭 간격)를 Vision을 이용하여 측정 및 검사하는 장비 </p>
                  <p>    (2007년부터 10호기 확산 전개) </p>
              </div>
              <div className="top-section">
                  <h3> ▨ 원통형 전지 Reform 자동 검사기</h3>
                  <p>  - 원통형 전극의 품질을 평가하는 항목 중 중요한 Jell Roll의 원의 크기, 면적, 위치, Tap거리를 검사하는 장비 </p>
                  <p>   ( 2008년부터 3호기 확산 전개) </p>
              </div>
              <div className="top-section">
                  <h3> ▨ 핸드폰용 전지 Flatness 검사기</h3>
                  <p>  - 핸드폰 / 패드용 전지의 평탄도를 Laser Sensor를 이용하여 측정 검사하는 장비 </p>
                  <p>    (2013년부터 4호기 확산 전개) </p>
              </div>
              <div className="top-section">
                  <h3> ▨ 전기자동차 배터리 CMA / PACK 검사기</h3>
                  <p>  - 전기자동차 배터리 CMA / PACK 상태의 검사하는 간이 검사기로 검사 스케줄을 작성하여 스케줄 관리와 조건 등을 검사하는 장비 </p>
                  <p>    (2014년부터 4호기 확산 전개) </p>
              </div>
              <br></br>
            </div>
          </div>
        </div>
      </div>

      {/* 기타 */}
      <div className="content-layout">
        <div className="button-group">
          <div id="otherSection" ref={otherRef} style={{ marginTop: '50px' }}>
            <div className="button-group">
              <button
                className={`solution-button ${activeButton === '레이저군' ? '' : ''}`}
                onClick={() => handleButtonClick('레이저군', laserRef)}
              >
                레이저군
              </button>
              <button
                className={`solution-button ${activeButton === '패턴군' ? '' : ''}`}
                onClick={() => handleButtonClick('패턴군', patternRef)}
              >
                패턴군
              </button>
              <button
                className={`solution-button ${activeButton === '2차전지' ? '' : ''}`}
                onClick={() => handleButtonClick('2차전지', batteryRef)}
              >
                2차전지
              </button>
              <button
                className={`solution-button ${activeButton === '기타' ? 'active' : ''}`}
                onClick={() => handleButtonClick('기타', otherRef)}
              >
                기타
              </button>

            </div>

            <div className="content-layout">
              <div className="top-section">
                  <h2> 기타 장비 </h2>
                  <ul>
                    <li> 3D review 제어</li>
                    <li> EVPC 제어</li>
                    <li> Shipping Compiler 제어 s/w</li>
                    <li> GE Healthcare line 표준 loader 장비</li>
                    <li> i사 광학 side filler 제어 및 vision 검사</li>
                    <li> i사 광학 under filler 제어 및 vision 검사</li>
                  </ul>
              </div>
             
            </div>
          </div>
        </div>
      </div>



    </div>
  );
};

export default ControlBusinessPerformance;