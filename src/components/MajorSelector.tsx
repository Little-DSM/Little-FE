import { colors, Flex, Text } from '../styles/theme';
import { major } from '../types';
import MajorButton from './MajorButton';

interface MajorSelectorProps {
  selectedMajor: string;
  setSelectedMajor: (major: string) => void;
}

export const MajorSelector = ({
  selectedMajor,
  setSelectedMajor,
}: MajorSelectorProps) => {
  return (
    <Flex isColumn gap={8} width="100%">
      <Text fontSize={16} fontWeight={400} color={colors.gray[900]}>
        전공
      </Text>

      <Flex gap={8} alignItems="center" width="100%">
        {major.map((data) => (
          <MajorButton
            isClick={selectedMajor === data}
            onClick={() => setSelectedMajor(data)}
          >
            {data}
          </MajorButton>
        ))}
      </Flex>
    </Flex>
  );
};
