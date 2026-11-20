'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@buni/auth';

import type { Pattern, PatternFilters } from '../types';

import { loadPatterns } from '../usecases/load-patterns.usecase';

import { loadPattern } from '../usecases/load-pattern.usecase';

import { loadFeaturedPatterns } from '../usecases/load-featured-patterns.usecase';

// ─────────────────────────────────────────────────────────────
// Query Keys
// ─────────────────────────────────────────────────────────────

export const patternKeys = {
  all: ['patterns'] as const,

  lists: () => [...patternKeys.all, 'list'] as const,

  list: (filters: PatternFilters, authScope = 'public') =>
    [...patternKeys.lists(), authScope, filters] as const,

  details: () => [...patternKeys.all, 'detail'] as const,

  detail: (slug: string, authScope = 'public') =>
    [...patternKeys.details(), authScope, slug] as const,

  featured: () => [...patternKeys.all, 'featured'] as const,
};

// ─────────────────────────────────────────────────────────────
// Hooks
// ─────────────────────────────────────────────────────────────

export function usePatterns(filters: PatternFilters = {}) {
  const { isHydrated, user } = useAuth();
  const authScope = user ? `${user.id}:${user.role}` : 'public';

  return useQuery({
    queryKey: patternKeys.list(filters, authScope),

    queryFn: () => loadPatterns(filters),

    enabled: isHydrated,
    placeholderData: (prev) => prev,
  });
}

export function usePattern(slug: string) {
  const { isHydrated, user } = useAuth();
  const authScope = user ? `${user.id}:${user.role}` : 'public';

  return useQuery({
    queryKey: patternKeys.detail(slug, authScope),

    queryFn: () => loadPattern(slug),

    enabled: !!slug && isHydrated,

    staleTime: 5 * 60 * 1000,
  });
}

export function useFeaturedPatterns() {
  return useQuery({
    queryKey: patternKeys.featured(),

    queryFn: () => loadFeaturedPatterns(),

    staleTime: 10 * 60 * 1000,
  });
}
