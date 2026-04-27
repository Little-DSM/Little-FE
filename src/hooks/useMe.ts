import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMe, updateMe, getMentoringProgress } from '../api/me';
import type { MyPageUpdateRequest } from '../types/api';

export const meKeys = {
  profile: ['me'] as const,
  progress: (status: string) => ['me', 'progress', status] as const,
};

export const useMe = () =>
  useQuery({
    queryKey: meKeys.profile,
    queryFn: getMe,
    enabled: !!localStorage.getItem('access_token'),
  });

export const useUpdateMe = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: MyPageUpdateRequest) => updateMe(body),
    onSuccess: () => qc.invalidateQueries({ queryKey: meKeys.profile }),
  });
};

export const useMentoringProgress = (status: 'all' | 'in_progress' | 'completed' = 'all') =>
  useQuery({
    queryKey: meKeys.progress(status),
    queryFn: () => getMentoringProgress(status),
    enabled: !!localStorage.getItem('access_token'),
  });
