import React, { useRef, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import DataDetails from '../Body/main_CustomerSupport/Modal/DataDetails';

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
    setIsLoaded(false);
  }, [location]);

  useEffect(() => {
    if (!isLoaded) {
      setIsLoaded(true);
      if (location.hash === '#greeting') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (location.hash === '#greetings' && greetingsRef.current) {
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
        <Route path="/data-room/:id" element={<DataDetails />} />
      </Routes>
    </div>
  );
};

export default MainScreen;
