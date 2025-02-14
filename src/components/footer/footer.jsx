import React from "react";
import * as S from "./footer";

function Footer() {
    return (
        <S.Wrapper>
            <S.Box>
                <S.Content>
                    <S.Contest>서울특별시중구시설관리공단</S.Contest>
                    <S.Support>서울특별시 중구 동호로 8다길 22 (약수동)   |   Tel 02-2280-8300</S.Support>
                </S.Content>
                <S.Search>
                    <img src="/images/insta.svg" alt="인스타연결" />
                    <img src="/images/youtube.svg" alt="유튜브연결" />
                    <img src="/images/call.svg" alt="전화번호" />
                </S.Search>
            </S.Box>
        </S.Wrapper>
    );
}

export default Footer;