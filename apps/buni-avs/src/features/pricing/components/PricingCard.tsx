'use client';

import React from 'react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

export type PlanKey = 'free' | 'starter' | 'pro' | 'business' | 'enterprise';

export interface PlanData {
  key: PlanKey;
  name: string;
  badge?: string;
  motifName?: string;
  motifClass?: string;
  motifOrigin?: string;
  description: string;
  priceMonthly: string;
  priceAnnual: string;
  features: string[];
  ctaText: string;
  popular?: boolean;
}

interface PricingCardProps {
  plan: PlanData;
  isAnnual: boolean;
  currency: string;
  perMonthLabel: string;
  perYearLabel: string;
  popularLabel: string;
  onSelectPlan: (planKey: PlanKey) => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  isAnnual,
  currency,
  perMonthLabel,
  perYearLabel,
  popularLabel,
  onSelectPlan,
}) => {
  const isCustomPrice = plan.key === 'enterprise';
  const price = isAnnual ? plan.priceAnnual : plan.priceMonthly;

  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-[var(--radius-avs-lg)] p-8 transition-all duration-300 backdrop-blur-2xl avs-card ${
        plan.popular
          ? 'bg-[var(--color-light-surface)] dark:bg-[var(--color-dark-surface)] border-2 border-[var(--color-avs-primary)] shadow-avs scale-[1.02]'
          : 'bg-[var(--color-light-surface)] dark:bg-[var(--color-dark-surface)] border border-[var(--color-light-border)] dark:border-[var(--color-dark-border)] hover:border-[var(--color-avs-primary)]/50 hover:bg-[var(--color-light-surface)] dark:hover:bg-[var(--color-dark-surface)] shadow-avs'
      }`}
    >
      {/* Background Cultural Motif Watermark */}
      {plan.motifClass && (
        <div
          className={`absolute inset-0 ${plan.motifClass} opacity-[0.9] transition-opacity duration-500 pointer-events-none mix-blend-overlay`}
          style={{
            maskImage: 'radial-gradient(circle at top right, black 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(circle at top right, black 30%, transparent 80%)',
          }}
        />
      )}

      {/* Top Ambient Glow for Popular Card */}
      {plan.popular && (
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-48 bg-[var(--color-avs-primary)]/30 blur-[60px] pointer-events-none rounded-full" />
      )}

      <div>
        {/* Cultural Origin Badge & Popular Badge */}
        <div className="mb-6 flex items-center justify-between gap-2">
          {plan.motifName && plan.motifOrigin && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-avs-primary)]/30 bg-[var(--color-avs-secondary)] px-3 py-1 text-[11px] font-semibold text-[var(--color-avs-primary)] backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-avs-primary)]" />
              {plan.motifName} ({plan.motifOrigin})
            </span>
          )}

          {plan.popular && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-avs-primary)] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[var(--color-avs-secondary)] shadow-md">
              <Sparkles className="h-3 w-3" />
              {popularLabel}
            </span>
          )}
        </div>

        {/* Plan Title & Subtitle */}
        <h3 className="text-2xl font-bold tracking-tight text-[var(--color-light-text)] dark:text-[var(--color-dark-text)] mb-3">
          {plan.name}
        </h3>
        <p className="text-sm text-[var(--color-light-muted)] dark:text-[var(--color-dark-muted)] min-h-[48px] leading-relaxed">
          {plan.description}
        </p>

        {/* Price Tag */}
        <div className="my-6 border-t border-[var(--color-light-border)] dark:border-[var(--color-dark-border)] pt-6">
          {isCustomPrice ? (
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold tracking-tight text-[var(--color-avs-primary)]">
                {price}
              </span>
            </div>
          ) : (
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold tracking-tight text-[var(--color-light-text)] dark:text-[var(--color-dark-text)]">
                  {price}
                </span>
                <span className="text-sm font-bold text-[var(--color-avs-primary)]">
                  {currency}
                </span>
              </div>
              <span className="mt-1 block text-xs font-medium text-[var(--color-light-muted)] dark:text-[var(--color-dark-muted)]">
                {isAnnual ? perYearLabel : perMonthLabel}
              </span>
            </div>
          )}
        </div>

        {/* Features list */}
        <ul className="mb-10 space-y-4 text-sm">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3 text-[var(--color-light-text)] dark:text-[var(--color-dark-text)]">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-avs-primary)]/10 text-[var(--color-avs-primary)] border border-[var(--color-avs-primary)]/30">
                <Check className="h-3 w-3 stroke-[3]" />
              </span>
              <span className="leading-tight">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Pill Button CTA */}
      <button
        onClick={() => onSelectPlan(plan.key)}
        className={`w-full py-3.5 px-6 rounded-[var(--radius-avs)] font-extrabold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer avs-btn ${
          plan.popular
            ? 'avs-btn-primary hover:scale-[1.02]'
            : 'avs-btn-secondary'
        }`}
      >
        <span>{plan.ctaText}</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
};
