import { get } from '@buni/api';

export interface DashboardStats {
  patternsCreated: number;
  downloadsTotal: number;
  totalViews: number;
  favoritesCount: number;
  trends: {
    patternsTrend: string;
    downloadsTrend: string;
    viewsTrend: string;
    favoritesTrend: string;
  };
}

export interface ActivityStats {
  total: number;
  downloads: number;
  favorites: number;
  comments: number;
  reviews: number;
}

export interface DashboardActivity {
  id: string;
  action: string;
  target: string;
  timestamp: string;
  actor?: string;
  type: 'comment' | 'download' | 'review' | 'favorite';
}

const GLOBAL_ACTIVITY_LABELS: Record<string, Pick<DashboardActivity, 'action' | 'type'>> = {
  CREATED: { action: 'a créé', type: 'review' },
  UPDATED: { action: 'a modifié', type: 'review' },
  PUBLISHED: { action: 'a publié', type: 'review' },
  DELETED: { action: 'a supprimé', type: 'review' },
  AUTHENTICATED: { action: 's’est connecté', type: 'review' },
  COMMENTED: { action: 'Commentaire sur', type: 'comment' },
  DOWNLOADED: { action: 'Téléchargement de', type: 'download' },
  REVIEWED: { action: 'Validation approuvée —', type: 'review' },
  FAVORITED: { action: 'Favori ajouté sur', type: 'favorite' },
};

export interface UserPattern {
  id: string;
  name: string;
  type: string;
  imgUrl?: string;
  status: 'published' | 'draft' | 'review';
  viewCount: number;
  downloadCount: number;
  slug?: string;
}

class DashboardService {
  async getStats(): Promise<DashboardStats> {
    const response = await get<{ success: boolean; data: DashboardStats }>(
      '/api/v1/users/me/stats'
    );
    return response.data;
  }

  async getActivityStats(): Promise<ActivityStats> {
    const response = await get<{ success: boolean; data: ActivityStats }>(
      '/api/v1/activities/me/stats'
    );
    return response.data;
  }

  async getRecentPatterns(limit: number = 5): Promise<UserPattern[]> {
    try {
      const response = await get<{ success: boolean; data: any[] }>(
        `/api/v1/users/me/patterns?limit=${limit}`
      );
      return (response.data || []).map((p: any) => ({
        id: p.id,
        name: p.name,
        type: p.type,
        imgUrl: p.imgUrl,
        status: p.status,
        viewCount: p.views || 0,
        downloadCount: p.downloads || 0,
        slug: p.slug,
      }));
    } catch (error) {
      console.error('Failed to fetch patterns:', error);
      return [];
    }
  }

  async getActivity(limit: number = 6): Promise<DashboardActivity[]> {
    try {
      const response = await get<{ success: boolean; data: DashboardActivity[] }>(
        `/api/v1/users/me/activity?limit=${limit}`
      );
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch activity:', error);
      return [];
    }
  }

  async getGlobalRecentPatterns(limit: number = 5): Promise<UserPattern[]> {
    try {
      const response = await get<{ success: boolean; data: any[] }>(
        `/api/v1/patterns/recent/global?limit=${limit}`
      );
      return (response.data || []).map((p: any) => ({
        id: p.id,
        name: p.name,
        type: p.type,
        imgUrl: p.imgUrl,
        status: p.status?.toLowerCase() as 'published' | 'draft' | 'review',
        viewCount: p.views || 0,
        downloadCount: p.downloads || 0,
        slug: p.slug,
      }));
    } catch (error) {
      console.error('Failed to fetch global recent patterns:', error);
      return [];
    }
  }

  async getGlobalActivity(limit: number = 6): Promise<DashboardActivity[]> {
    const response = await get<{
      success: boolean;
      data: Array<{
        id: string;
        action: string;
        target: string;
        targetId: string;
        createdAt: string;
        actorName: string | null;
        actorEmail: string;
      }>;
    }>(`/api/v1/activities/global?perPage=${limit}`);
    return (response.data ?? []).map((activity) => {
      const action =
        GLOBAL_ACTIVITY_LABELS[activity.action] ??
        ({
          action: `${activity.action.toLocaleLowerCase().replaceAll('_', ' ')} —`,
          type: 'review',
        } satisfies Pick<DashboardActivity, 'action' | 'type'>);
      return {
        id: activity.id,
        ...action,
        target: activity.target || activity.targetId,
        timestamp: activity.createdAt,
        actor: activity.actorName || activity.actorEmail,
      };
    });
  }
}

export const dashboardService = new DashboardService();
