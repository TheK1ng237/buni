'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@buni/auth';
import { useTranslations } from '@/i18n';
import { formatNumber, timeAgo } from '@buni/utils';
import { KpiCard } from '@buni/ui';
import { 
  Activity, Download, Eye, Heart, MessageSquare, 
  Clock, Filter, TrendingUp, ArrowUpRight, 
  Layers, Star, ChevronRight 
} from 'lucide-react';
import { dashboardService, DashboardActivity } from '@/features/dashboard/services/dashboard.service';

// ─────────────────────────────────────────────────────────────────────────────
// ACTIVITY CONFIG
// ─────────────────────────────────────────────────────────────────────────────

function getActivityConfig(t: any): Record<string, { icon: any; color: string; label: string; patternCss: string }> {
  return {
    download: { icon: Download, color: '#4F7CFF', label: t('types.download'), patternCss: 'avs-pattern-ndop-sultan' },
    favorite: { icon: Heart, color: '#EC4899', label: t('types.favorite'), patternCss: 'avs-pattern-adinkra-sankofa' },
    comment: { icon: MessageSquare, color: '#8B5CF6', label: t('types.comment'), patternCss: 'avs-pattern-bogolan-fanga' },
    review: { icon: Star, color: '#F59E0B', label: t('types.review'), patternCss: 'avs-pattern-wax-dakar' },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// PANEL WRAPPER
// ─────────────────────────────────────────────────────────────────────────────

function Panel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-avs-accent/8 bg-avs-secondary overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

function PanelHeader({ title, patternCss }: { title: string; patternCss: string }) {
  return (
    <div className="flex items-center gap-2.5 border-b border-avs-accent/8 px-5 py-4">
      <div className={`${patternCss} h-5 w-5 overflow-hidden rounded-md opacity-90`} aria-hidden />
      <h3 className="text-[13px] font-bold text-avs-accent">{title}</h3>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ACTIVITY ITEM
// ─────────────────────────────────────────────────────────────────────────────

function ActivityItem({ item, index, t }: { item: DashboardActivity; index: number; t: any }) {
  const config = getActivityConfig(t)[item.type];
  if (!config) return null;
  const Icon = config.icon;
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: 'easeOut' }}
      className="overflow-hidden rounded-xl border border-avs-accent/6 bg-avs-secondary transition-all hover:border-avs-primary/20 hover:bg-avs-primary/[0.02]"
    >
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
        className="group flex w-full items-center gap-4 p-4 text-left"
      >
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
          style={{ background: `${config.color}14` }}
        >
          <Icon size={18} style={{ color: config.color }} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-avs-accent">
            {item.actor ? `${item.actor} ${item.action}` : item.action}
          </p>
          <p className="truncate text-xs text-avs-accent/45">{item.target}</p>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs text-avs-accent/40">
          <Clock size={13} />
          {timeAgo(item.timestamp)}
        </div>

        <ChevronRight
          className={`shrink-0 text-avs-accent/20 transition-all group-hover:text-avs-primary/40 ${expanded ? 'rotate-90' : ''}`}
          size={16}
        />
      </button>
      {expanded && (
        <div className="space-y-1 border-t border-avs-accent/6 px-4 pb-4 pt-3 pl-[4.5rem] text-xs text-avs-accent/55">
          <p>{t('details.action')}: {item.action}</p>
          <p>{t('details.target')}: {item.target}</p>
          {item.actor && <p>{t('details.actor')}: {item.actor}</p>}
          <p>{t('details.date')}: {new Date(item.timestamp).toLocaleString()}</p>
        </div>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function ActivityPage() {
  const t = useTranslations('dashboard.activity');
  const { user, isAuthenticated } = useAuth();
  const isSuperAdmin = user?.role.toLowerCase() === 'super_admin';
  const [filter, setFilter] = useState<string>('all');

  const { data: activities = [], isLoading, isError } = useQuery({
    queryKey: ['user-activity', filter, user?.id, isSuperAdmin],
    queryFn: () =>
      isSuperAdmin ? dashboardService.getGlobalActivity(100) : dashboardService.getActivity(50),
    enabled: !!user,
  });
  const { data: activityStats, isError: activityStatsError } = useQuery({
    queryKey: ['user-activity-stats', user?.id],
    queryFn: () => dashboardService.getActivityStats(),
    enabled: !!user && !isSuperAdmin,
  });

  const filteredActivities = filter === 'all'
    ? activities
    : activities.filter((a) => a.type === filter);
  const activityCountByFilter: Record<string, number | undefined> = {
    all: isSuperAdmin ? activities.length : activityStats?.total,
    download: isSuperAdmin
      ? activities.filter((activity) => activity.type === 'download').length
      : activityStats?.downloads,
    favorite: isSuperAdmin
      ? activities.filter((activity) => activity.type === 'favorite').length
      : activityStats?.favorites,
    comment: isSuperAdmin
      ? activities.filter((activity) => activity.type === 'comment').length
      : activityStats?.comments,
    review: isSuperAdmin
      ? activities.filter((activity) => activity.type === 'review').length
      : activityStats?.reviews,
  };
  const filteredActivityCount = activityCountByFilter[filter];

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-avs-accent/10 border-t-avs-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-avs-secondary">
      <div className="mx-auto max-w-5xl space-y-5 px-5 py-7 lg:px-8">
        {/* ══ HEADER ══════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl border border-avs-accent/9 bg-avs-secondary px-5 py-6 sm:px-7 sm:py-7"
        >
          <div className="avs-pattern-wax-dakar absolute inset-0 opacity-[0.03]" aria-hidden />
          <div className="relative">
            <div className="mb-2 flex items-center gap-2">
             
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-avs-primary">{t('title')}</span>
            </div>
            <h1 className="font-display text-2xl font-black leading-none text-avs-accent sm:text-3xl" style={{ letterSpacing: '-0.02em' }}>
              {t('title')}
            </h1>
            <p className="mt-1.5 text-sm text-avs-accent/50">{t('subtitle')}</p>
          </div>
        </motion.div>

        {/* ══ STATS ═══════════════════════════════════════════════════════ */}
        {!isSuperAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {[
              { label: t('stats.total'), value: activityStats?.total ?? '—', icon: Activity, color: '#C0573E', patternCss: 'avs-pattern-kente-royale', delay: 0.2 },
              { label: t('stats.downloads'), value: activityStats?.downloads ?? '—', icon: Download, color: '#4F7CFF', patternCss: 'avs-pattern-ndop-sultan', delay: 0.28 },
              { label: t('stats.favorites'), value: activityStats?.favorites ?? '—', icon: Heart, color: '#EC4899', patternCss: 'avs-pattern-adinkra-sankofa', delay: 0.36 },
              { label: t('stats.reviews'), value: activityStats?.reviews ?? '—', icon: Star, color: '#F59E0B', patternCss: 'avs-pattern-wax-dakar', delay: 0.44 },
            ].map((stat) => (
              <KpiCard key={String(stat.label)} {...stat} format={formatNumber} />
            ))}
          </motion.div>
        )}
        {!isSuperAdmin && activityStatsError && (
          <p role="status" className="text-sm text-red-600">
            {t('stats.unavailable')}
          </p>
        )}

        {/* ══ FILTRES ═════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-3 rounded-2xl border border-avs-accent/9 bg-avs-secondary p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 shrink-0 text-avs-accent/30" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-xl border border-avs-accent/12 bg-avs-secondary px-3.5 py-2.5 text-sm font-medium text-avs-accent outline-none transition-all focus:border-avs-primary/40 focus:ring-2 focus:ring-avs-primary/10"
            >
              <option value="all">{t('filter.all')}</option>
              <option value="download">{t('filter.downloads')}</option>
              <option value="favorite">{t('filter.favorites')}</option>
              <option value="comment">{t('filter.comments')}</option>
              <option value="review">{t('filter.reviews')}</option>
            </select>
          </div>
          <div className="whitespace-nowrap font-mono text-[11px] text-avs-accent/40">
            {filteredActivityCount ?? '—'} activité{filteredActivityCount !== 1 ? 's' : ''}
          </div>
        </motion.div>

        {/* ══ LISTE ═══════════════════════════════════════════════════════ */}
        {isLoading ? (
          <Panel>
            <div className="divide-y divide-avs-accent/6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-5 py-4">
                  <div className="h-10 w-10 animate-pulse rounded-xl bg-avs-accent/6 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-36 animate-pulse rounded bg-avs-accent/6" />
                    <div className="h-2.5 w-24 animate-pulse rounded bg-avs-accent/6" />
                  </div>
                  <div className="h-2 w-20 animate-pulse rounded bg-avs-accent/6" />
                </div>
              ))}
            </div>
          </Panel>
        ) : isError ? (
          <Panel>
            <p role="alert" className="px-5 py-8 text-center text-sm text-red-600">
              {t('loadError')}
            </p>
          </Panel>
        ) : filteredActivities.length === 0 ? (
          <Panel>
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
              <div className="avs-pattern-wax-dakar h-12 w-12 rounded-full ring-1 ring-avs-accent/10 opacity-40" aria-hidden />
              <div>
                <p className="text-sm font-semibold text-avs-accent/40">
                  {filter === 'all' ? t('empty.all') : t('empty.filtered', { type: t(`types.${filter}`) })}
                </p>
                <p className="mt-0.5 text-xs text-avs-accent/30">
                  {filter === 'all' ? t('empty.tryExplore') : t('empty.tryFilter')}
                </p>
              </div>
            </div>
          </Panel>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-3"
          >
            {filteredActivities.map((item, index) => (
              <ActivityItem key={item.id} item={item} index={index} t={t} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
