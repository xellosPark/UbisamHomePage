import React, { useEffect, useRef, useState } from 'react';
import { useLocation, Routes, Route, useNavigate } from 'react-router-dom'; // 필요한 React Router 훅들
import MobileHeader from './MobileHeader';
import MobileBanner from './MobileBanner';
import MobileGridMenu from './MobileGridMenu';
import MobileFooter from './MobileFooter';
import M_InfopageLayout from './MobileView/Mobile_Main_InfoPage/M_InfopageLayout'; // M_InfopageLayout 컴포넌트
import styles from './MobileLayout.module.css';

const MobileLayout = () => {
  const location = useLocation(); // 현재 경로 정보 가져오기
  const currentHash = location.hash || location.pathname; // 경로 또는 해시 값을 가져옵니다

  // currentHash 값 콘솔에 한글로 출력
  useEffect(() => {
    console.log(`현재 경로는: ${currentHash}`); // 한글로 현재 경로 출력
  }, [currentHash]); // currentHash가 변경될 때마다 로그 출력

  // 현재 페이지가 메인 페이지인지 확인하는 조건
  const isMainPageCondition = currentHash === '/' || currentHash === '' || currentHash === '/main';

  // Ref를 사용해 이전 값을 추적
  const prevIsMainPageConditionRef = useRef(isMainPageCondition); 

  // 이전 값과 현재 값 비교
  useEffect(() => {
    // 이전 값과 현재 값을 비교해서 콘솔에 출력
    console.log('이전 isMainPageCondition 값:', prevIsMainPageConditionRef.current);
    console.log('현재 isMainPageCondition 값:', isMainPageCondition);

    // 이전 값을 새로운 값으로 업데이트
    prevIsMainPageConditionRef.current = isMainPageCondition;
  }, [isMainPageCondition]); // isMainPageCondition이 변경될 때마다 실행

  return (
    <div className={styles.mobileLayout}>
      {/* 헤더 영역 */}
      <MobileHeader />
      
      {/* 메인 페이지에서만 배너와 그리드 메뉴 표시 */}
      {isMainPageCondition && (
        <>
          <MobileBanner />
          <MobileGridMenu />
          {/* 푸터 영역 */}
          <MobileFooter />
        </>
      )}
      
      {/* 메인 페이지가 아닌 경우에 라우팅 영역 표시 */}
      {!isMainPageCondition && (
        <div>
          {/* 모바일 화면에서만 /Mgreetings 경로에 해당하는 컴포넌트 렌더 */}
          <Routes>
            <Route path="/Mgreetings" element={<M_InfopageLayout />} />
            {/* 추가적인 라우트가 필요하면 여기에 추가 */}
          </Routes>
        </div>
      )}
      
      
    </div>
  );
};

export default MobileLayout;