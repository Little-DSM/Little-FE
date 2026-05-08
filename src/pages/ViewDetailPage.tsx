import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MajorTag } from '../components/MajorTag';
import { ParticModal } from '../components/ParticModal';
import { colors, Flex, Text } from '../styles/theme';
import styled from '@emotion/styled';
import Button from '../components/Button';
import { usePostDetail, useApplyAsMentor } from '../hooks/usePosts';
import { useAuth } from '../context/AuthContext';
import defaultImg from '../assets/default_img.png';

export const ViewDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const postId = Number(id);
  const { user } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, isError } = usePostDetail(postId);
  const { mutate: apply, isPending: isApplying } = useApplyAsMentor(postId);

  if (isLoading) {
    return <Text fontSize={16} color={colors.gray[600]}>불러오는 중...</Text>;
  }

  if (isError || !data) {
    return <Text fontSize={16} color={colors.gray[600]}>게시글을 찾을 수 없습니다.</Text>;
  }

  const isAuthor = user?.id === data.author.id;
  const formattedDate = data.created_at.split('T')[0];
  const handleAuthorClick = () => {
    navigate(isAuthor ? '/main/my' : `/main/mentor/${data.author.id}`);
  };

  const handleApply = () => {
    apply(undefined, {
      onSuccess: () => alert('지원이 완료되었습니다!'),
      onError: (err: any) => alert(err?.response?.data?.detail ?? '지원에 실패했습니다.'),
    });
  };

  return (
    <>
      <Flex isColumn gap={60} width="100%">
        <Flex justifyContent="space-between" width="100%">
          <Flex gap={40}>
            <Img src={data.image_url ?? defaultImg} alt={data.title} onError={(e) => { e.currentTarget.src = defaultImg; }} />
            <Flex isColumn gap={20}>
              <Text fontWeight={600} fontSize={24}>
                {data.title}
              </Text>
              <Flex gap={12} alignItems="center">
                <AuthorButton type="button" onClick={handleAuthorClick}>
                  <Text fontSize={16}>{data.author.name}</Text>
                </AuthorButton>
                <Text fontSize={16} color={colors.gray[500]}>
                  {formattedDate}
                </Text>
              </Flex>
              <Flex gap={4}>
                <MajorTag major={data.major} variant="dark" />
              </Flex>
            </Flex>
          </Flex>
          <Flex gap={8}>
            {isAuthor ? (
              <>
                <Button onClick={() => setIsModalOpen(true)}>지원자 목록</Button>
                <Button
                  onClick={() => navigate(`/main/edit/${postId}`)}
                  backgroundColor={colors.gray[50]}
                  color={colors.gray[900]}
                >
                  수정
                </Button>
              </>
            ) : (
              <Button onClick={handleApply} disabled={isApplying}>
                {isApplying ? '지원 중...' : '지원하기'}
              </Button>
            )}
          </Flex>
        </Flex>
        <Flex isColumn gap={12}>
          <Text fontSize={20} fontWeight={600}>
            멘토링 내용
          </Text>
          <Text fontSize={20} fontWeight={400}>
            {data.description}
          </Text>
        </Flex>
      </Flex>

      <ParticModal
        isOpen={isModalOpen}
        postId={postId}
        onClose={() => setIsModalOpen(false)}
        onPrev={() => setIsModalOpen(false)}
      />
    </>
  );
};

const Img = styled.img`
  width: 427px;
  height: 285px;
  border-radius: 10px;
  background-color: #e7e7e7;
  object-fit: cover;
`;

const AuthorButton = styled.button`
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
`;
