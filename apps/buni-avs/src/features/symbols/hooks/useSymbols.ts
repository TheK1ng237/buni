'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@buni/auth';
import {
  createSymbol,
  deleteSymbol,
  listManagedSymbols,
  listSymbols,
  updateSymbol,
  updateSymbolStatus,
} from '../usecases/symbol.usecases';
import type { SymbolEntry, SymbolInput, SymbolRecord } from '../types/symbol.types';

export const symbolKeys = {
  all: ['symbols'] as const,
  managed: ['symbols', 'managed'] as const,
};

export function useSymbols(fallback: SymbolEntry[]) {
  return useQuery({
    queryKey: symbolKeys.all,
    queryFn: () => listSymbols(fallback),
    placeholderData: fallback,
    staleTime: 60_000,
  });
}

export function useManagedSymbols() {
  const { user } = useAuth();
  return useQuery({
    queryKey: [...symbolKeys.managed, user?.id],
    queryFn: listManagedSymbols,
    enabled: Boolean(user?.id),
  });
}

export function useCreateSymbol() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      patternId,
      data,
      image,
    }: {
      patternId: string | null;
      data: SymbolInput;
      image?: File;
    }) => createSymbol(patternId, data, image),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: symbolKeys.all }),
  });
}

export function useUpdateSymbol() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data, image }: { id: string; data: SymbolInput; image?: File }) =>
      updateSymbol(id, data, image),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: symbolKeys.all }),
  });
}

export function useUpdateSymbolStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: SymbolRecord['status'] }) =>
      updateSymbolStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: symbolKeys.all }),
  });
}

export function useDeleteSymbol() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteSymbol(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: symbolKeys.all }),
  });
}
