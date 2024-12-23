import React from 'react';
import './Footer.css';
import logoGray from '../../images/icon/ubisamlogoGray.png';
import qr from '../../images/image/qr.gif'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      {/* 네비게이션 링크 섹션 */}
      <div className="footer-nav">
        <Link to="/#greetings" className="footer-nav-link">회사소개</Link>
        <div className="separator"></div>
        <Link to="/#control-solution" className="footer-nav-link">장비제어시스템</Link>
        <div className="separator"></div>
        <Link to="/#Automation-Solutions" className="footer-nav-link">생산정보시스템</Link>
        <div className="separator"></div>
        <Link to="/#Recruitment-Information" className="footer-nav-link">채용정보</Link>
        <div className="separator"></div>
        <Link to="/support" className="footer-nav-link">고객지원</Link>
      </div>
      

      {/* 회사 정보 섹션 */}
      <div className="footer-content">
        <img src={logoGray} alt="Company Logo" className="footer-logo" />
        
        <div className="footer-left">
          <p>
            서울본사: 서울시 금천구 가산디지털1로 135 가산어반워크1 1321~1322호 <br />
            구미지사: 경북 구미시 산동면 첨단기업7로 98-12
          </p>
        </div>
        <div className="footer-right">
          <div className="contact-info">
            <div className="contact-row">
              <span>Tel: 02-6265-8877~8</span>
              <span>Fax: 02-6265-8879</span>
            </div>
            <div className="contact-row">
              <span>Tel: 054-476-6631</span>
              <span>Fax: 054-476-6632</span>
            </div>
          </div>
        </div>
        <img src={qr} alt="QR Code" className="qr-code" />
      </div>

      {/* 저작권 정보 */}
      <div className="footer-bottom">
        <p>www.UBISAM. All rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
