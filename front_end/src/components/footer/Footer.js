import React from 'react';
import './Footer.css';
import logoGray from '../../images/icon/ubisamlogoGray.png';
import qr from '../../images/image/qr.gif'

const Footer = () => {
  return (
    <footer className="footer">
      {/* 네비게이션 링크 섹션 */}
      <div className="footer-nav">
        <ul>
          <li><a href="/">회사소개</a></li>
          <div className="separator"></div>
          <li><a href="/equipment">장비제어시스템</a></li>
          <div className="separator"></div>
          <li><a href="/production">생산정보시스템</a></li>
          <div className="separator"></div>
          <li><a href="/recruit">리쿠르트</a></li>
          <div className="separator"></div>
          <li><a href="/support">고객지원</a></li>
        </ul>
      </div>

      {/* 회사 정보 섹션 */}
      <div className="footer-content">
        <img src={logoGray} alt="Company Logo" className="footer-logo" />
        
        <div className="footer-left">
          <p>
            서울본사: 서울시 금천구 가산디지털1로 205-27, 가산에이 1 타워 427-429호 <br />
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
