import { useQuery } from '@tanstack/react-query';
import { platformStatsService } from '../services/platform-stats.service';

export function usePlatformStats() {
  return useQuery({
    queryKey: ['public-platform-stats'],
    queryFn: () => platformStatsService.get(),
    staleTime: 60_000,
  });
}
