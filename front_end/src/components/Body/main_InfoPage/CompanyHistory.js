import React from 'react';
import './CompanyHistory.css'; // 스타일 연결

const CompanyHistory = () => {
  return (
    <div className="history-container">
      <h1 className="history-title">Company History</h1>
      <div className="timeline">
        <div className="year-section">
          <div className="year">2017</div>
          <ul className="events">
            <li>Development of equipment control software framework 'mcframework'</li>
          </ul>
        </div>
        <div className="year-section">
          <div className="year">2016</div>
          <ul className="events">
            <li>2nd phase of Hwaseong plant overseas business expansion (China)</li>
            <li>Establishment of Gumi branch office</li>
          </ul>
        </div>
        <div className="year-section">
          <div className="year">2015</div>
          <ul className="events">
            <li>Development of automatic logistics system for 2nd phase Hwaseong plant</li>
            <li>Development of O2O reservation mobile web application</li>
          </ul>
        </div>
        <div className="year-section">
          <div className="year">2013</div>
          <ul className="events">
            <li>LG Electronics designated as a cooperative company of the production technology research institute</li>
          </ul>
        </div>
        <div className="year-section">
          <div className="year">2012</div>
          <ul className="events">
            <li>Selected as Seoul Mayor’s Award for Excellence</li>
            <li>Smart remote control system for 4ch hybrid black box developed</li>
          </ul>
        </div>
        <div className="year-section">
          <div className="year">2011</div>
          <ul className="events">
            <li>Received the award for outstanding venture business</li>
            <li>Development of SECS Driver</li>
          </ul>
        </div>
        <div className="year-section">
          <div className="year">2010</div>
          <ul className="events">
            <li>Winner of the excellent venture business award</li>
          </ul>
        </div>
        <div className="year-section">
          <div className="year">2007</div>
          <ul className="events">
            <li>Patent certification for technology related to LCD equipment control</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CompanyHistory;