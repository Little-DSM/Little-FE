import { colors, Flex, Text } from "../styles/theme";
import Button from "./Button";
import { MajorTag } from "./MajorTag";
import { PhoneIcon } from "../assets";

const STATUS_LABEL: Record<string, string> = {
  IN_PROGRESS: "진행중",
  COMPLETED: "완료",
};

interface ProgressProps {
  completed_at: string | null;
  title: string;
  status: string;
  major: string;
  mentor_contact: string;
  post_id: number;
  onClick?: () => void;
  onComplete?: () => void;
}

export const ProgressCard = ({
  completed_at,
  title,
  status,
  major,
  mentor_contact,
  onClick,
  onComplete,
}: ProgressProps) => {
  const isReviewSubmitted = completed_at != null;

  return (
    <Flex
      width="100%"
      justifyContent="space-between"
      paddingTop="24px"
      paddingBottom="24px"
      paddingLeft="24px"
      paddingRight="24px"
      borderBottom={`1px solid ${colors.gray[100]}`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
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
        onClick={(e) => { e?.stopPropagation(); onComplete?.(); }}
        backgroundColor={isReviewSubmitted ? colors.gray[100] : undefined}
        color={isReviewSubmitted ? colors.gray[500] : undefined}
        disabled={isReviewSubmitted}
      >
        {isReviewSubmitted ? "리뷰 완료" : "완료하기"}
      </Button>
    </Flex>
  );
};
