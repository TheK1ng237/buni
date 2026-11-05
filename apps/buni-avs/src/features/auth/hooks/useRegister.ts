'use client';

import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@buni/auth';
import { useRouter } from 'next/navigation';
import type { Route } from 'next';
import { useLocale } from '@/i18n';
import { authService } from '../services/auth.service';
import { RegisterSchema } from '../types';

export const useRegister = () => {
  const { setUser, setToken } = useAuthStore();
  const router = useRouter();
  const { locale } = useLocale();

  const mutation = useMutation({
    mutationFn: async (data: { name: string; email: string; password: string; confirmPassword: string }) => {
      // Remove confirmPassword before sending to backend
      const { confirmPassword, ...registerData } = data;
      const validatedData = RegisterSchema.parse(registerData);
      const response = await authService.register(validatedData);

      if (!response.success) {
        throw new Error(response.message || 'Registration failed');
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
