import React from 'react';
import './CompanyHistory.css'; // Ensure the CSS file is connected
import { FaCheckCircle } from 'react-icons/fa';

const companyHistory = [
  {
    year: "2017",
    events: [
      "장비 제어 소프트웨어 개발 프레임워크 'mcFramework' 개발"
    ],
    active: true
  },
  {
    year: "2016",
    events: [
      "2차전지 화성공정라인 해외 사업 진출(중국)",
      "구미 지사 확장이전"
    ],
    active: false
  },
  {
    year: "2015",
    events: [
      "2차전지 화성공정 자동화 시스템개발",
      "O2O 예약관리 Mobile Web Application 개발"
    ],
    active: true
  },
  {
    year: "2013",
    events: [
      "LG전자 생산성기술연구원 설비 협력회 회원 등록"
    ],
    active: false
  },
  {
    year: "2012",
    events: [
      "일자리 창출 우수기업 인증 (서울특별시장)",
      "중소기업청 기술혁신개발사업 수행 “다채널 블랙박스를 활용한 클라우드 기반 차량 원격감시제어 모니터링 시스템”"
    ],
    active: true
  },
  {
    year: "2011",
    events: [
      "우수 벤처 기업인상 수상(중소기업청장)",
      "반도체장비 제어용 통신 솔루션 개발 'UbiCom' (SECS Driver)"
    ],
    active: false
  },
  {
    year: "2010",
    events: [
      "이노비즈 인증",
      "명지전문대학 산학협력업체 선정"
    ],
    active: false
  },
  {
    year: "2008",
    events: [
      "LGCNS 장비제어 특화업체 선정"
    ],
    active: true
  },
  {
    year: "2007",
    events: [
      "벤처 인증 (2010년, 2012년 갱신)",
      "㈜유비샘 기술연구소 설립"
    ],
    active: false
  },
  {
    year: "2006",
    events: [
      "㈜유비샘 법인 전환",
      "한국전력기술주식회사(KOPEC) 업체 등록",
      "소프트웨어 업체 인증(2010년 갱신)"
    ],
    active: true
  },
  {
    year: "2003",
    events: [
      "LG전자 생산성기술연구원 장비제어 협력업체 선정"
    ],
    active: true
  },
  {
    year: "2002",
    events: [
      "(주)샘텍 설립"
    ],
    active: true
  }
];

const scrollToTop = () => {
  window.scrollTo({
    top: 0, // Scroll to the top
    behavior: 'smooth' // Smooth scroll behavior
  });
};

const CompanyHistory = () => {
  return (
    <div className="history-container">
      <div className="history-header">
        <FaCheckCircle className="check-icon" /> {/* 체크 아이콘 */}
        <h1 className="history-title">회사연혁</h1>
        <button className="top-link" onClick={scrollToTop}>Top</button> {/* "Top" 버튼 클릭 시 scrollToTop 함수 호출 */} 
      </div>
      <div className="timeline">
        {companyHistory.map((item, index) => (
          <div key={index} className="year-section">
            {/* 연도와 말풍선 모양 적용 */}
            <div className="year-circle">
              <span className="year">{item.year}</span>
            </div>
            {/* 이벤트 내용 출력 */}
            <div className="events">
              {item.events.map((event, eventIndex) => (
                <p key={eventIndex}>{event}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyHistory;
