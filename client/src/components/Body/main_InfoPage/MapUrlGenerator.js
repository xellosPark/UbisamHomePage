import React, { useState, useEffect } from 'react';
import './MapUrlGenerator.css'; // CSS 파일을 불러옵니다.
import { FaCheckCircle } from 'react-icons/fa'; // 체크 아이콘을 불러옵니다.

const MapUrlGenerator = () => {
    // 가산 A1 타워의 기본 위도와 경도를 상태값으로 정의합니다.
    // const [latitude, setLatitude] = useState(37.480);   // 가산 A1 타워의 위도
    // const [longitude, setLongitude] = useState(126.87791); // 가산 A1 타워의 경도

    //  위치의 위도: 36.15077275876612, 경도: 128.44280770441802
    //  위치의 위도: 36.15054498410671, 경도: 128.4430146408213
    //  위치의 위도: 36.150817269538784, 경도: 128.44285296409822
    //  위치의 위도: 36.15056460907705, 경도: 128.44288166817537
    //  위치의 위도: 36.150689667533236, 경도: 128.44297284770875

  // 파주지사 좌표 (위도, 경도)
  // 클릭한 위치의 위도: 37.8114953726438, 경도: 126.77778280514735
    const pajuLatitude = 37.8114953726438;
    const pajuLongitude = 126.77778280514735;
    const [latitude, setLatitude] = useState(pajuLatitude);   
    const [longitude, setLongitude] = useState(pajuLongitude);

    //  길찾기 URL을 생성하는 함수입니다.
    const generateDirectionUrl = (pharmacyName, lat, lng) => {
        const baseUrl = 'https://map.kakao.com/link/map/';
        const params = `${pharmacyName},${lat},${lng}`;
        const url = `${baseUrl}${encodeURIComponent(params)}`; // 특수 문자를 인코딩하여 URL 생성
        console.log('Generated Direction URL:', url); // 생성된 URL을 로그로 출력
        return url;
    };
    

    // 안전하게 로드뷰 URL을 생성하는 함수입니다.
    const generateRoadViewUrl = (lat, lng) => {
        const baseUrl = 'https://map.kakao.com/link/roadview/'; // 카카오 지도 로드뷰 기본 URL
        const url = `${baseUrl}${lat},${lng}`; // 위도와 경도를 연결하여 로드뷰 URL 생성
        console.log('Generated Road View URL:', url); // 생성된 URL을 로그로 출력
        return url;
    };

    // 버튼 클릭 시 호출되는 함수들
    const openRoadView = () => {
        const url = generateRoadViewUrl(latitude, longitude); // 로드뷰 URL 생성
        window.open(url, '_blank'); // 새 창에서 로드뷰를 엽니다.
    };

    const openDirection = () => {
        const url = generateDirectionUrl('가산W타워', latitude, longitude); // 길찾기 URL 생성
        window.open(url, '_blank'); // 새 창에서 길찾기 지도를 엽니다.
    };

    const openFullMap = () => {
        console.log(`Opening full map for latitude: ${latitude}, longitude: ${longitude}`);
        const url = `https://map.kakao.com/?map_type=TYPE_MAP&from=roughmap&srcid=410499002&itemId=410499002&q=%EA%B0%80%EC%82%B0W%EC%84%BC%ED%84%B0&urlX=473195.0&urlY=1106532.0&urlLevel=3`; // 전체 지도 URL 생성
        window.open(url, '_blank'); // 새 창에서 지도를 엽니다.
    };

    // 카카오 지도 API가 로드된 후에 지도에 클릭 이벤트 리스너를 추가합니다.
    useEffect(() => {
        if (window.kakao && window.kakao.maps) {
            const mapContainer = document.getElementById('map'); // 지도를 표시할 div
            const mapOption = {
                center: new window.kakao.maps.LatLng(latitude, longitude), // 지도의 중심 좌표
                level: 3 // 지도의 확대 레벨
            };
            const map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다.

            // 지도를 클릭하면 클릭한 위치의 위도와 경도를 로그로 출력합니다.
            window.kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
                // 클릭한 위도와 경도를 가져옵니다.
                const latlng = mouseEvent.latLng;

                // 상태값 업데이트
                setLatitude(latlng.getLat());
                setLongitude(latlng.getLng());

                // 위도와 경도를 콘솔에 출력
                console.log(`클릭한 위치의 위도: ${latlng.getLat()}, 경도: ${latlng.getLng()}`);
            });
        }
    }, [latitude, longitude]);

    return (
        <div className="map-url-generator-container">
            {/* 상단 제목과 아이콘 */}
            <div className="map-url-generator-header">
                <FaCheckCircle className="check-icon" /> {/* 체크 아이콘 */}
                <h1 className="map-url-generator-title">위치 및 길찾기</h1>
            </div>

            {/* 지도 표시 영역 */}
            <div id="map" className="map-container" style={{ width: '100%', height: '400px' }}></div>

            {/* 버튼 섹션 */}
            <div className="map-tools">
                <button onClick={openRoadView} className="map-button">
                    로드뷰 보기
                </button>
                <button onClick={openFullMap} className="map-button">
                    지도 크게 보기
                </button>
                <button onClick={openDirection} className="map-button">
                    길찾기
                </button>
            </div>
        </div>
    );
};

export default MapUrlGenerator;
