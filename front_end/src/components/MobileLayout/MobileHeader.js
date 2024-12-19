import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import styles from "./MobileHeader.module.css"; 
import logo from '../../images/icon/ubisamlogo.png';

const MobileHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false); // 메뉴 열기/닫기 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // 로그인 상태
  const navigate = useNavigate();  // 페이지 이동을 위한 훅
  const [username, setUsername] = useState(""); // 아이디
  const [password, setPassword] = useState(""); // 비밀번호
  const [autoLogin, setAutoLogin] = useState(false); // 자동 로그인 여부
  const [userName, setUserName] = useState('홍길동');

  // 특정 섹션으로 이동하면서 페이지를 변경
  const handleNavigate = (section) => {
    navigate(`/#${section}`);
  };

  const handleLogin = () => {
    // 로그인 처리
    if (username && password) {
      setIsLoggedIn(true);
      alert('로그인 성공!');
    } else {
      alert('아이디와 비밀번호를 모두 입력하세요.');
    }
  };

  const handleLogout = () => {
    // 로그아웃 처리
    setIsLoggedIn(false);
    setUsername(""); // 로그아웃 시 아이디와 비밀번호 초기화
    setPassword("");
    setAutoLogin(false); // 자동 로그인 상태 초기화
    alert('로그아웃 되었습니다.');
  };
  
  const handleSearch = () => {

  };

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
      {menuOpen && (
         <nav className={styles["mobile-nav"]}>
         <ul>
           {/* 로그인/로그아웃 섹션 */}
           <li>
             {isLoggedIn ? (
               <span className="nav_title" onClick={handleLogout}>로그아웃</span>
             ) : (
               <>
                 {/* 로그인 폼 */}
                  <h3 className={styles["login-title"]}>
                    {isLoggedIn ? `Welcome, ${userName}` : '로그인을 해주세요.'}
                  </h3>
                 <div className={styles["login-form"]}>
                   <label htmlFor="username">아이디</label>
                   <input
                     type="text"
                     id="username"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                     className={styles["login-input"]}
                     placeholder="아이디를 입력하세요"
                   />
                   <label htmlFor="password">비밀번호</label>
                   <input
                     type="password"
                     id="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className={styles["login-input"]}
                     placeholder="비밀번호를 입력하세요"
                   />
                   <div className={styles["auto-login"]}>
                     <input
                       type="checkbox"
                       id="auto-login"
                       checked={autoLogin}
                       onChange={(e) => setAutoLogin(e.target.checked)}
                     />
                     <label htmlFor="auto-login">자동 로그인</label>
                   </div>
                      {/* 버튼들 */}
                      <div className={styles["button-container"]}>
                        <button onClick={handleLogin} className={styles["login-button"]}>
                          로그인
                        </button>
                        <button onClick={handleSearch} className={styles["search-button"]}>
                          정보 검색
                        </button>
                      </div>
                    </div>
               </>
             )}
           </li>
   
           {/* 네비게이션 링크들 */}
            <li> <span onClick={() => handleNavigate('greetings')} className="nav_title">(주)유비샘 소개</span></li>
            <li><span onClick={() => handleNavigate('equipment-system')} className="nav_title">장비제어시스템</span></li>
            <li><span onClick={() => handleNavigate('Production-Information-System')} className="nav_title">생산정보시스템</span></li>
            <li><span onClick={() => handleNavigate('Recruitment-Information-System')} className="nav_title">채용정보</span></li>
            <li><Link to="/support" className="nav_title">고객지원</Link></li>
            <li><Link to="/support" class="nav_title" >공지사항 / 뉴스</Link></li>
            <li><Link to="/DataRoom" class="nav_title" >자료실</Link></li>
            <li><a href="#qa" className="nav_title">Q&A</a></li>
          </ul>
   
         {/* 로그인 후 메시지 */}
         {isLoggedIn && <p>로그인되었습니다. 이제 사용 가능합니다!</p>}
       </nav>
      )}
    </header>
  );
};

export default MobileHeader;