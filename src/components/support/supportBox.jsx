import React from "react";
import * as S from "./supportBox";

function SupportBox() {
    return (
        <S.Wrapper>
                <S.Content>
                    <S.Contest>보조사업</S.Contest>
                    <S.Support>보조사업을 찾아보세요</S.Support>
                </S.Content>
                <S.Search>
                    <img src="/images/Money Reserves 3D Animated icon.svg" alt="아이콘" />
                </S.Search>
        </S.Wrapper>
    );
}

export default SupportBox;