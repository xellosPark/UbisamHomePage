import React from "react";
import "./MobileGridMenu.css";

const MobileGridMenu = () => {
  return (
    <div className="grid-menu">
      <div className="grid-item intro">
        <a href="#intro" className="black-text">(주)유비샘 소개</a>
      </div>
      <div className="grid-item recruit">
        <a href="#recruit">리크루트</a>
      </div>
      <div className="grid-item control-system">
        <a href="#control-system">장비제어시스템</a>
      </div>
      <div className="grid-item info-system">
        <a href="#info-system" className="black-text">생산정보시스템</a>
      </div>
      <div className="grid-item resources">
        <a href="#resources" className="black-text">자료실</a>
      </div>
      <div className="grid-item qa">
        <a href="https://www.naver.com" target="_blank" rel="noopener noreferrer">
          Q&A
        </a>
      </div>
    </div>
  );
};

export default MobileGridMenu;