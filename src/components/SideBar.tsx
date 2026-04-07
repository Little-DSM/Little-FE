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
  SettingIcon,
} from "../assets";
import { MajorTag } from "./MajorTag";

const NAV_ITEMS = [
  {
    path: "/",
    label: "멘토 멘티 찾기",
    icon: FindIcon,
    activeIcon: FindIconActive,
  },
  {
    path: "/add",
    label: "게시물 생성",
    icon: AddIcon,
    activeIcon: AddIconActive,
  },
  {
    path: "/progress",
    label: "나의 진행 상황",
    icon: ProgressIcon,
    activeIcon: ProgressIconActive,
  },
  {
    path: "/my",
    label: "마이페이지",
    icon: MypageIcon,
    activeIcon: MypageIconActive,
  },
];

export const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <SidebarWrapper>
      <Flex width="100%" isColumn={true} gap={36} alignItems="center">
        <Flex width="100%" gap={32} alignItems="center" justifyContent="center">
          <Profile>
            <img src={ProfileIcon} alt="프로필" />
            <UpdateButton>
              <img src={PencilIcon} alt="프로필 수정" />
            </UpdateButton>
          </Profile>

          <Flex isColumn={true} gap={8}>
            <Flex gap={8} alignItems="flex-start">
              <Text fontSize={24} fontWeight={600}>
                {"오찬영"}
              </Text>
              <MajorTag major="Game" />
            </Flex>

            <Text fontSize={16} fontWeight={400} color={`${colors.gray[500]}`}>
              {"ohhchan@gmail.com"}
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
          src={SettingIcon}
          alt="설정"
          width={32}
          height={32}
          style={{ cursor: "pointer" }}
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
