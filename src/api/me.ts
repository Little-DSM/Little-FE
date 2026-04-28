import { apiClient } from './client';
import type {
  MyPageResponse,
  MyPageUpdateRequest,
  MentoringProgressListResponse,
  MyPostListResponse,
} from '../types/api';

export const getMe = () =>
  apiClient.get<MyPageResponse>('/me').then((r) => r.data);

export const updateMe = (body: MyPageUpdateRequest) =>
  apiClient.patch<MyPageResponse>('/me', body).then((r) => r.data);

export const getMentoringProgress = (status: 'all' | 'in_progress' | 'completed' = 'all') =>
  apiClient
    .get<MentoringProgressListResponse>('/me/mentoring-progress', { params: { status } })
    .then((r) => r.data);

export const getMyPosts = () =>
  apiClient.get<MyPostListResponse>('/me/posts').then((r) => r.data);
