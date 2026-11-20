'use client';

import { useAuth } from '@buni/auth';
import { Route } from 'next';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isAuthenticated, isHydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      const params = new URLSearchParams({ expired: 'true' });
      router.replace('/auth/login?' + params.toString() as Route);
    }
  }, [isHydrated, isAuthenticated, router]);

  if (!isHydrated || !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
