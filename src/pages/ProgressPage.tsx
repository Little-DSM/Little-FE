import { ProgressCard } from "../components";
import { colors, Flex, Text } from "../styles/theme";
import { useMentoringProgress } from "../hooks/useMe";

export const ProgressPage = () => {
  const { data, isLoading, isError } = useMentoringProgress();

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

      {isLoading && (
        <Text fontSize={16} color={colors.gray[500]}>불러오는 중...</Text>
      )}
      {isError && (
        <Text fontSize={16} color={colors.gray[500]}>진행 상황을 불러올 수 없습니다.</Text>
      )}

      <Flex isColumn={true} width="100%" alignItems="flex-start">
        {data?.items.map((progress) => (
          <ProgressCard
            key={progress.post_id}
            title={progress.title}
            status={progress.status}
            major={progress.major}
            mentor_contact={progress.mentor_contact}
          />
        ))}
        {!isLoading && data?.items.length === 0 && (
          <Text fontSize={16} color={colors.gray[500]}>진행 중인 멘토링이 없습니다.</Text>
        )}
      </Flex>
    </Flex>
  );
};
