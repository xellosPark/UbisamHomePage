import React from "react";
import MobileHeader from "./MobileHeader"; // 모바일 헤더 컴포넌트
import MobileBanner from "./MobileBanner"; // 배너 컴포넌트
import MobileGridMenu from "./MobileGridMenu"; // 그리드 메뉴 컴포넌트
import MobileFooter from "./MobileFooter"; // 모바일 푸터 컴포넌트import "./MobileLayout.css"; // 레이아웃 스타일

const MobileLayout = () => {
  return (
    <div className="mobile-layout">
      {/* 헤더 영역 */}
      <MobileHeader />
      {/* 배너 영역 */}
      <MobileBanner />
      {/* 그리드 메뉴 영역 */}
      <MobileGridMenu />
      {/* 푸터 영역 */}
      <MobileFooter />
    </div>
  );
};

export default MobileLayout;