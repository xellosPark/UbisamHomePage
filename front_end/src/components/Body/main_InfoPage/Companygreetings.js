import React from 'react';
import './Companygreetings.css';
import { FaCheckCircle } from 'react-icons/fa'; // 아이콘 사용을 위해 react-icons 패키지 사용
import companyImage from '../../../images/image/intro_img.png'

const CompanyGreetings = () => {

    const scrollToTop = () => {
        window.scrollTo({
          top: 0, // Scroll to the top
          behavior: 'smooth' // Smooth scroll behavior
        });
      };
    
    return (
        <div className="company-greetings-container">
            <div className="company-greetings-header">
                <FaCheckCircle className="check-icon" /> {/* 체크 아이콘 */}
                <h1 className="company-greetings-title">인사말</h1>
                 {/* href="#top" 삭제하고 onClick만 사용 */}
                 <button className="top-link" onClick={scrollToTop}>Top</button> {/* "Top" 버튼 클릭 시 scrollToTop 함수 호출 */} 
            </div>
            <div className="company-greetings-content">
                <img src={companyImage} alt="Company Building" className="company-greetings-image" />
                <div className="greetings-text">
                    <p className="greetings-intro">앞서가는 기술력과 노하우!</p>
                    <h2 className="greetings-highlight"><strong>"유비샘"</strong>이 함께 하겠습니다.</h2>
                    <p>
                        (주)유비샘을 찾아주셔서 감사합니다.
                    </p>
                    <p>
                        유비샘은 1980년대 중반부터 설비와 공정관리 분야의 SI사업,
                        Embedded program 및 다양한 HMI, 자동화 장비 제어 등 충분한 경험을 보유한
                        <strong>자동화 시스템 개발 전문 기업</strong>입니다.
                    </p>
                    <p>
                        우리는 지난 수년간 반도체, LED, LCD, OLED 등의 하이테크 제조 시장과 함께 성장하였습니다.
                    </p>
                    <p>
                        그동안 많은 시행착오와 도전의 노력으로 확보한 차별화된 기술력과 노하우를 바탕으로
                        고객의 더 큰 성공과 더 높은 가치 창출을 향해 <strong>오늘도 도전하는 회사</strong>입니다.
                    </p>
                    <p>
                        유비샘은 작지만 강한 회사로 성장하여 직원 개개인의 이상과 꿈을 실현할 수 있는 회사를 지향하고 있습니다.
                    </p>
                    <p>
                        구성원들의 미래 가치를 회사의 가치에 근본을 두고 이해하며, 그에 따른 미래전략을 구상하며
                        <strong>구성원들과 함께 달성</strong>하려고 노력하고 있습니다.
                    </p>
                    <p>
                        저희 유비샘의 구성원 모두는 고객님들과 같은 목표를 향해 끊임없는 노력으로
                        industry 4.0 시대를 선도하는 세계적인 기업으로 <strong>함께 성장</strong>하겠습니다.
                    </p>
                    <p className="ceo-signature"><strong>대표이사</strong> 박진갑</p>
                </div>
            </div>
        </div>
    );
};

export default CompanyGreetings;
