import { useState } from "react";
import * as S from "./calendar";

const CustomCalendar = ({ onSelectDate }) => {
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
        {allDays.map((date, index) => (
          <S.Day
            key={index}
            selected={date && selectedDate?.toDateString() === date.toDateString()}
            onClick={() => handleDateClick(date)}
            style={{ visibility: date ? "visible" : "hidden" }}
          >
            {date ? date.getDate() : ""}
          </S.Day>
        ))}
      </S.CalendarGrid>
    </S.Wrapper>
  );
};

export default CustomCalendar;