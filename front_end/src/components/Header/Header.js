import React, { useState } from 'react'; // Import useState for managing hover state
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../images/icon/ubisamlogo.png';

const Header = () => {
  // State to track which menu is being hovered
  const [hoveredMenu, setHoveredMenu] = useState(null);

  // Function to handle mouse entering a menu item
  const handleMouseEnter = (menu) => {
    setHoveredMenu(menu);
  };

  // Function to handle mouse leaving a menu item
  const handleMouseLeave = () => {
    setHoveredMenu(null); // Reset to null when the mouse leaves
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <img src={logo} alt="UbiSam Logo" className="logo-img" />
        </div>
      </div>

      <nav className="nav">
        <ul>
          {/* 회사소개 */}
          <li
            onMouseEnter={() => handleMouseEnter('company')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/" className="nav_title" >회사소개</Link>
            {hoveredMenu === 'company' && (
              <div class="dropdown">
                <li><a href="/" class="menu-item">인사말</a></li>
                <li><a href="/" class="menu-item">사업개요</a></li>
                <li><a href="/" class="menu-item">회사연혁</a></li>
                <li><a href="/" class="menu-item">조직소개</a></li>
                <li><a href="/" class="menu-item">특허</a></li>
                <li><a href="/" class="menu-item">주요고객</a></li>
                <li><a href="/" class="menu-item">찾아오시는길</a></li>
              </div>
            )}
          </li>

          {/* 장비제어시스템 */}
          <li
            onMouseEnter={() => handleMouseEnter('equipment')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/equipment" className="nav_title" >장비제어시스템</Link>
            {hoveredMenu === 'equipment' && (
              <div class="dropdown">
                <li><Link to="/" class="menu-item" >제어솔루션</Link></li>
                <li><Link to="/" class="menu-item" >제어사업실적</Link></li>
              </div>
            )}
          </li>

          {/* 생산정보시스템 */}
          <li
            onMouseEnter={() => handleMouseEnter('production')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/production" className="nav_title">생산정보시스템</Link>
            {hoveredMenu === 'production' && (
              <div className="dropdown">
                <li><Link to="/" class="menu-item" >자동화솔루션</Link></li>
                <li><Link to="/" class="menu-item" >자동화사업실적</Link></li>
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