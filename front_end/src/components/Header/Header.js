import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../../images/icon/ubisamlogo.png';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  const { isAuthenticated, user, logout } = useAuth();

  // 메뉴 항목을 클릭했을 때 특정 섹션으로 이동
  const handleNavigate = (section) => {
    navigate(`/#${section}`);
  };

  const handleLogout = () => {
    logout();
    navigate(`/main`);
  };

  const handleJoin = () => {
    navigate(`/join`);
  }

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          {/* Link 컴포넌트를 사용하여 메인 경로로 이동 */}
          <Link to="/">
            <img src={logo} alt="UbiSam Logo" className="logo-img" />
          </Link>
        </div>
      </div>

      <nav className="nav">
        <ul>
          {/* 회사소개 메뉴 */}
          <li 
            onMouseEnter={() => setHoveredMenu('company')} 
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <span className="nav_title">회사소개</span>
            {hoveredMenu === 'company' && (
              <div className="dropdown">
                <div onClick={() => handleNavigate('greetings')} className="menu-item">인사말</div>
                <div onClick={() => handleNavigate('businessOverview')} className="menu-item">사업개요</div>
                <div onClick={() => handleNavigate('history')} className="menu-item">회사연혁</div>
                <div onClick={() => handleNavigate('OrganizationIntroduction')} className="menu-item">조직소개</div>
                <div onClick={() => handleNavigate('Patent')} className="menu-item">특허</div>
                <div onClick={() => handleNavigate('MainCustomer')} className="menu-item">주요고객</div>
                <div onClick={() => handleNavigate('ContentWithImages')} className="menu-item">찾아오시는길</div>
              </div>
            )}
          </li>

          {/* 장비제어시스템 메뉴 */}
          <li 
            onMouseEnter={() => setHoveredMenu('equipment')} 
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <span className="nav_title">장비제어시스템</span>
            {hoveredMenu === 'equipment' && (
              <div className="dropdown">
                <div onClick={() => handleNavigate('control-solution')} className="menu-item">제어솔루션</div>
                <div onClick={() => handleNavigate('control-BusinessPerformance')} className="menu-item">제어사업실적</div>
              </div>
            )}
          </li>

          {/* 생산정보시스템 메뉴 */}
          <li 
            onMouseEnter={() => setHoveredMenu('production')} 
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <span className="nav_title">생산정보시스템</span>
            {hoveredMenu === 'production' && (
              <div className="dropdown">
                <div onClick={() => handleNavigate('Automation-Solutions')} className="menu-item">자동화솔루션</div>
                <div onClick={() => handleNavigate('Automation-business-performanceRef')} className="menu-item">자동화사업실적</div>
              </div>
            )}
          </li>

          {/* 채용 정보 메뉴 */}
          <li 
            onMouseEnter={() => setHoveredMenu('recruit')} 
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <span className="nav_title">채용정보</span>
            {hoveredMenu === 'recruit' && (
              <div className="dropdown">
                <div onClick={() => handleNavigate('Recruitment-Information')} className="menu-item">채용안내</div>
                <div onClick={() => handleNavigate('Introductiontowelfare')} className="menu-item">복지소개</div>
              </div>
            )}
          </li>

          {/* 고객지원 메뉴 */}
          <li 
            onMouseEnter={() => setHoveredMenu('support')} 
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <Link to="/support" className="nav_title">고객지원</Link>
            {hoveredMenu === 'support' && (
              <div className="dropdown">
                <Link to="/support" className="menu-item">고객지원</Link>
                <Link to="/DataRoom" className="menu-item">자료실</Link>
                {/* <div onClick={() => handleNavigate('support')} className="menu-item">공지사항 / 뉴스</div> */}
                {/* <div onClick={() => handleNavigate('DataRoom')} className="menu-item">자료실</div> */}
                <Link to="/Inquire" className="menu-item">문의하기</Link>
              </div>
            )}
          </li>
        </ul>
      </nav>

      <div className="header-right">
        {
          isAuthenticated ? (
            <div className='header-logout'>
              <span>{user.user_name}님 환영합니다</span>
              <span className="divider">|</span>
              { user.role === 1 && 
                <>
                  <button onClick={handleJoin}>회원가입</button>
                  <span className="divider">|</span>
                </>
              }
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <Link to="/Login" className='login'>Login</Link>
          )
        }
        
        <span className="divider">|</span>
        <span>Mobile</span>
      </div>
    </header>
  );
};

export default Header;
