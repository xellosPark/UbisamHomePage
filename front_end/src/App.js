import React, { useRef, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/footer/Footer';
import CompanyIntroduction from './components/Body/main_InfoPage/CompanyIntroduction';
import CompanyGreetings from './components/Body/main_InfoPage/Companygreetings';
import BusinessOverview from './components/Body/main_InfoPage/BusinessOverview';
import ControlSolution from './components/Body/main_Control/ControlSolution';
import ControlBusinessPerformance from './components/Body/main_Control/ControlBusinessPerformance';
import CompanyHistory from './components/Body/main_InfoPage/CompanyHistory';

const MainContent = () => {  // 각 섹션에 대한 ref 선언
  const greetingsRef = useRef(null);         // 인사말 섹션 참조
  const greetingRef = useRef(null);          // 회사소개 타이틀
  const businessOverviewRef = useRef(null);  // 사업개요 섹션 참조
  const historyRef = useRef(null);           // 회사연혁 섹션 참조
  const equipmentsystemRef = useRef(null);   // 장비제어시스템
  const controlSolutionRef = useRef(null);   // 제어 솔루션 섹션 참조
  const controlBusinessPerformanceRef = useRef(null); // 제어 사업 성과 섹션 참조
  const location = useLocation();            // 현재 경로 감지

  const [isLoaded, setIsLoaded] = useState(false); // 컴포넌트 렌더링 플래그

  // 경로 확인을 위한 디버깅 로그
  console.log('Current pathname:', location.pathname);
  console.log('Current hash:', location.hash);

  // location이 변경되면 컴포넌트가 다시 렌더링됨을 트리거
  useEffect(() => {
    setIsLoaded(false);  // 경로가 변경되면 다시 false로 설정
    console.log('Current pathname: 위치', location.hash);
  }, [location]);

   // 컴포넌트가 렌더링된 후 스크롤 동작 처리
   useEffect(() => {
    if (!isLoaded) {
      setIsLoaded(true); // 컴포넌트가 렌더링된 후 true로 설정

      // 해시 값에 따라 스크롤 동작
      if (location.hash === '#greeting') {
        window.scrollTo({ top: 0, behavior: 'smooth' });  
      } else if (location.hash === '#equipment-system') {
        window.scrollTo({ top: 0, behavior: 'smooth' });  
      } else if (location.hash === '#greetings' && greetingsRef.current) {
        greetingsRef.current.scrollIntoView({ behavior: 'smooth' }); // 인사말 섹션으로 스크롤
      } else if (location.hash === '#businessOverview' && businessOverviewRef.current) {
        businessOverviewRef.current.scrollIntoView({ behavior: 'smooth' }); // 사업개요 섹션으로 스크롤
      } else if (location.hash === '#history' && historyRef.current) {
        historyRef.current.scrollIntoView({ behavior: 'smooth' }); // 회사연혁 섹션으로 스크롤
      } else if (location.hash === '#control-solution' && controlSolutionRef.current) {
        controlSolutionRef.current.scrollIntoView({ behavior: 'smooth' }); // 제어솔루션 섹션으로 스크롤
      } else if (location.hash === '#control-BusinessPerformance' && controlBusinessPerformanceRef.current) {
        controlBusinessPerformanceRef.current.scrollIntoView({ behavior: 'smooth' }); // 제어 사업 성과 섹션으로 스크롤
      }
    }
  }, [isLoaded, location.hash]); // isLoaded와 location.hash에 의존

  return (
    <div className="body-content" style={{ padding: '0px'}}>
      {
       <Routes>
        {location.hash === '' && (
          <>
            <Route path="/" element={<CompanyIntroduction />} />
            <Route path="/greetings" element={<CompanyGreetings />} />
            <Route path="/control-solution" element={ <ControlSolution />} />
          </>
        )}
      </Routes> 
      }

      {/* 경로가 "/"가 아닐 때만 컴포넌트 렌더링 */}
      {location.hash !== '' && 
      (location.hash === '#greeting' || location.hash === '#greetings' || location.hash === '#businessOverview' || location.hash === '#history') && (
        <>
          
          {/* 인사말 섹션 */}
          <div ref={greetingsRef} id="greetings" style={{ marginTop: '10px' }}>
            <CompanyGreetings />
          </div>

          {/* 사업개요 섹션 */}
          <div ref={businessOverviewRef} id="businessOverview" style={{ marginTop: '10px' }}>
            <BusinessOverview />
          </div>

          {/* 회사연혁 섹션 */}
          <div ref={historyRef} id="history" style={{ marginTop: '10px' }}>
            <CompanyHistory />
          </div>
        </>
      )}
      {location.hash !== '' &&
        (location.hash === '#equipment-system' || location.hash === '#control-solution' || location.hash === '#control-BusinessPerformance') && (
          <>
            {/* 제어솔루션 섹션 */}
            <div ref={controlSolutionRef} id="control-solution" style={{ marginTop: '10px' }}>
              <ControlSolution />
            </div>

            {/* 제어 사업 성과 섹션 */}
            <div ref={controlBusinessPerformanceRef} id="control-BusinessPerformance" style={{ marginTop: '10px' }}>
              <ControlBusinessPerformance />
            </div>
          </>
        )}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="full-screen-container">
        {/* 헤더 */}
        <Header />

        {/* 메인 콘텐츠 */}
        <div className="full-screen-content">
          <MainContent />
        </div>

        {/* 푸터 */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;