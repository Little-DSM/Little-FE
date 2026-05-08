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
  my_role: 'MENTEE' | 'MENTOR';
  title: string;
  status: string;
  major: string;
  counterpart_contact: string;
  post_id: number;
  onClick?: () => void;
  onComplete?: () => void;
}

export const ProgressCard = ({
  completed_at,
  my_role,
  title,
  status,
  major,
  counterpart_contact,
  onClick,
  onComplete,
}: ProgressProps) => {
  const isReviewSubmitted = completed_at != null;
  const isMentee = my_role === 'MENTEE';
  const canReview = isMentee && !isReviewSubmitted;
  const buttonLabel = isMentee
    ? isReviewSubmitted
      ? '리뷰 완료'
      : '완료하기'
    : isReviewSubmitted
      ? '리뷰 남겨짐'
      : '리뷰 대기';

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
              {counterpart_contact}
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Button
        onClick={(e) => { e?.stopPropagation(); onComplete?.(); }}
        backgroundColor={!canReview ? colors.gray[100] : undefined}
        color={!canReview ? colors.gray[500] : undefined}
        disabled={!canReview}
      >
        {buttonLabel}
      </Button>
    </Flex>
  );
};
