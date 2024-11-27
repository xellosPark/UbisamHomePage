import React from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import "./MobileGridMenu.css";

const MobileGridMenu = () => {
  const navigate = useNavigate();  // 페이지 이동을 위한 훅

    // 특정 섹션으로 이동하면서 페이지를 변경
  const handleNavigate = (section) => {
    navigate(`/#${section}`);
  };

  return (
    <div className="grid-menu">
      <div className="grid-item intro">
        <span onClick={() => handleNavigate('greeting')} className="nav_title">(주)유비샘 소개</span>
      </div>
      <div className="grid-item recruit">
        <span onClick={() => handleNavigate('Recruitment-Information-System')} className="nav_title">채용정보</span>
      </div>
      <div className="grid-item control-system">
        <span onClick={() => handleNavigate('equipment-system')} className="nav_title">장비제어시스템</span>
      </div>
      <div className="grid-item info-system">
        <span onClick={() => handleNavigate('Production-Information-System')} className="nav_title">생산정보시스템</span>
      </div>
      <div className="grid-item resources">
        <Link to="/DataRoom" class="nav_title" >자료실</Link>
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