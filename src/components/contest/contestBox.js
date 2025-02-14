import styled from "styled-components";

export const Wrapper = styled.div`
    position: relative;
    width: 500px;
    height: 205px;
    flex-shrink: 0;
    border-radius: 20px;
    background: #FC521C;
    box-shadow: 3px 6px 11px 0px rgba(0, 0, 0, 0.25);
    margin-bottom: 80px;
    cursor: pointer;

`;

export const Content = styled.div`
    display: flex;
    align-items:center;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 40px;
`;

export const Contest = styled.div`
    color: #FFF;
    font-family: Pretendard;
    font-size: 32px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    margin-top: 30px;
`;

export const Support = styled.div`
    color: #FFF;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    margin-top: 10px;
`;

export const Search = styled.div`
position: absolute;
right: -20px;
bottom: -52px;
`;