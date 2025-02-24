import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  max-width: 700px;
  margin: auto;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: #fff;
  text-align: center;
  font-family: Pretendard;
  margin-top: 40px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  margin-top: 15px;
`;

export const MonthText = styled.h3`
  font-size: 18px;
  margin: 0;
  color: #000;
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  line-height: 150%;
`;

export const NavButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  &:hover {
    color: #00aaff;
  }
`;

export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  font-weight: bold;
  color: #000;
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: 150%;
  margin-bottom: 20px;
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 15px;
`;

export const Day = styled.div`
  padding: 10px;
  color: #000;
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 300;
  line-height: 150%;
  text-align: center;
  cursor: pointer;
  border-radius: 120px;
  max-width: 20px;
  border: 20px solid white;
  margin-left: 11px;
  background-color: ${({ selected }) => (selected ? "#FC521C" : "white")};
  color: ${({ selected }) => (selected ? "white" : "black")};
  &:hover {
    background-color: ${({ selected }) => (selected ? "#FC521C" : "#ddd")};
  }
`;
