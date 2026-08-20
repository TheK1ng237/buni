'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

interface PricingFaqProps {
  title: string;
  subtitle: string;
  items: FaqItem[];
}

export const PricingFaq: React.FC<PricingFaqProps> = ({ title, subtitle, items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="mt-20 w-full max-w-4xl mx-auto">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--color-light-text)] sm:text-3xl dark:text-[var(--color-dark-text)]">
          {title}
        </h2>
        <p className="mt-2 text-sm text-[var(--color-light-muted)] dark:text-[var(--color-dark-muted)]">
          {subtitle}
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-[var(--radius-avs)] border transition-all duration-200 avs-card ${
                isOpen
                  ? 'border-[var(--color-avs-primary)] bg-[var(--color-light-surface)] dark:bg-[var(--color-dark-surface)] shadow-avs'
                  : 'border-[var(--color-light-border)] dark:border-[var(--color-dark-border)] bg-[var(--color-light-surface)] dark:bg-[var(--color-dark-surface)] hover:border-[var(--color-avs-primary)]/40'
              }`}
            >
              <button
                onClick={() => toggle(idx)}
                className="flex w-full items-center justify-between p-5 text-left font-bold text-[var(--color-light-text)] dark:text-[var(--color-dark-text)]"
              >
                <span>{item.q}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-[var(--color-avs-primary)] transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="border-t border-[var(--color-light-border)] p-5 pt-3 text-sm text-[var(--color-light-muted)] dark:border-[var(--color-dark-border)] dark:text-[var(--color-dark-muted)] leading-relaxed">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
