import React from "react";
import * as S from "./contestBox";

function ContestBox() {
    return (
        <S.Wrapper>
                <S.Content>
                    <S.Contest>공모사업</S.Contest>
                    <S.Support>공모사업을 찾아보세요</S.Support>
                </S.Content>
                <S.Search>
                    <img src="/images/Social Media Achievement 3D Animation.svg" alt="아이콘" />
                </S.Search>
        </S.Wrapper>
    );
}

export default ContestBox;