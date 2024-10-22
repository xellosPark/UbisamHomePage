import React from 'react';
import './OrganizationIntroduction.css'; // CSS 파일 연결
import { FaCheckCircle } from 'react-icons/fa'; // 체크 아이콘을 위해 react-icons 패키지 사용
import MapImage from '../../../images/image/Map-jojic.png';
import organizationImage from '../../../images/image/jojic_s.png';

const OrganizationIntroduction = () => {
  // "Top" 버튼 클릭 시 스크롤을 맨 위로 이동하는 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0, // 최상단으로 스크롤
      behavior: 'smooth' // 부드러운 스크롤 동작
    });
  };

  return (
    <div className="organization-overview-container">
      {/* 상단 인사말 */}
      <div className="organization-overview-header">
        <FaCheckCircle className="check-icon" /> {/* 체크 아이콘 */}
        <h1 className="organization-overview-title">조직 소개</h1>
        <button className="top-link" onClick={scrollToTop}>Top</button> {/* "Top" 버튼 클릭 시 scrollToTop 함수 호출 */}
      </div>

      {/* 조직 소개 내용 */}
      {/* 이미지 두 개를 함께 보여주는 섹션 */}
      <div className="organization-overview-content">
        <img src={MapImage} alt="Map Overview" className="MapImage-image" /> {/* 첫 번째 이미지 */}
        <img src={organizationImage} alt="Organization Overview" className="organization-image" /> {/* 두 번째 이미지 */}
      </div>
    </div>
  );
};

export default OrganizationIntroduction;