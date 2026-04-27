import { colors, Flex, Text } from "../styles/theme";
import Button from "./Button";
import { MajorTag } from "./MajorTag";
import { PhoneIcon } from "../assets";

const STATUS_LABEL: Record<string, string> = {
  IN_PROGRESS: "진행중",
  COMPLETED: "완료",
};

interface ProgressProps {
  title: string;
  status: string;
  major: string;
  mentor_contact: string;
  onComplete?: () => void;
}

export const ProgressCard = ({
  title,
  status,
  major,
  mentor_contact,
  onComplete,
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
            {STATUS_LABEL[status] ?? status}
          </Text>
        </Flex>

        <Flex gap={12} alignItems="center">
          <MajorTag major={major} variant="dark" />
          <Flex gap={6} alignItems="center">
            <img src={PhoneIcon} />
            <Text fontSize={12} fontWeight={400}>
              {mentor_contact}
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Button
        onClick={onComplete}
        backgroundColor={status === "COMPLETED" ? colors.gray[100] : undefined}
        color={status === "COMPLETED" ? colors.gray[500] : undefined}
      >
        완료하기
      </Button>
    </Flex>
  );
};
