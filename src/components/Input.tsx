import styled from '@emotion/styled';
import { colors, Flex, Text } from '../styles/theme';
import search from '../assets/search.svg';

interface InputType {
  placeholder: string;
  type?: 'text' | 'search';
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  value: string;
  label?: string;
}

const Input = ({
  label,
  placeholder,
  type = 'text',
  onChange,
  onKeyDown,
  className,
  value,
}: InputType) => {
  return (
    <Flex isColumn gap={8} width="100%">
      {label && (
        <Text fontWeight={400} fontSize={16} color={colors.gray[900]}>
          {label}
        </Text>
      )}
      <InputContainer className={className}>
        {type == 'search' && <SearchIcon src={search} alt="검색" />}
        <StyledInput
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </InputContainer>
    </Flex>
  );
};

const InputContainer = styled.div`
  width: 100%;
  font-size: 16px;
  background-color: #eeeded;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px;
`;

const SearchIcon = styled.img`
  width: 1.2em;
  height: 1.2em;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  font-size: 16px;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${colors.gray[500]};
  }
  font-size: 1em;
  color: ${colors.gray[900]};
`;

export default Input;
