import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/footer/Footer';
import MobileLayout from './components/MobileLayout/MobileLayout';
import MainScreen from './components/MainScreen/MainScreen'; // 새롭게 만든 MainScreen 컴포넌트

const AppContent = () => {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation(); // 현재 경로를 가져옴

  const currentHash = window.location.hash.replace('#', ''); // 해시를 제거하여 경로를 가져옵니다.

  // console.log('현재 경로:', currentHash); // 해시(#)를 제외한 정확한 현재 경로 출력

  // 현재 경로가 "main", "/", "" 조건에 맞는지 확인
  const isMainPageCondition =
    currentHash === '/' || currentHash === '' || currentHash === 'main';
  // console.log('MainPage 조건 만족:', isMainPageCondition); // 조건 확인

  // 화면 크기를 감지하는 함수
  const detectDevice = () => {
    setIsMobile(window.innerWidth <= 768); // 768px 이하일 경우 모바일
  };

  // 디바이스 변경 이벤트 추가
  useEffect(() => {
    detectDevice();
    window.addEventListener('resize', detectDevice);
    return () => {
      window.removeEventListener('resize', detectDevice);
    };
  }, []);

  return (
    <div className="full-screen-container">
      {/* 조건부 렌더링: 모바일 + 메인 페이지에서만 MobileLayout 사용 */}
      {isMobile && isMainPageCondition  ? (
        <MobileLayout />
      ) : (
        <>
          {/* 데스크톱 레이아웃 */}
          <Header />
          <div className="full-screen-content">
            <MainScreen /> {/* MainScreen 컴포넌트 */}
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
