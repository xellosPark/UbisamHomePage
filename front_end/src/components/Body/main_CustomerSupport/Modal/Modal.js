import React from 'react';
import './Modal.css';

const Modal = ({ item, closeModal }) => {
  if (!item) return null;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{item.title}</h2>
        <p>작성자: {item.author}</p>
        <p>날짜: {item.date}</p>
        <p>조회수: {item.views}</p>
        <p>다운로드 및 기타 정보는 여기에 표시됩니다.</p>
        <button onClick={closeModal}>닫기</button>
      </div>
    </div>
  );
};

export default Modal;