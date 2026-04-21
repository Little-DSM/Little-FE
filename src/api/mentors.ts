import { apiClient } from './client';
import type { MentorDetailResponse, MentorReviewSummaryResponse } from '../types/api';

export const getMentorDetail = (mentor_id: number) =>
  apiClient.get<MentorDetailResponse>(`/mentors/${mentor_id}`).then((r) => r.data);

export const getMentorReviews = (mentor_id: number) =>
  apiClient
    .get<MentorReviewSummaryResponse>(`/mentors/${mentor_id}/reviews`)
    .then((r) => r.data);
