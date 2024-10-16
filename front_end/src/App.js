import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/footer/Footer';
import CompanyIntroduction from './components/Body/CompanyIntroduction';
import CompanyGreetings from './components/Body/Companygreetings';

const App = () => {
  return (
    <Router>
      <>
        {/* Header with Navigation */}
        <Header />

        {/* Body Content (Router) */}
        <div className="body-content">
          <Routes>
            <Route path="/" element={<CompanyIntroduction />} />
            <Route path="/greetings" element={<CompanyGreetings />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </>
    </Router>
  );
}

export default App;
