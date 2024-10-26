import React, { useState } from 'react'; // Import useState for managing hover state
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../../images/icon/ubisamlogo.png';

const Header = () => {
  // State to track which menu is being hovered
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const navigate = useNavigate();  // 페이지 이동을 위한 훅


  // Function to handle mouse entering a menu item
  const handleMouseEnter = (menu) => {
    setHoveredMenu(menu);
  };

  // Function to handle mouse leaving a menu item
  const handleMouseLeave = () => {
    setHoveredMenu(null); // Reset to null when the mouse leaves
  };

  // 특정 섹션으로 이동하면서 페이지를 변경
  const handleNavigate = (section) => {
    navigate(`/#${section}`);
  };

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
          {/* 회사소개 */}
          <li
            onMouseEnter={() => handleMouseEnter('company')}
            onMouseLeave={handleMouseLeave}
          >
            {/* <Link to="/greeting" className="nav_title" >회사소개</Link> */}
            <li><span onClick={() => handleNavigate('greeting')} className="nav_title">회사소개</span></li>
            {hoveredMenu === 'company' && (
              <div class="dropdown">
                {/* <li><a href="/greetings" class="menu-item">인사말</a></li>
                <li><a href="/" class="menu-item">사업개요</a></li>
                <li><a href="/" class="menu-item">회사연혁</a></li> */}

                {/* 경로 변경과 동시에 해시 값 설정 */}
                <li><span onClick={() => handleNavigate('greetings')} className="menu-item">인사말</span></li>
                <li><span onClick={() => handleNavigate('businessOverview')} className="menu-item">사업개요</span></li>
                <li><span onClick={() => handleNavigate('history')} className="menu-item">회사연혁</span></li>
                <li><span onClick={() => handleNavigate('OrganizationIntroduction')} className="menu-item">조직소개</span></li>
                <li><span onClick={() => handleNavigate('Patent')} className="menu-item">특허</span></li>
                <li><span onClick={() => handleNavigate('MainCustomer')} className="menu-item">주요고객</span></li>
                <li><span onClick={() => handleNavigate('ContentWithImages')} className="menu-item">찾아오시는길</span></li>
              </div>
            )}
          </li>

          {/* 장비제어시스템 */}
          <li
            onMouseEnter={() => handleMouseEnter('equipment')}
            onMouseLeave={handleMouseLeave}
          >
            {/* <Link to="/control-solution" className="nav_title" >장비제어시스템</Link> */}
            <li><span onClick={() => handleNavigate('equipment-system')}            className="nav_title">장비제어시스템</span></li>
            {hoveredMenu === 'equipment' && (
              <div class="dropdown">
                <li><span onClick={() => handleNavigate('control-solution')}            className="menu-item">제어솔루션</span></li>
                <li><span onClick={() => handleNavigate('control-BusinessPerformance')} className="menu-item">제어사업실적</span></li>
                {/* <li><Link to="/" class="menu-item" >제어솔루션</Link></li> */}
                {/* <li><Link to="/" class="menu-item" >제어사업실적</Link></li> */}
              </div>
            )}
          </li>

          {/* 생산정보시스템 */}
          <li
            onMouseEnter={() => handleMouseEnter('production')}
            onMouseLeave={handleMouseLeave}
          >
            {/* <Link to="/production" className="nav_title">생산정보시스템</Link> */}
            <li><span onClick={() => handleNavigate('Production-Information-System')}            className="nav_title">생산정보시스템</span></li>
            {hoveredMenu === 'production' && (
              <div className="dropdown">
                <li><span onClick={() => handleNavigate('Automation-Solutions')}                  className="menu-item">자동화솔루션</span></li>
                <li><span onClick={() => handleNavigate('Automation-business-performanceRef')}    className="menu-item">자동화사업실적</span></li>
              </div>
            )}
          </li>

          {/* 리쿠르트 */}
          <li
            onMouseEnter={() => handleMouseEnter('recruit')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/recruit" className="nav_title">리쿠르트</Link>
            {hoveredMenu === 'recruit' && (
              <div className="dropdown">
                <li><Link to="/" class="menu-item" >채용안내</Link></li>
                <li><Link to="/" class="menu-item" >복지소개</Link></li>
              </div>
            )}
          </li>

          {/* 고객지원 */}
          <li
            onMouseEnter={() => handleMouseEnter('support')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/support" className="nav_title">고객지원</Link>
            {hoveredMenu === 'support' && (
              <div className="dropdown">
                <li><Link to="/" class="menu-item" >공지사항 / 뉴스</Link></li>
                <li><Link to="/" class="menu-item" >자료실</Link></li>
                <li><Link to="/" class="menu-item" >Q & A</Link></li>
              </div>
            )}
          </li>
        </ul>
      </nav>

      <div className="header-right">
        <span>Login</span>
        <span className="divider">|</span>
        <span>Mobile</span>
      </div>
    </header>
  );
};

export default Header;