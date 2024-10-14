import React, { useState } from 'react'; // Import useState for managing hover state
import { Link } from 'react-router-dom';
import './Header.css';

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
          <img src="/path-to-logo" alt="UbiSam Logo" className="logo-img" />
          UbiSam
        </div>
      </div>

      <nav className="nav">
        <ul>
          {/* 회사소개 */}
          <li
            onMouseEnter={() => handleMouseEnter('company')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/">회사소개</Link>
            {hoveredMenu === 'company' && (
              <ul className="dropdown">
                <li><Link to="/">인사말</Link></li>
                <li><Link to="/">사업개요</Link></li>
                <li><Link to="/">회사연혁</Link></li>
                <li><Link to="/">조직소개</Link></li>
                <li><Link to="/">특허</Link></li>
                <li><Link to="/">주요고객</Link></li>
                <li><Link to="/">찾아오시는길</Link></li>
              </ul>
            )}
          </li>

          {/* 장비제어시스템 */}
          <li
            onMouseEnter={() => handleMouseEnter('equipment')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/equipment">장비제어시스템</Link>
            {hoveredMenu === 'equipment' && (
              <ul className="dropdown">
                <li><Link to="/">제어솔루션</Link></li>
                <li><Link to="/">제어사업실적</Link></li>
              </ul>
            )}
          </li>

          {/* 생산정보시스템 */}
          <li
            onMouseEnter={() => handleMouseEnter('production')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/production">생산정보시스템</Link>
            {hoveredMenu === 'production' && (
              <ul className="dropdown">
                <li><Link to="/">자동화솔루션</Link></li>
                <li><Link to="/">자동화사업실적</Link></li>
              </ul>
            )}
          </li>

          {/* 리쿠르트 */}
          <li
            onMouseEnter={() => handleMouseEnter('recruit')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/recruit">리쿠르트</Link>
            {hoveredMenu === 'recruit' && (
              <ul className="dropdown">
                <li><Link to="/">채용안내</Link></li>
                <li><Link to="/">복지소개</Link></li>
              </ul>
            )}
          </li>

          {/* 고객지원 */}
          <li
            onMouseEnter={() => handleMouseEnter('support')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/support">고객지원</Link>
            {hoveredMenu === 'support' && (
              <ul className="dropdown">
                <li><Link to="/">공지사항 / 뉴스</Link></li>
                <li><Link to="/">자료실</Link></li>
                <li><Link to="/">Q & A</Link></li>
              </ul>
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