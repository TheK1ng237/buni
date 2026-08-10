'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Heart, Lock, Coffee } from 'lucide-react';
import { usePayment } from '../hooks/usePayment';
import { useTranslations } from 'next-intl';

import { PaymentTierCard } from './PaymentTierCard';
import { PaymentProviderSelector } from './PaymentProviderSelector';
import { useBodyScrollLock } from '../hooks/Usebodyscrolllock';
import { useEscapeKey } from '../hooks/Useescapekey';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Modale de soutien financier AVS.
 * Architecture : la modale ne gère que l'orchestration (ouverture/fermeture,
 * focus, scroll-lock) — le style des paliers et des moyens de paiement
 * est délégué à PaymentTierCard / PaymentProviderSelector.
 */
export function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  const t = useTranslations('coffee.minimalist');
  const { config, initiatePayment, isProcessing } = usePayment();
  const [selectedProvider, setSelectedProvider] = useState(config.defaultProvider);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [errorTierId, setErrorTierId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEscapeKey(onClose, isOpen);
  useBodyScrollLock(isOpen);

  // Réinitialise l'état d'erreur quand on rouvre la modale
  useEffect(() => {
    if (isOpen) setErrorTierId(null);
  }, [isOpen]);

  const handleTierSelect = async (tierId: string) => {
    setSelectedTier(tierId);
    setErrorTierId(null);
    try {
      await initiatePayment(tierId, selectedProvider);
    } catch (error) {
      console.error('Payment failed:', error);
      setErrorTierId(tierId);
      setSelectedTier(null);
    }
  };

  const selectedProviderName = config.providers.find((p) => p.id === selectedProvider)?.name;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="payment-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-dark-bg/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Panneau */}
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl border border-avs-kente/40 bg-dark-surface shadow-avs-lg"
          >
            {/* Bandeau motif — cohérent avec MinimalistCoffeeSection */}
            <div className="avs-pattern-ndop-sultan pointer-events-none absolute inset-0 opacity-[0.03]" />
            
            {/* Gradient overlay */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(10,8,6,0.96) 0%, rgba(26,18,8,0.92) 100%)',
              }}
            />

            <button
              onClick={onClose}
              aria-label={t('thankYou.close')}
              className="absolute top-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-avs-accent/5 text-avs-accent/60 transition-all hover:bg-avs-accent/10 hover:text-avs-accent"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative max-h-[90vh] overflow-y-auto px-6 py-10 sm:px-10">
              <header className="mb-10 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-avs-primary/10">
                  <Heart className="h-6 w-6 text-avs-kente fill-avs-kente" />
                </div>
                <div className="mb-2 flex items-center justify-center gap-2">
                  <div className="bg-avs-primary h-px w-6" aria-hidden />
                  <span className="text-avs-primary font-mono text-[10px] tracking-[0.2em] uppercase font-bold">
                    {t('header.eyebrow')}
                  </span>
                  <div className="bg-avs-primary h-px w-6" aria-hidden />
                </div>
                <h2
                  id="payment-modal-title"
                  className="font-display text-2xl font-bold text-avs-accent sm:text-3xl"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {t('header.title')} <span className="text-avs-primary">{t('header.titleHighlight')}</span>
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm text-avs-accent/60 leading-relaxed">
                  {t('header.description')}
                </p>
              </header>

              <section className="mb-10">
                <div className="mb-3 flex items-center justify-center gap-2">
                  <Coffee className="h-4 w-4 text-avs-accent/50" />
                  <p className="text-xs font-semibold uppercase tracking-wide text-avs-accent/50">
                    {t('payment.label')}
                  </p>
                </div>
                <PaymentProviderSelector
                  providers={config.providers}
                  selected={selectedProvider}
                  onSelect={setSelectedProvider}
                />
              </section>

              <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {config.tiers.map((tier) => (
                  <PaymentTierCard
                    key={tier.id}
                    tier={tier}
                    onSelect={handleTierSelect}
                    isProcessing={isProcessing && selectedTier === tier.id}
                    selected={selectedTier === tier.id}
                    hasError={errorTierId === tier.id}
                  />
                ))}
              </section>

              <footer className="mt-8 flex items-center justify-center gap-6 text-xs text-avs-accent/50 border-t border-avs-accent/10 pt-6">
                <span className="flex items-center gap-1">
                  <Heart className="h-3 w-3 text-avs-kente fill-avs-kente" /> {t('reassurance.direct')}
                </span>
                <span className="flex items-center gap-1">
                  <Lock className="h-3 w-3" /> {t('reassurance.secure')}
                </span>
                <span className="flex items-center gap-1">
                  <Coffee className="h-3 w-3" /> {t('reassurance.cupsThisMonth')}
                </span>
              </footer>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}