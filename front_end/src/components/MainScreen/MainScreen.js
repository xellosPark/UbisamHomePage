import React, { useRef, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from '../Header/LoginPage.js';
import CompanyIntroduction from '../Body/main_InfoPage/CompanyIntroduction';
import CompanyGreetings from '../Body/main_InfoPage/Companygreetings';
import BusinessOverview from '../Body/main_InfoPage/BusinessOverview';
import ControlSolution from '../Body/main_Control/ControlSolution';
import ControlBusinessPerformance from '../Body/main_Control/ControlBusinessPerformance';
import CompanyHistory from '../Body/main_InfoPage/CompanyHistory';
import OrganizationIntroduction from '../Body/main_InfoPage/OrganizationIntroduction';
import Patent from '../Body/main_InfoPage/Patent';
import MainCustomer from '../Body/main_InfoPage/MainCustomer';
import ContentWithImages from '../Body/main_InfoPage/ContentWithImages';
import Automationbusinessperformance from '../Body/main-ProductionInformationSystem/Automationbusinessperformance';
import AutomationSolution from '../Body/main-ProductionInformationSystem/AutomationSolution';
import RecruitmentInformation from '../Body/main_Recruitmentinformation/Recruitmentinformation';
import IntroductionToWelfare from '../Body/main_Recruitmentinformation/Introductiontowelfare';
import Notice from '../Body/main_CustomerSupport/Notice';
import DataRoom from '../Body/main_CustomerSupport/DataRoom';
import DataCreateFile from '../Body/main_CustomerSupport/DataCreateFile';
import DataDetail from '../Body/main_CustomerSupport/DataDetails';
import DataCorrection from '../Body/main_CustomerSupport/DataCorrection.js';

const MainScreen = () => {
  const greetingsRef = useRef(null);
  const businessOverviewRef = useRef(null);
  const historyRef = useRef(null);
  const OrganizationIntroductionRef = useRef(null);
  const PatentRef = useRef(null);
  const MainCustomerRef = useRef(null);
  const ContentWithImagesRef = useRef(null);
  const controlSolutionRef = useRef(null);
  const controlBusinessPerformanceRef = useRef(null);
  const AutomationSolutionRef = useRef(null);
  const AutomationbusinessperformanceRef = useRef(null);
  const RecruitmentInformationRef = useRef(null);
  const IntroductiontowelfareRef = useRef(null);
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);  // 경로가 변경되면 다시 false로 설정
    
  }, [location]);

  useEffect(() => {
    if (!isLoaded) {
      setIsLoaded(true);
      //console.log('Current pathname: 위치', location.hash);
      // if (location.hash === '/') {
      //   window.scrollTo({ top: 0, behavior: 'smooth' });
      // } else
      if (location.hash === '#greetings' && greetingsRef.current) {
        greetingsRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (location.hash === '#businessOverview' && businessOverviewRef.current) {
        businessOverviewRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (location.hash === '#history' && historyRef.current) {
        historyRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (location.hash === '#OrganizationIntroduction' && OrganizationIntroductionRef.current) {
        OrganizationIntroductionRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (location.hash === '#Patent' && PatentRef.current) {
        PatentRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (location.hash === '#MainCustomer' && MainCustomerRef.current) {
        MainCustomerRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (location.hash === '#ContentWithImages' && ContentWithImagesRef.current) {
        ContentWithImagesRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (location.hash === '#control-solution' && controlSolutionRef.current) {
        controlSolutionRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (location.hash === '#control-BusinessPerformance' && controlBusinessPerformanceRef.current) {
        controlBusinessPerformanceRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (location.hash === '#Automation-Solutions' && AutomationSolutionRef.current) {
        AutomationSolutionRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (location.hash === '#Automation-business-performanceRef' && AutomationbusinessperformanceRef.current) {
        AutomationbusinessperformanceRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (location.hash === '#Recruitment-Information' && RecruitmentInformationRef.current) {
        RecruitmentInformationRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (location.hash === '#Introductiontowelfare' && IntroductiontowelfareRef.current) {
        IntroductiontowelfareRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [isLoaded, location.hash]);

  return (
    <div className="body-content" style={{ padding: '0px' }}>
      <Routes>
        <Route path="/" element={<CompanyIntroduction />} />
        <Route path="/main" element={<CompanyIntroduction />} />
        <Route path="/greetings" element={<CompanyGreetings />} />
        <Route path="/control-solution" element={<ControlSolution />} />
        <Route path="/Production-Information-System" element={<AutomationSolution />} />
        <Route path="/Recruitment-Information-System" element={<RecruitmentInformation />} />
        <Route path="/support" element={<Notice />} />
        <Route path="/DataRoom" element={<DataRoom />} />
        <Route path="/DataRoom/CreateFile" element={<DataCreateFile />} />
        <Route path="/DataRoom/Detail/:id" element={<DataDetail />} />
        <Route path="/DataRoom/DataCorrection/:id" element={<DataCorrection />} />
        <Route path="/Login" element={<LoginPage />} />
        
      </Routes>

    {/* 경로가 "/"가 아닐 때만 컴포넌트 렌더링 */}
    { location.hash !== '' && 
      ( location.hash === '#greetings' || location.hash === '#businessOverview' || location.hash === '#history' ||
        location.hash === '#OrganizationIntroduction' || location.hash === '#Patent' || location.hash === '#MainCustomer' ||
        location.hash === '#ContentWithImages' ) && (
        <>
          
          {/* 인사말 섹션 */}
          <div ref={greetingsRef} id="greetings" style={{ marginTop: '10px' }}>
            <CompanyGreetings />
          </div>

          {/* 사업개요 섹션 */}
          <div ref={businessOverviewRef} id="businessOverview" style={{ marginTop: '10px' }}>
            <BusinessOverview />
          </div>

          {/* 회사연혁 섹션 */}
          <div ref={historyRef} id="history" style={{ marginTop: '10px' }}>
            <CompanyHistory />
          </div>

          {/* 조직 소개 */}
          <div ref={OrganizationIntroductionRef} id="OrganizationIntroduction" style={{ marginTop: '10px' }}>
            <OrganizationIntroduction />
          </div>
          
          {/* 특허*/}
          <div ref={PatentRef} id="PatentRef" style={{ marginTop: '10px' }}>
            <Patent />
          </div>

          {/* 주요 고객 */}
          <div ref={MainCustomerRef} id="MainCustomer" style={{ marginTop: '10px' }}>
            <MainCustomer />
          </div>

          {/* 찾자오는길 */}
          <div ref={ContentWithImagesRef} id="ContentWithImages" style={{ marginTop: '10px' }}>
            {/* <MapUrlGenerator /> */}
            <ContentWithImages />
          </div>
        </>
      )}
      
      {location.hash !== '' &&
        (location.hash === '#equipment-system' || location.hash === '#control-solution' || location.hash === '#control-BusinessPerformance') && (
          <>
            {/* 제어솔루션 섹션 */}
            <div ref={controlSolutionRef} id="control-solution" style={{ marginTop: '10px' }}>
              <ControlSolution />
            </div>

            {/* 제어 사업 성과 섹션 */}
            <div ref={controlBusinessPerformanceRef} id="control-BusinessPerformance" style={{ marginTop: '10px' }}>
              <ControlBusinessPerformance />
            </div>
          </>
        )}

      {location.hash !== '' &&
        (location.hash === '#Production-Information-System' || location.hash === '#Automation-Solutions' || location.hash === '#Automation-business-performanceRef') 
        && (
          <>
            {/* 자동화 솔루션 */}
            <div ref={AutomationSolutionRef} id="Automation-Solutions" style={{ marginTop: '10px' }}>
              <AutomationSolution />
            </div>

            {/* 자동화 사업 실적 */}
            <div ref={AutomationbusinessperformanceRef} id="Automation-business-performanceRef" style={{ marginTop: '10px' }}>
              <Automationbusinessperformance />
            </div>
          </>
        )}

      {location.hash !== '' &&
          (location.hash === '#Recruitment-Information-System' || location.hash === '#Recruitment-Information' || location.hash === '#Introductiontowelfare') 
          && (
            <>
              {/* 자동화 솔루션 */}
              <div ref={RecruitmentInformationRef} id="Recruitment-Information" style={{ marginTop: '10px' }}>
                <RecruitmentInformation />
              </div>

              {/* 자동화 사업 실적 */}
              <div ref={IntroductiontowelfareRef} id="IntroductiontowelfareRef" style={{ marginTop: '10px' }}>
                <IntroductionToWelfare />
              </div>
            </>
          )}

        {location.hash !== '' &&
          (location.hash === '#Customer-Support-System' || location.hash === '#' || location.hash === '#') 
          && (
            <>
           
            </>
          )}
    </div>
  );
};

export default MainScreen;
