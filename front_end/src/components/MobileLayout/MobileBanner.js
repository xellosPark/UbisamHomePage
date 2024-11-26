import React, { useEffect, useState } from "react";
import "./MobileBanner.css";
import mainImg1 from '../../images/image/main_img_01.jpg';
import mainImg2 from '../../images/image/main_img_02.jpg';
import mainImg3 from '../../images/image/main_img_03.jpg';


const MobileBanner = () => {
  const images = [mainImg1, mainImg2, mainImg3]; // 이미지 경로 배열
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 이미지 인덱스를 추적하는 상태

  // 3초마다 이미지 변경을 위한 useEffect
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // 이미지 배열을 순환하며 변경
    }, 3000); // 3초마다 변경

    return () => clearInterval(intervalId); // 컴포넌트가 언마운트될 때 인터벌 정리
  }, []);

  return (
    <div className="mobile-banner">
      <img src={images[currentIndex]} alt="Company Slideshow" className="slide-image" />
      <p>LCD/반도체 장비 제어분야의 선도업체</p>
      <p>(주)유비샘이 함께합니다.</p>
    </div>
  );
};

export default MobileBanner;