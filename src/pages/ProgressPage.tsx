import { ProgressCard } from "../components";
import { colors, Flex, Text } from "../styles/theme";
import { useMentoringProgress } from "../hooks/useMe";
import { useNavigate } from "react-router-dom";

export const ProgressPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useMentoringProgress();

  return (
    <Flex
      width="100%"
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
            completed_at={progress.completed_at}
            my_role={progress.my_role}
            title={progress.title}
            status={progress.status}
            major={progress.major}
            counterpart_contact={progress.counterpart_contact}
            post_id={progress.post_id}
            onClick={() => navigate(`/main/view/${progress.post_id}`)}
            onComplete={
              progress.completed_at || progress.my_role !== 'MENTEE'
                ? undefined
                : () =>
                    navigate(`/main/review/${progress.post_id}`, {
                      state: { mentor_name: progress.mentor_name },
                    })
            }
          />
        ))}
        {!isLoading && data?.items.length === 0 && (
          <Text fontSize={16} color={colors.gray[500]}>진행 중인 멘토링이 없습니다.</Text>
        )}
      </Flex>
    </Flex>
  );
};
