'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Layers, Download, Eye, Heart, Plus, ArrowRight, ArrowUpRight,
  TrendingUp, MessageSquare, Check, Palette, User, Users, ChevronRight,
  Sparkles, BarChart2, Clock, Star, Activity, CheckCircle2, AlertCircle,
} from 'lucide-react';
import { useAuth, useLogout } from '@buni/auth';
import { useTranslations } from '@/i18n';
import { timeAgo, formatNumber, formatDate } from '@buni/utils';
import { KpiCard, KpiCardProps } from '@buni/ui';
import { useTheme } from 'next-themes';

import { Route } from 'next';
import { DashboardStats, UserPattern, DashboardActivity, dashboardService } from '@/features/dashboard/services/dashboard.service';
import { userService } from '@/features/user/services/user.service';
import ViewerDashboard from './viewer-dashboard';
import CuratorModal from '@/components/curator-modal';
import { CSS_PATTERN_MAP } from '@buni/patterns';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES & CONFIG
// ─────────────────────────────────────────────────────────────────────────────

function getStatusConfig(t: any): Record<string, { label: string; dot: string; ring: string; text: string }> {
  return {
    published: { label: t('status.published'), dot: '#10B981', ring: 'rgba(16,185,129,0.15)', text: '#10B981' },
    draft:     { label: t('status.draft'),     dot: '#6B7280', ring: 'rgba(107,114,128,0.15)', text: '#6B7280' },
    review:    { label: t('status.review'),    dot: '#F59E0B', ring: 'rgba(245,158,11,0.15)',  text: '#F59E0B' },
    rejected:  { label: t('status.rejected'),  dot: '#EF4444', ring: 'rgba(239,68,68,0.15)',   text: '#EF4444' },
  };
}

const ACTIVITY_CONFIG: Record<string, { icon: typeof MessageSquare; color: string }> = {
  comment:  { icon: MessageSquare, color: '#C0573E' },
  download: { icon: Download,      color: '#4F7CFF' },
  review:   { icon: Check,         color: '#10B981' },
  favorite: { icon: Heart,         color: '#F59E0B' },
};

// ─────────────────────────────────────────────────────────────────────────────
// SKELETON
// ─────────────────────────────────────────────────────────────────────────────

function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`rounded-md bg-avs-accent/6 animate-pulse ${className}`} />;
}

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATED COUNTER
// ─────────────────────────────────────────────────────────────────────────────

function useCounter(target: number, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let frame = 0;
    const totalFrames = Math.round(duration / 16);
    const timer = setInterval(() => {
      frame++;
      const progress = 1 - Math.pow(1 - frame / totalFrames, 3);
      setValue(Math.round(target * progress));
      if (frame >= totalFrames) { setValue(target); clearInterval(timer); }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return value;
}



// ─────────────────────────────────────────────────────────────────────────────
// HERO BANNER
// ─────────────────────────────────────────────────────────────────────────────

function HeroBanner({ patternsCount, t }: { patternsCount: number; t: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl bg-avs-accent"
    >
      <div className="avs-pattern-kente-royale absolute inset-0 opacity-[0.08]" aria-hidden />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(110deg, rgba(10,8,6,0.82) 0%, rgba(10,8,6,0.55) 55%, transparent 100%)' }}
        aria-hidden
      />
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border border-avs-secondary/5" aria-hidden />
      <div className="pointer-events-none absolute -right-8  -top-8  h-40 w-40 rounded-full border border-avs-secondary/8" aria-hidden />

      <div className="relative flex flex-col gap-6 px-8 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-lg">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-avs-primary/30 bg-avs-primary/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-avs-primary">
            <Sparkles size={8} aria-hidden /> {t('hero.badge')}
          </span>
          <h2 className="font-display mt-3 text-2xl font-black leading-snug text-avs-secondary sm:text-3xl">
            {t('hero.title', { count: patternsCount })}{' '}
            <span className="text-avs-primary">{t('hero.highlight')}</span>
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-avs-secondary/45">
            {t('hero.description')}
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap gap-3">
          <Link
            href={'/patternsDashboard/new' as Route}
            className="group inline-flex items-center gap-2.5 rounded-xl bg-avs-primary px-6 py-3 text-sm font-bold text-avs-secondary shadow-lg shadow-avs-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-avs-primary/35"
          >
            {t('hero.submitPattern')}
            <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
          </Link>
          <Link
            href={'/analytics' as Route}
            className="inline-flex items-center gap-2 rounded-xl border border-avs-secondary/15 px-6 py-3 text-sm font-semibold text-avs-secondary/55 transition-all duration-200 hover:border-avs-secondary/30 hover:text-avs-secondary/90"
          >
            <BarChart2 size={14} aria-hidden /> {t('hero.analytics')}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PATTERN ROW
// ─────────────────────────────────────────────────────────────────────────────

function PatternRow({ pattern, index, t }: { pattern: UserPattern; index: number; t: any }) {
  const status = getStatusConfig(t)[pattern.status] ?? getStatusConfig(t).draft!;
  const patCss =
    CSS_PATTERN_MAP[pattern.type.toLowerCase() as keyof typeof CSS_PATTERN_MAP] ??
    CSS_PATTERN_MAP.wax;

  return (
    <Link href={`/patternsDashboard/${pattern.slug || pattern.id}` as any}>
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, delay: index * 0.06, ease: 'easeOut' }}
        className="group flex items-center gap-4 px-5 py-3.5 transition-colors duration-150 hover:bg-avs-accent/3 cursor-pointer"
      >
        <div className={`${patCss} relative h-10 w-10 shrink-0 rounded-lg overflow-hidden ring-1 ring-avs-accent/10`}>
          <div className="absolute inset-0 bg-avs-accent/10" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold text-avs-accent transition-colors duration-150 group-hover:text-avs-primary">
            {pattern.name}
          </p>
          <p className="mt-0.5 text-[10px] font-mono font-medium uppercase tracking-[0.1em] text-avs-accent/35">
            {pattern.type}
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-[11px] text-avs-accent/35 tabular-nums">
          <span className="flex items-center gap-1"><Eye size={10} aria-hidden />{formatNumber(pattern.viewCount)}</span>
          <span className="flex items-center gap-1"><Download size={10} aria-hidden />{formatNumber(pattern.downloadCount)}</span>
        </div>

        <div
          className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold"
          style={{ background: status.ring, color: status.text }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: status.dot }} aria-hidden />
          {status.label}
        </div>

        <ChevronRight size={13} className="shrink-0 text-avs-accent/20 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-avs-primary" aria-hidden />
      </motion.div>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ACTIVITY ITEM
// ─────────────────────────────────────────────────────────────────────────────

function ActivityItem({ item, index }: { item: DashboardActivity; index: number }) {
  const conf = ACTIVITY_CONFIG[item.type] ?? ACTIVITY_CONFIG.comment!;
  const Icon = conf.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex items-start gap-3.5 px-5 py-3.5 hover:bg-avs-accent/3 transition-colors duration-150"
    >
      <div
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg mt-0.5"
        style={{ background: `${conf.color}14` }}
      >
        <Icon size={12} style={{ color: conf.color }} aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[12px] leading-snug text-avs-accent/55">
          {item.action}{' '}
          <span className="font-semibold text-avs-accent">{item.target}</span>
        </p>
        <p className="mt-1 flex items-center gap-1 text-[10px] font-mono text-avs-accent/30">
          <Clock size={8} aria-hidden /> {timeAgo(item.timestamp)}
        </p>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// QUICK ACTION CARD
// ─────────────────────────────────────────────────────────────────────────────

function QuickAction({
  href, icon: Icon, label, sub, accent = false,
}: { href: string; icon: React.ElementType; label: string; sub: string; accent?: boolean }) {
  return (
    <Link
      href={href as Route}
      className={`
        group relative flex flex-col gap-3 overflow-hidden rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5
        ${accent
          ? 'bg-avs-primary text-avs-secondary shadow-lg shadow-avs-primary/20 hover:shadow-xl hover:shadow-avs-primary/28'
          : 'border border-avs-accent/8 bg-avs-secondary text-avs-accent hover:border-avs-accent/18'
        }
      `}
    >
      {accent && (
        <div className="avs-pattern-kente-royale pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden />
      )}
      <div className={`
        relative flex h-8 w-8 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110
        ${accent ? 'bg-avs-secondary/15' : 'bg-avs-accent/6 group-hover:bg-avs-primary/10'}
      `}>
        <Icon size={15} aria-hidden />
      </div>
      <div className="relative">
        <p className="text-[13px] font-bold leading-tight">{label}</p>
        <p className={`mt-0.5 text-[11px] leading-snug ${accent ? 'text-avs-secondary/50' : 'text-avs-accent/40'}`}>
          {sub}
        </p>
      </div>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PANEL WRAPPER
// ─────────────────────────────────────────────────────────────────────────────

function Panel({
  children, className = '',
}: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-avs-accent/8 bg-avs-secondary overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

function PanelHeader({
  title, patternCss, href, linkLabel,
}: { title: string; patternCss: string; href?: string; linkLabel?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-avs-accent/8 px-5 py-4">
      <div className="flex items-center gap-2.5">
        <div className={`${patternCss} h-5 w-5 overflow-hidden rounded-md opacity-90`} aria-hidden />
        <h3 className="text-[13px] font-bold text-avs-accent">{title}</h3>
      </div>
      {href && linkLabel && (
        <Link
          href={href as Route}
          className="flex items-center gap-1 text-[11px] font-semibold text-avs-primary transition-colors hover:underline underline-offset-4"
        >
          {linkLabel} <ChevronRight size={10} aria-hidden />
        </Link>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROFILE STRIP
// ─────────────────────────────────────────────────────────────────────────────

function ProfileStrip({
  user, roleLabel, avatarPattern, t,
}: { user: any; roleLabel: string; avatarPattern: string; t: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.0, ease: [0.22, 1, 0.36, 1] }}
    >
      <Panel>
        <div className="flex flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className={`${avatarPattern} h-10 w-10 shrink-0 overflow-hidden rounded-xl ring-1 ring-avs-accent/10`} aria-hidden />
            <div>
              <p className="text-[14px] font-bold text-avs-accent">{user?.name ?? '—'}</p>
              <p className="text-[11px] text-avs-accent/40">{user?.email ?? '—'}</p>
            </div>
            <span className="ml-1 hidden rounded-full border border-avs-primary/25 bg-avs-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-avs-primary sm:inline-flex">
              {roleLabel}
            </span>
            {user?.verified ? (
              <span className="ml-1 hidden sm:inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-emerald-500">
                <CheckCircle2 size={10} aria-hidden /> {t('profile.verification.verified')}
              </span>
            ) : (
              <span className="ml-1 hidden sm:inline-flex items-center gap-1 rounded-full border border-amber-500/25 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-amber-500">
                <AlertCircle size={10} aria-hidden /> {t('profile.verification.notVerified')}
              </span>
            )}
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            {user?.createdAt && (
              <div>
                <p className="font-mono uppercase tracking-widest text-avs-accent/30">{t('profile.memberSince')}</p>
                <p className="mt-0.5 font-semibold text-avs-accent">
                  {formatDate(user.createdAt)}
                </p>
              </div>
            )}
            <Link
              href={'/profile' as Route}
              className="group flex items-center gap-1.5 rounded-lg border border-avs-accent/12 px-3.5 py-2 text-[12px] font-semibold text-avs-accent/50 transition-all duration-200 hover:border-avs-primary/35 hover:text-avs-primary"
            >
              <User size={12} aria-hidden />
              {t('profile.profile')}
              <ArrowUpRight size={10} className="opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
            </Link>
          </div>
        </div>
      </Panel>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const t = useTranslations('dashboard.main');
  const { user, isAuthenticated, isHydrated, isAdmin, isCurator, canContribute } = useAuth();
  const { theme } = useTheme();
  const [stats, setStats]       = useState<DashboardStats | null>(null);
  const [patterns, setPatterns] = useState<UserPattern[]>([]);
  const [activity, setActivity] = useState<DashboardActivity[]>([]);
  const [loading, setLoading]   = useState(true);
  const [platformStats, setPlatformStats] = useState<any>(null);
  const [isCuratorModalOpen, setIsCuratorModalOpen] = useState(false);

  const roleLower = user?.role?.toLowerCase() ?? '';
  const isSuperAdminUser = roleLower === 'super_admin';
  const isAdminUser = isAdmin || isSuperAdminUser || roleLower === 'admin';

  useEffect(() => {
    if (!isHydrated || !isAuthenticated) return;
    const fetchData = async () => {
      try {
        if (isAdminUser) {
          try {
            const pStats = await userService.getPlatformStats();
            setPlatformStats(pStats);
            setStats({
              patternsCreated: pStats.totalPatterns || 0,
              downloadsTotal: pStats.totalDownloads || 0,
              totalViews: pStats.totalViews || 0,
              favoritesCount: 0,
              trends: {
                patternsTrend: t('trends.thisMonth'),
                downloadsTrend: t('trends.vsLastMonth'),
                viewsTrend: t('trends.thisMonth'),
                favoritesTrend: t('trends.new'),
              },
            });
          } catch (err) {
            console.error('Failed to fetch platform stats:', err);
            setPlatformStats({
              totalUsers: 0,
              totalPatterns: 0,
              totalDownloads: 0,
              totalViews: 0,
              verifiedUsers: 0,
              admins: 0,
              curators: 0,
              contributors: 0,
              patternsByStatus: { published: 0, draft: 0, review: 0 },
            });
          }

          try {
            const [p, a] = await Promise.all([
              dashboardService.getGlobalRecentPatterns(5),
              dashboardService.getGlobalActivity(6),
            ]);
            setPatterns(p);
            setActivity(a);
          } catch (err) {
            console.error('Failed to fetch global patterns/activity:', err);
          }
        } else if (canContribute) {
          const [s, p, a] = await Promise.all([
            dashboardService.getStats(),
            dashboardService.getRecentPatterns(5),
            dashboardService.getActivity(6),
          ]);
          setStats(s);
          setPatterns(p);
          setActivity(a);
        } else {
          try {
            const pStats = await userService.getPlatformStats();
            setPlatformStats(pStats);
          } catch (err) {
            console.error('Failed to fetch platform stats for viewer:', err);
          }
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    void fetchData();
  }, [isHydrated, isAuthenticated, isAdminUser, canContribute]);

  if (!user) return null;

  if (roleLower === 'viewer') {
    return (
      <>
        <ViewerDashboard 
          onOpenCuratorModal={() => setIsCuratorModalOpen(true)}
        />
        <CuratorModal
          isOpen={isCuratorModalOpen}
          onClose={() => setIsCuratorModalOpen(false)}
          onSuccess={() => {
            window.location.reload();
          }}
        />
      </>
    );
  }

  const roleLabel = isSuperAdminUser
    ? 'Super Administrateur'
    : isAdminUser
    ? 'Administrateur'
    : isCurator
    ? 'Curateur'
    : 'Contributeur';

  const avatarPattern = isSuperAdminUser
    ? 'avs-pattern-kente-royale'
    : isAdminUser
    ? 'avs-pattern-ndop-sultan'
    : isCurator ? 'avs-pattern-kente-royale' : 'avs-pattern-wax-dakar';

  const kpiCards: KpiCardProps[] = isAdminUser ? [
    {
      label: t('kpi.totalUsers') || 'Utilisateurs Totaux',
      value: platformStats?.totalUsers ?? 0,
      trend: t('trends.thisMonth'),
      icon: Users, color: '#C0573E', patternCss: 'avs-pattern-kente-royale', delay: 0.1, format: formatNumber,
      progress: Math.min(100, ((platformStats?.totalUsers ?? 0) / ((platformStats?.totalUsers ?? 0) * 1.35 || 1)) * 100),
    },
    {
      label: t('kpi.totalPatterns') || 'Motifs Totaux',
      value: platformStats?.totalPatterns ?? 0,
      trend: t('trends.thisMonth'),
      icon: Layers, color: '#4F7CFF', patternCss: 'avs-pattern-ndop-sultan', delay: 0.17, format: formatNumber,
      progress: Math.min(100, ((platformStats?.totalPatterns ?? 0) / ((platformStats?.totalPatterns ?? 0) * 1.35 || 1)) * 100),
    },
    {
      label: t('kpi.downloads') || 'Téléchargements',
      value: platformStats?.totalDownloads ?? 0,
      trend: t('trends.vsLastMonth'),
      icon: Download, color: '#8B5CF6', patternCss: 'avs-pattern-bogolan-fanga', delay: 0.24, format: formatNumber,
      progress: Math.min(100, ((platformStats?.totalDownloads ?? 0) / ((platformStats?.totalDownloads ?? 0) * 1.35 || 1)) * 100),
    },
    {
      label: t('kpi.totalViews') || 'Vues Totales',
      value: platformStats?.totalViews ?? 0,
      trend: t('trends.thisMonth'),
      icon: Eye, color: '#F59E0B', patternCss: 'avs-pattern-adinkra-sankofa', delay: 0.31, format: formatNumber,
      progress: Math.min(100, ((platformStats?.totalViews ?? 0) / ((platformStats?.totalViews ?? 0) * 1.35 || 1)) * 100),
    },
  ] : [
    {
      label: t('kpi.myPatterns'),     value: stats?.patternsCreated  ?? 0, trend: stats?.trends?.patternsTrend ?? t('trends.thisMonth'),
      icon: Layers,   color: '#C0573E', patternCss: 'avs-pattern-kente-royale',  delay: 0.1, format: formatNumber,
      progress: Math.min(100, ((stats?.patternsCreated ?? 0) / ((stats?.patternsCreated ?? 0) * 1.35 || 1)) * 100),
    },
    {
      label: t('kpi.downloads'),value: stats?.downloadsTotal ?? 0, trend: stats?.trends?.downloadsTrend ?? t('trends.vsLastMonth'),
      icon: Download, color: '#4F7CFF', patternCss: 'avs-pattern-ndop-sultan',   delay: 0.17, format: formatNumber,
      progress: Math.min(100, ((stats?.downloadsTotal ?? 0) / ((stats?.downloadsTotal ?? 0) * 1.35 || 1)) * 100),
    },
    {
      label: t('kpi.totalViews'),   value: stats?.totalViews     ?? 0, trend: stats?.trends?.viewsTrend ?? t('trends.thisMonth'),
      icon: Eye,      color: '#8B5CF6', patternCss: 'avs-pattern-bogolan-fanga', delay: 0.24, format: formatNumber,
      progress: Math.min(100, ((stats?.totalViews ?? 0) / ((stats?.totalViews ?? 0) * 1.35 || 1)) * 100),
    },
    {
      label: t('kpi.favorites'),  value: stats?.favoritesCount ?? 0, trend: stats?.trends?.favoritesTrend ?? t('trends.new'),
      icon: Star,     color: '#F59E0B', patternCss: 'avs-pattern-adinkra-sankofa', delay: 0.31, format: formatNumber,
      progress: Math.min(100, ((stats?.favoritesCount ?? 0) / ((stats?.favoritesCount ?? 0) * 1.35 || 1)) * 100),
    },
  ];

  return (
    <div className="min-h-screen bg-avs-secondary relative">
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${theme === 'dark' ? '/motif_fond_noire.png' : '/motif_fond_blanc.png'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl space-y-5 px-5 py-7 lg:px-8">

        {/* ══ 1. PROFILE STRIP ══════════════════════════════════════════ */}
        <ProfileStrip user={user} roleLabel={roleLabel} avatarPattern={avatarPattern} t={t} />

        {/* ══ 2. KPI CARDS ══════════════════════════════════════════════ */}
        <section aria-label={t('statsLabel')}>
          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-avs-accent/8 bg-avs-secondary p-6 space-y-4">
                  <div className="flex justify-between">
                    <Skeleton className="h-2.5 w-20" />
                    <Skeleton className="h-9 w-9 rounded-xl" />
                  </div>
                  <Skeleton className="h-9 w-24" />
                  <Skeleton className="h-0.5 w-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {kpiCards.map((card, i) => <KpiCard key={typeof card.label === 'string' ? card.label : i} {...card} />)}
            </div>
          )}
        </section>

        {/* ══ ADMIN STATS PANEL ═════════════════════════════════════════ */}
        {isAdminUser && (
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Statistiques plateforme"
          >
            <Panel>
              <PanelHeader title={t('platformStats') || 'Statistiques Plateforme'} patternCss="avs-pattern-kuba-kasai" />
              <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-avs-accent/6 bg-avs-accent/[0.02] p-4">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-avs-accent/40">{t('kpi.verifiedUsers') || 'Utilisateurs vérifiés'}</p>
                  <p className="mt-2 font-display text-2xl font-black text-avs-accent">{formatNumber(platformStats?.verifiedUsers ?? 0)}</p>
                  <p className="mt-1 text-xs text-avs-accent/35">sur {formatNumber(platformStats?.totalUsers ?? 0)} total</p>
                </div>
                <div className="rounded-xl border border-avs-accent/6 bg-avs-accent/[0.02] p-4">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-avs-accent/40">{t('kpi.admins') || 'Administrateurs'}</p>
                  <p className="mt-2 font-display text-2xl font-black text-avs-accent">{formatNumber(platformStats?.admins ?? 0)}</p>
                  <p className="mt-1 text-xs text-avs-accent/35">{t('kpi.curators', { count: platformStats?.curators ?? 0 }) || `${platformStats?.curators ?? 0} curateurs`}</p>
                </div>
                <div className="rounded-xl border border-avs-accent/6 bg-avs-accent/[0.02] p-4">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-avs-accent/40">{t('kpi.contributors') || 'Contributeurs'}</p>
                  <p className="mt-2 font-display text-2xl font-black text-avs-accent">{formatNumber(platformStats?.contributors ?? 0)}</p>
                  <p className="mt-1 text-xs text-avs-accent/35">{t('kpi.activeOnPlatform') || 'Actifs sur la plateforme'}</p>
                </div>
                <div className="rounded-xl border border-avs-accent/6 bg-avs-accent/[0.02] p-4">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-avs-accent/40">{t('kpi.publishedPatterns') || 'Motifs publiés'}</p>
                  <p className="mt-2 font-display text-2xl font-black text-avs-accent">{formatNumber(platformStats?.patternsByStatus?.published ?? 0)}</p>
                  <p className="mt-1 text-xs text-avs-accent/35">{t('kpi.inReview') || 'En révision'}: {formatNumber(platformStats?.patternsByStatus?.review ?? 0)}</p>
                </div>
              </div>
            </Panel>
          </motion.section>
        )}

        {/* ══ 3. HERO BANNER ════════════════════════════════════════════ */}
        {!isAdminUser && <HeroBanner patternsCount={stats?.patternsCreated ?? 0} t={t} />}

        {/* ══ 4. PATTERNS + ACTIVITY — layout 3/5 + 2/5 ════════════════ */}
        <div className="grid gap-5 lg:grid-cols-5">

          {/* Patterns list */}
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
            aria-label={t('recentPatternsLabel')}
          >
            <Panel className="h-full">
              <PanelHeader
                title={t('recentPatterns.title')}
                patternCss="avs-pattern-kente-royale"
                href="/patternsDashboard"
                linkLabel={t('recentPatterns.viewAll')}
              />

              {loading ? (
                <div className="divide-y divide-avs-accent/6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 px-5 py-3.5">
                      <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-3 w-36" />
                        <Skeleton className="h-2.5 w-16" />
                      </div>
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                  ))}
                </div>
              ) : patterns.length > 0 ? (
                <div className="divide-y divide-avs-accent/5">
                  {patterns.map((p, i) => <PatternRow key={p.id} pattern={p} index={i} t={t} />)}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                  <div className="avs-pattern-wax-dakar h-12 w-12 rounded-full ring-1 ring-avs-accent/10 opacity-40" aria-hidden />
                  <div>
                    <p className="text-sm font-semibold text-avs-accent/40">Aucun motif</p>
                    <p className="mt-0.5 text-xs text-avs-accent/30">Commencez par soumettre votre premier motif</p>
                  </div>
                  <Link
                    href={'/patternsDashboard/new' as Route}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-avs-primary px-4 py-2 text-xs font-bold text-avs-secondary"
                  >
                    <Plus size={11} /> Soumettre un motif
                  </Link>
                </div>
              )}
            </Panel>
          </motion.section>

          {/* Activity feed */}
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2"
            aria-label="Activité récente"
          >
            <Panel className="h-full">
              <PanelHeader title="Activité récente" patternCss="avs-pattern-adinkra-sankofa" />

              {loading ? (
                <div className="divide-y divide-avs-accent/5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex gap-3 px-5 py-3.5">
                      <Skeleton className="h-7 w-7 rounded-lg shrink-0" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-2 w-16" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : activity.length > 0 ? (
                <div className="divide-y divide-avs-accent/5 max-h-[420px] overflow-y-auto [scrollbar-width:thin]">
                  {activity.map((item, i) => <ActivityItem key={item.id} item={item} index={i} />)}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-14">
                  <p className="text-sm text-avs-accent/35">Votre activité apparaîtra ici</p>
                </div>
              )}
            </Panel>
          </motion.section>
        </div>

        {/* ══ 5. QUICK ACTIONS ══════════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          aria-label={t('quickActionsLabel')}
        >
          <Panel>
            <PanelHeader title={t('quickActions.title')} patternCss="avs-pattern-kuba-kasai" />
            <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4 lg:grid-cols-6">
              <QuickAction href="/patternsDashboard/new" icon={Plus}    label={t('quickActions.newPattern.label')}  sub={t('quickActions.newPattern.sub')} accent />
              <QuickAction href="/patterns"              icon={Layers}  label={t('quickActions.library.label')}   sub={t('quickActions.library.sub')} />
              <QuickAction href="/profile"               icon={User}    label={t('quickActions.profile.label')}     sub={t('quickActions.profile.sub')} />
              <QuickAction href="/activity"              icon={Activity} label={t('quickActions.activity.label')} sub={t('quickActions.activity.sub')} />
              <QuickAction href="/colors"                icon={Palette} label={t('quickActions.palettes.label')}       sub={t('quickActions.palettes.sub')} />
              {isAdminUser && (
                <QuickAction href="/users" icon={Users} label={t('quickActions.users.label') || 'Gestion Utilisateurs'} sub={t('quickActions.users.sub') || 'Consulter la liste'} />
              )}
            </div>
          </Panel>
        </motion.section>

      </div>
    </div>
  );
}