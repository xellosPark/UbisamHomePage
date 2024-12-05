
import { Link, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaHeart, FaFileAlt } from 'react-icons/fa';
import './DataRoom.css';

import React, { useState, useRef } from "react";

const initialData = [
    { id: 8, title: 'UbiGEM Q&A', author: '최고관리자', date: '05-24', views: 1133 },
    { id: 7, title: 'UbiGEM.PAC 설치 파일', author: '최고관리자', date: '01-12', views: 1241 },
    { id: 6, title: 'UbiGEM SECS/GEM Driver 설치 파일', author: '최고관리자', date: '06-10', views: 8959 },
    { id: 5, title: 'MCFramework Scribe Demo : Digital Twin [YouTube]', author: '최고관리자', date: '08-20', views: 3673 },
    { id: 4, title: 'MCFramework Installation', author: '최고관리자', date: '02-21', views: 3779 },
    { id: 3, title: 'MCFramework PT', author: '최고관리자', date: '02-06', views: 3691 },
    { id: 2, title: 'MCFramework Demo [YouTube]', author: '최고관리자', date: '01-22', views: 3550 },
    { id: 1, title: 'Battery Formation Line [YouTube]', author: '최고관리자', date: '01-22', views: 3885 },
];


const DataRoom = () => {
    const navigate = useNavigate();
    const [columnWidths, setColumnWidths] = useState({ id: 50, title: 200, author: 100, date: 100, views: 100 });
    
    const handleRowClick = (item) => {
        // Navigate to the detail page with the item ID
        navigate(`/DataRoom/Detail/${item.id}`, { state: { item } });
      };

    const sortedData = initialData.sort((a, b) => a.id - b.id);

    return (
        <div className="data-room-container">
            <div className="data-room-header">
                <h1 className="DataRoom-overview-title">자료실</h1>
                <Link to="/DataRoom/CreateFile" className="add-dataroom-button">
                    + 자료 추가
                </Link>
            </div>
           
            <table className="data-table">
            <thead>
          <tr>
            <th style={{ width: "50px" }}>ID</th>
            <th style={{ width: "200px" }}>제목</th>
            <th style={{ width: "100px" }}>작성자</th>
            <th style={{ width: "100px" }}>날짜</th>
            <th style={{ width: "100px" }}>조회수</th>
          </tr>
        </thead>
                <tbody>
                    {sortedData.map((item) => (
                        <tr key={item.id} onClick={() => handleRowClick(item)} className="clickable-row">
                            <td style={{ width: columnWidths.id }}>{item.id}</td>
                            <td style={{ width: columnWidths.title }}>{item.title}</td>
                            <td style={{ width: columnWidths.author }}>{item.author}</td>
                            <td style={{ width: columnWidths.date }}>{item.date}</td>
                            <td style={{ width: columnWidths.views }}>{item.views}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataRoom;