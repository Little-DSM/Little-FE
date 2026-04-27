import { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { colors, Flex, Text } from '../styles/theme';
import { BlueStar, GrayStar } from '../assets';
import Input from '../components/Input';
import Button from '../components/Button';
import { useCreateReview } from '../hooks/usePosts';

export const ReviewPage = () => {
  const { post_id } = useParams<{ post_id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const mentorName: string = location.state?.mentor_name ?? '멘토';

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { mutate: createReview, isPending } = useCreateReview(Number(post_id));

  const handleSubmit = () => {
    if (rating === 0) {
      alert('별점을 선택해주세요.');
      return;
    }
    createReview(
      { rating, comment },
      {
        onSuccess: () => navigate('/main/progress'),
        onError: (err: any) =>
          alert(err?.response?.data?.detail ?? '리뷰 등록에 실패했습니다.'),
      },
    );
  };

  return (
    <Flex width="100%" isColumn gap={60} alignItems="center" paddingTop="60px" paddingBottom="80px">
      <Flex width="100%" justifyContent="flex-end">
        <Button
          onClick={() => navigate('/main/progress')}
          backgroundColor={colors.gray[50]}
          color={colors.gray[900]}
        >
          이전
        </Button>
      </Flex>

      <Flex isColumn gap={40} alignItems="center" width="100%">
        <Text fontSize={24} fontWeight={700}>
          {mentorName} 님과의 멘토링 어떠셨나요?
        </Text>

        <StarRow>
          {[1, 2, 3, 4, 5].map((n) => (
            <StarBtn key={n} onClick={() => setRating(n)}>
              <img
                src={n <= rating ? BlueStar : GrayStar}
                alt={`${n}점`}
                width={40}
                height={40}
              />
            </StarBtn>
          ))}
        </StarRow>

        <FormSection>
          <Input
            label="한줄 리뷰"
            placeholder="간단한 한줄 리뷰를 작성해주세요!"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </FormSection>

        <Button onClick={handleSubmit} disabled={isPending}>
          {isPending ? '등록 중...' : '리뷰 등록하기'}
        </Button>
      </Flex>
    </Flex>
  );
};

const StarRow = styled.div`
  display: flex;
  gap: 12px;
`;

const StarBtn = styled.button`
  cursor: pointer;
  background: none;
  padding: 4px;
  border-radius: 4px;
  transition: transform 0.1s;
  &:hover { transform: scale(1.15); }
`;

const FormSection = styled.div`
  width: 100%;
  max-width: 500px;
`;
