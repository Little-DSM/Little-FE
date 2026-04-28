import { useState } from 'react';
import { colors, Flex, Text } from '../styles/theme';
import { major } from '../types';
import MajorButton from './MajorButton';
import Input from './Input';

interface MajorSelectorProps {
  selectedMajor: string;
  setSelectedMajor: (major: string) => void;
}

export const MajorSelector = ({
  selectedMajor,
  setSelectedMajor,
}: MajorSelectorProps) => {
  const isCustom = !!selectedMajor && !major.includes(selectedMajor);
  const [customValue, setCustomValue] = useState(isCustom ? selectedMajor : '');

  const handlePresetClick = (value: string) => {
    setCustomValue('');
    setSelectedMajor(value);
  };

  const handleCustomClick = () => {
    setSelectedMajor('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomValue(e.target.value);
    setSelectedMajor(e.target.value);
  };

  const showCustomInput = isCustom || (!major.includes(selectedMajor) && selectedMajor === '');

  return (
    <Flex isColumn gap={12} width="100%">
      <Text fontSize={16} fontWeight={400} color={colors.gray[900]}>
        전공
      </Text>
      <Flex gap={8} flexWrap="wrap" width="100%">
        {major.map((data) => (
          <MajorButton
            key={data}
            isClick={selectedMajor === data}
            onClick={() => handlePresetClick(data)}
          >
            {data}
          </MajorButton>
        ))}
        <MajorButton
          isClick={isCustom || selectedMajor === ''}
          onClick={handleCustomClick}
        >
          기타
        </MajorButton>
      </Flex>
      {(isCustom || selectedMajor === '') && (
        <Input
          placeholder="전공을 직접 입력해주세요."
          value={customValue}
          onChange={handleCustomChange}
        />
      )}
    </Flex>
  );
};
