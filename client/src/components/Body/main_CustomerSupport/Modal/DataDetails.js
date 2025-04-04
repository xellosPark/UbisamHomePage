import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCheckCircle} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './DataDetails.css';

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

  const DataDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // 현재 게시글 찾기
    const item = data.find((d) => d.id === Number(id));
  
    if (!item) {
      return <p>Item not found</p>;
    }
  
    // 다음글로 이동하는 함수
    const handleNextClick = () => {
      const currentIndex = data.findIndex((d) => d.id === Number(id));
      const nextItem = data[currentIndex - 1]; // 다음 글을 배열의 이전 항목으로 설정
      if (nextItem) {
        navigate(`/data-room/${nextItem.id}`);
      } else {
        alert("다음 글이 없습니다.");
      }
    };
  
    return (
      <div className="data-detail-container">
        <div className="data-room-header">
          <FaCheckCircle className="check-icon" />
          <h1 className="DataRoom-overview-title">자료실</h1>
        </div>
  
        <div className="data-detail-header">
          <p className="data-detail-title">{item.title}</p>
          <div className="data-detail-info">
            <p>작성자: {item.author}</p>
            <p>날짜: {item.date}</p>
            <p>조회: {item.views}</p>
          </div>
            </div>

            <div className="buttons-container">
                <button className="prev-button">다음글</button>
                <button className="list-button">목록</button>
            </div>

            <div className="content">
                <p>UbiGEM Q&A는 UbiGEM에 대한 궁금한 사항을 정리하여 공유하는 자료입니다.</p>
                <p>이 자료는 추후에 계속 업데이트를 예정이며, UbiGEM을 이용하는 분들에게 매우 유용한 정보가 될 것입니다.</p>
                <p>감사합니다.</p>
            </div>

            <div className="comment-section">
                <h3>댓글목록</h3>
                <p>등록된 댓글이 없습니다.</p>
            </div>

            <div className="data-detail-content">
                {item.content}
            </div>
  
        <div className="button-group">
          <button onClick={handleNextClick} className="next-button">다음글</button>
          <Link to="/data-room" className="back-button">목록</Link>
        </div>
      </div>
    );
  };
  
  export default DataDetails;