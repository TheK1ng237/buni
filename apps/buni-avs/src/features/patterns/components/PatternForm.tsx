'use client';

import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  FileText,
  Hourglass,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';

import { BuniLoader, useToast } from '@buni-design/ui';
import { useAuth } from '@buni/auth';
import { CSS_PATTERN_MAP, FALLBACK_PATTERN_CSS } from '@buni-design/patterns';
import { FORM_STEPS } from '../constants/pattern.constants';
import type { Pattern } from '@buni-design/patterns';
import type { PatternStatus } from '../types';

import { Step1 } from './steps/step1';
import { Step2 } from './steps/step2';
import { Step3 } from './steps/step3';
import { Step4 } from './steps/step4';
import { LivePreviewSidebar } from './Patternform.preview';
import { usePatternForm } from '../hooks/Usepatternform';
import { useUpdateStatus } from '../hooks/usePatternActions';

import { useTranslations } from '@/i18n';

// ─────────────────────────────────────────────────────────────────────────────
// STEPPER
// ─────────────────────────────────────────────────────────────────────────────

function Stepper({ currentStep }: { currentStep: number }) {
  const t = useTranslations('patternForm');
  const stepKeys = ['identity', 'description', 'colorsAssets', 'revision'] as const;

  return (
    <div className="mb-10 flex items-center">
      {FORM_STEPS.map((_, i) => {
        const label = t(`steps.${stepKeys[i] ?? 'identity'}`);
        return (
          <div key={i} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-2">
              <motion.div
                animate={i <= currentStep ? { scale: [1, 1.12, 1] } : {}}
                transition={{ duration: 0.3 }}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                  i < currentStep
                    ? 'bg-avs-primary text-avs-secondary'
                    : i === currentStep
                      ? 'bg-avs-primary text-avs-secondary ring-avs-primary/15 ring-4'
                      : 'border-avs-accent/15 bg-avs-secondary text-avs-accent/30 border'
                } `}
              >
                {i < currentStep ? <Check size={13} strokeWidth={3} /> : <span>{i + 1}</span>}
              </motion.div>
              <span
                className={`hidden font-mono text-[9px] font-bold tracking-[0.14em] whitespace-nowrap uppercase sm:block ${i === currentStep ? 'text-avs-primary' : 'text-avs-accent/30'} `}
              >
                {label}
              </span>
            </div>

            {i < FORM_STEPS.length - 1 && (
              <div className="bg-avs-accent/15 relative mx-3 h-px flex-1 overflow-hidden">
                <motion.div
                  className="bg-avs-primary absolute inset-y-0 left-0 rounded-full"
                  animate={{ width: i < currentStep ? '100%' : '0%' }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN FORM
// ─────────────────────────────────────────────────────────────────────────────

interface PatternFormProps {
  initialPattern?: Pattern;
}

export function PatternForm({ initialPattern }: PatternFormProps) {
  const router = useRouter();
  const form = usePatternForm(initialPattern);
  const t = useTranslations('patternForm');
  const { isAdmin } = useAuth();
  const { add } = useToast();
  const statusMutation = useUpdateStatus();
  const [currentStatus, setCurrentStatus] = useState<PatternStatus | undefined>(
    initialPattern?.status?.toLowerCase() as PatternStatus | undefined
  );
  const stepKeys = ['identity', 'description', 'colorsAssets', 'revision'] as const;
  const descKeys = ['identityDesc', 'descriptionDesc', 'colorsAssetsDesc', 'revisionDesc'] as const;
  const statusOptions: {
    value: PatternStatus;
    label: string;
    icon: typeof FileText;
  }[] = [
    { value: 'draft', label: 'Brouillon', icon: FileText },
    { value: 'review', label: 'En révision', icon: Hourglass },
    { value: 'published', label: 'Publié', icon: CheckCircle2 },
  ];

  const {
    currentStep,
    loading,
    errors,
    step1,
    step2,
    step3,
    svgFile,
    newKeyword,
    setStep1,
    setStep2,
    setStep3,
    setSvgFile,
    setNewKeyword,
    goNext,
    goPrev,
    addKeyword,
    removeKeyword,
    updateColor,
    addColor,
    removeColor,
    updateSource,
    addSource,
    removeSource,
    updateSymbol,
    addSymbol,
    removeSymbol,
    submit,
  } = form;

  const previewCSS = step1.patternType
    ? CSS_PATTERN_MAP[step1.patternType.toLowerCase() as keyof typeof CSS_PATTERN_MAP]
    : (CSS_PATTERN_MAP.ndop ?? FALLBACK_PATTERN_CSS);
  const progress = (currentStep / (FORM_STEPS.length - 1)) * 100;

  const handleStatusChange = (status: PatternStatus) => {
    if (!initialPattern || status === currentStatus || statusMutation.isPending) return;

    statusMutation.mutate(
      { id: initialPattern.id, status },
      {
        onSuccess: () => {
          setCurrentStatus(status);
          add({
            variant: 'success',
            title: 'Statut mis à jour',
            message: `Le motif est maintenant ${statusOptions.find((option) => option.value === status)?.label.toLowerCase()}.`,
          });
        },
        onError: (error) => {
          console.error('Pattern status update failed:', error);
          add({
            variant: 'error',
            title: 'Mise à jour impossible',
            message: error instanceof Error ? error.message : 'Veuillez réessayer.',
          });
        },
      }
    );
  };

  return (
    <div className="bg-avs-secondary min-h-screen">
      {/* ── Loading overlay ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-avs-accent/60 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
          >
            <BuniLoader size={80} showText={false} theme="dark" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Sticky header ───────────────────────────────────────────────── */}
      <header className="border-avs-accent/10 bg-avs-secondary/95 sticky top-0 z-30 border-b backdrop-blur-xl">
        {/* Progress bar */}
        <div className="bg-avs-accent/10 absolute inset-x-0 bottom-0 h-px">
          <motion.div
            className="bg-avs-primary h-full rounded-full"
            style={{ originX: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.back()}
            aria-label={t('header.back')}
            className="border-avs-accent/15 text-avs-accent/40 hover:border-avs-accent/25 hover:text-avs-accent flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-150"
          >
            <ArrowLeft size={16} />
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h1 className="font-display text-avs-accent text-lg font-black tracking-tight">
                {initialPattern ? t('header.editTitle') : t('header.newTitle')}
              </h1>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentStep}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18 }}
                  className="border-avs-primary/20 bg-avs-primary/10 text-avs-primary rounded-lg border px-2.5 py-1 font-mono text-[9px] font-bold tracking-[0.14em] uppercase"
                >
                  {t(`steps.${stepKeys[currentStep] ?? 'identity'}`)}
                </motion.span>
              </AnimatePresence>
            </div>
            <p className="text-avs-accent/40 mt-0.5 text-[11px]">
              {t('header.stepProgress', {
                current: currentStep + 1,
                total: FORM_STEPS.length,
                desc: t(`steps.${descKeys[currentStep] ?? 'identityDesc'}`),
              })}
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {initialPattern && isAdmin && (
          <section
            aria-labelledby="pattern-status-heading"
            className="avs-card mb-7 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2
                id="pattern-status-heading"
                className="font-display text-avs-accent text-sm font-bold"
              >
                Publication du motif
              </h2>
              <p className="text-avs-accent/45 mt-1 text-xs">
                Modifiez la visibilité du motif sans quitter l’édition.
              </p>
            </div>

            <div className="flex flex-wrap gap-2" aria-label="Statut du motif">
              {statusOptions.map(({ value, label, icon: Icon }) => {
                const isCurrent = currentStatus === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleStatusChange(value)}
                    disabled={isCurrent || statusMutation.isPending}
                    aria-pressed={isCurrent}
                    className={`inline-flex min-h-10 items-center gap-2 rounded-xl border px-3 text-xs font-semibold transition-colors disabled:cursor-default ${
                      isCurrent
                        ? 'border-avs-primary/25 bg-avs-primary/10 text-avs-primary'
                        : 'border-avs-accent/10 text-avs-accent/55 hover:border-avs-primary/25 hover:bg-avs-primary/5 hover:text-avs-primary disabled:opacity-50'
                    }`}
                  >
                    {statusMutation.isPending && statusMutation.variables?.status === value ? (
                      <Loader2 size={13} className="animate-spin" aria-hidden />
                    ) : (
                      <Icon size={13} aria-hidden />
                    )}
                    {label}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        <Stepper currentStep={currentStep} />

        <div className="grid gap-6 lg:grid-cols-[1fr_272px]">
          {/* ── Form panel ──────────────────────────────────────────────── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="avs-card overflow-hidden"
            >
              <div className="avs-pattern-ndop-sultan h-1 w-full" aria-hidden />

              <div className="space-y-6 p-7">
                {currentStep === 0 && (
                  <Step1
                    data={step1}
                    errors={errors}
                    onChange={(patch) => setStep1((f) => ({ ...f, ...patch }))}
                  />
                )}

                {currentStep === 1 && (
                  <Step2
                    data={step2}
                    errors={errors}
                    newKeyword={newKeyword}
                    onChange={(patch) => setStep2((f) => ({ ...f, ...patch }))}
                    onNewKeywordChange={setNewKeyword}
                    onAddKeyword={addKeyword}
                    onRemoveKeyword={removeKeyword}
                  />
                )}

                {currentStep === 2 && (
                  <Step3
                    data={step3}
                    errors={errors}
                    svgFile={svgFile}
                    onChange={(patch) => setStep3((f) => ({ ...f, ...patch }))}
                    onSvgFileChange={setSvgFile}
                    onUpdateColor={updateColor}
                    onAddColor={addColor}
                    onRemoveColor={removeColor}
                    onUpdateSource={updateSource}
                    onAddSource={addSource}
                    onRemoveSource={removeSource}
                    onUpdateSymbol={updateSymbol}
                    onAddSymbol={addSymbol}
                    onRemoveSymbol={removeSymbol}
                  />
                )}

                {currentStep === 3 && (
                  <Step4 step1={step1} step2={step2} step3={step3} errors={errors} />
                )}

                {/* ── Navigation ──────────────────────────────────────── */}
                <div className="border-avs-accent/10 flex items-center justify-between border-t pt-5">
                  <button
                    type="button"
                    onClick={goPrev}
                    disabled={currentStep === 0}
                    className="avs-btn-secondary flex items-center gap-2 disabled:pointer-events-none disabled:opacity-30"
                  >
                    <ArrowLeft size={13} /> {t('actions.prev')}
                  </button>

                  {currentStep < FORM_STEPS.length - 1 ? (
                    <button
                      type="button"
                      onClick={goNext}
                      className="avs-btn-primary group relative flex items-center gap-2 overflow-hidden"
                    >
                      <span
                        className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                        aria-hidden
                      />
                      {t('actions.next')}{' '}
                      <ArrowRight
                        size={13}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => void submit()}
                      disabled={loading}
                      aria-busy={loading}
                      className="avs-btn-primary group relative flex items-center gap-2 overflow-hidden disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <span
                        className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                        aria-hidden
                      />
                      {loading ? (
                        <>
                          <BuniLoader size={16} showText={false} theme="dark" />
                          <span className="animate-pulse">{t('actions.submitting')}</span>
                        </>
                      ) : (
                        <>
                          <Sparkles size={13} />{' '}
                          {initialPattern ? t('actions.update') : t('actions.submit')}
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Sidebar preview ─────────────────────────────────────────── */}
          <LivePreviewSidebar
            currentStep={currentStep}
            step1={step1}
            step2={step2}
            step3={step3}
            previewCSS={previewCSS}
            svgFile={svgFile}
            initialPattern={initialPattern}
          />
        </div>
      </div>
    </div>
  );
}
