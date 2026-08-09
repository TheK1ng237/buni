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
import { Button, Badge, Input } from '@buni/ui';

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
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-dark-bg text-dark-text overflow-hidden selection:bg-avs-primary selection:text-white">
      {/* Background Cultural Pattern Overlay (Design System Motif Ndop) */}
      <div className="avs-pattern-ndop-sultan pointer-events-none absolute inset-0 opacity-[0.04]" />

      {/* Dynamic Ambient Glow Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle at 50% 25%, var(--color-avs-primary, #C0573E) 0%, var(--color-avs-kente, #D4A017) 20%, transparent 70%)`,
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10 w-full max-w-4xl space-y-6">
        {/* Switcher de mode de vue : Offrir ou Visualiser la Communauté */}
        <div className="flex justify-center">
          <div className="inline-flex rounded-2xl border border-avs-primary/20 bg-dark-surface/90 p-1.5 backdrop-blur-xl shadow-avs-md">
            <button
              type="button"
              onClick={() => setActiveTab('support')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'support'
                  ? 'bg-avs-primary text-white shadow-md'
                  : 'text-dark-text/70 hover:text-dark-text hover:bg-avs-primary/10'
              }`}
            >
              <Coffee className="h-4 w-4" />
              <span>Offrir un café</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('community')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'community'
                  ? 'bg-avs-primary text-white shadow-md'
                  : 'text-dark-text/70 hover:text-dark-text hover:bg-avs-primary/10'
              }`}
            >
              <Sparkles className="h-4 w-4 text-avs-kente" />
              <span>Animation Communauté</span>
            </button>
          </div>
        </div>

        {/* CONTENU EN TAB 1 : SUPPORT PRINCIPAL */}
        {activeTab === 'support' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid gap-6 lg:grid-cols-12 items-start"
          >
            {/* Carte Principale de Don */}
            <div className="lg:col-span-7 relative overflow-hidden rounded-3xl border border-avs-primary/20 bg-dark-surface/90 backdrop-blur-2xl p-6 sm:p-8 shadow-avs-lg">
              {/* Top Highlight line */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-avs-primary to-transparent opacity-80" />

              {/* Header & Emotional Tagline */}
              <div className="text-center space-y-3 mb-6">
                <Badge variant="outline" className="border-avs-kente/40 bg-avs-kente/10 text-avs-kente gap-2 py-1 px-3">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-avs-kente opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-avs-kente"></span>
                  </span>
                  <span>L'Art du Soutien • Warmth & Code</span>
                </Badge>

                <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-dark-text leading-tight">
                  Un café pour nourrir <span className="bg-gradient-to-r from-avs-primary via-avs-raffia to-avs-kente bg-clip-text text-transparent">une vision.</span>
                </h1>

                <p className="text-xs sm:text-sm text-dark-text/75 max-w-md mx-auto leading-relaxed">
                  Chaque tasse alimente directement la création, le code open-source et la valorisation du patrimoine visuel africain.
                </p>
              </div>

              {/* Dynamic Interactive Coffee Cup Display */}
              <div className="my-5 rounded-2xl bg-dark-bg/80 border border-avs-primary/15 p-5 text-center space-y-4 backdrop-blur-md">
                <div className="flex items-center justify-center gap-2 min-h-[48px]">
                  <AnimatePresence mode="popLayout">
                    {Array.from({ length: Math.min(coffeesCount, 7) }).map((_, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ scale: 0, y: 15, rotate: -15 }}
                        animate={{ scale: 1, y: 0, rotate: 0 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 22, delay: idx * 0.04 }}
                        className="relative select-none flex items-center justify-center"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-avs-primary/20 border border-avs-primary/30 text-avs-primary shadow-sm">
                          <Coffee className="h-5 w-5 text-avs-kente" />
                        </div>
                        <motion.span
                          animate={{ y: [-2, -8, -2], opacity: [0.2, 0.8, 0] }}
                          transition={{ repeat: Infinity, duration: 2, delay: idx * 0.3 }}
                          className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] text-avs-kente font-mono opacity-60 pointer-events-none"
                        >
                          ~
                        </motion.span>
                      </motion.div>
                    ))}
                    {coffeesCount > 7 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-sm font-bold text-avs-kente ml-2 flex items-center gap-1"
                      >
                        +{coffeesCount - 7} <Coffee className="h-4 w-4" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                {/* Stepper Controls */}
                <div className="flex items-center justify-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setCoffeesCount((c) => Math.max(1, c - 1))}
                    aria-label="Diminuer le nombre de cafés"
                    className="w-9 h-9 rounded-full border border-avs-primary/30 bg-dark-surface text-dark-text hover:bg-avs-primary/20 hover:border-avs-primary transition-all flex items-center justify-center active:scale-95 cursor-pointer"
                  >
                    <Minus className="h-4 w-4" />
                  </button>

                  <div className="flex items-center gap-2">
                    {[1, 3, 5].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => handlePresetSelect(preset)}
                        className={`relative px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 border cursor-pointer ${
                          coffeesCount === preset
                            ? 'bg-avs-primary text-white border-avs-primary shadow-md scale-105'
                            : 'bg-dark-surface/80 text-dark-text/80 border-avs-primary/20 hover:bg-avs-primary/10'
                        }`}
                      >
                        {preset} {preset === 1 ? 'tasse' : 'tasses'} (${preset * coffeePrice})
                        {preset === 3 && (
                          <span className="absolute -top-2 right-0 px-1.5 py-0.2 rounded-full bg-avs-kente text-dark-bg text-[8px] font-bold uppercase tracking-wider">
                            Populaire
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setCoffeesCount((c) => c + 1)}
                    aria-label="Augmenter le nombre de cafés"
                    className="w-9 h-9 rounded-full border border-avs-primary/30 bg-dark-surface text-dark-text hover:bg-avs-primary/20 hover:border-avs-primary transition-all flex items-center justify-center active:scale-95 cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <p className="text-xs text-dark-text/60 italic pt-1">
                  {coffeesCount === 1 && '“Une jolie étincelle de concentration et un sourire en plus.”'}
                  {coffeesCount === 2 && '“De quoi booster une session intense de création.”'}
                  {coffeesCount === 3 && '“Alimente ~6 heures de code ininterrompu & café d\'exception.”'}
                  {coffeesCount >= 4 && `“Formidable ! Vous offrez ${coffeesCount} cafés — une vraie journée d'inspiration dédiée.”`}
                </p>
              </div>

              {/* Tag Messages */}
              <div className="space-y-2 mb-5">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-dark-text/60">
                  Associer une pensée créative
                </label>

                <div className="flex flex-wrap gap-2">
                  {PRESET_MESSAGES.map((msg) => {
                    const IconComp = msg.icon;
                    return (
                      <button
                        key={msg.id}
                        type="button"
                        onClick={() => handleTagClick(msg.label)}
                        className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                          selectedTag === msg.label
                            ? 'bg-avs-kente/20 text-avs-kente border-avs-kente'
                            : 'bg-dark-bg/40 text-dark-text/70 border-avs-primary/15 hover:border-avs-primary/30 hover:text-dark-text'
                        }`}
                      >
                        <IconComp className="h-3.5 w-3.5 text-avs-kente" />
                        <span>{msg.label}</span>
                      </button>
                    );
                  })}
                </div>

                <Input
                  type="text"
                  value={customMessage}
                  onChange={(e) => {
                    setCustomMessage(e.target.value);
                    if (e.target.value) setSelectedTag(null);
                  }}
                  placeholder="Ou écrivez un mot personnalisé..."
                  className="mt-2 w-full rounded-xl bg-dark-bg/80 border-avs-primary/20 text-xs text-dark-text placeholder:text-dark-text/40"
                />
              </div>

              {/* Moyen de Paiement */}
              <div className="space-y-2 mb-6">
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-dark-text/60">
                  Moyen de paiement rapide
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {PAYMENT_PROVIDERS.map((provider) => (
                    <button
                      key={provider.id}
                      type="button"
                      onClick={() => setSelectedProvider(provider.id)}
                      className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        selectedProvider === provider.id
                          ? 'bg-avs-primary/20 text-avs-primary border-avs-primary'
                          : 'bg-dark-bg/50 text-dark-text/60 border-avs-primary/10 hover:border-avs-primary/30 hover:text-dark-text'
                      }`}
                    >
                      <i className={`pi ${provider.icon} text-xs`} />
                      <span>{provider.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Button CTA */}
              <div className="space-y-3">
                <Button
                  onClick={handleDirectSupport}
                  disabled={isProcessing}
                  className="w-full h-12 rounded-xl bg-avs-primary hover:bg-avs-primary/90 text-white font-bold shadow-avs-md transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                >
                  <Heart className="h-5 w-5 text-avs-kente fill-avs-kente animate-pulse" />
                  <span>
                    {isProcessing ? 'Traitement en cours...' : `Offrir ${coffeesCount} ${coffeesCount === 1 ? 'café' : 'cafés'} • $${totalAmount}`}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setIsPaymentModalOpen(true)}
                    className="text-xs text-dark-text/50 hover:text-avs-kente transition-colors underline underline-offset-4 cursor-pointer"
                  >
                    Voir toutes les options & formules de soutien avancées →
                  </button>
                </div>
              </div>

              {/* Bottom Trust Bar */}
              <div className="mt-6 pt-4 border-t border-avs-primary/15 flex flex-wrap items-center justify-between gap-2 text-[11px] text-dark-text/50">
                <div className="flex items-center gap-1.5">
                  <Heart className="h-3.5 w-3.5 text-avs-kente fill-avs-kente" />
                  <span>100% direct aux créateurs</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-avs-primary" />
                  <span>Paiement sécurisé</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Coffee className="h-3.5 w-3.5 text-avs-primary" />
                  <span>348 tasses ce mois-ci</span>
                </div>
              </div>
            </div>

            {/* Colonne Droite : ANIMATION 2 (Main versant du café) */}
            <div className="lg:col-span-5 space-y-6">
              <CoffeePouringAnimation isPouring={true} cupCount={coffeesCount} />
              
              {/* Carte explicative */}
              <div className="rounded-2xl border border-avs-primary/15 bg-dark-surface/60 p-5 backdrop-blur-sm text-xs text-dark-text/70 space-y-2">
                <div className="flex items-center gap-2 font-bold text-avs-kente">
                  <ShieldCheck className="h-4 w-4 text-avs-kente" />
                  <span>Transparence & Impact</span>
                </div>
                <p>
                  Chaque geste soutient l'écosystème open-source et le développement d'outils numériques valorisant les cultures africaines.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* CONTENU EN TAB 2 : ANIMATION 1 (COMMUNAUTÉ) */}
        {activeTab === 'community' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <CommunityGivingAnimation supporterCount={348} />
          </motion.div>
        )}
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
              <CoffeePouringAnimation isPouring={true} cupCount={coffeesCount} />

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
