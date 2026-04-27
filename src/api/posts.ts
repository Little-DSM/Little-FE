import { apiClient } from './client';
import type {
  MentoringPostCreate,
  MentoringPostDetail,
  MentoringPostListItem,
  MentoringPostUpdate,
  MentorApplicationsResponse,
  MentorSelectRequest,
  MentorSelectResponse,
  ReviewCreateRequest,
  ReviewResponse,
} from '../types/api';

export const getPosts = (params?: { keyword?: string; major?: string }) =>
  apiClient.get<MentoringPostListItem[]>('/posts', { params }).then((r) => r.data);

export const getPostDetail = (post_id: number) =>
  apiClient.get<MentoringPostDetail>(`/posts/${post_id}`).then((r) => r.data);

export const createPost = (body: MentoringPostCreate) =>
  apiClient.post<MentoringPostDetail>('/posts', body).then((r) => r.data);

export const updatePost = (post_id: number, body: MentoringPostUpdate) =>
  apiClient.patch<MentoringPostDetail>(`/posts/${post_id}`, body).then((r) => r.data);

export const deletePost = (post_id: number) =>
  apiClient.delete(`/posts/${post_id}`);

export const getApplications = (post_id: number) =>
  apiClient
    .get<MentorApplicationsResponse>(`/posts/${post_id}/applications`)
    .then((r) => r.data);

export const applyAsMentor = (post_id: number) =>
  apiClient.post(`/posts/${post_id}/apply`).then((r) => r.data);

export const selectMentor = (post_id: number, body: MentorSelectRequest) =>
  apiClient
    .post<MentorSelectResponse>(`/posts/${post_id}/select-mentor`, body)
    .then((r) => r.data);

export const getSelectedMentor = (post_id: number) =>
  apiClient.get<MentorSelectResponse>(`/posts/${post_id}/selected-mentor`).then((r) => r.data);

export const createReview = (post_id: number, body: ReviewCreateRequest) =>
  apiClient.post<ReviewResponse>(`/posts/${post_id}/review`, body).then((r) => r.data);
