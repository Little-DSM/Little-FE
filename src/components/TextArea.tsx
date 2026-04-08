import styled from '@emotion/styled';
import { colors, Flex, Text } from '../styles/theme';

interface TextAreaType {
  label?: string;
  placeholder: string;
  value?: string;
  onChange?: (e: any) => void;
}

export const TextArea = ({
  label,
  placeholder,
  value,
  onChange,
}: TextAreaType) => {
  return (
    <Flex isColumn gap={8} width="100%">
      <Text fontSize={16} color={colors.gray[900]}>
        {label}
      </Text>
      <TextAreaCustom
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      ></TextAreaCustom>
    </Flex>
  );
};

const TextAreaCustom = styled.textarea`
  width: 100%;
  height: 274px;
  border-radius: 12px;
  padding: 16px;
  font-size: 16px;
  color: ${colors.gray[900]};
  background-color: ${colors.gray[100]};
  resize: none;
  ::placeholder {
    color: ${colors.gray[600]};
  }
`;
