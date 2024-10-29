import React, { useState } from 'react';
import './DataRoom.css';
import { FaCheckCircle, FaHeart, FaFileAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DataRoom = () => {
  // Sample data for the table

  const data = [
    { id: 8, title: 'UbiGEM Q&A', author: '최고관리자', date: '05-24', views: 1133 },
    { id: 7, title: 'UbiGEM.PAC 설치 파일', author: '최고관리자', date: '01-12', views: 1241 },
    { id: 6, title: 'UbiGEM SECS/GEM Driver 설치 파일', author: '최고관리자', date: '06-10', views: 8959 },
    { id: 5, title: 'MCFramework Scribe Demo : Digital Twin [YouTube]', author: '최고관리자', date: '08-20', views: 3673 },
    { id: 4, title: 'MCFramework Installation', author: '최고관리자', date: '02-21', views: 3779 },
    { id: 3, title: 'MCFramework PT', author: '최고관리자', date: '02-06', views: 3691 },
    { id: 2, title: 'MCFramework Demo [YouTube]', author: '최고관리자', date: '01-22', views: 3550 },
    { id: 1, title: 'Battery Formation Line [YouTube]', author: '최고관리자', date: '01-22', views: 3885 },
  ];


  return (
    <div className="data-room-container">
        <div className="data-room-header">
            <FaCheckCircle className="check-icon" />
            <h1 className="DataRoom-overview-title">자료실</h1>
        </div>
        <div className="table-info">
            Total <strong>{data.length}</strong>건 1 페이지
        </div>
        <table className="data-table">
            <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>글쓴이</th>
                    <th>날짜</th>
                    <th>조회</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>
                            <Link to={`/data-room/${item.id}`}>
                                {item.title} <FaHeart className="heart-icon" /> <FaFileAlt className="file-icon" />
                            </Link>
                        </td>
                        <td>{item.author}</td>
                        <td>{item.date}</td>
                        <td>{item.views}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
};

export default DataRoom;