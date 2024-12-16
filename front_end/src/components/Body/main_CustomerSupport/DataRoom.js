import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSave } from "react-icons/fa"; // 디스크 모양 아이콘 가져오기
import axios from "axios";
import "./DataRoom.css";

// const initialData = [
//     { id: 8, title: 'UbiGEM Q&A', author: '최고관리자', date: '05-24', views: 1133 },
//     { id: 7, title: 'UbiGEM.PAC 설치 파일', author: '최고관리자', date: '01-12', views: 1241 },
//     { id: 6, title: 'UbiGEM SECS/GEM Driver 설치 파일', author: '최고관리자', date: '06-10', views: 8959 },
//     { id: 5, title: 'MCFramework Scribe Demo : Digital Twin [YouTube]', author: '최고관리자', date: '08-20', views: 3673 },
//     { id: 4, title: 'MCFramework Installation', author: '최고관리자', date: '02-21', views: 3779 },
//     { id: 3, title: 'MCFramework PT', author: '최고관리자', date: '02-06', views: 3691 },
//     { id: 2, title: 'MCFramework Demo [YouTube]', author: '최고관리자', date: '01-22', views: 3550 },
//     { id: 1, title: 'Battery Formation Line [YouTube]', author: '최고관리자', date: '01-22', views: 3885 },
// ];


const DataRoom = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]); // 서버에서 가져온 데이터를 저장할 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태
    const [columnWidths] = useState({ id: 50, title: 200, author: 100, date: 100, views: 100 });

     // 서버에서 DataRoomTable 데이터를 가져오는 함수
     const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8001/api/dataroom"); // 서버 API 호출
            console.log("✅ 서버에서 가져온 데이터:", response.data); // 콘솔 로그 추가
            setData(response.data); // 가져온 데이터 상태에 저장
        } catch (err) {
            console.error("❌ 데이터 가져오기 오류:", err.message);
            setError("데이터를 가져오는 중 오류가 발생했습니다.");
        } finally {
            setLoading(false); // 로딩 완료
        }
    };

    useEffect(() => {
        fetchData(); // 컴포넌트 마운트 시 데이터 가져오기
    }, []);


    // 조회수 업데이트 및 상세 페이지로 이동
   const handleRowClick = async (item) => {
    try {
        const response = await axios.post("http://localhost:8001/api/dataroom/update-views", {
            id: item.id, // 항목의 job_id를 서버에 전달
        });

        console.log("✅ 서버 응답:", response.data); // 전체 데이터 확인

        if (response.data && response.data.data) {
            setData(response.data.data); // 전체 데이터를 상태에 업데이트
        }

         // 서버 응답에서 전체 데이터를 넘깁니다.
         navigate(`/DataRoom/Detail/${item.job_id}`, { state: { data: response.data.data } });
    } catch (error) {
        console.error("❌ 조회수 업데이트 실패:", error.message);
    }
};

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
                    {data.map((item, index) => {
                        console.log(`file_count for item ID ${item.id}:`, item.file_count); // 콘솔 로그 추가
                        return (
                            <tr
                                key={item.id}
                                onClick={() => handleRowClick(item)}
                                className="clickable-row"
                            >
                                <td style={{ width: columnWidths.id }}>{index + 1}</td>
                                <td style={{ width: columnWidths.title }}>
                                    {item.file_title}
                                    {/* file_count가 있으면 아이콘 표시 */}
                                    {item.file_count > 0 && (
                                        <FaSave
                                        style={{
                                            marginLeft: "5px",
                                            color: "#DB7093",
                                            fontSize: "15px",
                                            verticalAlign: "middle", // 수직 중앙 정렬
                                        }}
                                        />
                                    )}
                                </td>
                                <td style={{ width: columnWidths.author }}>{item.user_id}</td>
                                <td style={{ width: columnWidths.date }}>{item.date}</td>
                                <td style={{ width: columnWidths.views }}>{item.view_count}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default DataRoom;