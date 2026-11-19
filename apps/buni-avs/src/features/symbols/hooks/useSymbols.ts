'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createSymbol,
  deleteSymbol,
  listManagedSymbols,
  listSymbols,
  updateSymbol,
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
  return useQuery({
    queryKey: symbolKeys.managed,
    queryFn: listManagedSymbols,
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

export function useDeleteSymbol() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteSymbol(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: symbolKeys.all }),
  });
}
