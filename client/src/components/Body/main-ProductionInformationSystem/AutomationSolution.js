import React from 'react';
import './AutomationSolution.css'; // CSS 파일 임포트
import { FaCheckCircle } from 'react-icons/fa';
import step1Image from '../../../images/image/04_01.png';

const AutomationSolution = () => {
    return (
        <div>
            <div className="automation-solution-overview-container">
                <div className="automation-solution-overview-header">
                    <FaCheckCircle className="check-icon" />
                    <h1 className="business-overview-title">자동화솔루션</h1>
                    <button className="top-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        Top
                    </button> {/* "Top" 버튼 클릭 시 스크롤 위로 */}
                </div>
            </div>


            <div className="content-layout">
                <div className="top-section">
                    <h2>
                        자동화솔루션 - <span className="small-text"> Factory Automation Solutions </span>
                    </h2>
                    <p> 장비 제어에서 호스트 통신까지 공장 자동화를 위한 토탈 솔루션 </p>
                </div>

                <div className="top-section">
                    <h2>
                        ubiCMS  - <span className="small-text"> Cluster type Manufacturing System </span>
                    </h2>
                    <p> Cluster 형태 공정의 장비 운영 통합 솔루션 </p>
                </div>

                <div className="top-section">
                    <h2>
                        ubiFMS  - <span className="small-text"> Flexible Manufacturing System </span>
                    </h2>
                    <p> Line 형태의 복합 공정의 장비 제어 및 운영을 위한 유연 제조 솔루션 </p>
                </div>

                <div className="top-section">
                    <h2>
                        ubiFMS-B  - <span className="small-text"> Flexible Manufacturing System for Battery line </span>
                    </h2>
                    <p> Battery/Cell Formation 라인에 특화된 통합 제어용 솔루션 </p>
                </div>
                <div className="top-section">
                    <ul >
                        <li>Battery Formation 공정의 Full Automation Control</li>
                        <li>표준화된 공정 운영 방안과 설비 인터페이스</li>
                        <li>확장을 고려한 설계로 개발 범위를 최소화</li>
                        <li>원통형, 파우치 등 다양한 Battery의 공정에 적용 가능</li>
                        <li>Multi Model / Multi Route(Flow) 관리 기능</li>
                    </ul>
                </div>

                <div className="framework-section">
                    <h3><span className="red-symbol">▨</span> Conceptual image</h3>
                    <img src={step1Image} alt="mcFramework-system-image2" className="framework-image" />
                    <ul>
                        <li> Flexible route </li>
                        <li> Logistics management </li>
                        <li> Recipe control </li>
                        <li> Processing scheduler </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AutomationSolution;
