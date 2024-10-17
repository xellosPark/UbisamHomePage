import React, { useState, useEffect } from 'react';
import './CompanyIntroduction.css'; // 슬라이드쇼를 위한 CSS 파일

// 'image' 폴더에서 이미지 가져오기
import mainImg1 from '../../../images/image/main_img_01.jpg';
import mainImg2 from '../../../images/image/main_img_02.jpg';
import mainImg3 from '../../../images/image/main_img_03.jpg';

const images = [mainImg1, mainImg2, mainImg3]; // 이미지 경로 배열

function CompanyIntroduction() {
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 이미지 인덱스를 추적하는 상태

  // 3초마다 이미지 변경을 위한 useEffect
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // 이미지 배열을 순환하며 변경
    }, 3000); // 3초마다 변경

    return () => clearInterval(intervalId); // 컴포넌트가 언마운트될 때 인터벌 정리
  }, []);

  return (
    <div className="slideshow-container">
    <img src={images[currentIndex]} alt="Company Slideshow" className="slide-image" />


    {/* 슬라이드 네비게이션 점 */}
    <div className="dots-container">
      {images.map((_, index) => (
        <span
          key={index}
          className={`dot ${currentIndex === index ? 'active' : ''}`}
        ></span>
      ))}
    </div>
  </div>
  );
}

export default CompanyIntroduction;