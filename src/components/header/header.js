import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
`;

export const Top = styled.div`
    width: 100%;
    background: linear-gradient(90deg, #FC521C 0%, #FB7C0E 100%);
    height: 18px;
`;
export const Content = styled.div`
    height: 72px;
    width: 100%;
    display: flex;
    align-items:center;
    justify-content: space-around;
    flex-shrink: 0;
    border-bottom: 1px solid #E8E7E5;
    background: #FFF;
    // filter: blur(20px);
`;
export const Logo = styled.div`
height: 48px;
margin-right: 10px;
`;
export const Contest = styled.div`
    color: #1B1C1E;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-right: 5px;
    cursor: pointer;
`;
export const Support = styled.div`
    color: #1B1C1E;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-right: 10px;
    cursor: pointer;
`;

export const Search = styled.div`
    display: flex;
    align-items: center;
    background: #fff;
    padding: 5px 10px;
    border-radius: 50px;
    /* border: 1px solid #ddd; */
    flex-grow: 1; 
    max-width: 500px;

    input {
        border: none;  
        outline: none; 
        font-size: 14px;
        padding: 5px;
        width: 100%; 
        min-width: 130px;
        background: transparent;
    }

    svg {
        margin-left: 5px;
        color: #555;
        cursor: pointer;
    }
`;


export const ContentLeft = styled.div`
display: flex;
align-items: center;
gap: 60px;
`;