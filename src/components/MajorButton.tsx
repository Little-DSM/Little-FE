import styled from '@emotion/styled';
import { colors } from '../styles/theme';

interface ButtonType {
  children: string;
  onClick: () => void;
  isClick: boolean;
}

const MajorButton = ({ children, onClick, isClick }: ButtonType) => {
  return (
    <Major onClick={onClick} isClick={isClick}>
      {children}
    </Major>
  );
};

const Major = styled.button<{ isClick: boolean }>`
  padding: 6px 12px;
  border-radius: 100px;
  background-color: ${({ isClick }) =>
    isClick ? colors.gray[900] : colors.gray[50]};
  color: ${({ isClick }) => (isClick ? colors.gray[0] : colors.gray[900])};
  font-size: 12px;
  font-weight: 500;
  width: fit-content;
  cursor: pointer;

  transition: all 0.25s ease;

  transform: ${({ isClick }) =>
    isClick ? 'translateY(-2px) scale(1.05)' : 'translateY(0) scale(1)'};
`;
export default MajorButton;
