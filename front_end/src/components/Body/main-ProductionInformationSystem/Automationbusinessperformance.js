import { FaCheckCircle } from 'react-icons/fa';
import './Automationbusinessperformance.css'; // CSS 파일 임포트
const Automationbusinessperformance = () => {

    
    return (
        <div className="Automation-business-overview-container">
            <div className="Automation-business-overview-header">
                <FaCheckCircle className="check-icon" />
                <h1 className="Automation-overview-title">자동화 사업 실적</h1>
                <button className="top-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    Top
                </button> {/* "Top" 버튼 클릭 시 스크롤 위로 */}
            </div>


            <div className="content-layout">
                <div className="top-section">
                    <h2> 자동화 사업 실적 </h2>
                    <p> CIM/EES/MES/RMS 등 제조 현장의 정보화 및 자동화 사업 실적 다수 보유 </p>
                </div>

                <div className="top-section">
                    <h2> CIM/MES/RMS </h2>
                    <p> 단위 공정, 복합 공정, 라인 통합 등 다양한 범위의 생산 효율화 시스템 구축 </p>
                    <ul>
                        <li>Wafer Lap washer CIM 구축</li>
                        <li>S사 신공장 MES 구축</li>
                        <li>S사 wafer장비 CIM 표준화</li>
                        <li>S사 신공장 RMS 구축</li>
                        <li>그 외 다양한 제조 현장에 수십 종의 MES, RMS 수행 경험 보유<br></br>
                        LED / V-LED / OLED / TFT / CF / MD / CM / PKG / PM / TSP / TW / TM / ARY / FAB / INV / EV / Car …</li>
                    </ul>
                </div>

                <div className="top-section">
                    <h2> Host(MES/ERP/SCM/RMS) interface </h2>
                    <p> 장비와 호스트 사이의 단방향, 양방향 제어 및 정보 interface 시스템 구축 </p>
                    <ul>
                        <li>광학 FOL 인라인 EIF 구축</li>
                        <li>오븐 LCSF 구축</li>
                        <li>PKG 온라인 EIF 구축</li>
                        <li>LED 온라인 ECS 구축</li>
                        <li>PKG RMS 대응 ECS 구축</li>
                        <li>LCD ROS 호환 ECS 구축</li>
                        <li>다양한 공정 및 시스템에 대한 EES 영역에서 시스템 구축 경험 보유</li>
                    </ul>
                </div>

                <div className="top-section">
                    <h2> Battery 제조 자동화 사업 </h2>
                    <p> Battery formation 라인 완전 자동화 시스템 구축 </p>
                    <ul>
                        <li>원통형 18650 200~300K 셀/일 풀 자동화 시스템 구축 (2015년부터 5개 라인)</li>
                        <li>원통형 21700 1M 셀/일 풀 자동화 시스템 구축 (2017년)</li>
                        <li>파우치 30K 셀/일 풀 자동화 시스템 구축 (2016년)</li>
                    </ul>
                </div>

                <div className="top-section">
                    <h2> 기타 시스템 구축 </h2>
                    <br></br>
                    <ul>
                        <li>이미지 비주얼 편집기</li>
                        <li>검사기용 가상 공정 시스템</li>
                        <li>검사 불량 탐색기</li>
                        <li>라인 모니터링 시스템</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Automationbusinessperformance;
