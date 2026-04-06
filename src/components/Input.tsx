import styled from "@emotion/styled";
import { colors } from "../styles/theme";
import search from "../assets/search.svg";

interface InputType {
  placeholder: string;
  type: "text" | "search";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  value: string;
}

const Input = ({ placeholder, type, onChange, className }: InputType) => {
  return (
    <InputContainer className={className}>
      {type == "search" && <SearchIcon src={search} alt="검색" />}
      <StyledInput placeholder={placeholder} onChange={onChange} />
    </InputContainer>
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
  padding: 14px;
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
