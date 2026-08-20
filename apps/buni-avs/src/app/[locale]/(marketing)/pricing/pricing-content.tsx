'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, HelpCircle, ShieldCheck, Sparkles, Zap, MessageSquare } from 'lucide-react';
import { useTranslations } from '@/i18n';
import { PricingCard, PlanData, PlanKey } from '@/features/pricing/components/PricingCard';
import { PricingMatrix } from '@/features/pricing/components/PricingMatrix';
import { PricingFaq } from '@/features/pricing/components/PricingFaq';
import { useAuthStore } from '@buni/auth';

export const PricingContent: React.FC = () => {
  const t = useTranslations('pricing');
  const router = useRouter();
  const [isAnnual, setIsAnnual] = useState(false);
  const [showAllPlans, setShowAllPlans] = useState(false);
  const { user } = useAuthStore();

  const planKeys: PlanKey[] = ['free', 'starter', 'pro', 'business', 'enterprise'];

  const plans: PlanData[] = planKeys.map((key) => {
    const rawFeatures = t.raw(`plans.${key}.features`) as string[];
    
    // Cultural motifs for each plan
    const motifConfig: Record<PlanKey, { motifName?: string; motifOrigin?: string; motifClass?: string }> = {
      free: { motifName: 'Ndop Simple', motifOrigin: 'Bamiléké', motifClass: 'avs-pattern-ndop-ceremoniel' },
      starter: { motifName: 'Kente Étoile', motifOrigin: 'Akan', motifClass: 'avs-pattern-kente-etoile' },
      pro: { motifName: 'Ndop Royal', motifOrigin: 'Bamoum', motifClass: 'avs-pattern-ndop-sultan' },
      business: { motifName: 'Kente Royale', motifOrigin: 'Ghana', motifClass: 'avs-pattern-kente-royale' },
      enterprise: { motifName: 'Bogolan Terre', motifOrigin: 'Bambara', motifClass: 'avs-pattern-bogolan-terre' },
    };
    
    return {
      key,
      name: t(`plans.${key}.name`),
      badge: t(`plans.${key}.badge`),
      description: t(`plans.${key}.description`),
      priceMonthly: t(`plans.${key}.priceMonthly`),
      priceAnnual: t(`plans.${key}.priceAnnual`),
      features: Array.isArray(rawFeatures) ? rawFeatures : [],
      ctaText: t(`cta.${key}`),
      popular: key === 'pro',
      ...motifConfig[key],
    };
  });

  const displayedPlans = showAllPlans ? plans : plans.slice(0, 3);

  const planNames: Record<PlanKey, string> = {
    free: t('plans.free.name'),
    starter: t('plans.starter.name'),
    pro: t('plans.pro.name'),
    business: t('plans.business.name'),
    enterprise: t('plans.enterprise.name'),
  };

  const matrixCategories = [
    {
      title: t('matrix.categories.content'),
      rows: [
        {
          key: 'motifsCount',
          label: t('matrix.options.motifsCount'),
          values: { free: '50 motifs', starter: '500 motifs', pro: 'Illimité', business: 'Illimité + exclusifs', enterprise: 'Sur-mesure' },
        },
        {
          key: 'provenanceCheck',
          label: t('matrix.options.provenanceCheck'),
          values: { free: false, starter: true, pro: true, business: true, enterprise: true },
        },
      ],
    },
    {
      title: t('matrix.categories.export'),
      rows: [
        {
          key: 'vectorExport',
          label: t('matrix.options.vectorExport'),
          values: { free: 'PNG', starter: 'SVG + EPS', pro: 'Multi-format', business: 'Multi-format + API', enterprise: 'Illimité' },
        },
        {
          key: 'tailwindTokens',
          label: t('matrix.options.tailwindTokens'),
          values: { free: false, starter: 'Oui', pro: 'Oui', business: 'Oui + customs', enterprise: 'Sur-mesure' },
        },
        {
          key: 'figmaPlugin',
          label: t('matrix.options.figmaPlugin'),
          values: { free: false, starter: false, pro: 'Oui', business: 'Oui', enterprise: 'Oui' },
        },
      ],
    },
    {
      title: t('matrix.categories.license'),
      rows: [
        {
          key: 'commercialLicense',
          label: t('matrix.options.commercialLicense'),
          values: { free: false, starter: 'Standard', pro: 'Étendue', business: 'Étendue', enterprise: 'Exclusive' },
        },
        {
          key: 'multiUser',
          label: t('matrix.options.multiUser'),
          values: { free: '1 user', starter: '1 user', pro: '3 users', business: '15 users', enterprise: 'Illimité' },
        },
        {
          key: 'apiAccess',
          label: t('matrix.options.apiAccess'),
          values: { free: false, starter: false, pro: false, business: 'Oui', enterprise: 'Oui + custom' },
        },
      ],
    },
    {
      title: t('matrix.categories.support'),
      rows: [
        {
          key: 'customDigitization',
          label: t('matrix.options.customDigitization'),
          values: { free: false, starter: false, pro: false, business: false, enterprise: 'Oui' },
        },
        {
          key: 'dedicatedSupport',
          label: t('matrix.options.dedicatedSupport'),
          values: { free: 'Communauté', starter: 'Email', pro: '24/7', business: 'Account manager', enterprise: 'VIP' },
        },
      ],
    },
  ];

  const rawFaqItems = t.raw('faq.items') as Array<{ q: string; a: string }>;
  const faqItems = Array.isArray(rawFaqItems) ? rawFaqItems : [];

  const handleSelectPlan = (planKey: PlanKey) => {
    if (planKey === 'enterprise') {
      router.push('/contact');
    } else if (user) {
      // Si déjà connecté, rediriger vers la page d'upgrade avec les paramètres du plan
      router.push(`/dashboard/upgrade?plan=${planKey}&billing=${isAnnual ? 'annual' : 'monthly'}`);
    } else {
      // Sinon, rediriger vers la page d'inscription avec les paramètres du plan
      router.push(`/auth/register?plan=${planKey}&billing=${isAnnual ? 'annual' : 'monthly'}`);
    }
  };

  return (
    <div className="avs-container py-12 sm:py-16">
      {/* Hero Header */}
      <div className="mx-auto max-w-3xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0 }}
          className="text-3xl font-extrabold tracking-tight text-[var(--color-light-text)] sm:text-5xl dark:text-[var(--color-dark-text)]"
        >
          {t('title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-4 text-base text-[var(--color-light-muted)] sm:text-lg dark:text-[var(--color-dark-muted)] leading-relaxed"
        >
          {t('subtitle')}
        </motion.p>

        {/* Monthly / Annual Billing Toggle */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <span
            className={`cursor-pointer text-sm font-semibold transition-colors ${
              !isAnnual
                ? 'text-[var(--color-avs-primary)]'
                : 'text-[var(--color-light-muted)] dark:text-[var(--color-dark-muted)]'
            }`}
            onClick={() => setIsAnnual(false)}
          >
            {t('billing.monthly')}
          </span>

          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative h-7 w-14 rounded-full bg-[var(--color-avs-secondary)] p-1 dark:bg-[var(--color-dark-surface)] border border-[var(--color-light-border)] dark:border-[var(--color-dark-border)] transition-colors focus:outline-none"
            aria-label="Basculer le cycle de facturation"
          >
            <motion.div
              className="h-5 w-5 rounded-full bg-[var(--color-avs-primary)] shadow-md"
              animate={{ x: isAnnual ? 26 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>

          <div className="flex items-center gap-2">
            <span
              className={`cursor-pointer text-sm font-semibold transition-colors ${
                isAnnual
                  ? 'text-[var(--color-avs-primary)]'
                  : 'text-[var(--color-light-muted)] dark:text-[var(--color-dark-muted)]'
              }`}
              onClick={() => setIsAnnual(true)}
            >
              {t('billing.annual')}
            </span>
            <span className="avs-badge bg-[var(--color-avs-kente)] text-black font-bold">
              {t('billing.discount')}
            </span>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="mt-16 grid grid-cols-1 gap-6 sm:gap-8 lg:gap-10 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
        {displayedPlans.map((plan) => (
          <PricingCard
            key={plan.key}
            plan={plan}
            isAnnual={isAnnual}
            currency={t('currency')}
            perMonthLabel={t('perMonth')}
            perYearLabel={t('perYear')}
            popularLabel={t('popular')}
            onSelectPlan={handleSelectPlan}
          />
        ))}
      </div>

      {/* Show More/Less Button */}
      {plans.length > 3 && (
        <div className="mt-12 flex items-center justify-center">
          <button
            onClick={() => setShowAllPlans(!showAllPlans)}
            className="avs-btn avs-btn-secondary"
          >
            {showAllPlans ? 'Voir moins de plans' : 'Voir tous les plans'}
          </button>
        </div>
      )}

      {/* Option-by-Option Feature Matrix */}
      <PricingMatrix
        title={t('matrix.title')}
        subtitle={t('matrix.subtitle')}
        planNames={planNames}
        categories={matrixCategories}
      />

      {/* FAQ Section */}
      <PricingFaq
        title={t('faq.title')}
        subtitle={t('faq.subtitle')}
        items={faqItems}
      />

      {/* Enterprise / Consultation Banner */}
      <section className="mt-20 rounded-2xl border border-[var(--color-avs-primary)]/20 bg-[var(--color-light-surface)] dark:bg-[var(--color-dark-surface)] p-8 shadow-lg">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold text-[var(--color-light-text)] dark:text-[var(--color-dark-text)]">
              {t('banner.title')}
            </h3>
            <p className="max-w-2xl text-sm text-[var(--color-light-muted)] dark:text-[var(--color-dark-muted)] leading-relaxed">
              {t('banner.subtitle')}
            </p>
          </div>
          <Link
            href="/contact"
            className="avs-btn-primary shrink-0 gap-2 font-bold px-6 py-3"
          >
            <MessageSquare className="h-4 w-4" />
            <span>{t('banner.button')}</span>
          </Link>
        </div>
      </section>
    </div>
  );
};
