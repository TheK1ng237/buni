'use client';

import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@buni/auth';
import { useRouter } from 'next/navigation';
import type { Route } from 'next';
import { useLocale } from '@/i18n';
import { authService } from '../services/auth.service';

export const useGithubLogin = () => {
  const { setUser, setToken } = useAuthStore();
  const router = useRouter();
  const { locale } = useLocale();

  const mutation = useMutation({
    mutationFn: async (accessToken: string) => {
      const response = await authService.githubLogin(accessToken);

      if (!response.success) {
        throw new Error('GitHub login failed');
      }

      return response;
    },
    onSuccess: (data) => {
      setUser(data.data.user);
      setToken(data.data.tokens.accessToken);
      router.replace(`/${locale}/dashboard` as Route);
    },
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};
