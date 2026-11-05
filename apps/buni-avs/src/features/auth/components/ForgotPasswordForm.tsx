'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { ArrowLeft, Mail } from 'lucide-react';
import { useLocale, useTranslations } from '@/i18n';
import { authService } from '../services/auth.service';

export function ForgotPasswordForm() {
  const t = useTranslations('forgotPasswordPage');
  const { locale } = useLocale();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await authService.requestPasswordReset(email, locale === 'en' ? 'en' : 'fr');
      setIsSubmitted(true);
    } catch {
      setError(t('error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-avs-secondary flex min-h-[70vh] items-center justify-center px-4 py-16">
      <section className="border-avs-accent/10 shadow-avs-md w-full max-w-md rounded-2xl border bg-white p-7 sm:p-9">
        <div className="bg-avs-primary/10 text-avs-primary mb-6 flex h-12 w-12 items-center justify-center rounded-xl">
          <Mail size={22} aria-hidden />
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
            <label htmlFor="reset-email" className="text-avs-accent block text-sm font-semibold">
              {t('email')}
            </label>
            <input
              id="reset-email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="avs-input w-full"
              placeholder={t('emailPlaceholder')}
              disabled={isSubmitting}
            />
            {error && (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-avs-primary text-avs-secondary w-full rounded-xl px-4 py-3 text-sm font-bold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? t('sending') : t('submit')}
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
