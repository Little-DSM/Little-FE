import { useSearchParams } from 'react-router-dom';
import { Post } from '../components/Post';
import { colors, Flex, Text } from '../styles/theme';
import { usePosts } from '../hooks/usePosts';

export const ViewAllPage = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') ?? undefined;
  const major = searchParams.get('major') ?? undefined;

  const { data: posts, isLoading, isError } = usePosts({ keyword, major });

  if (isLoading) {
    return (
      <Flex isColumn gap={24} width="100%">
        <Text fontSize={16} color={colors.gray[600]}>불러오는 중...</Text>
      </Flex>
    );
  }

  if (isError) {
    return (
      <Flex isColumn gap={24} width="100%">
        <Text fontSize={16} color={colors.gray[600]}>게시글을 불러올 수 없습니다.</Text>
      </Flex>
    );
  }

  return (
    <Flex isColumn gap={24} width="100%">
      <Flex gap={4} isColumn>
        <Text fontSize={16} color={colors.gray[600]}>
          뭘 좋아할지 몰라 다 준비했어...
        </Text>
        <Text fontSize={20} color={colors.gray[1000]}>
          오늘의 추천 멘토링
        </Text>
      </Flex>
      {posts?.length === 0 ? (
        <Text fontSize={16} color={colors.gray[500]}>게시글이 없습니다.</Text>
      ) : (
        <Flex gap={32} flexWrap="wrap" width="100%">
          {posts?.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              title={post.title}
              date={post.created_at}
              image_url={post.image_url}
              major={post.major}
            />
          ))}
        </Flex>
      )}
    </Flex>
  );
};
