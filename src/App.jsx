import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import moment from "moment";  
import "react-calendar/dist/Calendar.css"; 

function Home() {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState("대기 중...");
    const [selectedTab, setSelectedTab] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [calendarData, setCalendarData] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEvents, setSelectedEvents] = useState([]);


    useEffect(() => {
        const processCalendarData = () => {
            const dateMap = {};
    
            data.forEach((item, index) => {
                const dates = item.date.split("~").map(d => d.trim()); 
                const startDate = moment(dates[0], "YYYY.MM.DD"); 
                const endDate = moment(dates[1], "YYYY.MM.DD"); 
    
                if (!startDate.isValid() || !endDate.isValid()) {
                    console.error(`❌ 유효하지 않은 날짜 데이터: ${item.date}`);
                    return;
                }
    
                let currentDate = startDate.clone(); 
                while (currentDate.isSameOrBefore(endDate, "day")) {
                    const formattedDate = currentDate.format("YYYY-MM-DD");
                    
                    if (!dateMap[formattedDate]) {
                        dateMap[formattedDate] = [item.title];
                    } else {
                        dateMap[formattedDate].push(item.title);
                    }
    
                    console.log(`✅ ${formattedDate} 일정 추가: ${item.title}`); 
                    
                    currentDate.add(1, "day");
                }
            });
    
            console.log("📌 최종 calendarData:", dateMap); 
            setCalendarData(dateMap);
        };
    
        processCalendarData();
    }, [data]);

    const fetchData = async (tabIndex) => {
        setStatus(`탭 ${tabIndex}의 데이터 가져오는 중...`);
        setData([]);
        setLoading(true);

        try {
            const response = await fetch(`http://localhost:5000/crawl?tabIndex=${tabIndex}`);
            const result = await response.json();

            if (result.success) {
                setData(result.data);
                setStatus(`✅ 탭 ${tabIndex} 크롤링 성공!`);
                setSelectedTab(tabIndex);
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error("❌ API 오류:", error);
            setStatus("❌ 크롤링 실패! 서버 오류.");
        } finally {
            setLoading(false);
        }
    };

    const openDetailPopup = (detail) => {
        setSelectedDetail(detail);
        setShowPopup(true);
    };

    const closeDetailPopup = () => {
        setSelectedDetail(null);
        setShowPopup(false);
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>국가공모사업</h1>

            <div>
                <button onClick={() => fetchData(0)} disabled={loading} style={buttonStyle(selectedTab === 0)}>
                    {loading && selectedTab === 0 ? "로딩 중..." : "기본 탭"}
                </button>
                <button onClick={() => fetchData(1)} disabled={loading} style={buttonStyle(selectedTab === 1)}>
                    {loading && selectedTab === 1 ? "로딩 중..." : "탭 1"}
                </button>
            </div>

            <p style={{ color: status.includes("❌") ? "red" : "green", fontWeight: "bold" }}>{status}</p>

            <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <Calendar style={{ width: "100%", maxWidth: "1000px" }}
            onClickDay={(date) => {
                const dateString = moment(date).format("YYYY-MM-DD");
                setSelectedDate(dateString);
                setSelectedEvents(calendarData[dateString] || []);
            }}
            tileContent={({ date }) => {
                const dateString = moment(date).format("YYYY-MM-DD");
                if (calendarData[dateString]) {
                    const events = calendarData[dateString];
                    return (
                        <div style={calendarEventStyle(events.length)}>
                            {events.length > 2 
                                ? `${events[0]} 외 ${events.length - 1}개` 
                                : events.join(", ")}
                        </div>
                    );
                }
                return null;
            }}
            tileClassName={({ date }) => {
                const dateString = moment(date).format("YYYY-MM-DD");
                return calendarData[dateString] ? "highlight-date" : null;
            }}
        />
        </div>

            {selectedDate && (
                <div style={popupOverlayStyle} onClick={() => setSelectedDate(null)}>
                    <div style={popupContentStyle} onClick={(e) => e.stopPropagation()}>
                        <h2>{selectedDate} 일정</h2>
                        {selectedEvents.length > 0 ? (
                            <ul>
                                {selectedEvents.map((event, index) => (
                                    <li key={index}>{event}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>일정 없음</p>
                        )}
                        <button onClick={() => setSelectedDate(null)} style={closeButtonStyle}>닫기</button>
                    </div>
                </div>
            )}

            <ul style={{ listStyleType: "none", padding: 0 }}>
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <li key={index} style={listItemStyle}>
                            <span style={ors}>{item.organization}</span>
                            <strong>{item.title}</strong> {item.date}
                            <button onClick={() => openDetailPopup(item)} style={detailButtonStyle}>
                                자세히 보기
                            </button>
                        </li>
                    ))
                ) : (
                    !loading && <p>데이터가 없습니다.</p>
                )}
            </ul>

            {showPopup && selectedDetail && (
                <div style={popupOverlayStyle} onClick={closeDetailPopup}>
                    <div style={popupContentStyle} onClick={(e) => e.stopPropagation()}>
                        <h2>{selectedDetail.title}</h2>
                        <p><strong>사업 기간:</strong> {selectedDetail.date}</p>
                        <p><strong>사업 정보:</strong></p>
                        <pre style={detailTextStyle}>{selectedDetail.detailContent}</pre>
                        <button onClick={closeDetailPopup} style={closeButtonStyle}>닫기</button>
                    </div>
                </div>
            )}
        </div>
    );
}

const buttonStyle = (isActive) => ({
    margin: "5px",
    padding: "10px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: isActive ? "lightblue" : "white",
    border: "1px solid #ccc",
    borderRadius: "5px",
});

const listItemStyle = {
    backgroundColor: "#f9f9f9",
    padding: "10px",
    margin: "5px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
};

const detailButtonStyle = {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "5px",
};

const popupOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const popupContentStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "60%",
    textAlign: "left",
};

const detailTextStyle = {
    backgroundColor: "#f4f4f4",
    padding: "10px",
    borderRadius: "5px",
    whiteSpace: "pre-wrap",
    maxHeight: "300px",
    overflowY: "auto",
};

const closeButtonStyle = {
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: "5px",
    marginTop: "10px",
};

const ors = {
    backgroundColor: "pink",
    color: "black",
    padding: "10px 5px",
    borderRadius: "5px",
};

const calendarEventStyle = (eventCount) => ({
    backgroundColor: eventCount > 1 ? "#ffcc00" : "#007bff",
    color: "black",
    fontSize: "10px",
    padding: "5px",
    borderRadius: "5px",
    textAlign: "center",
    fontWeight: "bold",
    width: "90%", 
    margin: "auto",
});

export default Home;