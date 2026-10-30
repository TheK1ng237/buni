'use client';

import React from 'react';
import { Check, Minus } from 'lucide-react';
import { PlanKey } from './PricingCard';

interface MatrixRow {
  key: string;
  label: string;
  values: Record<PlanKey, boolean | string>;
}

interface MatrixCategory {
  title: string;
  rows: MatrixRow[];
}

interface PricingMatrixProps {
  title: string;
  subtitle: string;
  planNames: Record<PlanKey, string>;
  categories: MatrixCategory[];
}

export const PricingMatrix: React.FC<PricingMatrixProps> = ({
  title,
  subtitle,
  planNames,
  categories,
}) => {
  const plans: PlanKey[] = ['free', 'starter', 'pro', 'business', 'enterprise'];

  const renderValue = (val: boolean | string) => {
    if (typeof val === 'boolean') {
      return val ? (
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-avs-ndop)]/20 text-[var(--color-avs-ndop)] border border-[var(--color-avs-ndop)]/30">
          <Check className="h-3.5 w-3.5 stroke-[3]" />
        </span>
      ) : (
        <span className="inline-flex h-6 w-6 items-center justify-center text-neutral-600 opacity-40">
          <Minus className="h-4 w-4" />
        </span>
      );
    }
    return (
      <span className="text-xs font-semibold text-neutral-200">
        {val}
      </span>
    );
  };

  return (
    <section className="mt-24 w-full">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-light-text)] dark:text-[var(--color-dark-text)] sm:text-4xl">
          {title}
        </h2>
        <p className="mt-3 text-sm text-[var(--color-light-muted)] dark:text-[var(--color-dark-muted)] max-w-xl mx-auto">
          {subtitle}
        </p>
      </div>

      <div className="overflow-x-auto rounded-[var(--radius-avs-lg)] border border-[var(--color-light-border)] dark:border-[var(--color-dark-border)] bg-[var(--color-light-surface)] dark:bg-[var(--color-dark-surface)] backdrop-blur-2xl shadow-avs">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--color-light-border)] dark:border-[var(--color-dark-border)] bg-[var(--color-avs-secondary)]/50 dark:bg-[var(--color-avs-primary)]/10">
              <th className="p-5 font-bold text-[var(--color-light-text)] dark:text-[var(--color-dark-text)] min-w-[240px]">
                Fonctionnalités / Plans
              </th>
              {plans.map((p) => (
                <th
                  key={p}
                  className={`p-5 text-center font-bold ${
                    p === 'pro'
                      ? 'text-[var(--color-avs-primary)] text-base'
                      : 'text-[var(--color-light-text)] dark:text-[var(--color-dark-text)]'
                  } min-w-[120px]`}
                >
                  {planNames[p]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-light-border)] dark:divide-[var(--color-dark-border)]">
            {categories.map((cat, catIdx) => (
              <React.Fragment key={catIdx}>
                {/* Category Header */}
                <tr className="bg-[var(--color-avs-secondary)]/30 dark:bg-[var(--color-avs-primary)]/5">
                  <td
                    colSpan={6}
                    className="px-5 py-3.5 font-bold uppercase tracking-wider text-[var(--color-avs-kente)] text-xs"
                  >
                    {cat.title}
                  </td>
                </tr>

                {/* Rows inside Category */}
                {cat.rows.map((row) => (
                  <tr
                    key={row.key}
                    className="hover:bg-[var(--color-avs-secondary)]/20 dark:hover:bg-[var(--color-avs-primary)]/5 transition-colors"
                  >
                    <td className="px-5 py-4 font-medium text-[var(--color-light-text)] dark:text-[var(--color-dark-text)]">
                      {row.label}
                    </td>
                    {plans.map((p) => (
                      <td
                        key={p}
                        className={`px-5 py-4 text-center ${
                          p === 'pro'
                            ? 'bg-[var(--color-avs-primary)]/10 font-semibold'
                            : ''
                        }`}
                      >
                        <div className="flex justify-center">
                          {renderValue(row.values[p])}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
