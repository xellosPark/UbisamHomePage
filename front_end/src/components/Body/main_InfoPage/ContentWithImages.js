import React, { useEffect } from 'react';
import './ContentWithImages.css'; // CSS 파일 연결
import { FaCheckCircle } from 'react-icons/fa'; // 체크 아이콘

import placeImage1 from '../../../images/image/officer_01.png'; // 본사 이미지
import placeImage2 from '../../../images/image/officer_02.png'; // 구미지사 이미지
import placeImage3 from '../../../images/image/paju.png'; // 파주 출장소 이미지




const ContentWithImages = () => {
  
  // "Top" 버튼을 클릭하면 상단으로 스크롤하는 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0, // 상단으로 스크롤
      behavior: 'smooth' // 스무스 스크롤 동작
    });
  };
  // 본사 좌표 (위도와 경도 값)
  const latitude = 37.47994270316358;
  const longitude = 126.87815592251225;

   // 구미지사 좌표 (위도, 경도)
   // 위치의 위도: 36.15077275876612, 경도: 128.44280770441802
  const gumiLatitude = 36.15054498410671;
  const gumiLongitude = 128.4430146408213;

  // 파주 지사
  const pajuLatitude  = 37.8114953726438;
  const pajuLongitude = 126.77778280514735;

  // Kakao Maps API 로드 후 지도 생성
  useEffect(() => {
    // Kakao Maps API가 로드된 후에 실행되어야 합니다.
    if (window.kakao && window.kakao.maps) {
      const kakaoMaps = window.kakao.maps; // Kakao Maps 객체 불러오기

      // 첫 번째 지도 컨테이너 요소를 찾습니다.
      const container1 = document.getElementById('map1');

      // 지도의 옵션을 설정합니다.
      const options1 = {
        center: new kakaoMaps.LatLng(latitude, longitude), // 본사 위치 (위도, 경도)
        level: 3, // 줌 레벨 설정
      };

      // 첫 번째 지도를 생성합니다.
      const map1 = new kakaoMaps.Map(container1, options1);

      // 마커를 생성하고 지도에 추가합니다.
      const marker1 = new kakaoMaps.Marker({
        position: new kakaoMaps.LatLng(latitude, longitude), // 마커 위치 설정
      });

      marker1.setMap(map1); // 지도에 마커 표시

      // 커스텀 오버레이 내용을 생성합니다.
      const content1 = `
        <div class="customoverlay">
          <span class="title">본사</span>
        </div>
      `;

      // 커스텀 오버레이를 지도에 추가합니다.
      new kakaoMaps.CustomOverlay({
        map: map1, // 오버레이를 표시할 지도
        position: marker1.getPosition(), // 오버레이 위치
        content: content1, // 오버레이에 표시할 내용
      });

      // 첫 번째 지도 컨테이너 요소를 찾습니다.
      const container2 = document.getElementById('map2');

      // 지도의 옵션을 설정합니다.
      const options2 = {
        center: new kakaoMaps.LatLng(gumiLatitude, gumiLongitude), // 구미 위치 (위도, 경도)
        level: 3, // 줌 레벨 설정
      };

      // 첫 번째 지도를 생성합니다.
      const map2 = new kakaoMaps.Map(container2, options2);

      // 마커를 생성하고 지도에 추가합니다.
      const marker2 = new kakaoMaps.Marker({
        position: new kakaoMaps.LatLng(gumiLatitude, gumiLongitude), // 마커 위치 설정
      });

      marker2.setMap(map2); // 지도에 마커 표시

      // 커스텀 오버레이 내용을 생성합니다.
      const content2 = `
        <div class="customoverlay">
          <span class="title">구미지사</span>
        </div>
      `;

      // 커스텀 오버레이를 지도에 추가합니다.
      new kakaoMaps.CustomOverlay({
        map: map2, // 오버레이를 표시할 지도
        position: marker2.getPosition(), // 오버레이 위치
        content: content2, // 오버레이에 표시할 내용
      });

      //파주
      // 첫 번째 지도 컨테이너 요소를 찾습니다.
      const container3 = document.getElementById('map3');

      // 지도의 옵션을 설정합니다.
      const options3 = {
        center: new kakaoMaps.LatLng(pajuLatitude, pajuLongitude), // 구미 위치 (위도, 경도)
        level: 3, // 줌 레벨 설정
      };

      // 첫 번째 지도를 생성합니다.
      const map3 = new kakaoMaps.Map(container3, options3);

      // 마커를 생성하고 지도에 추가합니다.
      const marker3 = new kakaoMaps.Marker({
        position: new kakaoMaps.LatLng(pajuLatitude, pajuLongitude), // 마커 위치 설정
      });

      marker3.setMap(map3); // 지도에 마커 표시

      // 커스텀 오버레이 내용을 생성합니다.
      const content3 = `
        <div class="customoverlay">
          <span class="title">파주지사</span>
        </div>
      `;

      // 커스텀 오버레이를 지도에 추가합니다.
      new kakaoMaps.CustomOverlay({
        map: map3, // 오버레이를 표시할 지도
        position: marker3.getPosition(), // 오버레이 위치
        content: content3, // 오버레이에 표시할 내용
      });
    }
  }, []); // 의존성 배열을 빈 배열로 두어 첫 렌더링 후 한 번만 실행되도록 설정
  
  //로드뷰를 열기 위한 함수
  const openRoadView = () => {
    // 본사 좌표에 대한 로드뷰 URL을 생성합니다.
    const url = `https://map.kakao.com/?map_type=TYPE_MAP&map_attribute=ROADVIEW&panoid=1183968051&pan=276.1&tilt=-5.3&zoom=0&urlLevel=4&urlX=473206&urlY=1105823&q=%EA%B0%80%EC%82%B0%EC%96%B4%EB%B0%98%EC%9B%8C%ED%81%AC1`;
    window.open(url, '_blank'); // 새 창에서 로드뷰 열기
  };

  // 전체 지도를 열기 위한 함수
  const openFullMap = () => {
    // 본사 좌표의 확대된 지도 URL을 생성합니다.
    const url = `https://map.kakao.com/?map_type=TYPE_MAP&from=roughmap&srcid=410499002&itemId=410499002&q=%EA%B0%80%EC%82%B0%EC%96%B4%EB%B0%98%EC%9B%8C%ED%81%AC&urlX=473195.0&urlY=1106532.0&urlLevel=3`;
    window.open(url, '_blank'); // 새 창에서 전체 지도 열기
  };

  // 길찾기 함수를 열기 위한 함수
  const openRoadFinder = () => {
    // 본사 좌표로 길찾기 URL을 생성합니다.
    const url = `https://map.kakao.com/link/to/가산어반워크,${latitude},${longitude}`;
    window.open(url, '_blank'); // 새 창에서 길찾기 열기
  };

  // 로드뷰 URL을 생성하는 함수입니다.
  const generateRoadViewUrl = (lat, lng) => {
    const baseUrl = 'https://map.kakao.com/link/roadview/'; // 카카오 지도 로드뷰 기본 URL
    const url = `${baseUrl}${lat},${lng}`; // 위도와 경도를 연결하여 로드뷰 URL 생성
    console.log('Generated Road View URL:', url); // 생성된 URL을 로그로 출력
    return url;
  };

      //  길찾기 URL을 생성하는 함수입니다.
  const generateDirectionUrl = (pharmacyName, lat, lng) => {
    const baseUrl = 'https://map.kakao.com/link/to/';
    const params = `${pharmacyName},${lat},${lng}`;
    const url = `${baseUrl}${encodeURIComponent(params)}`; // 특수 문자를 인코딩하여 URL 생성
    console.log('Generated Direction URL:', url); // 생성된 URL을 로그로 출력
    return url;
  };

  const generateFullMapUrl = (placeName, lat, lng) => {
    const baseUrl = 'https://map.kakao.com/link/map/'; // 카카오 지도 기본 URL
    const params = `${placeName},${lat},${lng}`; // 장소 이름, 위도, 경도를 포함한 파라미터
    const url = `${baseUrl}${encodeURIComponent(params)}`; // 특수 문자를 인코딩하여 URL 생성, 줌 레벨 추가
    console.log('Generated Full Map URL:', url); // 생성된 URL을 로그로 출력
    return url;
};

  //구미 로드뷰를 열기 위한 함수
  const gumiopenRoadView = () => {
    const url = generateRoadViewUrl(gumiLatitude, gumiLongitude); // 로드뷰 URL 생성
        window.open(url, '_blank'); // 새 창에서 로드뷰를 엽니다.
  };

  // 전체 지도를 여는 함수 (단순 지도 표시).
const gumiopenFullMap = () => {
  const url = generateFullMapUrl('구미유비샘', gumiLatitude, gumiLongitude); // 전체 지도 URL 생성
  window.open(url, '_blank'); // 새 창에서 전체 지도를 엽니다.
};

  // 길찾기 함수를 열기 위한 함수
  const gumiopenRoadFinder = () => {
    // 본사 좌표로 길찾기 URL을 생성합니다.
    const url = generateDirectionUrl('구미유비샘', gumiLatitude, gumiLongitude); // 길찾기 URL 생성
    window.open(url, '_blank'); // 새 창에서 길찾기 열기
  };

  //파주 로드뷰를 열기 위한 함수
  const pajuopenRoadView = () => {
    const url = generateRoadViewUrl(pajuLatitude, pajuLongitude); // 로드뷰 URL 생성
        window.open(url, '_blank'); // 새 창에서 로드뷰를 엽니다.
  };

  // 전체 지도를 여는 함수 (단순 지도 표시).
const pajuopenFullMap = () => {
  const url = generateFullMapUrl('파주유비샘', pajuLatitude, pajuLongitude); // 전체 지도 URL 생성
  window.open(url, '_blank'); // 새 창에서 전체 지도를 엽니다.
};

  // 길찾기 함수를 열기 위한 함수
  const pajuopenRoadFinder = () => {
    // 본사 좌표로 길찾기 URL을 생성합니다.
    const url = generateDirectionUrl('파주유비샘', pajuLatitude, pajuLongitude); // 길찾기 URL 생성
    window.open(url, '_blank'); // 새 창에서 길찾기 열기
  };

  return (
    <div className="content-overview-container">
      {/* 상단 타이틀 및 인사말 */}
      <div className="content-overview-header">
        <FaCheckCircle className="check-icon" /> {/* 체크 아이콘 */}
        <h1 className="content-overview-title">찾아오시는길</h1>
        <button className="top-link" onClick={scrollToTop}>Top</button> {/* "Top" 버튼 클릭 시 scrollToTop 함수 호출 */}
      </div>

      {/* 콘텐츠 영역 (이미지와 카카오 지도) */}
      <div className="content-grid">
        {/* 첫 번째 장소와 지도 */}
        <div className="content-item">
          <img src={placeImage1} alt="Place 1" className="place-image" />
          <p>본사 : 서울시 금천구 가산디지털1로 135 가산어반워크1 1321~1322호</p>
          <p>TEL : 02-6265-8877~8</p>
        </div>
        <div className="content-item">
          {/* 지도 영역 */}
          <div id="map1" className="map-container"></div>
          <div className="map-tools">
            <span className="tool-label">kakaomap</span>
            <div className="map-subbut">
              <button onClick={openRoadView}>로드뷰</button> {/* 로드뷰를 여는 버튼 */}
              <button onClick={openFullMap}>지도크게보기</button> {/* 전체 지도를 여는 버튼 */}
              <button onClick={openRoadFinder}>길찾기</button> {/* 길찾기를 여는 버튼 */}
            </div>
          </div>
        </div>

        {/* 두 번째 장소와 지도 */}
        <div className="content-item">
          <img src={placeImage2} alt="Place 2" className="place-image" />
          <p>구미지사 : 경북 구미시 산동면 첨단기업7로 98-12</p>
          <p>TEL : 054-476-6631</p>
        </div>
        <div className="content-item">
          {/* 지도 영역 */}
          <div id="map2" className="map-Gumicontainer"></div>
          <div className="map-tools">
            <span className="tool-label">kakaomap</span>
            <div className="map-subbut">
              <button onClick={gumiopenRoadView}>로드뷰</button> {/* 로드뷰를 여는 버튼 */}
              <button onClick={gumiopenFullMap}>지도크게보기</button> {/* 전체 지도를 여는 버튼 */}
              <button onClick={gumiopenRoadFinder}>길찾기</button> {/* 길찾기를 여는 버튼 */}
            </div>
          </div>
        </div>

        {/* 세 번째 장소와 지도 */}
        <div className="content-item">
          <img src={placeImage3} alt="Place 3" className="place-image" />
          <p>경기도 파주시 월롱면 엘씨디로 6 206호</p>
        </div>
        <div className="content-item">
          {/* 지도 영역 */}
          <div id="map3" className="map-pajucontainer"></div>
          <div className="map-tools">
            <span className="tool-label">kakaomap</span>
            <div className="map-subbut">
              <button onClick={pajuopenRoadView}>로드뷰</button> {/* 로드뷰를 여는 버튼 */}
              <button onClick={pajuopenFullMap}>지도크게보기</button> {/* 전체 지도를 여는 버튼 */}
              <button onClick={pajuopenRoadFinder}>길찾기</button> {/* 길찾기를 여는 버튼 */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentWithImages;
