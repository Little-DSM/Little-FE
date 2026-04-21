import styled from "@emotion/styled";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { Footer, SideBar } from "../components";
import { LoginModal } from "../components/LoginModal";
import { Flex, colors } from "../styles/theme";
import { useState, useEffect, useRef } from "react";
import Input from "../components/Input";
import { HeaderLogo } from "../assets";
import { useAuth } from "../context/AuthContext";

export const RootLayout = () => {
  const navigate = useNavigate();
  const { user, isLoading, login } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("keyword") ?? "");
  const oauthHandled = useRef(false);

  // 백엔드가 /main?access_token=...&refresh_token=... 으로 리다이렉트하는 경우 처리
  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");
    if (!accessToken || !refreshToken || oauthHandled.current) return;

    oauthHandled.current = true;

    // URL에서 토큰 파라미터 즉시 제거
    setSearchParams((prev) => {
      prev.delete("access_token");
      prev.delete("refresh_token");
      prev.delete("token_type");
      return prev;
    }, { replace: true });

    login(accessToken, refreshToken);
  }, []);

  useEffect(() => {
    setSearchValue(searchParams.get("keyword") ?? "");
  }, [searchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const keyword = searchValue.trim();
      navigate(keyword ? `/main?keyword=${encodeURIComponent(keyword)}` : "/main");
    }
  };

  if (isLoading) return null;

  return (
    <Flex>
      <SideBar />
      <ContentWrapper>
        <Header>
          <img
            src={HeaderLogo}
            alt="Little"
            height={32}
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/main")}
          />
          <SearchWrapper>
            <Input
              value={searchValue}
              onChange={handleSearchChange}
              onKeyDown={handleSearchSubmit}
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

      <LoginModal isOpen={!user} onClose={() => {}} />
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
