import { useQuery } from '@tanstack/react-query';
import { getMentorDetail, getMentorReviews } from '../api/mentors';

export const mentorKeys = {
  detail: (id: number) => ['mentors', 'detail', id] as const,
  reviews: (id: number) => ['mentors', 'reviews', id] as const,
};

export const useMentorDetail = (mentor_id: number) =>
  useQuery({
    queryKey: mentorKeys.detail(mentor_id),
    queryFn: () => getMentorDetail(mentor_id),
    enabled: !!mentor_id,
  });

export const useMentorReviews = (mentor_id: number | undefined, enabled = true) =>
  useQuery({
    queryKey: mentorKeys.reviews(mentor_id!),
    queryFn: () => getMentorReviews(mentor_id!),
    enabled: !!mentor_id && enabled,
  });
