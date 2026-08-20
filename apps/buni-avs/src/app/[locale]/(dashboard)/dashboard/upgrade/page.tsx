'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Sparkles, Lock, CreditCard, Calendar, Shield } from 'lucide-react';
import { useTranslations } from '@/i18n';
import { useAuthStore } from '@buni/auth';

const PATTERN_CARDS = [
  { css: 'avs-pattern-kente-royale',    rotate: '-2.5deg', style: { top: '7%',    left: '5%',   width: '54%', height: '42%' } },
  { css: 'avs-pattern-adinkra-sankofa', rotate: '2deg',    style: { top: '5%',    right: '3%',  width: '38%', height: '34%' } },
  { css: 'avs-pattern-wax-dakar',       rotate: '-1deg',   style: { bottom: '20%',left: '3%',   width: '46%', height: '26%' } },
  { css: 'avs-pattern-kuba-kasai',      rotate: '1.5deg',  style: { bottom: '7%', right: '4%',  width: '42%', height: '30%' } },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

export default function UpgradePage() {
  const t = useTranslations('upgrade');
  const pricingT = useTranslations('pricing');
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuthStore();
  
  const plan = searchParams.get('plan') || 'starter';
  const billing = searchParams.get('billing') || 'monthly';
  
  const [isProcessing, setIsProcessing] = useState(false);

  const planConfig: Record<string, { name: string; price: string; features: string[]; motifClass: string }> = {
    free: {
      name: pricingT('plans.free.name'),
      price: pricingT('plans.free.priceMonthly'),
      features: pricingT.raw('plans.free.features') as string[],
      motifClass: 'avs-pattern-ndop-ceremoniel',
    },
    starter: {
      name: pricingT('plans.starter.name'),
      price: pricingT('plans.starter.priceMonthly'),
      features: pricingT.raw('plans.starter.features') as string[],
      motifClass: 'avs-pattern-kente-etoile',
    },
    pro: {
      name: pricingT('plans.pro.name'),
      price: pricingT('plans.pro.priceMonthly'),
      features: pricingT.raw('plans.pro.features') as string[],
      motifClass: 'avs-pattern-ndop-sultan',
    },
    business: {
      name: pricingT('plans.business.name'),
      price: pricingT('plans.business.priceMonthly'),
      features: pricingT.raw('plans.business.features') as string[],
      motifClass: 'avs-pattern-kente-royale',
    },
    enterprise: {
      name: pricingT('plans.enterprise.name'),
      price: pricingT('plans.enterprise.priceMonthly'),
      features: pricingT.raw('plans.enterprise.features') as string[],
      motifClass: 'avs-pattern-bogolan-terre',
    },
  };

  const selectedPlan = planConfig[plan] || planConfig.starter;

  const handleUpgrade = () => {
    setIsProcessing(true);
    // Ici vous pouvez intégrer votre logique de paiement
    // Pour l'instant, on simule un upgrade réussi
    setTimeout(() => {
      setIsProcessing(false);
      router.push('/dashboard');
    }, 2000);
  };

  return (
    <div className="avs-container py-12 sm:py-16 relative min-h-screen">
      {/* Background Pattern Cards */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {PATTERN_CARDS.map((pattern, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8, rotate: pattern.rotate }}
            animate={{ opacity: 0.06, scale: 1, rotate: pattern.rotate }}
            transition={{ duration: 1.2, delay: idx * 0.15, ease }}
            className={`absolute ${pattern.css}`}
            style={pattern.style}
            aria-hidden
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl relative z-10"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-avs-primary)]/30 bg-[var(--color-avs-secondary)] px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[var(--color-avs-primary)]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t('badge')}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-3xl font-extrabold tracking-tight text-[var(--color-light-text)] sm:text-4xl dark:text-[var(--color-dark-text)]"
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-4 text-base text-[var(--color-light-muted)] dark:text-[var(--color-dark-muted)]"
          >
            {t('subtitle', { plan: selectedPlan?.name, billing: billing === 'annual' ? t('billing.annual') : t('billing.monthly') })}
          </motion.p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Plan Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="lg:col-span-2 rounded-[var(--radius-avs-lg)] border border-[var(--color-light-border)] dark:border-[var(--color-dark-border)] bg-[var(--color-light-surface)] dark:bg-[var(--color-dark-surface)] p-8 shadow-avs relative overflow-hidden"
          >
            {/* Background Cultural Motif */}
            <div
              className={`absolute inset-0 ${selectedPlan?.motifClass} opacity-[0.05] pointer-events-none mix-blend-overlay`}
              style={{
                maskImage: 'radial-gradient(circle at top right, black 30%, transparent 80%)',
                WebkitMaskImage: 'radial-gradient(circle at top right, black 30%, transparent 80%)',
              }}
            />

            <div className="relative z-10">
              <div className="mb-6 flex items-center justify-between border-b border-[var(--color-light-border)] dark:border-[var(--color-dark-border)] pb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[var(--color-light-text)] dark:text-[var(--color-dark-text)]">
                    {selectedPlan?.name}
                  </h2>
                  <p className="text-sm text-[var(--color-light-muted)] dark:text-[var(--color-dark-muted)]">
                    {billing === 'annual' ? t('billing.annual') : t('billing.monthly')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-extrabold text-[var(--color-avs-primary)]">
                    {selectedPlan?.price}
                  </p>
                  <p className="text-xs text-[var(--color-light-muted)] dark:text-[var(--color-dark-muted)]">
                    {billing === 'annual' ? pricingT('perYear') : pricingT('perMonth')}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="mb-4 text-sm font-semibold text-[var(--color-light-text)] dark:text-[var(--color-dark-text)]">
                  {t('features.title')}
                </h3>
                <ul className="space-y-3">
                  {selectedPlan?.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + idx * 0.05 }}
                      className="flex items-start gap-3 text-sm text-[var(--color-light-text)] dark:text-[var(--color-dark-text)]"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-avs-primary)]/10 text-[var(--color-avs-primary)] border border-[var(--color-avs-primary)]/30">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </span>
                      <span className="leading-tight">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleUpgrade}
                  disabled={isProcessing}
                  className="avs-btn avs-btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? t('processing') : t('confirm')}
                  {!isProcessing && <ArrowRight className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="avs-btn avs-btn-secondary"
                >
                  {t('cancel')}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Sidebar Info Cards */}
          <div className="space-y-6">
            {/* Billing Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="rounded-[var(--radius-avs-lg)] border border-[var(--color-light-border)] dark:border-[var(--color-dark-border)] bg-[var(--color-light-surface)] dark:bg-[var(--color-dark-surface)] p-6 shadow-avs"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-avs-primary)]/10">
                  <Calendar className="h-5 w-5 text-[var(--color-avs-primary)]" />
                </div>
                <h3 className="font-semibold text-[var(--color-light-text)] dark:text-[var(--color-dark-text)]">
                  {t('billing.title')}
                </h3>
              </div>
              <p className="text-sm text-[var(--color-light-muted)] dark:text-[var(--color-dark-muted)]">
                {billing === 'annual' ? t('billing.annualDesc') : t('billing.monthlyDesc')}
              </p>
              {billing === 'annual' && (
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-avs-kente)]/10 px-2.5 py-1 text-xs font-semibold text-[var(--color-avs-kente)]">
                  <Sparkles className="h-3 w-3" />
                  {t('billing.savings')}
                </div>
              )}
            </motion.div>

            {/* Payment Security */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="rounded-[var(--radius-avs-lg)] border border-[var(--color-light-border)] dark:border-[var(--color-dark-border)] bg-[var(--color-light-surface)] dark:bg-[var(--color-dark-surface)] p-6 shadow-avs"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-avs-ndop)]/10">
                  <Shield className="h-5 w-5 text-[var(--color-avs-ndop)]" />
                </div>
                <h3 className="font-semibold text-[var(--color-light-text)] dark:text-[var(--color-dark-text)]">
                  {t('security.title')}
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-[var(--color-light-muted)] dark:text-[var(--color-dark-muted)]">
                <li className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-[var(--color-avs-ndop)]" />
                  {t('security.encrypted')}
                </li>
                <li className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-[var(--color-avs-ndop)]" />
                  {t('security.methods')}
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-[var(--color-avs-ndop)]" />
                  {t('security.refund')}
                </li>
              </ul>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="rounded-[var(--radius-avs-lg)] border border-[var(--color-light-border)] dark:border-[var(--color-dark-border)] bg-[var(--color-light-surface)] dark:bg-[var(--color-dark-surface)] p-6 shadow-avs"
            >
              <h3 className="font-semibold text-[var(--color-light-text)] dark:text-[var(--color-dark-text)] mb-3">
                {t('support.title')}
              </h3>
              <p className="text-sm text-[var(--color-light-muted)] dark:text-[var(--color-dark-muted)] mb-4">
                {t('support.description')}
              </p>
              <button
                onClick={() => router.push('/contact')}
                className="w-full avs-btn avs-btn-secondary text-sm"
              >
                {t('support.contact')}
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}