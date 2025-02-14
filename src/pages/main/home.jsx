import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import moment from "moment";  
import "react-calendar/dist/Calendar.css"; 
import "../../App.css";
import * as S from "./home";
import ContestBox from "../../components/contest/contestBox.jsx";
import SupportBox from "../../components/support/supportBox.jsx";

function Home() {  
    const [data, setData] = useState({ popular: [], latest: [] });
    const [status, setStatus] = useState("대기 중...");
    const [selectedTab, setSelectedTab] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [calendarData, setCalendarData] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEvents, setSelectedEvents] = useState([]);
    const [isLatestSort, setIsLatestSort] = useState(false);

    useEffect(() => {
        const processCalendarData = () => {
            if (!data.popular.length && !data.latest.length) return; 

            const dateMap = {};
            [...data.popular, ...data.latest].forEach((item) => {
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
                    currentDate.add(1, "day");
                }
            });

            setCalendarData(dateMap);
        };

        processCalendarData();
    }, [data]);

    const fetchData = async (tabIndex) => {
        setStatus(`탭 ${tabIndex}의 데이터 가져오는 중...`);
        setData({ popular: [], latest: [] });
        setLoading(true);

        try {
            const response = await fetch(`http://localhost:5000/crawl?tabIndex=${tabIndex}`);
            const result = await response.json();

            if (result.success) {
                let filteredData = result.data.slice(10);
                let popularData = filteredData.slice(0, 10);
                let latestData = filteredData.slice(10, 20).sort((a, b) => new Date(b.date) - new Date(a.date));

                setData({ popular: popularData, latest: latestData });
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

    const toggleSort = () => {
        setIsLatestSort((prev) => !prev);
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
            <div style={{ display: "flex", justifyContent: "center", gap:"26px", marginTop:"30px" }}>
                <ContestBox />
                <SupportBox />
            </div>

            <p style={{ color: status.includes("❌") ? "red" : "green", fontWeight: "bold" }}>{status}</p>

            <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <Calendar 
                    locale="en-US"
                    defaultView="month" 
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
                                <div style={S.calendarEventStyle(events.length)}>
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
                <div style={S.popupOverlayStyle} onClick={() => setSelectedDate(null)}>
                    <div style={S.popupContentStyle} onClick={(e) => e.stopPropagation()}>
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
                        <button onClick={() => setSelectedDate(null)} style={S.closeButtonStyle}>닫기</button>
                    </div>
                </div>
            )}

            <div>
                <button onClick={() => fetchData(0)} disabled={loading} style={S.buttonStyle(selectedTab === 0)}>
                    {loading && selectedTab === 0 ? "로딩 중..." : "공모사업"}
                </button>

                <button onClick={() => fetchData(1)} disabled={loading} style={S.buttonStyle(selectedTab === 1)}>
                    {loading && selectedTab === 1 ? "로딩 중..." : "보조사업"}
                </button>

                {selectedTab === 1 && (
                    <div style={S.sortContainer}>
                        <span 
                            onClick={() => setIsLatestSort(false)} 
                            style={S.sortOption(!isLatestSort)}
                        >
                            인기순
                        </span>
                        |
                        <span 
                            onClick={() => setIsLatestSort(true)} 
                            style={S.sortOption(isLatestSort)}
                        >
                            최신순
                        </span>
                    </div>
                )}

            </div>


            <ul style={{ listStyleType: "none", padding: 0, marginTop: "50px", display:'flex', flexDirection:"column", width:'100%', alignContent:"center", justifyContent:"center" }}>
                {(selectedTab === 1 ? (isLatestSort ? data.latest : data.popular) : data.popular).map((item, index) => (
                    <li key={index} style={S.listItemStyle}>
                        <span style={S.ors1}>
                            <img src="/images/circle.svg" alt="링크이동"/>
                        </span>
                        <span style={S.ors2} />
                        <span style={S.ors}>{item.organization}</span>
                        <strong style={S.Title}>{item.title}</strong> 
                        <div style={S.Right}>{item.date}
                            <button onClick={() => openDetailPopup(item)} style={S.detailButtonStyle}>
                                <img src="/images/right.svg" alt="링크이동" width="7"/>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
