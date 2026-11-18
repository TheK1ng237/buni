import { get } from '@buni/api';

export interface PlatformStats {
  totalPatterns: number;
  totalArtisans: number;
  totalDownloads: number;
  totalViews: number;
  totalCountries: number;
  totalSymbols: number;
}

export const platformStatsService = {
  async get(): Promise<PlatformStats> {
    const response = await get<{ success: boolean; data: PlatformStats }>(
      '/api/v1/activities/stats'
    );
    return response.data;
  },
};
