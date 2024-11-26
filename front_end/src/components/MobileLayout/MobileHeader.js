import React, { useState } from "react";
import { Link } from 'react-router-dom';
import styles from "./MobileHeader.module.css"; 
import logo from '../../images/icon/ubisamlogo.png';

const MobileHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false); // 메뉴 열기/닫기 상태 관리

  return (
    <header className={styles["mobile-header"]}>
      <div className={styles.logo}>
        {/* Link 컴포넌트를 사용하여 메인 경로로 이동 */}
        <Link to="/">
          <img src={logo} alt="UbiSam Logo" className={styles["logo-img"]} />
        </Link>
      </div>
      <button
        className={styles["hamburger-menu"]}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>
      {menuOpen && ( // 메뉴가 열렸을 때만 표시
        <nav className={styles["mobile-nav"]}>
          <ul>
            <li><a href="#intro">(주)유비샘 소개</a></li>
            <li><a href="#recruit">리크루트</a></li>
            <li><a href="#control-system">장비제어시스템</a></li>
            <li><a href="#info-system">생산정보시스템</a></li>
            <li><a href="#resources">자료실</a></li>
            <li><a href="#qa">Q&A</a></li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default MobileHeader;