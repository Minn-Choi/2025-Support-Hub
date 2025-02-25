import { useState } from "react";
import * as S from "./calendar";

const CustomCalendar = ({ onSelectDate, dateCounts }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const getLastDayOfMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), getLastDayOfMonth(currentDate.getFullYear(), currentDate.getMonth()));

  const firstDayOfWeek = firstDay.getDay();

  const daysArray = [];
  for (let i = 1; i <= lastDay.getDate(); i++) {
    daysArray.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
  }

  const emptyDays = Array(firstDayOfWeek).fill(null);
  const allDays = [...emptyDays, ...daysArray];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (date) => {
    if (!date) return;

    if (selectedDate && selectedDate.toDateString() === date.toDateString()) {
      setSelectedDate(null);
      onSelectDate(null);
    } else {
      setSelectedDate(date);
      onSelectDate(date);
    }
  };

  return (
    <S.Wrapper>
      <S.Header>
        <S.NavButton onClick={prevMonth}><img src="/images/left.svg" alt="이전 달" /></S.NavButton>
        <S.MonthText>
          {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
        </S.MonthText>
        <S.NavButton onClick={nextMonth}><img src="/images/leftRight.svg" alt="다음 달" /></S.NavButton>
      </S.Header>

      <S.DaysGrid>
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
          <div key={day} style={{ textAlign: "center" }}>{day}</div>
        ))}
      </S.DaysGrid>

      <S.CalendarGrid>
        {allDays.map((date, index) => {
          const dateStr = date ? date.toISOString().split("T")[0] : null;
          const pbnsCount = dateStr && dateCounts[dateStr] ? dateCounts[dateStr].pbns : 0;
          const asbsCount = dateStr && dateCounts[dateStr] ? dateCounts[dateStr].asbs : 0;

          return (
            <S.Day
              key={index}
              selected={date && selectedDate?.toDateString() === date.toDateString()}
              onClick={() => handleDateClick(date)}
              style={{ visibility: date ? "visible" : "hidden" }}
            >
              <div>{date ? date.getDate() : ""}</div>
              {dateStr && (pbnsCount > 0 || asbsCount > 0) && (
                <S.Count  key={index}
                selected={date && selectedDate?.toDateString() === date.toDateString()}
                onClick={() => handleDateClick(date)}
                style={{ visibility: date ? "visible" : "hidden" }}>
                  {pbnsCount > 0 && <div>공모 : {pbnsCount}</div>}
                  {asbsCount > 0 && <div>보조 : {asbsCount}</div>}
                </S.Count>
              )}
            </S.Day>
          );
        })}
      </S.CalendarGrid>
      <S.Notice>달력에 표시된 숫자는 공모사업과 보조사업의 개수를 의미합니다.</S.Notice>
    </S.Wrapper>
  );
};

export default CustomCalendar;
