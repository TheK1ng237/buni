'use client';

// =============================================================================
// Hook — usePatternActions
// Gère les actions sur les patterns avec optimistic updates et invalidation
// - feature / unfeature
// - updateStatus
// - delete
// =============================================================================

import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Pattern, PatternStatus } from '../types';
import {
  featurePattern,
  unfeaturePattern,
  updatePatternStatus,
  deletePattern,
} from '../usecases/pattern-actions.usecase';
import { patternKeys } from './usePatterns';

/**
 * Hook pour mettre en avant un pattern
 */
export function useFeaturePattern() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: featurePattern,
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: patternKeys.all });

      qc.setQueriesData<Pattern[]>({ queryKey: patternKeys.all }, (old) =>
        old?.map((p) =>
          p.id === id ? { ...p, featured: true, updatedAt: new Date().toISOString() } : p
        )
      );
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: patternKeys.all });
    },
  });
}

/**
 * Hook pour retirer la mise en avant d'un pattern
 */
export function useUnfeaturePattern() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: unfeaturePattern,
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: patternKeys.all });

      qc.setQueriesData<Pattern[]>({ queryKey: patternKeys.all }, (old) =>
        old?.map((p) =>
          p.id === id ? { ...p, featured: false, updatedAt: new Date().toISOString() } : p
        )
      );
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: patternKeys.all });
    },
  });
}

/**
 * Hook composé pour toggle feature/unfeature
 */
export function useToggleFeature() {
  const feature = useFeaturePattern();
  const unfeature = useUnfeaturePattern();

  return {
    mutate: (id: string, shouldFeature: boolean) => {
      if (shouldFeature) {
        return feature.mutate(id);
      } else {
        return unfeature.mutate(id);
      }
    },
    isLoading: feature.isPending || unfeature.isPending,
    isError: feature.isError || unfeature.isError,
    error: feature.error || unfeature.error,
  };
}

/**
 * Hook pour mettre à jour le statut d'un pattern
 */
export function useUpdateStatus() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: PatternStatus }) => updatePatternStatus(id, status),
    onMutate: async ({ id, status }) => {
      await qc.cancelQueries({ queryKey: patternKeys.all });

      qc.setQueriesData<Pattern[]>({ queryKey: patternKeys.all }, (old) =>
        old?.map((p) =>
          p.id === id ? { ...p, status, updatedAt: new Date().toISOString() } : p
        )
      );
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: patternKeys.all });
    },
  });
}

/**
 * Hook pour supprimer un pattern
 */
export function useDeletePattern() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePattern(id),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: patternKeys.all });
    },
  });
}
