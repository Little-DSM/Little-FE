import styled from "@emotion/styled";
import { colors } from "../styles/theme";

interface MajorProp {
  major: string;
  variant?: "blue" | "dark";
}

export const MajorTag = ({ major, variant = "blue" }: MajorProp) => {
  return <Major variant={variant}>{major}</Major>;
};

const Major = styled.div<{ variant: "blue" | "dark" }>`
  padding: 6px 12px;
  border-radius: 100px;
  background-color: ${({ variant }) =>
    variant === "dark" ? colors.gray[900] : colors.main[1]};
  color: white;
  font-size: 12px;
  font-weight: 500;
  width: fit-content;
`;
