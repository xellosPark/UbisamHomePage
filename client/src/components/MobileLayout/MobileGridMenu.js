import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import styles from "./MobileGridMenu.module.css"

const MobileGridMenu = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  // 특정 섹션으로 이동하면서 페이지를 변경
  const handleNavigate = (section) => {
    navigate(`/#${section}`);
  };

  return (
    <div className={styles.gridMenu}>
      <div className={`${styles.gridItem} ${styles.intro}`}>
        {/* <span onClick={() => handleNavigate('greeting')} className={styles.blackText}>
          (주)유비샘 소개
        </span> */}
        <Link to="/Mgreetings" target="_blank" rel="noopener noreferrer" className={styles.blackText}>
          (주)유비샘 소개
        </Link>
      </div>
      <div className={`${styles.gridItem} ${styles.recruit}`}>
        <span onClick={() => handleNavigate('Recruitment-Information-System')}>
          채용정보
        </span>
      </div>
      <div className={`${styles.gridItem} ${styles.controlSystem}`}>
        <span onClick={() => handleNavigate('equipment-system')}>
          장비제어시스템
        </span>
      </div>
      <div className={`${styles.gridItem} ${styles.infoSystem}`}>
        <span onClick={() => handleNavigate('Production-Information-System')} className={styles.blackText}>
          생산정보시스템
        </span>
      </div>
      <div className={`${styles.gridItem} ${styles.resources}`}>
        <Link to="/DataRoom">
          <span className={styles.blackText}>자료실</span>
        </Link>
      </div>
      <div className={`${styles.gridItem} ${styles.qa}`}>
        <Link to="https://www.naver.com" target="_blank" rel="noopener noreferrer">
          Q&A
        </Link>
      </div>
    </div>
  );
};

export default MobileGridMenu;
