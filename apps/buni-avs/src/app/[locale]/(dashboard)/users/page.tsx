'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@buni/auth';
import { useTranslations } from '@/i18n';
import { userService } from '@/features/user/services/user.service';
import { formatNumber } from '@buni/utils';
import { KpiCard, KpiCardProps } from '@buni/ui';
import type { UserDto } from '@/features/user/types';

type ViewMode = 'table' | 'grid';

// ─────────────────────────────────────────────────────────────────────────────
// SKELETON
// ─────────────────────────────────────────────────────────────────────────────

function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`rounded-md bg-avs-accent/6 animate-pulse ${className}`} />;
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
// ROLE BADGE & VERIFIED BADGE
// ─────────────────────────────────────────────────────────────────────────────

const ROLE_STYLE_MAP: Record<string, { bg: string; text: string; border: string; icon: string }> = {
  super_admin: { bg: 'bg-red-500/10', text: 'text-red-500', border: 'border-red-500/25', icon: 'shield' },
  admin: { bg: 'bg-amber-500/10', text: 'text-amber-500', border: 'border-amber-500/25', icon: 'shield' },
  curator: { bg: 'bg-indigo-500/10', text: 'text-indigo-500', border: 'border-indigo-500/25', icon: 'verified' },
  contributor: { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/25', icon: 'user-edit' },
  viewer: { bg: 'bg-emerald-500/10', text: 'text-emerald-500', border: 'border-emerald-500/25', icon: 'user' },
};

function RoleBadge({ role, t }: { role: string; t: any }) {
  const norm = role?.toLowerCase() || 'viewer';
  const style = ROLE_STYLE_MAP[norm] ?? ROLE_STYLE_MAP.viewer;
  const roleLabel =
    norm === 'super_admin' ? t('roles.superAdmin') :
    norm === 'admin' ? t('roles.admin') :
    norm === 'curator' ? t('roles.curator') :
    norm === 'contributor' ? t('roles.contributor') : t('roles.viewer');

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[9px] font-black uppercase tracking-wider ${style?.bg} ${style?.text} ${style?.border}`}
    >
      <i className={`pi pi-${style?.icon} text-[10px]`} aria-hidden />
      {roleLabel}
    </span>
  );
}

function VerifiedBadge({ verified, t }: { verified: boolean; t: any }) {
  return verified ? (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-500">
      <i className="pi pi-verified text-[11px]" aria-hidden />
      {t('verified')}
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/25 bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-500">
      <i className="pi pi-exclamation-triangle text-[11px]" aria-hidden />
      {t('notVerified')}
    </span>
  );
}

function Avatar({ name, email }: { name?: string | null; email: string }) {
  const initial = (name?.charAt(0) || email.charAt(0)).toUpperCase();
  return (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-black text-avs-secondary shadow-xs"
      style={{ background: 'linear-gradient(135deg, #C0573E 0%, #D4A017 100%)' }}
    >
      {initial}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TOAST ALERT COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

interface Toast {
  id: string;
  type: 'success' | 'error';
  message: string;
}

function ToastAlerts({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: string) => void }) {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className={`flex items-center gap-3 rounded-xl border p-4 shadow-xl backdrop-blur-md ${
              toast.type === 'success'
                ? 'border-emerald-500/20 bg-avs-secondary/95 text-emerald-500'
                : 'border-red-500/20 bg-avs-secondary/95 text-red-500'
            }`}
          >
            <i className={`pi ${toast.type === 'success' ? 'pi-check-circle' : 'pi-exclamation-circle'} text-lg`} />
            <span className="text-sm font-medium text-avs-accent">{toast.message}</span>
            <button
              onClick={() => onDismiss(toast.id)}
              className="ml-2 text-avs-accent/40 hover:text-avs-accent"
            >
              <i className="pi pi-times text-xs" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function UsersManagementPage() {
  const t = useTranslations('dashboard.users');
  const { user: currentUser } = useAuth();
  const qc = useQueryClient();

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Modals & Drawers State
  const [selectedUserForDrawer, setSelectedUserForDrawer] = useState<UserDto | null>(null);
  const [userToDelete, setUserToDelete] = useState<UserDto | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteForm, setInviteForm] = useState({ email: '', name: '', role: 'viewer' });

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Queries & Mutations
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users', { search: searchTerm, role: roleFilter }],
    queryFn: () => userService.getAllUsers({ search: searchTerm, role: roleFilter === 'all' ? undefined : roleFilter }),
  });

  const updateRoleMutation = useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: string }) => userService.updateUserRole(userId, role),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: ['users'] });
      addToast(t('toasts.roleUpdated'));
      if (selectedUserForDrawer && selectedUserForDrawer.id === variables.userId) {
        setSelectedUserForDrawer((prev) => (prev ? { ...prev, role: variables.role } : null));
      }
    },
    onError: () => addToast('Impossible de mettre à jour le rôle.', 'error'),
  });

  const toggleVerificationMutation = useMutation({
    mutationFn: ({ userId, verified }: { userId: string; verified: boolean }) =>
      userService.toggleUserVerification(userId, verified),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: ['users'] });
      addToast(t('toasts.verificationToggled'));
      if (selectedUserForDrawer && selectedUserForDrawer.id === variables.userId) {
        setSelectedUserForDrawer((prev) => (prev ? { ...prev, verified: variables.verified } : null));
      }
    },
    onError: () => addToast('Erreur de modification du statut de vérification.', 'error'),
  });

  // Filtered users
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const userRole = u.role?.toLowerCase() || 'viewer';
    const matchesRole =
      roleFilter === 'all' ||
      (roleFilter === 'contributor' && (userRole === 'curator' || userRole === 'contributor')) ||
      userRole === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Pagination calculation
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter, itemsPerPage]);

  const stats = {
    total: users.length,
    verified: users.filter((u) => u.verified).length,
    admins: users.filter((u) => u.role.toLowerCase() === 'admin' || u.role.toLowerCase() === 'super_admin').length,
    newThisMonth: users.filter((u) => {
      const createdAt = new Date(u.createdAt);
      const now = new Date();
      return createdAt.getMonth() === now.getMonth() && createdAt.getFullYear() === now.getFullYear();
    }).length,
  };

  // Export CSV
  const handleExportCSV = () => {
    if (filteredUsers.length === 0) return;
    const headers = ['ID,Nom,Email,Rôle,Vérifié,Date de création'];
    const rows = filteredUsers.map(
      (u) => `"${u.id}","${u.name || ''}","${u.email}","${u.role}",${u.verified ? 'Oui' : 'Non'},"${new Date(u.createdAt).toISOString()}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `buni_users_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Fichier CSV exporté avec succès');
  };

  // Invite Submit Mock
  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteForm.email) return;
    addToast(t('toasts.userInvited'));
    setIsInviteModalOpen(false);
    setInviteForm({ email: '', name: '', role: 'viewer' });
  };

  // User Delete Mock
  const handleDeleteUser = () => {
    if (!userToDelete) return;
    addToast(t('toasts.userDeleted'));
    setUserToDelete(null);
    if (selectedUserForDrawer?.id === userToDelete.id) {
      setSelectedUserForDrawer(null);
    }
  };

  if (!currentUser) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-avs-accent/10 border-t-avs-primary" />
      </div>
    );
  }

  const role = currentUser.role.toLowerCase();
  if (role !== 'admin' && role !== 'super_admin') {
    return (
      <div className="flex min-h-[400px] items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10">
            <i className="pi pi-exclamation-triangle text-2xl text-amber-500" />
          </div>
          <h2 className="font-display text-xl font-bold text-avs-accent">{t('accessDenied.title')}</h2>
          <p className="mt-2 text-sm text-avs-accent/50">{t('accessDenied.description')}</p>
        </div>
      </div>
    );
  }

  const kpiCards: KpiCardProps[] = [
    {
      label: t('kpi.total'),
      value: stats.total,
      icon: 'users',
      color: '#C0573E',
      patternCss: 'avs-pattern-kente-royale',
      delay: 0.1,
      format: formatNumber,
      progress: Math.min(100, (stats.total / (stats.total > 0 ? stats.total * 1.35 : 1)) * 100),
    },
    {
      label: t('kpi.verified'),
      value: stats.verified,
      icon: 'user-check',
      color: '#4F7CFF',
      patternCss: 'avs-pattern-ndop-sultan',
      delay: 0.17,
      format: formatNumber,
      progress: Math.min(100, (stats.verified / (stats.total || 1)) * 100),
    },
    {
      label: t('kpi.admins'),
      value: stats.admins,
      icon: 'shield',
      color: '#8B5CF6',
      patternCss: 'avs-pattern-bogolan-fanga',
      delay: 0.24,
      format: formatNumber,
      progress: Math.min(100, (stats.admins / (stats.total || 1)) * 100),
    },
    {
      label: t('kpi.newThisMonth'),
      value: stats.newThisMonth,
      icon: 'chart-line',
      color: '#F59E0B',
      patternCss: 'avs-pattern-adinkra-sankofa',
      delay: 0.31,
      format: formatNumber,
      progress: Math.min(100, (stats.newThisMonth / (stats.total || 1)) * 100),
    },
  ];

  return (
    <div className="min-h-screen bg-avs-secondary">
      <ToastAlerts toasts={toasts} onDismiss={removeToast} />

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        {/* ══ HEADER ══════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl border border-avs-accent/9 bg-avs-secondary px-6 py-6 sm:px-8 sm:py-8"
        >
          <div className="avs-pattern-wax-dakar absolute inset-0 opacity-[0.03]" aria-hidden />
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="h-px w-6 bg-avs-primary" aria-hidden />
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-avs-primary">
                  {t('header.admin')}
                </span>
              </div>
              <h1 className="font-display text-2xl font-black leading-none text-avs-accent sm:text-3xl" style={{ letterSpacing: '-0.02em' }}>
                {t('header.title')}
              </h1>
              <p className="mt-2 text-sm text-avs-accent/50">{t('header.subtitle')}</p>
            </div>

            {/* Quick Actions Header Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsInviteModalOpen(true)}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-avs-primary px-4 py-2.5 text-xs font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{ boxShadow: '0 4px 14px rgba(192,87,62,0.25)' }}
              >
                <i className="pi pi-user-plus text-xs" />
                <span>{t('actions.invite')}</span>
              </button>

              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-2 rounded-xl border border-avs-accent/15 bg-avs-secondary px-4 py-2.5 text-xs font-semibold text-avs-accent transition-all duration-200 hover:border-avs-primary/40 hover:text-avs-primary"
              >
                <i className="pi pi-download text-xs" />
                <span>{t('actions.export')}</span>
              </button>

              <div className="flex items-center gap-1 rounded-xl border border-avs-accent/12 bg-avs-secondary p-1">
                <button
                  onClick={() => setViewMode('table')}
                  aria-label={t('view.table')}
                  className={`rounded-lg p-2 transition-colors ${
                    viewMode === 'table' ? 'bg-avs-primary text-white' : 'text-avs-accent/35 hover:text-avs-accent'
                  }`}
                >
                  <i className="pi pi-table text-sm" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  aria-label={t('view.grid')}
                  className={`rounded-lg p-2 transition-colors ${
                    viewMode === 'grid' ? 'bg-avs-primary text-white' : 'text-avs-accent/35 hover:text-avs-accent'
                  }`}
                >
                  <i className="pi pi-th-large text-sm" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ══ STATS ═══════════════════════════════════════════════════════ */}
        <section aria-label={t('statsLabel')}>
          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-4 rounded-2xl border border-avs-accent/8 bg-avs-secondary p-6">
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
              {kpiCards.map((card, i) => (
                <KpiCard key={typeof card.label === 'string' ? card.label : i} {...card} />
              ))}
            </div>
          )}
        </section>

        {/* ══ FILTERS & SEARCH ═════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-3 rounded-2xl border border-avs-accent/9 bg-avs-secondary p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="relative w-full sm:max-w-md">
            <i className="pi pi-search absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-avs-accent/30" />
            <input
              type="text"
              placeholder={t('search.placeholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-avs-accent/12 bg-avs-secondary py-2.5 pl-10 pr-4 text-sm text-avs-accent outline-none transition-all placeholder:text-avs-accent/30 focus:border-avs-primary/40 focus:ring-2 focus:ring-avs-primary/10"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <i className="pi pi-filter text-xs text-avs-accent/30" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="rounded-xl border border-avs-accent/12 bg-avs-secondary px-3.5 py-2.5 text-sm font-medium text-avs-accent outline-none transition-all focus:border-avs-primary/40 focus:ring-2 focus:ring-avs-primary/10"
              >
                <option value="all">{t('filter.allRoles')}</option>
                <option value="super_admin">{t('roles.superAdmin')}</option>
                <option value="admin">{t('roles.admin')}</option>
                <option value="curator">{t('roles.curator')}</option>
                <option value="contributor">{t('roles.contributor')}</option>
                <option value="viewer">{t('roles.viewer')}</option>
              </select>
            </div>

            <div className="whitespace-nowrap font-mono text-[11px] text-avs-accent/40">
              {t('filter.count', { count: filteredUsers.length })}
            </div>
          </div>
        </motion.div>

        {/* ══ USER CONTENT ════════════════════════════════════════════════ */}
        {isLoading ? (
          <Panel>
            <div className="divide-y divide-avs-accent/6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-5 py-4">
                  <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-3 w-36" />
                    <Skeleton className="h-2.5 w-24" />
                  </div>
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-2 w-20" />
                  <Skeleton className="h-8 w-20 rounded-lg" />
                </div>
              ))}
            </div>
          </Panel>
        ) : filteredUsers.length === 0 ? (
          <Panel>
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
              <div className="avs-pattern-wax-dakar h-14 w-14 rounded-full opacity-40 ring-1 ring-avs-accent/10" aria-hidden />
              <div>
                <p className="text-sm font-semibold text-avs-accent/40">{t('empty.title')}</p>
                <p className="mt-0.5 text-xs text-avs-accent/30">{t('empty.description')}</p>
              </div>
            </div>
          </Panel>
        ) : viewMode === 'table' ? (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Panel>
              <PanelHeader title={t('table.title')} patternCss="avs-pattern-kente-royale" />
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px]">
                  <thead className="border-b border-avs-accent/9 bg-avs-accent/[0.02]">
                    <tr>
                      <th className="px-5 py-3.5 text-left font-mono text-[9px] font-bold uppercase tracking-wider text-avs-accent/40">
                        {t('table.user')}
                      </th>
                      <th className="px-5 py-3.5 text-left font-mono text-[9px] font-bold uppercase tracking-wider text-avs-accent/40">
                        {t('table.status')}
                      </th>
                      <th className="px-5 py-3.5 text-left font-mono text-[9px] font-bold uppercase tracking-wider text-avs-accent/40">
                        {t('table.memberSince')}
                      </th>
                      <th className="px-5 py-3.5 text-left font-mono text-[9px] font-bold uppercase tracking-wider text-avs-accent/40">
                        {t('table.role')}
                      </th>
                      <th className="px-5 py-3.5 text-right font-mono text-[9px] font-bold uppercase tracking-wider text-avs-accent/40">
                        {t('table.actions')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-avs-accent/6">
                    {paginatedUsers.map((user, index) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: index * 0.05, ease: 'easeOut' }}
                        className="transition-colors hover:bg-avs-primary/[0.02]"
                      >
                        <td className="px-5 py-3.5">
                          <div
                            onClick={() => setSelectedUserForDrawer(user)}
                            className="group flex cursor-pointer items-center gap-3"
                          >
                            <Avatar name={user.name} email={user.email} />
                            <div className="min-w-0">
                              <p className="truncate font-semibold text-avs-accent transition-colors group-hover:text-avs-primary">
                                {user.name || t('notProvided')}
                              </p>
                              <p className="truncate text-xs text-avs-accent/45">{user.email}</p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-3.5">
                          <VerifiedBadge verified={user.verified} t={t} />
                        </td>

                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-1.5 whitespace-nowrap text-xs text-avs-accent/45">
                            <i className="pi pi-clock text-[11px]" />
                            {new Date(user.createdAt).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </div>
                        </td>

                        <td className="px-5 py-3.5">
                          <RoleBadge role={user.role} t={t} />
                        </td>

                        <td className="px-5 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <select
                              value={user.role?.toLowerCase() || 'viewer'}
                              onChange={(e) => updateRoleMutation.mutate({ userId: user.id, role: e.target.value })}
                              disabled={user.id === currentUser.id || updateRoleMutation.isPending}
                              className="rounded-lg border border-avs-accent/12 bg-avs-secondary px-2.5 py-1.5 text-xs font-medium text-avs-accent outline-none transition-all focus:border-avs-primary/40 focus:ring-2 focus:ring-avs-primary/10 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              <option value="viewer">{t('roles.viewer')}</option>
                              <option value="curator">{t('roles.curator')}</option>
                              <option value="admin">{t('roles.admin')}</option>
                            </select>

                            <button
                              onClick={() => toggleVerificationMutation.mutate({ userId: user.id, verified: !user.verified })}
                              disabled={toggleVerificationMutation.isPending}
                              className={`whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all disabled:opacity-40 ${
                                user.verified
                                  ? 'border border-amber-500/25 bg-amber-500/10 text-amber-500 hover:bg-amber-500/15'
                                  : 'border border-emerald-500/25 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/15'
                              }`}
                            >
                              {user.verified ? t('actions.revoke') : t('actions.verify')}
                            </button>

                            <button
                              onClick={() => setSelectedUserForDrawer(user)}
                              aria-label={t('actions.details')}
                              className="rounded-lg border border-avs-accent/12 p-1.5 text-avs-accent/40 transition-colors hover:border-avs-primary/30 hover:text-avs-primary"
                            >
                              <i className="pi pi-eye text-xs" />
                            </button>

                            <button
                              onClick={() => setUserToDelete(user)}
                              disabled={user.id === currentUser.id}
                              aria-label={t('actions.delete')}
                              className="rounded-lg border border-avs-accent/12 p-1.5 text-avs-accent/40 transition-colors hover:border-red-500/30 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                              <i className="pi pi-trash text-xs" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
          >
            {paginatedUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05, ease: 'easeOut' }}
                className="flex flex-col justify-between rounded-2xl border border-avs-accent/9 bg-avs-secondary p-5 transition-all hover:-translate-y-0.5 hover:border-avs-primary/20"
              >
                <div>
                  <div className="mb-4 flex items-start justify-between gap-2">
                    <div
                      onClick={() => setSelectedUserForDrawer(user)}
                      className="group flex cursor-pointer min-w-0 items-center gap-3"
                    >
                      <Avatar name={user.name} email={user.email} />
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-avs-accent transition-colors group-hover:text-avs-primary">
                          {user.name || t('notProvided')}
                        </p>
                        <p className="truncate text-xs text-avs-accent/45">{user.email}</p>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <VerifiedBadge verified={user.verified} t={t} />
                    </div>
                  </div>

                  <div className="mb-4 flex items-center justify-between">
                    <RoleBadge role={user.role} t={t} />
                    <div className="flex items-center gap-1.5 text-xs text-avs-accent/45">
                      <i className="pi pi-clock text-[11px]" />
                      {new Date(user.createdAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-avs-accent/8 pt-4">
                  <select
                    value={user.role?.toLowerCase() || 'viewer'}
                    onChange={(e) => updateRoleMutation.mutate({ userId: user.id, role: e.target.value })}
                    disabled={user.id === currentUser.id || updateRoleMutation.isPending}
                    className="rounded-lg border border-avs-accent/12 bg-avs-secondary px-2.5 py-1.5 text-xs font-medium text-avs-accent outline-none transition-all focus:border-avs-primary/40 focus:ring-2 focus:ring-avs-primary/10 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <option value="viewer">{t('roles.viewer')}</option>
                    <option value="curator">{t('roles.curator')}</option>
                    <option value="admin">{t('roles.admin')}</option>
                  </select>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => toggleVerificationMutation.mutate({ userId: user.id, verified: !user.verified })}
                      disabled={toggleVerificationMutation.isPending}
                      className={`whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all disabled:opacity-40 ${
                        user.verified
                          ? 'border border-amber-500/25 bg-amber-500/10 text-amber-500 hover:bg-amber-500/15'
                          : 'border border-emerald-500/25 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/15'
                      }`}
                    >
                      {user.verified ? t('actions.revoke') : t('actions.verify')}
                    </button>

                    <button
                      onClick={() => setSelectedUserForDrawer(user)}
                      aria-label={t('actions.details')}
                      className="rounded-lg border border-avs-accent/12 p-1.5 text-avs-accent/40 transition-colors hover:border-avs-primary/30 hover:text-avs-primary"
                    >
                      <i className="pi pi-eye text-xs" />
                    </button>

                    <button
                      onClick={() => setUserToDelete(user)}
                      disabled={user.id === currentUser.id}
                      aria-label={t('actions.delete')}
                      className="rounded-lg border border-avs-accent/12 p-1.5 text-avs-accent/40 transition-colors hover:border-red-500/30 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <i className="pi pi-trash text-xs" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ══ PAGINATION ══════════════════════════════════════════════════ */}
        {!isLoading && filteredUsers.length > 0 && (
          <div className="flex flex-col gap-4 rounded-2xl border border-avs-accent/8 bg-avs-secondary px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-avs-accent/50">
              {t('pagination.showing', {
                from: startIndex + 1,
                to: Math.min(startIndex + itemsPerPage, filteredUsers.length),
                total: filteredUsers.length,
              })}
            </p>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-avs-accent/40">Afficher</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="rounded-lg border border-avs-accent/12 bg-avs-secondary px-2 py-1 text-xs font-medium text-avs-accent outline-none"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-lg border border-avs-accent/12 p-1.5 text-avs-accent/40 transition-colors hover:border-avs-primary/30 hover:text-avs-accent disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <i className="pi pi-chevron-left text-xs" />
                </button>
                <span className="px-2 font-mono text-xs font-semibold text-avs-accent">
                  {t('pagination.page', { current: currentPage, total: totalPages })}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-lg border border-avs-accent/12 p-1.5 text-avs-accent/40 transition-colors hover:border-avs-primary/30 hover:text-avs-accent disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <i className="pi pi-chevron-right text-xs" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ══ INVITE USER MODAL ═════════════════════════════════════════════ */}
      <AnimatePresence>
        {isInviteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsInviteModalOpen(false)}
              className="absolute inset-0 bg-avs-accent/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-avs-accent/12 bg-avs-secondary p-6 shadow-2xl"
            >
              <div className="avs-pattern-ndop-sultan absolute inset-x-0 top-0 h-1" />
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-avs-accent">{t('modal.invite.title')}</h3>
                  <p className="mt-0.5 text-xs text-avs-accent/50">{t('modal.invite.subtitle')}</p>
                </div>
                <button
                  onClick={() => setIsInviteModalOpen(false)}
                  className="rounded-lg p-1.5 text-avs-accent/40 hover:text-avs-accent"
                >
                  <i className="pi pi-times text-xs" />
                </button>
              </div>

              <form onSubmit={handleInviteSubmit} className="space-y-4">
                <div>
                  <label className="avs-label mb-1.5 flex items-center gap-1.5">
                    <i className="pi pi-envelope text-xs" /> {t('modal.invite.email')} *
                  </label>
                  <input
                    type="email"
                    required
                    value={inviteForm.email}
                    onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                    placeholder="artisan@domain.com"
                    className="avs-input"
                  />
                </div>

                <div>
                  <label className="avs-label mb-1.5 flex items-center gap-1.5">
                    <i className="pi pi-user text-xs" /> {t('modal.invite.name')}
                  </label>
                  <input
                    type="text"
                    value={inviteForm.name}
                    onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
                    placeholder="Amara Diop"
                    className="avs-input"
                  />
                </div>

                <div>
                  <label className="avs-label mb-1.5 flex items-center gap-1.5">
                    <i className="pi pi-shield text-xs" /> {t('modal.invite.role')}
                  </label>
                  <select
                    value={inviteForm.role}
                    onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value })}
                    className="avs-input"
                  >
                    <option value="viewer">{t('roles.viewer')}</option>
                    <option value="curator">{t('roles.curator')}</option>
                    <option value="admin">{t('roles.admin')}</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsInviteModalOpen(false)}
                    className="avs-btn-secondary"
                  >
                    Annuler
                  </button>
                  <button type="submit" className="avs-btn-primary">
                    {t('modal.invite.send')}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ══ DELETE USER CONFIRMATION MODAL ════════════════════════════════ */}
      <AnimatePresence>
        {userToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setUserToDelete(null)}
              className="absolute inset-0 bg-avs-accent/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md rounded-2xl border border-red-500/20 bg-avs-secondary p-6 shadow-2xl"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
                <i className="pi pi-trash text-xl" />
              </div>
              <h3 className="font-display text-lg font-bold text-avs-accent">{t('modal.delete.title')}</h3>
              <p className="mt-2 text-sm text-avs-accent/60">
                Vous allez supprimer l'utilisateur <strong className="text-avs-accent">{userToDelete.name || userToDelete.email}</strong>. {t('modal.delete.warning')}
              </p>

              <div className="flex items-center justify-end gap-3 pt-6">
                <button
                  type="button"
                  onClick={() => setUserToDelete(null)}
                  className="avs-btn-secondary"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handleDeleteUser}
                  className="rounded-xl bg-red-500 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-red-600"
                >
                  {t('modal.delete.confirm')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ══ USER DETAILS SLIDING DRAWER ═══════════════════════════════════ */}
      <AnimatePresence>
        {selectedUserForDrawer && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedUserForDrawer(null)}
              className="absolute inset-0 bg-avs-accent/40 backdrop-blur-xs"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative flex h-full w-full max-w-md flex-col justify-between overflow-y-auto border-l border-avs-accent/12 bg-avs-secondary p-6 shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between border-b border-avs-accent/8 pb-4">
                  <h3 className="font-display text-lg font-bold text-avs-accent">{t('drawer.title')}</h3>
                  <button
                    onClick={() => setSelectedUserForDrawer(null)}
                    className="rounded-lg p-1.5 text-avs-accent/40 hover:text-avs-accent"
                  >
                    <i className="pi pi-times text-sm" />
                  </button>
                </div>

                <div className="mt-6 flex flex-col items-center text-center">
                  <Avatar name={selectedUserForDrawer.name} email={selectedUserForDrawer.email} />
                  <h4 className="mt-3 font-display text-lg font-bold text-avs-accent">
                    {selectedUserForDrawer.name || t('notProvided')}
                  </h4>
                  <p className="text-xs text-avs-accent/50">{selectedUserForDrawer.email}</p>

                  <div className="mt-4 flex items-center gap-2">
                    <RoleBadge role={selectedUserForDrawer.role} t={t} />
                    <VerifiedBadge verified={selectedUserForDrawer.verified} t={t} />
                  </div>
                </div>

                <div className="mt-8 space-y-4 rounded-xl border border-avs-accent/8 bg-avs-secondary-dark/40 p-4">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-avs-accent/40">
                    {t('drawer.overview')}
                  </p>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-avs-accent/50">ID Utilisateur</span>
                    <span className="font-mono text-[10px] text-avs-accent">{selectedUserForDrawer.id.slice(0, 12)}…</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-avs-accent/50">{t('memberSince')}</span>
                    <span className="font-medium text-avs-accent">
                      {new Date(selectedUserForDrawer.createdAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-avs-accent/50">Statut vérification</span>
                    <button
                      onClick={() =>
                        toggleVerificationMutation.mutate({
                          userId: selectedUserForDrawer.id,
                          verified: !selectedUserForDrawer.verified,
                        })
                      }
                      className="text-xs font-semibold text-avs-primary hover:underline"
                    >
                      {selectedUserForDrawer.verified ? 'Basculer en non-vérifié' : 'Vérifier ce compte'}
                    </button>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <label className="avs-label">Modifier le rôle</label>
                  <select
                    value={selectedUserForDrawer.role?.toLowerCase() || 'viewer'}
                    onChange={(e) =>
                      updateRoleMutation.mutate({
                        userId: selectedUserForDrawer.id,
                        role: e.target.value,
                      })
                    }
                    disabled={selectedUserForDrawer.id === currentUser.id}
                    className="avs-input"
                  >
                    <option value="viewer">{t('roles.viewer')}</option>
                    <option value="curator">{t('roles.curator')}</option>
                    <option value="admin">{t('roles.admin')}</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-avs-accent/8 pt-4">
                <button
                  onClick={() => setUserToDelete(selectedUserForDrawer)}
                  disabled={selectedUserForDrawer.id === currentUser.id}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-2.5 text-xs font-bold text-red-500 transition-colors hover:bg-red-500/15 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <i className="pi pi-trash text-xs" /> Supprimer le compte
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}