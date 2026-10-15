'use client';

import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@buni/auth';
import { useRouter } from 'next/navigation';
import { authService } from '../services/auth.service';
import type { LoginDto } from '../types';

interface LoginResponse {
  success: boolean;
  data: {
    user: any;
    tokens?: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  };
}

export const useLogin = () => {
  const { setUser, setToken } = useAuthStore();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: LoginDto) => {
      const response = await authService.login(data);

      if (!response.success) {
        throw new Error(response.message || 'Login failed');
      }

      return response as LoginResponse;
    },
    onSuccess: (data) => {
      setUser(data.data.user);
      setToken(data.data.tokens?.accessToken ?? null);
      router.push('/dashboard');
    },
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};
