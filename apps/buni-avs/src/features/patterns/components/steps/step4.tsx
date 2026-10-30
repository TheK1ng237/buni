'use client';

import type { Step1Data, Step2Data, Step3Data, FieldErrors } from '../../types';
import { StepTitle } from '../Patternform.primitives';
import { useTranslations } from '@/i18n';

interface Step4Props {
  step1: Partial<Step1Data>;
  step2: Partial<Step2Data>;
  step3: Partial<Step3Data>;
  errors: FieldErrors;
}

export function Step4({ step1, step2, step3, errors }: Step4Props) {
  const t = useTranslations('patternForm.step4');

  const rows = [
    { label: t('labels.nameEn'),    value: step1.nameEn },
    { label: t('labels.nameLocal'), value: step1.nameLocal },
    { label: t('labels.type'),      value: step1.patternType?.toUpperCase() },
    { label: t('labels.region'),    value: step1.region },
    { label: t('labels.country'),   value: step1.country },
    { label: t('labels.people'),    value: step1.people },
    { label: t('labels.kingdom'),   value: step1.kingdom },
    { label: t('labels.era'),       value: step1.era },
    { label: t('labels.usage'),     value: step2.symbolism?.usage },
    { label: t('labels.license'),   value: step1.license?.toUpperCase() },
    { label: t('labels.keywords'),  value: (step2.symbolism?.keywords ?? []).join(', ') },
  ].filter((r) => r.value);

  return (
    <div className="space-y-6">
      <StepTitle title={t('title')} sub={t('sub')} />

      {/* Data rows */}
      <div className="space-y-1.5">
        {rows.map(({ label, value }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-xl border border-avs-accent/10 bg-avs-secondary-dark px-4 py-2.5"
          >
            <span className="w-24 shrink-0 font-mono text-[9px] font-black uppercase tracking-[0.16em] text-avs-accent/40">
              {label}
            </span>
            <span className="text-sm font-medium text-avs-accent">{value}</span>
          </div>
        ))}

        {/* Color swatches row */}
        {(step3.colors ?? []).length > 0 && (
          <div className="flex items-center gap-3 rounded-xl border border-avs-accent/10 bg-avs-secondary-dark px-4 py-2.5">
            <span className="w-24 shrink-0 font-mono text-[9px] font-black uppercase tracking-[0.16em] text-avs-accent/40">
              {t('labels.palette')}
            </span>
            <div className="flex gap-2">
              {(step3.colors ?? []).map((c) => (
                <span
                  key={c.hex}
                  className="h-5 w-5 rounded-lg ring-1 ring-black/10"
                  style={{ background: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Validation notice */}
      <div
        className="rounded-xl border border-avs-kente/20 bg-avs-kente/8 p-4 text-sm leading-relaxed"
        style={{ borderLeftWidth: 3, borderLeftColor: 'var(--color-avs-kente)' }}
      >
        <p className="mb-1.5 font-mono text-[9px] font-black uppercase tracking-[0.18em] text-avs-kente">
          {t('validationTitle')}
        </p>
        <p className="text-avs-accent/60">
          {t('validationText')}{' '}
          <strong className="text-avs-accent">{t('validationTime')}</strong>.
        </p>
      </div>

      {/* Submit error */}
      {errors['submit'] && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {errors['submit']}
        </div>
      )}
    </div>
  );
}