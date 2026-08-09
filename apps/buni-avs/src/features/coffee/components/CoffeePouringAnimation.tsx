'use client';

import { motion } from 'framer-motion';
import { Coffee, Sparkles } from 'lucide-react';

interface CoffeePouringAnimationProps {
  isPouring?: boolean;
  className?: string;
  cupCount?: number;
}

/**
 * Animation 2: Une main tenant une verseuse qui met/verse du café chaud dans une tasse.
 * S'active dynamiquement quand quelqu'un paie un café ou interagit.
 * Conçu avec SVG, Framer Motion et le design system Buni.
 */
export function CoffeePouringAnimation({
  isPouring = true,
  className = '',
  cupCount = 1,
}: CoffeePouringAnimationProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-avs-kente/30 bg-dark-surface/90 p-6 backdrop-blur-md ${className}`}
    >
      {/* Texture de fond discrète et lueur dorée */}
      <div className="pointer-events-none absolute inset-0 bg-radial-gradient from-avs-kente/15 via-avs-primary/10 to-transparent opacity-70" />

      <div className="relative z-10 text-center mb-2">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-avs-primary/30 bg-avs-primary/10 px-3 py-0.5 text-xs font-semibold text-avs-primary">
          <Sparkles className="h-3.5 w-3.5 text-avs-primary" />
          <span>Rituel du Versage</span>
        </div>
        <h4 className="font-display mt-1 text-base sm:text-lg font-bold text-dark-text">
          {isPouring ? 'Préparation de votre café...' : 'Tasse servie avec soin'}
        </h4>
      </div>

      <div className="relative mx-auto flex h-52 w-full max-w-sm items-center justify-center">
        {/* --- MAIN & VERSEUSE DE CAFÉ --- */}
        <motion.div
          animate={
            isPouring
              ? { rotate: [-20, -32, -20], x: [10, 0, 10], y: [-5, 0, -5] }
              : { rotate: 0, x: 0, y: 0 }
          }
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-2 right-12 z-20 flex flex-col items-center"
        >
          {/* Main tenant le manche */}
          <div className="relative">
            {/* SVG Main + Cafetière traditionnelle */}
            <svg viewBox="0 0 100 100" className="h-28 w-28 text-avs-kente fill-current">
              {/* Main stylisée (Raphia / Ocre) */}
              <path
                d="M75 35c3 0 6 2 7 5 1 3 0 6-2 8-2 2-5 2-7 1l-8-5c-2-1-3-4-2-6 1-2 3-3 5-3h7z"
                fill="var(--color-avs-raffia)"
              />
              <path
                d="M70 25c4 0 7 3 7 7s-3 7-7 7l-15-5V28l15-3z"
                fill="var(--color-avs-earth)"
                opacity="0.8"
              />

              {/* Cafetière / Versage */}
              <path
                d="M30 40 L60 40 L55 80 L35 80 Z"
                fill="var(--color-avs-accent)"
                stroke="var(--color-avs-kente)"
                strokeWidth="2"
              />
              {/* Bec versant */}
              <path
                d="M30 45 L15 35 L22 55 Z"
                fill="var(--color-avs-primary)"
              />
              {/* Anse de la cafetière */}
              <path
                d="M60 45 C75 45, 75 75, 55 75"
                fill="none"
                stroke="var(--color-avs-kente)"
                strokeWidth="4"
              />
              {/* Couvercle */}
              <ellipse cx="45" cy="40" rx="15" ry="5" fill="var(--color-avs-kente)" />
            </svg>
          </div>
        </motion.div>

        {/* --- JET DE CAFÉ CONTINU & VAPEUR (S'anime quand isPouring = true) --- */}
        {isPouring && (
          <>
            {/* Fil de liquide ambré versant de la cafetière à la tasse */}
            <motion.div
              animate={{ height: ['70px', '75px', '70px'], opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[68px] left-[132px] z-10 w-2 rounded-full bg-gradient-to-b from-avs-earth via-avs-primary to-avs-kente shadow-sm"
              style={{ height: '72px' }}
            />

            {/* Micro-gouttes & Éclaboussures d'or */}
            <motion.div
              animate={{ y: [0, 30], opacity: [0, 1, 0], scale: [0.5, 1, 0.2] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'easeIn' }}
              className="absolute top-[80px] left-[133px] z-10 h-1.5 w-1.5 rounded-full bg-avs-kente"
            />
          </>
        )}

        {/* --- TASSE À CAFÉ & VAPEUR AU FOND --- */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
          {/* Vapeur parfumée ondulante */}
          <div className="absolute -top-10 flex gap-2">
            {[0, 0.4, 0.8].map((d, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -20, -35], opacity: [0, 0.8, 0], scale: [0.7, 1.3, 0.5] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: d, ease: 'easeOut' }}
                className="h-5 w-2 rounded-full bg-avs-secondary/40 blur-[1px]"
              />
            ))}
          </div>

          {/* Tasse céramique Yoruba avec sous-tasse */}
          <div className="relative flex h-16 w-20 items-center justify-center">
            {/* Liquide se remplissant dans la tasse */}
            <div className="absolute top-3 h-3 w-12 overflow-hidden rounded-full bg-avs-earth/90 border border-avs-kente/40">
              <motion.div
                animate={isPouring ? { scale: [0.9, 1.05, 0.9] } : { scale: 1 }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="h-full w-full bg-gradient-to-r from-avs-primary to-avs-kente opacity-90"
              />
            </div>

            {/* Corps de la tasse */}
            <svg viewBox="0 0 60 50" className="h-14 w-16 text-avs-secondary fill-current shadow-lg">
              <path d="M10 15 C10 40, 50 40, 50 15 Z" fill="var(--color-light-surface)" stroke="var(--color-avs-primary)" strokeWidth="2" />
              {/* Motif Kente sur la tasse */}
              <rect x="15" y="22" width="30" height="4" fill="var(--color-avs-kente)" opacity="0.8" />
              {/* Anse de la tasse */}
              <path d="M48 20 C58 20, 58 35, 48 35" fill="none" stroke="var(--color-avs-primary)" strokeWidth="3" />
              {/* Soucoupe */}
              <ellipse cx="30" cy="42" rx="26" ry="4" fill="var(--color-avs-accent)" />
            </svg>
          </div>

          {/* Tag nombre de tasses */}
          <div className="mt-1 flex items-center gap-1 rounded-full bg-avs-kente/20 px-2.5 py-0.5 text-[11px] font-bold text-avs-kente border border-avs-kente/30">
            <Coffee className="h-3 w-3" />
            <span>{cupCount} {cupCount === 1 ? 'tasse versée' : 'tasses versées'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
