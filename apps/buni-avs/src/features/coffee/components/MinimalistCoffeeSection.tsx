'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Coffee,
  Lightbulb,
  Palette,
  Rocket,
  Globe,
  Heart,
  Lock,
  ShieldCheck,
  Minus,
  Plus,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { usePayment } from '../payment/hooks/usePayment';
import { PaymentModal } from '../payment/components/PaymentModal';
import { CommunityGivingAnimation } from './CommunityGivingAnimation';
import { CoffeePouringAnimation } from './CoffeePouringAnimation';
import { Button, Input } from '@buni/ui';

// Messages prédéfinis accompagnés d'icônes lucide au lieu d'émojis
const PRESET_MESSAGES = [
  { id: 1, label: "Pour le prochain composant", icon: Lightbulb },
  { id: 2, label: "Pour l'amour du beau design", icon: Palette },
  { id: 3, label: "Continue d'inspirer !", icon: Rocket },
  { id: 4, label: "Soutien de la communauté", icon: Globe },
  { id: 5, label: "Simplement pour dire merci", icon: Coffee },
];

const PAYMENT_PROVIDERS = [
  { id: 'stripe', name: 'Stripe / Carte', icon: 'pi-credit-card' },
  { id: 'paypal', name: 'PayPal', icon: 'pi-paypal' },
  { id: 'mobile-money', name: 'Mobile Money', icon: 'pi-mobile' },
];

export function MinimalistCoffeeSection() {
  const [coffeesCount, setCoffeesCount] = useState<number>(3);
  const [customMessage, setCustomMessage] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string | null>(PRESET_MESSAGES[1]?.label ?? null);
  const [selectedProvider, setSelectedProvider] = useState<string>('stripe');
  const [activeTab, setActiveTab] = useState<'support' | 'community'>('support');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [showThankYou, setShowThankYou] = useState<boolean>(false);
  const { initiatePayment, isProcessing } = usePayment();

  const coffeePrice = 3;
  const totalAmount = coffeesCount * coffeePrice;

  const handlePresetSelect = (count: number) => {
    setCoffeesCount(count);
  };

  const handleTagClick = (label: string) => {
    if (selectedTag === label) {
      setSelectedTag(null);
    } else {
      setSelectedTag(label);
      setCustomMessage('');
    }
  };

  const handleDirectSupport = async () => {
    try {
      const tierId = coffeesCount <= 1 ? 'espresso' : coffeesCount <= 3 ? 'cappuccino' : 'pour-over';
      await initiatePayment(tierId, selectedProvider);
      setShowThankYou(true);
    } catch (err) {
      console.error('Payment Error:', err);
      setIsPaymentModalOpen(true);
    }
  };

  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-stretch bg-avs-secondary">
      {/* ══ LEFT — Décoratif avec pattern et GIF ════════════════════════════════════════ */}
      <div className="relative hidden w-[45%] overflow-hidden lg:block">
        <div className="avs-pattern-ndop-sultan absolute inset-0" />
        {/* Multi-stop gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(10,8,6,0.94) 0%, rgba(26,18,8,0.88) 100%)',
          }}
        />
        {/* Radial halo */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 65% 70% at 40% 45%, rgba(192,87,62,0.20) 0%, transparent 70%)',
          }}
          aria-hidden
        />
        {/* Fine grid */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(245,235,224,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,235,224,.04) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
          aria-hidden
        />

        {/* Content layer - GIF Animation (occupant toute la largeur) */}
        <div className="relative flex h-full w-full items-center justify-center p-4 lg:p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full h-full flex items-center justify-center"
          >
            <CoffeePouringAnimation isPouring={true} cupCount={coffeesCount} className="h-full w-full" />
          </motion.div>
        </div>
      </div>

      {/* ══ RIGHT — Formulaire et informations ═══════════════════════════════════════════ */}
      <div className="bg-avs-secondary flex flex-1 items-center justify-center px-4 py-12 sm:px-8 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="w-full max-w-md space-y-8"
        >
        {/* Heading */}
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-2">
            <div className="bg-avs-primary h-px w-6" aria-hidden />
            <span className="text-avs-primary font-mono text-[10px] tracking-[0.2em] uppercase font-bold">
              Soutien direct
            </span>
          </div>
          <h1
            className="font-display text-avs-accent leading-tight font-extrabold"
            style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', letterSpacing: '-0.02em' }}
          >
            Un café pour nourrir <span className="text-avs-primary">une vision</span>
          </h1>
          <p className="text-avs-accent/60 mt-1.5 text-xs leading-relaxed">
            Chaque tasse alimente la création open-source et la valorisation du patrimoine visuel africain.
          </p>
        </div>

        {/* Switcher de mode de vue (Segmented Control élégant) */}
        <div className="inline-flex p-1 rounded-xl bg-avs-accent/5 border border-avs-accent/10 mb-6 w-full">
          <button
            type="button"
            onClick={() => setActiveTab('support')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'support'
                ? 'bg-avs-primary text-avs-secondary shadow-xs'
                : 'text-avs-accent/60 hover:text-avs-accent'
            }`}
          >
            <Coffee className="h-3.5 w-3.5" />
            <span>Offrir un café</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('community')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'community'
                ? 'bg-avs-primary text-avs-secondary shadow-xs'
                : 'text-avs-accent/60 hover:text-avs-accent'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Animation Communauté</span>
          </button>
        </div>

        {/* Mobile GIF Animation */}
        <div className="lg:hidden mb-6 w-full">
          <CoffeePouringAnimation isPouring={true} cupCount={coffeesCount} className="h-52 w-full" />
        </div>

        {/* CONTENU EN TAB 1 : SUPPORT PRINCIPAL */}
        {activeTab === 'support' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Carte de Sélection du Café (Épurée & Lisible) */}
            <div className="rounded-2xl border border-avs-accent/10 bg-avs-accent/3 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-avs-accent/60">
                  Combien de tasses ?
                </span>
                <span className="text-xs font-bold text-avs-primary">
                  ${coffeePrice} / tasse
                </span>
              </div>

              {/* Affichage synthétique et épuré du montant */}
              <div className="flex items-baseline justify-between py-1">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-avs-primary/10 text-avs-primary">
                    <Coffee className="h-5 w-5 text-avs-kente" />
                  </div>
                  <div>
                    <span className="text-2xl font-black text-avs-accent">
                      {coffeesCount} {coffeesCount === 1 ? 'tasse' : 'tasses'}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-2xl font-black text-avs-primary">
                    ${totalAmount}
                  </span>
                </div>
              </div>

              {/* Contrôles d'ajustement (Pills + Stepper) */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setCoffeesCount((c) => Math.max(1, c - 1))}
                  aria-label="Moins de café"
                  className="h-10 w-10 rounded-xl border border-avs-accent/15 flex items-center justify-center text-avs-accent/70 hover:border-avs-primary hover:text-avs-primary transition-all active:scale-95 cursor-pointer"
                >
                  <Minus className="h-4 w-4" />
                </button>

                <div className="grid grid-cols-4 gap-1.5 flex-1">
                  {[1, 3, 5, 10].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handlePresetSelect(preset)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                        coffeesCount === preset
                          ? 'bg-avs-primary text-avs-secondary border-avs-primary shadow-xs'
                          : 'border-avs-accent/10 text-avs-accent/70 hover:border-avs-accent/30 hover:text-avs-accent'
                      }`}
                    >
                      {preset} {preset === 1 ? 'tasse' : 'tasses'}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setCoffeesCount((c) => c + 1)}
                  aria-label="Plus de café"
                  className="h-10 w-10 rounded-xl border border-avs-accent/15 flex items-center justify-center text-avs-accent/70 hover:border-avs-primary hover:text-avs-primary transition-all active:scale-95 cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Pensée créative / Mot d'encouragement (Épuré) */}
            <div className="space-y-2.5">
              <label className="block text-xs font-semibold text-avs-accent/70">
                Message d'encouragement <span className="font-normal text-avs-accent/40">(optionnel)</span>
              </label>

              <div className="flex flex-wrap gap-1.5">
                {PRESET_MESSAGES.map((msg) => (
                  <button
                    key={msg.id}
                    type="button"
                    onClick={() => handleTagClick(msg.label)}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                      selectedTag === msg.label
                        ? 'bg-avs-primary/10 border-avs-primary text-avs-primary font-semibold'
                        : 'border-avs-accent/10 text-avs-accent/60 hover:border-avs-accent/25 hover:text-avs-accent'
                    }`}
                  >
                    {msg.label}
                  </button>
                ))}
              </div>

              <Input
                type="text"
                value={customMessage}
                onChange={(e) => {
                  setCustomMessage(e.target.value);
                  if (e.target.value) setSelectedTag(null);
                }}
                placeholder="Ou écrivez votre propre message..."
                className="w-full rounded-xl border-avs-accent/15 text-xs text-avs-accent placeholder:text-avs-accent/40 focus:border-avs-primary"
              />
            </div>

            {/* Moyen de Paiement (Simplifié) */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-avs-accent/70">
                Moyen de paiement
              </label>
              <div className="grid grid-cols-3 gap-2">
                {PAYMENT_PROVIDERS.map((provider) => (
                  <button
                    key={provider.id}
                    type="button"
                    onClick={() => setSelectedProvider(provider.id)}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                      selectedProvider === provider.id
                        ? 'border-avs-primary bg-avs-primary/10 text-avs-primary font-bold'
                        : 'border-avs-accent/10 text-avs-accent/60 hover:text-avs-accent hover:border-avs-accent/20'
                    }`}
                  >
                    <i className={`pi ${provider.icon} text-xs`} />
                    <span>{provider.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Principal */}
            <div className="space-y-3 pt-2">
              <Button
                onClick={handleDirectSupport}
                disabled={isProcessing}
                className="group text-avs-secondary bg-avs-primary shadow-md relative w-full overflow-hidden rounded-xl py-3.5 text-sm font-extrabold transition-all duration-200 hover:opacity-95 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
              >
                <span className="relative flex items-center justify-center gap-2">
                  {isProcessing ? (
                    <>Traitement en cours...</>
                  ) : (
                    <>
                      Offrir {coffeesCount} {coffeesCount === 1 ? 'café' : 'cafés'} • ${totalAmount}
                      <ArrowRight size={16} />
                    </>
                  )}
                </span>
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="text-xs text-avs-accent/50 hover:text-avs-primary transition-colors cursor-pointer"
                >
                  Autres formules de soutien →
                </button>
              </div>
            </div>

            {/* Reassurance épurée */}
            <div className="pt-2 flex items-center justify-between text-[11px] text-avs-accent/50 border-t border-avs-accent/10">
              <span className="flex items-center gap-1">
                <Heart className="h-3 w-3 text-avs-kente fill-avs-kente" /> 100% direct
              </span>
              <span className="flex items-center gap-1">
                <Lock className="h-3 w-3" /> Sécurisé
              </span>
              <span className="flex items-center gap-1">
                <Coffee className="h-3 w-3" /> 348 tasses ce mois-ci
              </span>
            </div>
          </motion.div>
        )}

        {/* CONTENU EN TAB 2 : ANIMATION 1 (COMMUNAUTÉ) */}
        {activeTab === 'community' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <CommunityGivingAnimation supporterCount={348} />
          </motion.div>
        )}
      </motion.div>
    </div>

      {/* Instant Thank-You Dialog Overlay (avec Animation 2 intégrée) */}
      <AnimatePresence>
        {showThankYou && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowThankYou(false)}
              className="absolute inset-0 bg-dark-bg/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 10 }}
              className="relative z-10 w-full max-w-md rounded-3xl border border-avs-kente/40 bg-dark-surface p-6 sm:p-8 text-center shadow-avs-lg space-y-4"
            >
              {/* Animation 2 dans le modal de confirmation */}
              <div className="relative mb-4">
                <CoffeePouringAnimation isPouring={true} cupCount={coffeesCount} className="h-40" />
              </div>

              <h3 className="font-display text-2xl font-bold text-dark-text">Un immense merci !</h3>
              <p className="text-sm text-dark-text/80 leading-relaxed">
                Votre soutien de <span className="font-bold text-avs-kente">${totalAmount}</span> apporte une réelle chaleur à ce projet.{' '}
                {selectedTag || customMessage ? `« ${selectedTag || customMessage} »` : ''}
              </p>

              <Button
                onClick={() => setShowThankYou(false)}
                className="w-full rounded-xl bg-avs-primary py-3 font-bold text-white hover:bg-avs-primary/80 transition-colors cursor-pointer"
              >
                Fermer & Continuer
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Formules Modal Fallback */}
      <PaymentModal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} />
    </section>
  );
}
