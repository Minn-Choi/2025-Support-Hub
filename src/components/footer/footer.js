import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    background: #FFF;
    padding-bottom: 40px;
    padding-top: 40px;
`;

export const Box = styled.div`
    width: 50%; 
    margin: auto;  
    text-align: left;  
    display: flex;
    flex-direction: column;
`;


export const Content = styled.div`
    height: 72px;
    width: 100%;
    display: flex;
    align-items:center;
    flex-direction: column;
    align-items: flex-start;
    flex-shrink: 0;
    background: #FFF;
`;

export const Contest = styled.div`
    color: #000;
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; 
`;
export const Support = styled.div`
    color: #000;
    text-align: left;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 300;
    line-height: 150%; 
`;

export const Search = styled.div`
    display: flex;
    gap: 16px;
    margin-top: 10px;
`;