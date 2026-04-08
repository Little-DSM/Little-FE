import styled from '@emotion/styled';
import { useState } from 'react';
import { colors, Flex, Text } from '../styles/theme';

interface ToggleProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
  label?: string;
}

export const Toggle = ({ value, onChange, label }: ToggleProps) => {
  const [internal, setInternal] = useState(false);
  const isOn = value ?? internal;

  const handleClick = () => {
    const next = !isOn;
    setInternal(next);
    onChange?.(next);
  };

  return (
    <Flex alignItems="center" gap={12}>
      <Text fontSize={16} color={colors.gray[900]}>
        {label}
      </Text>
      <Track isOn={isOn} onClick={handleClick}>
        <Thumb isOn={isOn} />
      </Track>
    </Flex>
  );
};

const Track = styled.div<{ isOn: boolean }>`
  width: 44px;
  height: 24px;
  border-radius: 99px;
  padding: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: ${({ isOn }) =>
    isOn ? colors.gray[900] : colors.gray[300]};
  transition: background-color 0.2s ease;
`;

const Thumb = styled.div<{ isOn: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: white;
  transform: translateX(${({ isOn }) => (isOn ? '20px' : '0px')});
  transition: transform 0.2s ease;
`;
