import { ProgressCard } from "../components";
import { colors, Flex, Text } from "../styles/theme";

const DUMMY_PROGRESS = [
  {
    id: 1,
    title: "React가 알고 싶어요!",
    status: "진행중",
    major: "Frontend",
    phone: "010-3000-2000",
  },
  {
    id: 2,
    title: "Next.js 멘토링 부탁드려요!",
    status: "진행중",
    major: "Frontend",
    phone: "010-1234-5678",
  },
  {
    id: 3,
    title: "TypeScript 기초 도와주세요",
    status: "진행중",
    major: "Frontend",
    phone: "010-9876-5432",
  },
  {
    id: 4,
    title: "알고리즘 스터디 같이해요",
    status: "진행중",
    major: "Frontend",
    phone: "010-3000-2000",
  },
];

export const ProgressPage = () => {
  return (
    <Flex
      width="100%"
      height="80vh"
      paddingTop="40px"
      paddingLeft="80px"
      gap={24}
      isColumn={true}
    >
      <Flex isColumn={true} gap={4} width="100%">
        <Text fontSize={16} fontWeight={500} color={`${colors.gray[600]}`}>
          진행 상황을 알고 싶다면..?
        </Text>
        <Text fontSize={20} fontWeight={700}>
          나의 진행 상황
        </Text>
      </Flex>

      <Flex isColumn={true} width="100%" alignItems="flex-start">
        {DUMMY_PROGRESS.map((progress) => (
          <ProgressCard
            key={progress.id}
            title={progress.title}
            status={progress.status}
            major={progress.major}
            phone={progress.phone}
          />
        ))}
      </Flex>
    </Flex>
  );
};
