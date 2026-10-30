'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  MoreVertical,
  Edit2,
  Trash2,
  Eye,
  Star,
  Download,
  ArrowUpDown,
  CheckCircle2,
  Layers,
  EyeOff,
  Filter,
  ArrowLeft,FileText,
  Hourglass,
  BarChart3,
  X,
} from 'lucide-react';
import { formatDate, formatNumber } from '@buni/utils';
import { KpiCard } from '@buni/ui';
import { useAuth } from '@buni/auth';
import { useTranslations } from '@/i18n';

import { Route } from 'next';
import type { Pattern, PatternStatus, PatternSymbol } from '@buni/patterns';
import { useFeaturePattern, useToggleFeature, useUnfeaturePattern, useDeletePattern } from '@/features/patterns/hooks/usePatternActions';
import { usePatterns } from '@/features/patterns/hooks/usePatterns';
import { mapPatternDtoToModel } from '@/features/patterns/mappers/pattern.mapper';
import { patternService } from '@/features/patterns/services/pattern.service';


// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────


type SortKey = 'name' | 'views' | 'downloads' | 'updatedAt';

// ─────────────────────────────────────────────────────────────────────────────
// STATUS CONFIG
// ─────────────────────────────────────────────────────────────────────────────

function getStatusConfig(t: any): Record<
  PatternStatus,
  { label: string; icon: typeof CheckCircle2; pill: string; dot: string }
> {
  return {
    published: {
      label: t('status.published'),
      icon: CheckCircle2,
      pill: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
      dot: 'bg-emerald-500',
    },
    draft: {
      label: t('status.draft'),
      icon: FileText,
      pill: 'bg-avs-accent/8 text-avs-accent/50 border border-avs-accent/10',
      dot: 'bg-avs-accent/30',
    },
    review: {
      label: t('status.review'),
      icon: Hourglass,
      pill: 'bg-avs-kente/10 text-avs-kente border border-avs-kente/20',
      dot: 'bg-avs-kente',
    },
  };
}

function getStatusFilters(t: any): { value: PatternStatus | 'all'; label: string }[] {
  return [
    { value: 'all', label: t('filter.all') },
    { value: 'published', label: t('filter.published') },
    { value: 'draft', label: t('filter.draft') },
    { value: 'review', label: t('filter.review') },
  ];
}


// ─────────────────────────────────────────────────────────────────────────────
// STATUS BADGE
// ─────────────────────────────────────────────────────────────────────────────

function StatusBadge({ status, t }: { status: PatternStatus; t: any }) {
  const normalizedStatus = status?.toLowerCase() as PatternStatus;

  const { label, dot, pill } = getStatusConfig(t)[normalizedStatus] ?? getStatusConfig(t).draft;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-mono text-[9px] font-black tracking-[0.14em] uppercase ${pill}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} aria-hidden />
      {label}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SORT BUTTON
// ─────────────────────────────────────────────────────────────────────────────

function SortBtn({
  col,
  label,
  sortKey,
  toggleSort,
}: {
  col: SortKey;
  label: string;
  sortKey: SortKey;
  toggleSort: (k: SortKey) => void;
}) {
  const active = sortKey === col;
  return (
    <button
      onClick={() => toggleSort(col)}
      className={`flex items-center gap-1 font-mono text-[9px] font-black tracking-[0.14em] uppercase transition-colors ${active ? 'text-avs-primary' : 'text-avs-accent/40 hover:text-avs-accent'}`}
    >
      {label} <ArrowUpDown size={10} className={active ? 'text-avs-primary' : ''} />
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ACTION MENU
// ─────────────────────────────────────────────────────────────────────────────

function ActionMenu({
  pattern,
  onDelete,
  onToggleFeatured,
  isAdmin,
  isCurator,
}: {
  pattern: Pattern;
  onDelete: (id: string) => void;
  onToggleFeatured: (id: string, shouldFeature: boolean) => void;
  isAdmin: boolean;
  isCurator: boolean;
}) {
  const t = useTranslations('dashboard.patterns');
  const [open, setOpen] = useState(false);
  const featureToggle = useToggleFeature();

  const canManageStatus = isAdmin;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Actions"
        aria-expanded={open}
        className="text-avs-accent/30 hover:bg-avs-accent/8 hover:text-avs-accent flex h-7 w-7 items-center justify-center rounded-lg transition-all"
      >
        <MoreVertical size={14} />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -4 }}
              transition={{ duration: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="border-avs-accent/9 bg-avs-secondary shadow-avs-lg absolute right-0 z-20 mt-1.5 w-48 overflow-hidden rounded-xl border"
            >
              <Link
                href={`/patternsDashboard/${pattern.slug}?edit=true` as Route}
                onClick={() => setOpen(false)}
                className="text-avs-accent/70 hover:bg-avs-primary/5 hover:text-avs-primary flex items-center gap-2.5 px-4 py-2.5 text-sm"
              >
                <Edit2 size={13} /> {t('actions.edit')}
              </Link>
              <Link
                href={`/patternsDashboard/${pattern.slug}` as Route}
                onClick={() => setOpen(false)}
                className="text-avs-accent/70 hover:bg-avs-primary/5 hover:text-avs-primary flex items-center gap-2.5 px-4 py-2.5 text-sm"
              >
                <Eye size={13} /> {t('actions.view')}
              </Link>
              {canManageStatus && (
                <button
                  onClick={() => {
                    featureToggle.mutate(pattern.id, !pattern.featured);
                    setOpen(false);
                  }}
                  disabled={featureToggle.isLoading}
                  className="text-avs-accent/70 hover:bg-avs-primary/5 hover:text-avs-primary flex w-full items-center gap-2.5 px-4 py-2.5 text-sm transition-opacity disabled:opacity-50"
                >
                  {pattern.featured ? (
                    <>
                      <EyeOff size={13} /> {t('actions.unfeature')}
                    </>
                  ) : (
                    <>
                      <Star size={13} /> {t('actions.feature')}
                    </>
                  )}
                </button>
              )}
              <div className="bg-avs-accent/8 mx-3 my-1 h-px" />
              <button
                onClick={() => {
                  onDelete(pattern.id);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50"
              >
                <Trash2 size={13} /> {t('actions.delete')}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EMPTY STATE
// ─────────────────────────────────────────────────────────────────────────────

function EmptyState({ search, t }: { search: string; t: any }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <div className="avs-pattern-wax-dakar h-12 w-12 rounded-2xl opacity-20" aria-hidden />
      <p className="font-display text-avs-accent text-base font-bold">
        {search ? t('empty.noResults') : t('empty.noPatterns')}
      </p>
      <p className="text-avs-accent/40 max-w-xs text-sm">
        {search
          ? t('empty.noResultsSearch', { search })
          : t('empty.noPatternsDesc')}
      </p>
      {!search && (
        <Link href={'/dashboard/patterns/new' as Route} className="avs-btn-primary mt-2 gap-2">
          <Plus size={14} /> {t('empty.createFirst')}
        </Link>
      )}
    </div> 
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function MyPatternsPage() {
  const t = useTranslations('dashboard.patterns');
  const { user, isAdmin, isCurator } = useAuth();
  const { data: rawPatterns = [], isLoading } = usePatterns();
  const deleteMutation = useDeletePattern();

  const [search, setSearch] = useState('');
  const [statusF, setStatusF] = useState<PatternStatus | 'all'>('all');
  const [sortKey, setSortKey] = useState<SortKey>('updatedAt');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const featureMutation = useFeaturePattern();
  const unfeatureMutation = useUnfeaturePattern();
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    patternId: string | null;
    patternName: string;
  }>({
    open: false,
    patternId: null,
    patternName: '',
  });

  const normalizeStatus = (status?: string): PatternStatus => {
    switch (status?.toUpperCase()) {
      case 'PUBLISHED':
        return 'published';

      case 'DRAFT':
        return 'draft';

      case 'REVIEW':
        return 'review';

      default:
        return 'draft';
    }
  };

  const patterns = useMemo(() => {
    let allPatterns = rawPatterns.map((p) => ({
      ...p,
      status: normalizeStatus(p.status),
    }));

    if (!isAdmin && user) {
      allPatterns = allPatterns.filter((p: any) => p.authorId === user.id || p.createdById === user.id);
    }

    return allPatterns;
  }, [rawPatterns, isAdmin, user]);

  const stats = useMemo(
    () => ({
      published: patterns.filter((p) => p.status === 'published').length,
      drafts: patterns.filter((p) => p.status === 'draft').length,
      review: patterns.filter((p) => p.status === 'review').length,
      totalViews: patterns.reduce((s, p) => s + p.views, 0),
    }),
    [patterns]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return patterns
      .filter((p) => {
        const matchSearch =
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q) ||
          p.origin.region.toLowerCase().includes(q);
        const matchStatus = statusF === 'all' || p.status === statusF;
        return matchSearch && matchStatus;
      })
      .sort((a, b) => {
        const mul = sortDir === 'asc' ? 1 : -1;
        if (sortKey === 'name') return mul * a.name.localeCompare(b.name);
        if (sortKey === 'views') return mul * (a.views - b.views);
        if (sortKey === 'downloads') return mul * (a.downloads - b.downloads);
        return (
          mul *
          (new Date(a.updatedAt ?? '1970-01-01').getTime() -
            new Date(b.updatedAt ?? '1970-01-01').getTime())
        );
      });
  }, [patterns, search, statusF, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const handleDelete = (id: string) => {
    const pattern = patterns.find((p) => p.id === id);
    setDeleteModal({
      open: true,
      patternId: id,
      patternName: pattern?.name || 'ce motif',
    });
  };

  const confirmDelete = async () => {
    if (!deleteModal.patternId) return;

    deleteMutation.mutate(deleteModal.patternId, {
      onSuccess: () => {
        setDeleteModal({ open: false, patternId: null, patternName: '' });
      },
      onError: (error) => {
        console.error('Erreur lors de la suppression:', error);
      },
    });
  };

  const handleToggleFeatured = (id: string, shouldFeature: boolean) => {
    if (shouldFeature) {
      featureMutation.mutate(id);
    } else {
      unfeatureMutation.mutate(id);
    }
  };


  const toggleSelect = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const toggleAll = () =>
    setSelected((prev) =>
      prev.size === filtered.length ? new Set() : new Set(filtered.map((p) => p.id))
    );

  const allSelected = selected.size === filtered.length && filtered.length > 0;

  return (
    <div className="bg-avs-secondary-dark min-h-screen">
      {/* Modal de confirmation de suppression */}
      <AnimatePresence>
        {deleteModal.open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteModal({ open: false, patternId: null, patternName: '' })}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="border-avs-accent/9 bg-avs-secondary shadow-avs-lg fixed top-1/2 left-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border"
            >
              <div className="space-y-4 p-6">
                <div>
                  <h2 className="font-display text-avs-accent text-lg font-bold">
                    {t('deleteModal.title')}
                  </h2>
                  <p className="text-avs-accent/50 mt-1 text-sm">
                    {t('deleteModal.description', { name: deleteModal.patternName })}
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() =>
                      setDeleteModal({ open: false, patternId: null, patternName: '' })
                    }
                    className="border-avs-accent/15 text-avs-accent/70 hover:border-avs-accent/30 hover:text-avs-accent flex-1 rounded-xl border px-4 py-2.5 font-semibold transition-colors"
                  >
                    {t('deleteModal.cancel')}
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 font-semibold text-white transition-colors hover:bg-red-700"
                  >
                    {t('deleteModal.delete')}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* ══ STICKY HEADER — même patron que profil ══════════════════════════ */}
      <div className="border-avs-accent/9 bg-avs-secondary sticky top-0 z-30 border-b backdrop-blur-xl">
        {/* Watermark pattern — identique profil */}
        <div
          className="avs-pattern-ndop-sultan pointer-events-none absolute inset-0 opacity-[0.025]"
          aria-hidden
        />

        <div className="relative mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="border-avs-accent/16 text-avs-accent/55 hover:text-avs-accent flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-150"
              title={t('back')}
            >
              <ArrowLeft size={16} />
            </Link>
            <div>
              <h1
                className="font-display text-avs-accent leading-none font-black"
                style={{ fontSize: 'clamp(1.1rem,3vw,1.4rem)', letterSpacing: '-0.02em' }}
              >
                {t('title')}
              </h1>
              <p className="text-avs-accent/35 mt-0.5 text-xs">
                {t('subtitle', { count: patterns.length })}
              </p>
            </div>
          </div>

          <Link
            href={'/dashboard/patterns/new' as Route}
            className="group bg-avs-primary text-avs-secondary shadow-avs-md relative flex items-center gap-2 overflow-hidden rounded-xl px-5 py-2.5 text-sm font-bold transition-all hover:-translate-y-0.5"
          >
            <span
              className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              aria-hidden
            />
            <Plus size={15} /> {t('newPattern')}
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        {/* ══ STAT CARDS — même patron que profil ════════════════════════════ */}
        {(isAdmin ) && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <KpiCard label={t('stats.published')} value={stats.published} icon={CheckCircle2} color="#4A6741" patternCss="avs-pattern-kente-royale" topAccent format={formatNumber} delay={0.1} />
            <KpiCard label={t('stats.draft')} value={stats.drafts} icon={FileText} color="#8B5CF6" patternCss="avs-pattern-ndop-sultan" topAccent format={formatNumber} delay={0.17} />
            <KpiCard label={t('stats.review')} value={stats.review} icon={Hourglass} color="#D4A017" patternCss="avs-pattern-bogolan-fanga" topAccent format={formatNumber} delay={0.24} />
            <KpiCard label={t('stats.totalViews')} value={stats.totalViews} icon={BarChart3} color="#C0573E" patternCss="avs-pattern-adinkra-sankofa" topAccent format={formatNumber} delay={0.31} />
          </div>
        )}

        {/* ══ FILTERS ═════════════════════════════════════════════════════════ */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-56 flex-1">
            <Search
              size={13}
              className="text-avs-accent/35 absolute top-1/2 left-3.5 -translate-y-1/2"
              aria-hidden
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('search')}
              className="avs-input pl-10 text-sm"
            />
            <AnimatePresence>
              {search && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setSearch('')}
                  aria-label={t('clear')}
                  className="text-avs-accent/40 hover:text-avs-accent absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
                >
                  <X size={12} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {(isAdmin ) && (
            <div className="flex items-center gap-1.5">
              <Filter size={12} className="text-avs-accent/30 shrink-0" aria-hidden />
              {getStatusFilters(t).map(({ value, label }) => {
                const isActive = statusF === value;
                const statusConfig = value !== 'all' ? getStatusConfig(t)[value as PatternStatus] : null;
                const activeStyle = value === 'all' 
                  ? 'bg-avs-primary text-avs-secondary shadow-avs'
                  : statusConfig?.pill || 'bg-avs-primary text-avs-secondary shadow-avs';
                
                return (
                  <button
                    key={value}
                    onClick={() => setStatusF(value)}
                    className={`rounded-xl px-3 py-1.5 font-mono text-[9px] font-black tracking-[0.14em] uppercase transition-all duration-150 ${isActive ? activeStyle : 'border-avs-accent/15 text-avs-accent/50 hover:border-avs-primary/20 hover:text-avs-primary border'}`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ══ BULK BAR ════════════════════════════════════════════════════════ */}
        <AnimatePresence>
          {selected.size > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="border-avs-primary/25 bg-avs-primary/8 flex items-center gap-4 rounded-xl border px-4 py-3">
                <span className="text-avs-primary font-mono text-xs font-bold">
                  {t('bulk.selected', { count: selected.size })}
                </span>
                <div className="bg-avs-accent/15 h-3.5 w-px" />
                <button className="text-avs-accent/50 flex items-center gap-1.5 text-xs font-semibold transition-colors hover:text-red-500">
                  <Trash2 size={12} /> {t('bulk.delete')}
                </button>
                <button className="text-avs-accent/50 hover:text-avs-primary flex items-center gap-1.5 text-xs font-semibold transition-colors">
                  <Download size={12} /> {t('bulk.export')}
                </button>
                <button
                  onClick={() => setSelected(new Set())}
                  className="text-avs-accent/30 hover:text-avs-accent ml-auto font-mono text-[9px] font-bold tracking-wider uppercase transition-colors"
                >
                  {t('bulk.cancel')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══ TABLE — section avec border comme profil ════════════════════════ */}
        <section className="border-avs-accent/9 bg-avs-secondary overflow-hidden rounded-2xl border">
          {/* Top accent strip — identique profil */}
          <div className="avs-pattern-ndop-sultan h-0.5 w-full" aria-hidden />

          {/* Table header */}
          <div className="border-avs-accent/8 bg-avs-accent/3 grid grid-cols-[2rem_3rem_1fr_7rem_5rem_5rem_5rem_2rem] items-center gap-3 border-b px-5 py-3">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleAll}
              className="accent-avs-primary rounded"
              aria-label={t('table.selectAll')}
            />
            <span className="text-avs-accent/30 font-mono text-[9px] font-bold tracking-[0.14em] uppercase">
              {t('table.preview')}
            </span>
            <SortBtn col="name" label={t('table.name')} sortKey={sortKey} toggleSort={toggleSort} />
            <span className="text-avs-accent/30 font-mono text-[9px] font-bold tracking-[0.14em] uppercase">
              {t('table.status')}
            </span>
            <SortBtn col="views" label={t('table.views')} sortKey={sortKey} toggleSort={toggleSort} />
            <SortBtn col="downloads" label={t('table.downloads')} sortKey={sortKey} toggleSort={toggleSort} />
            <SortBtn col="updatedAt" label={t('table.modified')} sortKey={sortKey} toggleSort={toggleSort} />
            <span />
          </div>

          {/* Rows */}
          {filtered.length === 0 ? (
            <EmptyState search={search} t={t} />
          ) : (
            <AnimatePresence initial={false}>
              {filtered.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                  transition={{ delay: i * 0.025, duration: 0.2 }}
                  className="group border-avs-accent/6 hover:bg-avs-primary/3 grid grid-cols-[2rem_3rem_1fr_7rem_5rem_5rem_5rem_2rem] items-center gap-3 border-b px-5 py-3.5 transition-colors last:border-0"
                >
                  <input
                    type="checkbox"
                    checked={selected.has(p.id)}
                    onChange={() => toggleSelect(p.id)}
                    className="accent-avs-primary rounded"
                    aria-label={t('table.select', { name: p.name })}
                  />

                  <div
                    className={`${p.cssClass} border-avs-accent/10 h-10 w-10 overflow-hidden rounded-xl border transition-transform duration-300 group-hover:scale-105`}
                    aria-hidden
                  />

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-avs-accent truncate text-sm font-bold">{p.name}</p>
                      {p.featured && (
                        <Star
                          size={11}
                          className="fill-avs-kente text-avs-kente shrink-0"
                          aria-label={t('table.featured')}
                        />
                      )}
                    </div>
                    <p className="text-avs-accent/40 mt-0.5 font-mono text-[10px]">
                      {p.type} · {p.origin.region}
                    </p>
                  </div>

                  <StatusBadge status={p.status} t={t} />

                  <p className="text-avs-accent/60 text-sm font-medium tabular-nums">
                    {formatNumber(p.views)}
                  </p>
                  <p className="text-avs-accent/60 text-sm font-medium tabular-nums">
                    {formatNumber(p.downloads)}
                  </p>
                  <p className="text-avs-accent/35 font-mono text-[10px]">
                    {p.updatedAt
                      ? formatDate(p.updatedAt, 'fr-FR')
                      : '—'}
                  </p>

                  <ActionMenu
                    pattern={p}
                    onDelete={handleDelete}
                    onToggleFeatured={handleToggleFeatured}
                    isAdmin={isAdmin}
                    isCurator={isCurator}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}

          {/* Footer */}
          {filtered.length > 0 && (
            <div className="border-avs-accent/8 bg-avs-accent/3 flex items-center justify-between border-t px-5 py-3">
              <span className="text-avs-accent/30 font-mono text-[9px] tracking-wider uppercase">
                {t('table.footer', { count: filtered.length })}
              </span>
              {(search || statusF !== 'all') && (
                <button
                  onClick={() => {
                    setSearch('');
                    setStatusF('all');
                  }}
                  className="text-avs-primary font-mono text-[9px] font-bold tracking-wider uppercase underline underline-offset-2 transition-opacity hover:opacity-70"
                >
                  {t('table.reset')}
                </button>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
