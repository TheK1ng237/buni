'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell, Lock, Trash2, Eye, EyeOff, Save,
  Loader2, CheckCircle2, Shield, Globe,
  AlertCircle, Monitor, ArrowRight, User, Camera, Copy, Check, LogOut, X, Download, ShieldAlert,
} from 'lucide-react';
import { z } from 'zod';
import { useTranslations } from '@/i18n';
import { userService } from '@/features/user/services/user.service';
import { useToast } from '@/components/feedback';
import { useLogout } from '@buni/auth';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES & CONFIG
// ─────────────────────────────────────────────────────────────────────────────

type Section = 'profile' | 'notifications' | 'security' | 'privacy' | 'danger';

function getSections(t: any): { key: Section; label: string; icon: any; error?: boolean }[] {
  return [
    { key: 'profile',       label: t('sections.profile') || 'Profil',        icon: User    },
    { key: 'notifications', label: t('sections.notifications'),             icon: Bell    },
    { key: 'security',      label: t('sections.security'),                  icon: Lock    },
    { key: 'privacy',       label: t('sections.privacy'),                   icon: Globe   },
    { key: 'danger',       label: t('sections.danger') || 'Zone de danger', icon: Trash2, error: true },
  ];
}

function getPwdSchema(t: any) {
  return z.object({
    current: z.string().min(8, t('validation.min8')),
    next:    z.string().min(8, t('validation.min8')).regex(/[A-Z]/, t('validation.uppercase')).regex(/[0-9]/, t('validation.number')),
    confirm: z.string(),
  }).refine((d) => d.next === d.confirm, { message: t('validation.noMatch'), path: ['confirm'] });
}

// ─────────────────────────────────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────────────────────────────────

const PAGE_STYLES = `
  ::placeholder { color: rgba(29,29,27,0.35) !important; opacity: 1; }
  .dark ::placeholder { color: rgba(236,232,225,0.30) !important; }

  .st-input {
    width: 100%;
    background: var(--avs-secondary);
    color: var(--avs-accent);
    border: 1.5px solid rgba(29,29,27,0.16);
    border-radius: 0.75rem;
    padding: 0.6875rem 1rem;
    font-size: 0.875rem;
    outline: none;
    transition: border-color 0.18s, box-shadow 0.18s;
    font-family: inherit;
  }
  .st-input:focus {
    border-color: var(--avs-primary);
    box-shadow: 0 0 0 3px rgba(192,87,62,0.08);
  }
  .st-input-error { border-color: #ef4444 !important; }
  .st-input-error:focus { box-shadow: 0 0 0 3px rgba(239,68,68,0.10) !important; }
`;

// ─────────────────────────────────────────────────────────────────────────────
// TOGGLE SWITCH
// ─────────────────────────────────────────────────────────────────────────────

function Toggle({ checked, onChange, label, disabled }: { checked: boolean; onChange: (v: boolean) => void; label: string; disabled?: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avs-primary focus-visible:ring-offset-2 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${checked ? 'bg-avs-primary shadow-avs' : 'bg-avs-accent/16'}`}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 700, damping: 35 }}
        className="inline-block h-3.5 w-3.5 rounded-full bg-avs-secondary shadow-sm"
        style={{ marginLeft: checked ? '18px' : '4px' }}
      />
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SETTING ROW
// ─────────────────────────────────────────────────────────────────────────────

function SettingRow({ label, desc, children }: { label: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-6 py-4 border-b border-avs-accent/9 last:border-0">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-avs-accent">{label}</p>
        {desc && <p className="mt-0.5 text-xs leading-snug text-avs-accent/35">{desc}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION CARD
// ─────────────────────────────────────────────────────────────────────────────

function SectionCard({ title, icon: Icon, accentClass = 'text-avs-primary', iconBgClass = 'bg-avs-primary/8', children, error }: {
  title: string; icon: any;
  accentClass?: string; iconBgClass?: string;
  children: React.ReactNode; error?: boolean;
}) {
  return (
    <div className={`overflow-hidden rounded-2xl border ${error ? 'bg-red-500/4 border-red-500/22' : 'bg-avs-secondary border-avs-accent/9'}`}>
      <div className="avs-pattern-ndop-sultan h-px w-full opacity-60" aria-hidden />
      <div className="p-6">
        <div className="mb-5 flex items-center gap-2.5">
          <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${error ? 'bg-red-500/10 text-red-500' : `${iconBgClass} ${accentClass}`}`}>
            <Icon size={15} aria-hidden />
          </div>
          <h2 className={`font-display font-bold ${error ? 'text-red-500' : 'text-avs-accent'}`} style={{ letterSpacing: '-0.01em' }}>
            {title}
          </h2>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PASSWORD FIELD
// ─────────────────────────────────────────────────────────────────────────────

function PwdField({ id, label, value, onChange, show, onToggle, error, autoComplete, t }: {
  id: string; label: string; value: string;
  onChange: (v: string) => void; show: boolean;
  onToggle: () => void; error?: string; autoComplete?: string; t: any;
}) {
  return (
    <div>
      <label className="mb-2 block font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-avs-accent/35">{label}</label>
      <div className="relative">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="••••••••"
          autoComplete={autoComplete}
          className={`st-input pr-11 ${error ? 'st-input-error' : ''}`}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-avs-accent/30 hover:text-avs-accent transition-colors"
          aria-label={show ? t('security.password.hide') : t('security.password.show')}
        >
          {show ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            role="alert"
            className="mt-1.5 flex items-center gap-1.5 overflow-hidden text-xs font-medium text-red-500"
          >
            <AlertCircle size={11} aria-hidden /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN SETTINGS PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const t = useTranslations('dashboard.settings');
  const { add: addToast, ToastContainer } = useToast();
  const logout = useLogout();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [section, setSection] = useState<Section>('profile');
  const [loading, setLoading] = useState(true);

  
  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    location: '',
    website: '',
    github: '',
    twitter: '',
    specialty: '',
    avatar: '',
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  // Notifications State
  const [notifs, setNotifs] = useState({
    emailComments: true, emailDownloads: false, emailValidations: true, emailNewsletter: false,
    pushBrowser: true, pushValidations: true,
  });

  // Security & Password State
  const [pwd, setPwd] = useState({ current: '', next: '', confirm: '' });
  const [showPwd, setShowPwd] = useState({ current: false, next: false, confirm: false });
  const [pwdErrors, setPwdErrors] = useState<Record<string, string>>({});
  const [savingPwd, setSavingPwd] = useState(false);
  const [pwdSaved, setPwdSaved] = useState(false);
  const [pwdError, setPwdError] = useState<string | null>(null);

  // 2FA State
  const [twoFA, setTwoFA] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [twoFASetup, setTwoFASetup] = useState<{ secret: string; otpauthUrl: string; qrCodeUrl: string } | null>(null);
  const [twoFACode, setTwoFACode] = useState('');
  const [loading2FA, setLoading2FA] = useState(false);
  const [copiedSecret, setCopiedSecret] = useState(false);

  // Sessions State
  const [sessions, setSessions] = useState<Array<{
    id: string;
    device: string;
    location: string;
    lastSeen: string;
    current: boolean;
  }>>([]);
  
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [revokingAll, setRevokingAll] = useState(false);

  // Privacy State
  const [privacy, setPrivacy] = useState({
    profilePublic: true, showEmail: false, showLocation: true,
    allowIndexing: true, shareAnalytics: false,
  });
  const [exportingData, setExportingData] = useState(false);

  // error Zone Modals State
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [deactivating, setDeactivating] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [deleting, setDeleting] = useState(false);

  // Load profile & settings on mount
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const [userData, settings] = await Promise.all([
          userService.getProfile().catch(() => null),
          userService.getSettings().catch(() => null),
        ]);

        if (userData) {
          setProfile({
            name: userData.name || '',
            bio: userData.bio || '',
            location: userData.location || '',
            website: userData.website || '',
            github: userData.github || '',
            twitter: userData.twitter || '',
            specialty: userData.specialty || '',
            avatar: userData.avatar || '',
          });
        }

        if (settings) {
          setNotifs(settings.notifications || notifs);
          setPrivacy(settings.privacy || privacy);
          setTwoFA(settings.security?.twoFAEnabled || false);
        }
      } catch (error) {
        console.error('Failed to load settings data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Load sessions when security section is active
  useEffect(() => {
    if (section === 'security') {
      const loadSessions = async () => {
        setLoadingSessions(true);
        try {
          const sessionData = await userService.getSessions();
          setSessions(sessionData);
        } catch (error) {
          console.error('Failed to load sessions:', error);
        } finally {
          setLoadingSessions(false);
        }
      };

      loadSessions();
    }
  }, [section]);

  // Update profile handler
  const handleSaveProfile = async () => {
    setSavingProfile(true);
    try {
      await userService.updateProfile(profile);
      addToast({
        variant: 'success',
        title: 'Profil mis à jour',
        message: 'Vos informations personnelles ont été enregistrées avec succès.',
      });
    } catch (error: any) {
      addToast({
        variant: 'error',
        title: 'Erreur de sauvegarde',
        message: error?.message || 'Impossible de mettre à jour le profil.',
      });
    } finally {
      setSavingProfile(false);
    }
  };

  // Avatar upload handler
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      addToast({ variant: 'error', title: 'Fichier trop volumineux', message: 'L\'image ne doit pas dépasser 5 Mo.' });
      return;
    }

    setUploadingAvatar(true);
    try {
      const updatedUser = await userService.uploadAvatar(file);
      setProfile((prev) => ({ ...prev, avatar: updatedUser.avatar || prev.avatar }));
      addToast({ variant: 'success', title: 'Avatar mis à jour', message: 'Votre photo de profil a été changée.' });
    } catch (error: any) {
      addToast({ variant: 'error', title: 'Erreur d\'envoi', message: error?.message || 'Échec de l\'envoi de l\'image.' });
    } finally {
      setUploadingAvatar(false);
    }
  };

  // Update notification setting
  const updateNotificationSetting = async (key: keyof typeof notifs, value: boolean) => {
    setNotifs(prev => ({ ...prev, [key]: value }));
    try {
      await userService.updateSettings({ [key]: value });
      addToast({ variant: 'info', title: 'Préférence enregistrée', message: 'Paramètre de notification mis à jour.' });
    } catch (error) {
      setNotifs(prev => ({ ...prev, [key]: !value }));
      addToast({ variant: 'error', title: 'Erreur', message: 'Échec de mise à jour des notifications.' });
    }
  };

  // Update privacy setting
  const updatePrivacySetting = async (key: keyof typeof privacy, value: boolean) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
    try {
      await userService.updateSettings({ [key]: value });
      addToast({ variant: 'info', title: 'Préférence enregistrée', message: 'Paramètre de confidentialité mis à jour.' });
    } catch (error) {
      setPrivacy(prev => ({ ...prev, [key]: !value }));
      addToast({ variant: 'error', title: 'Erreur', message: 'Échec de mise à jour de la confidentialité.' });
    }
  };

  // 2FA Setup Initiate
  const handleToggle2FA = async (enable: boolean) => {
    if (!enable) {
      // Disable 2FA
      setLoading2FA(true);
      try {
        await userService.disable2FA();
        setTwoFA(false);
        addToast({ variant: 'success', title: '2FA désactivé', message: 'La double authentification a été désactivée.' });
      } catch (error: any) {
        addToast({ variant: 'error', title: 'Erreur', message: error?.message || 'Impossible de désactiver la 2FA.' });
      } finally {
        setLoading2FA(false);
      }
      return;
    }

    // Initiate 2FA setup wizard
    setLoading2FA(true);
    try {
      const setup = await userService.setup2FA();
      setTwoFASetup(setup);
      setShow2FAModal(true);
    } catch (error: any) {
      addToast({ variant: 'error', title: 'Erreur 2FA', message: error?.message || 'Impossible d\'initier la configuration 2FA.' });
    } finally {
      setLoading2FA(false);
    }
  };

  // Verify and Confirm 2FA Code
  const handleVerify2FA = async () => {
    if (!twoFACode || twoFACode.trim().length !== 6) {
      addToast({ variant: 'error', title: 'Code invalide', message: 'Veuillez saisir un code à 6 chiffres.' });
      return;
    }

    setLoading2FA(true);
    try {
      await userService.verify2FA(twoFACode.trim());
      setTwoFA(true);
      setShow2FAModal(false);
      setTwoFASetup(null);
      setTwoFACode('');
      addToast({ variant: 'success', title: '2FA Activé', message: 'Votre compte est désormais sécurisé avec la double authentification.' });
    } catch (error: any) {
      addToast({ variant: 'error', title: 'Code incorrect', message: error?.message || 'Code de vérification invalide.' });
    } finally {
      setLoading2FA(false);
    }
  };

  // Revoke session
  const handleRevokeSession = async (sessionId: string) => {
    try {
      await userService.revokeSession(sessionId);
      const sessionData = await userService.getSessions();
      setSessions(sessionData);
      addToast({ variant: 'success', title: 'Session révoquée', message: 'La session a été clôturée avec succès.' });
    } catch (error) {
      addToast({ variant: 'error', title: 'Erreur', message: 'Impossible de révoquer la session.' });
    }
  };

  // Revoke all sessions
  const handleRevokeAllSessions = async () => {
    if (!confirm(t('security.sessions.revokeAllConfirm') || 'Voulez-vous vraiment déconnecter toutes les autres sessions ?')) return;

    setRevokingAll(true);
    try {
      const currentSession = sessions.find((s) => s.current);
      await userService.revokeAllSessions(currentSession?.id);
      const sessionData = await userService.getSessions();
      setSessions(sessionData);
      addToast({ variant: 'success', title: 'Sessions révoquées', message: 'Toutes les autres sessions distantes ont été clôturées.' });
    } catch (error) {
      addToast({ variant: 'error', title: 'Erreur', message: 'Échec de révocation des sessions.' });
    } finally {
      setRevokingAll(false);
    }
  };

  // Password change
  const changePwd = async () => {
    const schema = getPwdSchema(t);
    const r = schema.safeParse(pwd);
    if (!r.success) {
      const e: Record<string, string> = {};
      r.error.issues.forEach((err) => { if (err.path[0]) e[String(err.path[0])] = err.message; });
      setPwdErrors(e);
      return;
    }
    setPwdErrors({});
    setPwdError(null);
    setSavingPwd(true);

    try {
      await userService.changePassword({
        currentPassword: pwd.current,
        newPassword: pwd.next,
      });
      setSavingPwd(false);
      setPwdSaved(true);
      setPwd({ current: '', next: '', confirm: '' });
      addToast({ variant: 'success', title: 'Mot de passe modifié', message: 'Votre mot de passe a été mis à jour avec succès.' });
      setTimeout(() => setPwdSaved(false), 3000);
    } catch (error: any) {
      setSavingPwd(false);
      setPwdError(error.message || 'Échec de mise à jour du mot de passe');
      addToast({ variant: 'error', title: 'Erreur', message: error.message || 'Impossible de modifier le mot de passe' });
    }
  };

  // RGPD Export Data
  const handleExportData = async () => {
    setExportingData(true);
    try {
      const data = await userService.exportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `avs-user-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      addToast({ variant: 'success', title: 'Export téléchargé', message: 'Vos données RGPD ont été exportées en JSON.' });
    } catch (error: any) {
      addToast({ variant: 'error', title: 'Erreur d\'exportation', message: error?.message || 'Impossible de générer l\'export de données.' });
    } finally {
      setExportingData(false);
    }
  };

  // Account Deactivation
  const handleDeactivateAccount = async () => {
    setDeactivating(true);
    try {
      await userService.deactivateAccount();
      addToast({ variant: 'info', title: 'Compte désactivé', message: 'Déconnexion en cours…' });
      setTimeout(() => {
        logout();
      }, 1500);
    } catch (error: any) {
      addToast({ variant: 'error', title: 'Erreur', message: error?.message || 'Impossible de désactiver le compte.' });
      setDeactivating(false);
    }
  };

  // Account Deletion
  const handleDeleteAccount = async () => {
    if (deleteConfirmText.trim().toUpperCase() !== 'SUPPRIMER') {
      addToast({ variant: 'error', title: 'Confirmation incorrecte', message: 'Veuillez saisir exactement « SUPPRIMER ».' });
      return;
    }

    setDeleting(true);
    try {
      await userService.deleteAccount();
      addToast({ variant: 'warning', title: 'Compte supprimé', message: 'Votre compte a été supprimé définitivement.' });
      setTimeout(() => {
        logout();
      }, 1500);
    } catch (error: any) {
      addToast({ variant: 'error', title: 'Erreur', message: error?.message || 'Impossible de supprimer le compte.' });
      setDeleting(false);
    }
  };

  return (
    <>
      <style>{PAGE_STYLES}</style>
      <ToastContainer />

      {/* Loading overlay for password change */}
      <AnimatePresence>
        {savingPwd && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-avs-accent/55 backdrop-blur-sm"
          >
            <div className="flex flex-col items-center gap-4 rounded-2xl p-8 bg-avs-secondary border border-avs-accent/9 shadow-2xl">
              <Loader2 size={28} className="animate-spin text-avs-primary" />
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase animate-pulse text-avs-accent/35">
                {t('updatingPassword')}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-avs-secondary-dark">

        {/* ══ HEADER ══════════════════════════════════════════════════════ */}
        <div className="sticky top-0 z-30 bg-avs-secondary border-b border-avs-accent/9 backdrop-blur-xl">
          <div className="avs-pattern-ndop-sultan absolute inset-x-0 top-0 h-px opacity-70" aria-hidden />
          <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="h-px w-6 bg-avs-primary" aria-hidden />
              <span className="font-mono text-[9px] font-bold tracking-[0.24em] uppercase text-avs-primary">{t('account')}</span>
            </div>
            <h1 className="mt-1 font-display font-black leading-none text-avs-accent" style={{ fontSize: 'clamp(1.25rem,3vw,1.75rem)', letterSpacing: '-0.02em' }}>
              {t('title')}
            </h1>
            <p className="mt-0.5 text-xs text-avs-accent/35">{t('subtitle')}</p>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[220px_1fr]">

            {/* ══ SIDEBAR NAV ═════════════════════════════════════════════ */}
            <nav className="space-y-1" aria-label={t('sectionsLabel')}>
              {getSections(t).map(({ key, label, icon: Icon, error }) => {
                const isActive = section === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSection(key)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`
                      flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm font-semibold transition-all duration-150
                      ${isActive
                        ? error
                          ? 'bg-red-500 text-avs-secondary shadow-avs'
                          : 'bg-avs-primary text-avs-secondary shadow-avs'
                        : error
                          ? 'text-red-500/80 hover:bg-red-500/8 hover:text-red-500'
                          : 'text-avs-accent/55 hover:bg-avs-accent/4 hover:text-avs-accent'
                      }
                    `}
                  >
                    <Icon size={14} aria-hidden />
                    {label}
                    {key === 'danger' && !isActive && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-red-500" aria-hidden />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* ══ CONTENT ═════════════════════════════════════════════════ */}
            <AnimatePresence mode="wait">
              <motion.div
                key={section}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-5"
              >

                {/* ── PROFIL ────────────────────────────────────────────── */}
                {section === 'profile' && (
                  <SectionCard title={t('profileTab.title') || 'Informations de profil'} icon={User}>
                    <div className="space-y-5">
                      
                      {/* Avatar Upload */}
                      <div className="flex items-center gap-5 p-4 rounded-xl border border-avs-accent/9 bg-avs-primary/4">
                        <div className="relative group flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-avs-primary/10 border-2 border-avs-primary/30">
                          {profile.avatar ? (
                            <img src={profile.avatar} alt="Avatar" className="h-full w-full object-cover" />
                          ) : (
                            <User size={28} className="text-avs-primary" />
                          )}
                          {uploadingAvatar && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                              <Loader2 size={18} className="animate-spin text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleAvatarChange}
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploadingAvatar}
                            className="flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-bold border border-avs-accent/16 bg-avs-secondary hover:bg-avs-primary hover:text-white hover:border-avs-primary transition-all duration-200"
                          >
                            <Camera size={13} />
                            {uploadingAvatar ? t('profileTab.avatarUploading') || 'Envoi en cours…' : t('profileTab.avatar') || 'Changer d\'avatar'}
                          </button>
                          <p className="mt-1 text-[11px] text-avs-accent/35">JPG, PNG, WebP ou GIF. Max 5 Mo.</p>
                        </div>
                      </div>

                      {/* Input fields */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-1.5 block font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-avs-accent/35">
                            {t('profileTab.name') || 'Nom complet'}
                          </label>
                          <input
                            type="text"
                            value={profile.name}
                            onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                            placeholder="Amara Diop"
                            className="st-input"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-avs-accent/35">
                            {t('profileTab.specialty') || 'Spécialité / Domaine'}
                          </label>
                          <input
                            type="text"
                            value={profile.specialty}
                            onChange={(e) => setProfile((p) => ({ ...p, specialty: e.target.value }))}
                            placeholder="Tisseur Ndop"
                            className="st-input"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-1.5 block font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-avs-accent/35">
                          {t('profileTab.bio') || 'Biographie'}
                        </label>
                        <textarea
                          rows={3}
                          value={profile.bio}
                          onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
                          placeholder="Décrivez votre parcours et expertise…"
                          className="st-input resize-none"
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-1.5 block font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-avs-accent/35">
                            {t('profileTab.location') || 'Localisation'}
                          </label>
                          <input
                            type="text"
                            value={profile.location}
                            onChange={(e) => setProfile((p) => ({ ...p, location: e.target.value }))}
                            placeholder="Foumban, Cameroun"
                            className="st-input"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-avs-accent/35">
                            {t('profileTab.website') || 'Site Web'}
                          </label>
                          <input
                            type="url"
                            value={profile.website}
                            onChange={(e) => setProfile((p) => ({ ...p, website: e.target.value }))}
                            placeholder="https://example.com"
                            className="st-input"
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-1.5 block font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-avs-accent/35">
                            {t('profileTab.github') || 'GitHub'}
                          </label>
                          <input
                            type="text"
                            value={profile.github}
                            onChange={(e) => setProfile((p) => ({ ...p, github: e.target.value }))}
                            placeholder="username"
                            className="st-input"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-avs-accent/35">
                            {t('profileTab.twitter') || 'Twitter / X'}
                          </label>
                          <input
                            type="text"
                            value={profile.twitter}
                            onChange={(e) => setProfile((p) => ({ ...p, twitter: e.target.value }))}
                            placeholder="username"
                            className="st-input"
                          />
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={handleSaveProfile}
                          disabled={savingProfile}
                          className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-avs-secondary bg-avs-primary shadow-avs-md hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60"
                        >
                          {savingProfile ? (
                            <><Loader2 size={14} className="animate-spin" /> {t('profileTab.saving') || 'Enregistrement…'}</>
                          ) : (
                            <><Save size={14} /> {t('profileTab.save') || 'Enregistrer le profil'}</>
                          )}
                        </button>
                      </div>

                    </div>
                  </SectionCard>
                )}

                {/* ── NOTIFICATIONS ──────────────────────────────────────── */}
                {section === 'notifications' && (
                  <>
                    <SectionCard title={t('notifications.email.title')} icon={Bell}>
                      <SettingRow label={t('notifications.email.comments.label')} desc={t('notifications.email.comments.desc')}>
                        <Toggle checked={notifs.emailComments}    onChange={(v) => updateNotificationSetting('emailComments', v)}    label={t('notifications.email.comments.toggle')} />
                      </SettingRow>
                      <SettingRow label={t('notifications.email.downloads.label')} desc={t('notifications.email.downloads.desc')}>
                        <Toggle checked={notifs.emailDownloads}   onChange={(v) => updateNotificationSetting('emailDownloads', v)}   label={t('notifications.email.downloads.toggle')} />
                      </SettingRow>
                      <SettingRow label={t('notifications.email.validations.label')} desc={t('notifications.email.validations.desc')}>
                        <Toggle checked={notifs.emailValidations} onChange={(v) => updateNotificationSetting('emailValidations', v)} label={t('notifications.email.validations.toggle')} />
                      </SettingRow>
                      <SettingRow label={t('notifications.email.newsletter.label')} desc={t('notifications.email.newsletter.desc')}>
                        <Toggle checked={notifs.emailNewsletter}  onChange={(v) => updateNotificationSetting('emailNewsletter', v)}  label={t('notifications.email.newsletter.toggle')} />
                      </SettingRow>
                    </SectionCard>

                    <SectionCard title={t('notifications.browser.title')} icon={Monitor}>
                      <SettingRow label={t('notifications.browser.push.label')} desc={t('notifications.browser.push.desc')}>
                        <Toggle checked={notifs.pushBrowser}     onChange={(v) => updateNotificationSetting('pushBrowser', v)}     label={t('notifications.browser.push.toggle')} />
                      </SettingRow>
                      <SettingRow label={t('notifications.browser.reviews.label')} desc={t('notifications.browser.reviews.desc')}>
                        <Toggle checked={notifs.pushValidations} onChange={(v) => updateNotificationSetting('pushValidations', v)} label={t('notifications.browser.reviews.toggle')} />
                      </SettingRow>
                    </SectionCard>
                  </>
                )}

                {/* ── SÉCURITÉ ───────────────────────────────────────────── */}
                {section === 'security' && (
                  <>
                    <SectionCard title={t('security.password.title')} icon={Lock}>
                      <div className="space-y-4">
                        <PwdField id="current" label={t('security.password.current')}  value={pwd.current} onChange={(v) => setPwd((p) => ({ ...p, current: v }))} show={showPwd.current} onToggle={() => setShowPwd((s) => ({ ...s, current: !s.current }))} error={pwdErrors['current']} autoComplete="current-password" t={t} />
                        <PwdField id="next"    label={t('security.password.new')} value={pwd.next}    onChange={(v) => setPwd((p) => ({ ...p, next: v }))}    show={showPwd.next}    onToggle={() => setShowPwd((s) => ({ ...s, next: !s.next }))}       error={pwdErrors['next']}    autoComplete="new-password" t={t} />
                        <PwdField id="confirm" label={t('security.password.confirm')} value={pwd.confirm} onChange={(v) => setPwd((p) => ({ ...p, confirm: v }))} show={showPwd.confirm} onToggle={() => setShowPwd((s) => ({ ...s, confirm: !s.confirm }))} error={pwdErrors['confirm']} autoComplete="new-password" t={t} />

                        <AnimatePresence>
                          {pwdError && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                              role="alert"
                              className="flex items-center gap-1.5 overflow-hidden text-xs font-medium text-red-500"
                            >
                              <AlertCircle size={11} aria-hidden /> {pwdError}
                            </motion.p>
                          )}
                        </AnimatePresence>

                        <button
                          onClick={() => void changePwd()}
                          disabled={savingPwd}
                          className={`group relative flex items-center gap-2 overflow-hidden rounded-xl px-5 py-2.5 text-sm font-bold text-avs-secondary transition-all duration-300 hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 ${pwdSaved ? 'bg-emerald-500' : 'bg-avs-primary shadow-avs-md'}`}
                          aria-busy={savingPwd}
                        >
                          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" aria-hidden />
                          <AnimatePresence mode="wait">
                            <motion.span
                              key={savingPwd ? 'saving' : pwdSaved ? 'saved' : 'idle'}
                              initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                              transition={{ duration: 0.15 }}
                              className="flex items-center gap-2"
                            >
                              {savingPwd ? <><Loader2 size={13} className="animate-spin" /> {t('security.password.updating')}</>
                              : pwdSaved  ? <><CheckCircle2 size={13} /> {t('security.password.updated')}</>
                              :             <><Save size={13} /> {t('security.password.update')}</>}
                            </motion.span>
                          </AnimatePresence>
                        </button>
                      </div>
                    </SectionCard>

                    {/* 2FA */}
                    <SectionCard title={t('security.2fa.title')} icon={Shield} accentClass="text-avs-ndop" iconBgClass="bg-avs-ndop/10">
                      <div className="flex items-start justify-between gap-6">
                        <p className="text-sm leading-relaxed text-avs-accent/55">
                          {t('security.2fa.description')}
                        </p>
                        <div className="flex items-center gap-3">
                          {twoFA && (
                            <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                              <CheckCircle2 size={12} /> {t('security.2fa.enabled') || '2FA Actif'}
                            </span>
                          )}
                          <Toggle checked={twoFA} onChange={handleToggle2FA} disabled={loading2FA} label={t('security.2fa.toggle')} />
                        </div>
                      </div>

                      {/* 2FA Setup Modal / Container */}
                      <AnimatePresence>
                        {show2FAModal && twoFASetup && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.22 }}
                            className="mt-6 overflow-hidden rounded-2xl border border-avs-ndop/30 bg-avs-ndop/5 p-5"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="font-display font-bold text-avs-ndop text-sm flex items-center gap-2">
                                <Shield size={16} /> {t('security.2fa.setupRequired') || 'Configuration 2FA requise'}
                              </h3>
                              <button onClick={() => setShow2FAModal(false)} className="text-avs-accent/40 hover:text-avs-accent">
                                <X size={16} />
                              </button>
                            </div>

                            <p className="text-xs text-avs-accent/70 mb-4 leading-relaxed">
                              {t('security.2fa.scanQR') || 'Scannez le QR code avec votre application d\'authentification puis saisissez le code à 6 chiffres.'}
                            </p>

                            <div className="grid gap-5 sm:grid-cols-[180px_1fr] items-center mb-4">
                              <div className="flex justify-center bg-white p-3 rounded-xl border border-avs-accent/10 shadow-sm">
                                <img src={twoFASetup.qrCodeUrl} alt="QR Code 2FA" className="h-36 w-36 object-contain" />
                              </div>

                              <div className="space-y-3">
                                <div>
                                  <label className="block text-[10px] font-mono font-bold uppercase text-avs-accent/40 mb-1">
                                    {t('security.2fa.secretKey') || 'Clé secrète d\'activation :'}
                                  </label>
                                  <div className="flex items-center gap-2 bg-avs-secondary p-2 rounded-lg border border-avs-accent/15">
                                    <code className="font-mono text-xs text-avs-primary font-bold tracking-widest flex-1 overflow-x-auto">
                                      {twoFASetup.secret}
                                    </code>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        navigator.clipboard.writeText(twoFASetup.secret);
                                        setCopiedSecret(true);
                                        setTimeout(() => setCopiedSecret(false), 2000);
                                      }}
                                      className="p-1 text-avs-accent/50 hover:text-avs-accent transition-colors"
                                      title="Copier la clé"
                                    >
                                      {copiedSecret ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                                    </button>
                                  </div>
                                </div>

                                <div>
                                  <label className="block text-[10px] font-mono font-bold uppercase text-avs-accent/40 mb-1">
                                    Code de vérification (6 chiffres)
                                  </label>
                                  <div className="flex gap-2">
                                    <input
                                      type="text"
                                      maxLength={6}
                                      value={twoFACode}
                                      onChange={(e) => setTwoFACode(e.target.value.replace(/\D/g, ''))}
                                      placeholder="123456"
                                      className="st-input font-mono text-center tracking-widest text-base font-bold"
                                    />
                                    <button
                                      type="button"
                                      onClick={handleVerify2FA}
                                      disabled={loading2FA || twoFACode.length !== 6}
                                      className="px-4 py-2 bg-avs-ndop text-white font-bold text-xs rounded-xl shadow-avs hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 shrink-0 flex items-center gap-1.5"
                                    >
                                      {loading2FA ? <Loader2 size={13} className="animate-spin" /> : <CheckCircle2 size={13} />}
                                      {t('security.2fa.verifyButton') || 'Vérifier & Activer'}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </SectionCard>

                    {/* Active sessions */}
                    <SectionCard title={t('security.sessions.title')} icon={Monitor}>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-xs text-avs-accent/40 font-medium">Gérez vos appareils et accès actifs</p>
                          {sessions.length > 1 && (
                            <button
                              onClick={handleRevokeAllSessions}
                              disabled={revokingAll}
                              className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors flex items-center gap-1 disabled:opacity-50"
                            >
                              {revokingAll ? <Loader2 size={11} className="animate-spin" /> : <LogOut size={11} />}
                              {t('security.sessions.revokeAll') || 'Déconnecter toutes les autres sessions'}
                            </button>
                          )}
                        </div>

                        {loadingSessions ? (
                          <div className="flex items-center justify-center py-8">
                            <Loader2 size={20} className="animate-spin text-avs-accent/35" />
                          </div>
                        ) : sessions.length === 0 ? (
                          <p className="text-sm text-avs-accent/35 py-4 text-center">{t('security.sessions.noSessions')}</p>
                        ) : (
                          sessions.map((s) => (
                            <div
                              key={s.id}
                              className={`flex items-center justify-between rounded-xl p-3.5 border ${s.current ? 'bg-avs-primary/8 border-avs-primary/20' : 'bg-avs-accent/4 border-avs-accent/9'}`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${s.current ? 'bg-avs-primary/20 text-avs-primary' : 'bg-avs-accent/9 text-avs-accent/35'}`}>
                                  <Monitor size={14} aria-hidden />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p className="text-sm font-semibold text-avs-accent">{s.device}</p>
                                    {s.current && (
                                      <span className="rounded-md px-2 py-0.5 font-mono text-[8px] font-black uppercase tracking-[0.14em] bg-avs-primary/8 text-avs-primary border border-avs-primary/20">
                                        {t('security.sessions.current')}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-avs-accent/35">{s.location} · {s.lastSeen}</p>
                                </div>
                              </div>
                              {!s.current && (
                                <button
                                  onClick={() => void handleRevokeSession(s.id)}
                                  className="text-xs font-semibold text-red-500/70 hover:text-red-500 transition-colors"
                                >
                                  {t('security.sessions.revoke')}
                                </button>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </SectionCard>
                  </>
                )}

                {/* ── CONFIDENTIALITÉ ─────────────────────────────────────── */}
                {section === 'privacy' && (
                  <>
                    <SectionCard title={t('privacy.profile.title')} icon={Globe}>
                      <SettingRow label={t('privacy.profile.visible.label')} desc={t('privacy.profile.visible.desc')}>
                        <Toggle checked={privacy.profilePublic}  onChange={(v) => updatePrivacySetting('profilePublic', v)}  label={t('privacy.profile.visible.toggle')} />
                      </SettingRow>
                      <SettingRow label={t('privacy.profile.email.label')} desc={t('privacy.profile.email.desc')}>
                        <Toggle checked={privacy.showEmail}      onChange={(v) => updatePrivacySetting('showEmail', v)}      label={t('privacy.profile.email.toggle')} />
                      </SettingRow>
                      <SettingRow label={t('privacy.profile.location.label')} desc={t('privacy.profile.location.desc')}>
                        <Toggle checked={privacy.showLocation}   onChange={(v) => updatePrivacySetting('showLocation', v)}   label={t('privacy.profile.location.toggle')} />
                      </SettingRow>
                    </SectionCard>

                    <SectionCard title={t('privacy.data.title')} icon={Shield} accentClass="text-avs-ndop" iconBgClass="bg-avs-ndop/10">
                      <SettingRow label={t('privacy.data.indexing.label')} desc={t('privacy.data.indexing.desc')}>
                        <Toggle checked={privacy.allowIndexing}  onChange={(v) => updatePrivacySetting('allowIndexing', v)}  label={t('privacy.data.indexing.toggle')} />
                      </SettingRow>
                      <SettingRow label={t('privacy.data.analytics.label')} desc={t('privacy.data.analytics.desc')}>
                        <Toggle checked={privacy.shareAnalytics} onChange={(v) => updatePrivacySetting('shareAnalytics', v)} label={t('privacy.data.analytics.toggle')} />
                      </SettingRow>
                      <div className="pt-4 border-t border-avs-accent/9">
                        <button
                          type="button"
                          onClick={handleExportData}
                          disabled={exportingData}
                          className="flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold text-avs-primary border border-avs-primary/20 bg-avs-primary/6 hover:bg-avs-primary hover:text-white transition-all duration-200 disabled:opacity-50"
                        >
                          {exportingData ? <Loader2 size={13} className="animate-spin" /> : <Download size={13} />}
                          {exportingData ? t('privacy.data.exporting') || 'Génération de l\'export…' : t('privacy.data.download')}
                        </button>
                      </div>
                    </SectionCard>
                  </>
                )}

                {/* ── ZONE DE DANGER ──────────────────────────────────────── */}
                {section === 'danger' && (
                  <>
                    {/* Deactivate */}
                    <div className="overflow-hidden rounded-2xl border border-red-500/18 bg-red-500/4">
                      <div className="p-6">
                        <div className="mb-4 flex items-start gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
                            <Lock size={14} aria-hidden />
                          </div>
                          <div>
                            <h2 className="font-display font-bold text-avs-accent" style={{ letterSpacing: '-0.01em' }}>{t('danger.deactivate.title')}</h2>
                            <p className="mt-1 text-sm leading-relaxed text-avs-accent/55">
                              {t('danger.deactivate.description')}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowDeactivateModal(true)}
                          className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold border border-red-500/35 text-red-500 bg-red-500/6 hover:bg-red-500/12 transition-all duration-200"
                        >
                          {t('danger.deactivate.button')}
                        </button>
                      </div>
                    </div>

                    {/* Delete — stronger visual weight */}
                    <div className="overflow-hidden rounded-2xl border-2 border-red-600/28 bg-red-500/6">
                      <div className="h-1 w-full" style={{ background: 'linear-gradient(to right, #ef4444, #dc2626)' }} aria-hidden />
                      <div className="p-6">
                        <div className="mb-5 flex items-start gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-600/15 text-red-600">
                            <Trash2 size={14} aria-hidden />
                          </div>
                          <div>
                            <h2 className="font-display font-bold text-red-600" style={{ letterSpacing: '-0.01em' }}>{t('danger.delete.title')}</h2>
                            <p className="mt-1 text-sm leading-relaxed text-avs-accent/55">
                              <strong className="text-red-600">{t('danger.delete.warning')}</strong> {t('danger.delete.description')}
                            </p>
                          </div>
                        </div>

                        <div className="mb-5 rounded-xl px-4 py-3 text-sm leading-relaxed bg-red-500/8 border border-red-500/22">
                          <p className="mb-1 font-mono text-[8px] font-black uppercase tracking-[0.16em] text-red-500">{t('danger.delete.noteTitle')}</p>
                          <p className="text-xs text-avs-accent/55">
                            {t('danger.delete.note')}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => setShowDeleteModal(true)}
                          className="group relative flex items-center gap-2 overflow-hidden rounded-xl px-5 py-2.5 text-sm font-bold text-avs-secondary bg-red-600 hover:-translate-y-0.5 transition-all duration-200"
                          style={{ boxShadow: '0 4px 16px rgba(220,38,38,0.30)' }}
                        >
                          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" aria-hidden />
                          <Trash2 size={13} />
                          {t('danger.delete.button')}
                        </button>
                      </div>
                    </div>
                  </>
                )}

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Deactivation Modal */}
      <AnimatePresence>
        {showDeactivateModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md overflow-hidden rounded-2xl bg-avs-secondary border border-avs-accent/15 p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center gap-3 text-amber-500">
                <ShieldAlert size={24} />
                <h3 className="font-display font-bold text-lg text-avs-accent">
                  {t('danger.deactivate.modalTitle') || 'Confirmer la désactivation'}
                </h3>
              </div>
              <p className="text-xs leading-relaxed text-avs-accent/70">
                {t('danger.deactivate.modalDesc') || 'Êtes-vous sûr de vouloir désactiver votre compte ? Vos sessions actives seront clôturées.'}
              </p>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDeactivateModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-avs-accent/60 hover:text-avs-accent hover:bg-avs-accent/5 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handleDeactivateAccount}
                  disabled={deactivating}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  {deactivating ? <Loader2 size={13} className="animate-spin" /> : <Lock size={13} />}
                  {t('danger.deactivate.confirm') || 'Oui, désactiver'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Account Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md overflow-hidden rounded-2xl bg-avs-secondary border border-red-500/30 p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center gap-3 text-red-500">
                <Trash2 size={24} />
                <h3 className="font-display font-bold text-lg text-red-500">
                  {t('danger.delete.modalTitle') || 'Suppression définitive du compte'}
                </h3>
              </div>
              <p className="text-xs leading-relaxed text-avs-accent/70">
                {t('danger.delete.modalDesc') || 'Pour confirmer la suppression, veuillez saisir « SUPPRIMER » ci-dessous :'}
              </p>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder={t('danger.delete.confirmPlaceholder') || 'Tapez SUPPRIMER'}
                className="st-input st-input-error uppercase font-mono tracking-widest text-center font-bold"
              />
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeleteConfirmText('');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-avs-accent/60 hover:text-avs-accent hover:bg-avs-accent/5 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  disabled={deleting || deleteConfirmText.trim().toUpperCase() !== 'SUPPRIMER'}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-colors flex items-center gap-1.5 disabled:opacity-40"
                >
                  {deleting ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                  {t('danger.delete.confirmButton') || 'Supprimer définitivement'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}