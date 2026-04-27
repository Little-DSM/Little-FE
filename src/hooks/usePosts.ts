import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getPosts,
  getPostDetail,
  createPost,
  updatePost,
  deletePost,
  getApplications,
  applyAsMentor,
  selectMentor,
  getSelectedMentor,
  createReview,
} from '../api/posts';
import type {
  MentoringPostCreate,
  MentoringPostUpdate,
  MentorSelectRequest,
  ReviewCreateRequest,
} from '../types/api';

export const postKeys = {
  all: ['posts'] as const,
  list: (params?: { keyword?: string; major?: string }) =>
    [...postKeys.all, 'list', params] as const,
  detail: (id: number) => [...postKeys.all, 'detail', id] as const,
  applications: (id: number) => [...postKeys.all, 'applications', id] as const,
  selectedMentor: (id: number) => [...postKeys.all, 'selected-mentor', id] as const,
};

export const usePosts = (params?: { keyword?: string; major?: string }) =>
  useQuery({
    queryKey: postKeys.list(params),
    queryFn: () => getPosts(params),
  });

export const usePostDetail = (post_id: number) =>
  useQuery({
    queryKey: postKeys.detail(post_id),
    queryFn: () => getPostDetail(post_id),
    enabled: !!post_id,
  });

export const useApplications = (post_id: number, enabled = true) =>
  useQuery({
    queryKey: postKeys.applications(post_id),
    queryFn: () => getApplications(post_id),
    enabled: !!post_id && enabled,
  });

export const useSelectedMentor = (post_id: number, enabled = true) =>
  useQuery({
    queryKey: postKeys.selectedMentor(post_id),
    queryFn: () => getSelectedMentor(post_id),
    enabled: !!post_id && enabled,
  });

export const useCreatePost = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: MentoringPostCreate) => createPost(body),
    onSuccess: () => qc.invalidateQueries({ queryKey: postKeys.all }),
  });
};

export const useUpdatePost = (post_id: number) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: MentoringPostUpdate) => updatePost(post_id, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: postKeys.detail(post_id) });
      qc.invalidateQueries({ queryKey: postKeys.all });
    },
  });
};

export const useDeletePost = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (post_id: number) => deletePost(post_id),
    onSuccess: () => qc.invalidateQueries({ queryKey: postKeys.all }),
  });
};

export const useApplyAsMentor = (post_id: number) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => applyAsMentor(post_id),
    onSuccess: () => qc.invalidateQueries({ queryKey: postKeys.applications(post_id) }),
  });
};

export const useSelectMentor = (post_id: number) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: MentorSelectRequest) => selectMentor(post_id, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: postKeys.applications(post_id) });
      qc.invalidateQueries({ queryKey: postKeys.selectedMentor(post_id) });
    },
  });
};

export const useCreateReview = (post_id: number) =>
  useMutation({
    mutationFn: (body: ReviewCreateRequest) => createReview(post_id, body),
  });
