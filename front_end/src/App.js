import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';
import Footer from './components/footer/Footer';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Header with Navigation */}
        <Header />

        {/* Body Content (Router) */}
        <div className="body-content">
       
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
