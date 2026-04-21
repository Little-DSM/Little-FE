import { apiClient } from './client';
import type { AuthTokenPairResponse } from '../types/api';

export const loginDemo = (user_id: number) =>
  apiClient.post<AuthTokenPairResponse>('/auth/login', { user_id }).then((r) => r.data);

export const refreshTokenApi = (refresh_token: string) =>
  apiClient.post<AuthTokenPairResponse>('/auth/refresh', { refresh_token }).then((r) => r.data);

export const logoutApi = (refresh_token: string) =>
  apiClient.post('/auth/logout', { refresh_token });

export const getGoogleLoginUrl = (frontendRedirectUri?: string) =>
  apiClient
    .get<{ authorization_url: string; state: string }>('/auth/google/login', {
      params: frontendRedirectUri
        ? { frontend_redirect_uri: frontendRedirectUri }
        : undefined,
    })
    .then((r) => r.data);

export const googleCallbackApi = (code: string, state: string) =>
  apiClient
    .post<AuthTokenPairResponse>('/auth/google/callback', { code, state })
    .then((r) => r.data);

export const googleTokenLogin = (id_token: string) =>
  apiClient
    .post<AuthTokenPairResponse>('/auth/google/token', { id_token })
    .then((r) => r.data);
