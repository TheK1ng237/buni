import { PATTERNS_DOCS } from '../../patterns/mock';
import { mapPatternDtoToModel } from '@/features/patterns/mappers/pattern.mapper';
import type { Pattern, PatternDto } from '@/features/patterns/types';

interface SharePatternResponse {
  data?: PatternDto;
}

export async function getSharePattern(identifier: string): Promise<Pattern | undefined> {
  const staticPattern = PATTERNS_DOCS.find(
    (pattern) => pattern.id === identifier || pattern.slug === identifier,
  );
  if (staticPattern) return staticPattern;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
  const response = await fetch(
    `${apiUrl.replace(/\/$/, '')}/patterns/${encodeURIComponent(identifier)}/share`,
    { next: { revalidate: 300 } },
  );

  if (response.status === 404) return undefined;
  if (!response.ok) {
    throw new Error(`Pattern share lookup failed with status ${response.status}`);
  }

  const payload = (await response.json()) as SharePatternResponse;
  if (!payload.data) {
    throw new Error('Pattern share response did not contain pattern data');
  }

  return mapPatternDtoToModel(payload.data);
}
