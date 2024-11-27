import React from "react";
import "./MobileFooter.css";
import {  useNavigate } from 'react-router-dom';

const MobileFooter = () => {

  const navigate = useNavigate();  // 페이지 이동을 위한 훅
  // 특정 섹션으로 이동하면서 페이지를 변경
  const handleNavigate = (section) => {
    navigate(`/#${section}`);
  };
  
  return (
    <footer className="mobile-footer">
      <p>Copyright by 2017 www.UBISAM.com All Right Reserved.</p>
      {/* <a href="#pc-version" className="pc-version-link">PC 버전으로 보기</a> */}
       {/* PC 버전 버튼 */}
       <div className="pc-version-button-container">
        <button className="pc-version-button">
          <span onClick={() => handleNavigate('greeting')} className="nav_title">PC 버전으로 보기</span>
        </button>
      </div>
    </footer>
  );
};

export default MobileFooter;