import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';

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
        <footer className="footer">
          <p>© 2024 Company Mart. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
