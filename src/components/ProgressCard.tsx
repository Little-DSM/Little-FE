import { colors, Flex, Text } from "../styles/theme";
import Button from "./Button";
import { MajorTag } from "./MajorTag";
import { PhoneIcon } from "../assets";

interface ProgressProps {
  title: string;
  status: string;
  major: string;
  phone: string;
}

export const ProgressCard = ({
  title,
  status,
  major,
  phone,
}: ProgressProps) => {
  return (
    <Flex
      width="100%"
      justifyContent="space-between"
      paddingTop="24px"
      paddingBottom="24px"
      paddingLeft="24px"
      paddingRight="24px"
      borderBottom={`1px solid ${colors.gray[100]}`}
    >
      <Flex isColumn={true} gap={16}>
        <Flex gap={12} alignItems="center">
          <Text fontSize={20} fontWeight={600}>
            {title}
          </Text>
          <Text fontSize={16} fontWeight={600} color="#4099FF">
            {status}
          </Text>
        </Flex>

        <Flex gap={12} alignItems="center">
          <MajorTag major={major} variant="dark" />
          <Flex gap={6} alignItems="center">
            <img src={PhoneIcon} />
            <Text fontSize={12} fontWeight={400}>
              {phone}
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Button children="완료하기" />
    </Flex>
  );
};
