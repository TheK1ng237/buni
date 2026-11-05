'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { ArrowLeft, LockKeyhole } from 'lucide-react';
import { useLocale, useTranslations } from '@/i18n';
import { authService } from '../services/auth.service';

export function ResetPasswordForm({ token }: { token: string }) {
  const t = useTranslations('resetPasswordPage');
  const { locale } = useLocale();
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(token ? '' : t('invalidLink'));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!token) {
      setError(t('invalidLink'));
      return;
    }
    if (password.length < 8) {
      setError(t('passwordTooShort'));
      return;
    }
    if (password !== confirmation) {
      setError(t('passwordMismatch'));
      return;
    }

    setIsSubmitting(true);
    try {
      await authService.resetPassword(token, password);
      setIsSubmitted(true);
    } catch {
      setError(t('invalidLink'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-avs-secondary flex min-h-[70vh] items-center justify-center px-4 py-16">
      <section className="border-avs-accent/10 shadow-avs-md w-full max-w-md rounded-2xl border bg-white p-7 sm:p-9">
        <div className="bg-avs-primary/10 text-avs-primary mb-6 flex h-12 w-12 items-center justify-center rounded-xl">
          <LockKeyhole size={22} aria-hidden />
        </div>
        <h1 className="font-display text-avs-accent text-2xl font-black">{t('title')}</h1>
        <p className="text-avs-accent/60 mt-2 text-sm leading-relaxed">{t('description')}</p>

        {isSubmitted ? (
          <div
            className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm leading-relaxed text-green-800"
            role="status"
          >
            {t('success')}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="new-password"
                className="text-avs-accent mb-2 block text-sm font-semibold"
              >
                {t('password')}
              </label>
              <input
                id="new-password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                maxLength={128}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="avs-input w-full"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="text-avs-accent mb-2 block text-sm font-semibold"
              >
                {t('confirmPassword')}
              </label>
              <input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                maxLength={128}
                value={confirmation}
                onChange={(event) => setConfirmation(event.target.value)}
                className="avs-input w-full"
                disabled={isSubmitting}
              />
            </div>
            {error && (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={isSubmitting || !token}
              className="bg-avs-primary text-avs-secondary w-full rounded-xl px-4 py-3 text-sm font-bold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? t('saving') : t('submit')}
            </button>
          </form>
        )}

        <Link
          href={`/${locale}/auth/login` as Route}
          className="text-avs-primary mt-6 inline-flex items-center gap-2 text-sm font-semibold hover:underline"
        >
          <ArrowLeft size={15} aria-hidden />
          {t('backToLogin')}
        </Link>
      </section>
    </main>
  );
}
