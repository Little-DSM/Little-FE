import styled from "@emotion/styled";
import { useLocation, useNavigate } from "react-router-dom";
import { colors, Flex, Text } from "../styles/theme";
import {
  ProfileIcon,
  PencilIcon,
  FindIcon,
  FindIconActive,
  AddIcon,
  AddIconActive,
  ProgressIcon,
  ProgressIconActive,
  MypageIcon,
  MypageIconActive,
  LogoutIcon,
} from "../assets";
import { MajorTag } from "./MajorTag";
import { useAuth } from "../context/AuthContext";
import { logoutApi } from "../api/auth";

const NAV_ITEMS = [
  {
    path: "/main",
    label: "멘토 멘티 찾기",
    icon: FindIcon,
    activeIcon: FindIconActive,
  },
  {
    path: "/main/create",
    label: "게시물 생성",
    icon: AddIcon,
    activeIcon: AddIconActive,
  },
  {
    path: "/main/progress",
    label: "나의 진행 상황",
    icon: ProgressIcon,
    activeIcon: ProgressIconActive,
  },
  {
    path: "/main/my",
    label: "마이페이지",
    icon: MypageIcon,
    activeIcon: MypageIconActive,
  },
];

export const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken) {
      await logoutApi(refreshToken).catch(() => {});
    }
    logout();
    navigate("/");
  };

  return (
    <SidebarWrapper>
      <Flex width="100%" isColumn={true} gap={36} alignItems="center">
        <Flex width="100%" gap={32} alignItems="center" justifyContent="center">
          <Profile>
            <ProfileImgEl
              src={user?.profile_image ?? ProfileIcon}
              alt="프로필"
            />
            <UpdateButton onClick={() => navigate("/main/my")}>
              <img src={PencilIcon} alt="프로필 수정" />
            </UpdateButton>
          </Profile>

          <Flex isColumn={true} gap={8}>
            <Flex gap={8} alignItems="flex-start">
              <Text fontSize={24} fontWeight={600}>
                {user?.name ?? "-"}
              </Text>
              {user?.major && <MajorTag major={user.major} />}
            </Flex>

            <Text fontSize={16} fontWeight={400} color={`${colors.gray[500]}`}>
              {user?.email ?? ""}
            </Text>
          </Flex>
        </Flex>

        <DrawLine />

        <Flex width="100%" isColumn={true}>
          {NAV_ITEMS.map(({ path, label, icon, activeIcon }) => {
            const isActive = location.pathname === path;
            return (
              <NavItem
                key={path}
                isActive={isActive}
                onClick={() => navigate(path)}
              >
                <img
                  src={isActive ? activeIcon : icon}
                  alt={label}
                  width={24}
                  height={24}
                />
                <NavLabel isActive={isActive}>{label}</NavLabel>
              </NavItem>
            );
          })}
        </Flex>
      </Flex>

      <Flex
        justifyContent="flex-end"
        width="100%"
        style={{ padding: "0 24px" }}
      >
        <img
          src={LogoutIcon}
          alt="로그아웃"
          width={32}
          height={32}
          style={{ cursor: "pointer" }}
          title="로그아웃"
          onClick={handleLogout}
        />
      </Flex>
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.div`
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 320px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 42px 0;
  border-right: 1px solid ${colors.gray[100]};
`;

const Profile = styled.div`
  width: 68px;
  height: 68px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.gray[100]};
  border-radius: 100%;
  position: relative;
`;

const ProfileImgEl = styled.img`
  width: 68px;
  height: 68px;
  border-radius: 100%;
  object-fit: cover;
`;

const UpdateButton = styled.button`
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.gray[200]};
  border-radius: 100%;
  position: absolute;
  bottom: 4px;
  right: 4px;
`;

const DrawLine = styled.div`
  width: 302px;
  height: 1px;
  border: 1px solid ${colors.gray[100]};
`;

const NavItem = styled.div<{ isActive: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 24px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${({ isActive }) => (isActive ? "#F4F9FF" : "transparent")};

  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? "#F4F9FF" : colors.gray[50]};
  }
`;

const NavLabel = styled.span<{ isActive: boolean }>`
  font-size: 16px;
  font-weight: 500;
  color: ${({ isActive }) => (isActive ? colors.main[1] : colors.gray[600])};
`;
