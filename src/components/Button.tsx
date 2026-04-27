import styled from '@emotion/styled';
import { colors } from '../styles/theme';

interface ButtonType {
  children: React.ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  backgroundColor?: string;
  color?: string;
  width?: string;
  disabled?: boolean;
}

const Button = ({
  children,
  onClick,
  color = colors.gray[50],
  backgroundColor = colors.main[1],
  width,
  disabled,
}: ButtonType) => {
  return (
    <StyledButton
      onClick={onClick}
      color={color}
      backgroundColor={backgroundColor}
      width={width}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<Omit<ButtonType, 'onClick' | 'children'>>`
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 12px;
  font-weight: 500;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  width: ${({ width }) => width ?? width};

  color: ${({ color }) => color};
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

export default Button;
