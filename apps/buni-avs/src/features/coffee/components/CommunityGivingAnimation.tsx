'use client';

import { motion } from 'framer-motion';
import { Coffee, Heart, Sparkles } from 'lucide-react';

interface CommunityGivingAnimationProps {
  supporterCount?: number;
  className?: string;
}

/**
 * Animation 1: Illustre plusieurs mains de la communauté offrant un café
 * à une même main centrale réceptrice sur la page.
 * Utilise Framer Motion, SVG vectoriel et les tokens du Design System Buni.
 */
export function CommunityGivingAnimation({
  supporterCount = 348,
  className = '',
}: CommunityGivingAnimationProps) {
  // Positions et angles de 4 mains givers autour de la main centrale
  const givers = [
    { id: 1, angle: -135, delay: 0, label: 'Lagos' },
    { id: 2, angle: -45, delay: 0.4, label: 'Dakar' },
    { id: 3, angle: 135, delay: 0.8, label: 'Abidjan' },
    { id: 4, angle: 45, delay: 1.2, label: 'Nairobi' },
  ];

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-avs-primary/20 bg-dark-surface/80 p-6 backdrop-blur-md ${className}`}
    >
      {/* Halo d'ambiance aux couleurs du design system */}
      <div className="pointer-events-none absolute inset-0 bg-radial-gradient from-avs-primary/15 via-avs-kente/10 to-transparent opacity-60" />

      {/* Titre & En-tête de l'animation */}
      <div className="relative z-10 mb-4 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-avs-kente/30 bg-avs-kente/10 px-3 py-0.5 text-xs font-semibold text-avs-kente">
          <Sparkles className="h-3.5 w-3.5 animate-spin text-avs-kente" style={{ animationDuration: '6s' }} />
          <span>Énergie Collective</span>
        </div>
        <h3 className="font-display mt-2 text-lg font-bold text-dark-text sm:text-xl">
          Plusieurs mains, une même vision
        </h3>
        <p className="text-xs text-dark-text/70">
          Chaque contribution rejoint la main centrale de la communauté ({supporterCount}+ soutiens)
        </p>
      </div>

      {/* Zone de l'animation SVG & Framer Motion */}
      <div className="relative mx-auto flex h-64 w-full max-w-md items-center justify-center">
        {/* Cercles de convergence concentriques */}
        <div className="absolute h-44 w-44 rounded-full border border-dashed border-avs-kente/20 animate-spin" style={{ animationDuration: '30s' }} />
        <div className="absolute h-56 w-56 rounded-full border border-avs-primary/10" />

        {/* --- MAIN CENTRALE RÉCEPTRICE --- */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], y: [0, -3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-20 flex flex-col items-center justify-center"
        >
          {/* Vapeur animée s'élevant de la main centrale */}
          <div className="absolute -top-10 flex gap-1.5">
            {[0, 0.3, 0.6].map((d, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -18, -28], opacity: [0, 0.7, 0], scale: [0.8, 1.2, 0.6] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: d, ease: 'easeOut' }}
                className="h-4 w-1.5 rounded-full bg-avs-kente/40 blur-[1px]"
              />
            ))}
          </div>

          {/* SVG de la Main centrale avec Tasse réceptrice */}
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-avs-kente/40 bg-avs-primary/20 shadow-avs-md backdrop-blur-md">
            <svg
              viewBox="0 0 64 64"
              className="h-12 w-12 text-avs-kente fill-current"
              aria-label="Main centrale réceptrice"
            >
              {/* Paume ouverte tenant une tasse */}
              <path d="M18 42c0 6.6 5.4 12 12 12s12-5.4 12-12v-6H18v6z" fill="currentColor" opacity="0.9" />
              <path d="M14 34c0-2.2 1.8-4 4-4h28c2.2 0 4 1.8 4 4v2H14v-2z" fill="var(--color-avs-primary)" />
              {/* Main soutenant en dessous */}
              <path
                d="M12 50c4 6 12 8 20 8s16-2 20-8c2-3-1-6-4-5-5 1.7-11 2.5-16 2.5s-11-.8-16-2.5c-3-1-6 2-4 5z"
                fill="var(--color-avs-raffia)"
                opacity="0.8"
              />
            </svg>
            <Coffee className="absolute top-4 h-6 w-6 text-avs-secondary" />
          </div>

          <div className="mt-2 rounded-md bg-avs-primary/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-avs-kente border border-avs-kente/30">
            Main Centrale
          </div>
        </motion.div>

        {/* --- MAINS DONATRICES EN CONVERGENCE --- */}
        {givers.map((giver) => {
          // Calcul dynamique de la position orbitale de départ
          const rad = (giver.angle * Math.PI) / 180;
          const startX = Math.cos(rad) * 110;
          const startY = Math.sin(rad) * 110;
          const targetX = Math.cos(rad) * 35;
          const targetY = Math.sin(rad) * 35;

          return (
            <motion.div
              key={giver.id}
              initial={{ x: startX, y: startY, opacity: 0.6, scale: 0.9 }}
              animate={{
                x: [startX, targetX, startX],
                y: [startY, targetY, startY],
                opacity: [0.5, 1, 0.5],
                scale: [0.85, 1.1, 0.85],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                delay: giver.delay,
                ease: 'easeInOut',
              }}
              className="absolute z-10 flex flex-col items-center"
            >
              {/* Trait d'énergie lumineux vers le centre */}
              <motion.div
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, delay: giver.delay }}
                className="absolute top-1/2 left-1/2 h-0.5 bg-gradient-to-r from-avs-primary to-avs-kente opacity-50"
                style={{
                  width: '40px',
                  transformOrigin: '0 0',
                  transform: `rotate(${giver.angle + 180}deg)`,
                }}
              />

              {/* Main Donatrice tenue avec Tasse */}
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-avs-primary/40 bg-dark-bg/90 shadow-md">
                <Coffee className="h-5 w-5 text-avs-primary" />
              </div>

              {/* Tag de la communauté */}
              <span className="mt-1 text-[9px] font-medium text-dark-text/60">
                {giver.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Footer de l'animation */}
      <div className="relative z-10 mt-2 flex items-center justify-between border-t border-avs-primary/10 pt-3 text-[11px] text-dark-text/60">
        <div className="flex items-center gap-1.5">
          <Heart className="h-3.5 w-3.5 text-avs-primary fill-avs-primary" />
          <span>Soutien communautaire unifié</span>
        </div>
        <div className="font-mono text-avs-kente">100% direct</div>
      </div>
    </div>
  );
}
