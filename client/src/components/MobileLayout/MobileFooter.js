import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './MobileFooter.module.css'; // CSS 모듈 임포트

const MobileFooter = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  // 특정 섹션으로 이동하면서 페이지를 변경
  const handleNavigate = (section) => {
    navigate(`/#${section}`);
  };

  return (
    <footer className={style.mobileFooter}>
      <p className={style.copyrightText}>Copyright by 2017 www.UBISAM.com All Right Reserved.</p>
      
      {/* PC 버전 버튼 */}
      <div className={style.pcVersionButtonContainer}>
        <button className={style.pcVersionButton} onClick={() => handleNavigate('greetings')}>
          <span className={style.navTitle}>PC 버전으로 보기</span>
        </button>
      </div>
    </footer>
  );
};

export default MobileFooter;
