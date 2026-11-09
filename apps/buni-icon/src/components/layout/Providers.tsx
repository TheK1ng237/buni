'use client';

import * as React from 'react';
import { ToastProvider } from '@buni/ui';

export function Providers({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
}

