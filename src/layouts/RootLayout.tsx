import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";
import { Footer, SideBar } from "../components";
import { Flex, colors } from "../styles/theme";
import { useState } from "react";
import Input from "../components/Input";
import { HeaderLogo } from "../assets";

export const RootLayout = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <Flex>
      <SideBar />
      <ContentWrapper>
        <Header>
          <img src={HeaderLogo} alt="Little" height={32} />
          <SearchWrapper>
            <Input
              value={searchValue}
              onChange={handleSearchChange}
              type="search"
              placeholder="멘토링을 찾아보세요.."
            />
          </SearchWrapper>
        </Header>
        <Main>
          <Outlet />
        </Main>
        <Footer />
      </ContentWrapper>
    </Flex>
  );
};

const ContentWrapper = styled.div`
  margin-left: 320px;
  width: calc(100vw - 320px);
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 320px;
  width: calc(100vw - 320px);
  height: 64px;
  background-color: white;
  border-bottom: 1px solid ${colors.gray[100]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  z-index: 10;
`;

const SearchWrapper = styled.div`
  position: absolute;
  left: 34%;
  width: 620px;

  & > div {
    padding: 13px 14px;
    font-size: 14px;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 44px;
  padding: 28px;
  margin-top: 64px;
`;
