import styled from "@emotion/styled";
import { FooterLogo } from "../assets";

export const Footer = () => {
  return (
    <FooterWrapper>
      <ContentWrapper>
        <Logo src={FooterLogo} alt="로고" />
        <SubTitle>Little에서 쉽고 빠르게 멘토를 찾아보세요!</SubTitle>
      </ContentWrapper>
      <ContentWrapper>
        <ContentTitle>©리틀</ContentTitle>
        <ContentTitle>
          recruit@little.kr 사업자 등록번호 : 777-7777-7777
        </ContentTitle>
        <ContentTitle>
          대전광역시 유성구 장동(대덕소프트웨어마이스터고등학교)
        </ContentTitle>
      </ContentWrapper>
    </FooterWrapper>
  );
};

const Logo = styled.img`
  width: 98px;
`;

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 48px;
  padding: 24px 28px;
  width: 100%;
  background-color: #f8f8f8;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ContentTitle = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #707070;
`;

const SubTitle = styled.div`
  font-size: 12px;
  color: #262626;
`;
