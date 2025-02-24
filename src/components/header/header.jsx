import React from "react";
import * as S from "./header";

function Header() {
    return (
        <>
        <S.Top></S.Top>
        <S.Wrapper>
            <S.Content>
                <S.ContentLeft>
                <S.Logo>
                    <img  src="/images/logo.svg" alt="로고" width="32" />
                </S.Logo>
                <S.Contest>공모사업</S.Contest>
                <S.Support>보조사업</S.Support>
                </S.ContentLeft>
                <S.Search>
                    {/* <input type="text" placeholder="" />
                    <img src="/images/search.svg" alt="검색버튼" width="24"/> */}
                </S.Search>
            </S.Content>
        </S.Wrapper>
    </>
    );
}

export default Header;