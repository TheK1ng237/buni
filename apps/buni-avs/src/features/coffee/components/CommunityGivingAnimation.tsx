'use client';

import { motion } from 'framer-motion';
import { Coffee, Heart, Sparkles } from 'lucide-react';

interface CommunityGivingAnimationProps {
  supporterCount?: number;
  className?: string;
}

/**
 * Animation 1: Illustre plusieurs mains de la communauté offrant un café
 * à une même main centrale réceptrice (animée via /image/coffe1.gif).
 * Utilise Framer Motion, le GIF spécifié et les tokens du Design System Buni.
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
    <div className={`relative p-6 ${className}`}>
      {/* Titre & En-tête de l'animation */}
      <div className="relative z-10 mb-4 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-avs-kente/10 px-3 py-0.5 text-xs font-semibold text-avs-kente">
          <Sparkles className="h-3.5 w-3.5 animate-spin text-avs-kente" style={{ animationDuration: '6s' }} />
          <span>Énergie Collective</span>
        </div>
        <h3 className="font-display mt-2 text-lg font-bold text-avs-accent sm:text-xl">
          Plusieurs mains, une même vision
        </h3>
        <p className="text-xs text-avs-accent/55">
          Chaque contribution rejoint la main centrale de la communauté ({supporterCount}+ soutiens)
        </p>
      </div>

      {/* Zone de l'animation avec GIF & Framer Motion */}
      <div className="relative mx-auto flex h-72 w-full max-w-md items-center justify-center">

        {/* --- MAIN CENTRALE RÉCEPTRICE (GIF COFFE1.GIF) --- */}
        <motion.div
          animate={{ scale: [1, 1.03, 1], y: [0, -2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-20 flex flex-col items-center justify-center"
        >
          {/* Vapeur animée s'élevant du GIF */}
          <div className="absolute -top-6 z-30 flex gap-1.5">
            {[0, 0.3, 0.6].map((d, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -18, -28], opacity: [0, 0.7, 0], scale: [0.8, 1.2, 0.6] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: d, ease: 'easeOut' }}
                className="h-4 w-1.5 rounded-full bg-avs-kente/40 blur-[1px]"
              />
            ))}
          </div>

          {/* Conteneur GIF personnalisé pour l'animation de la main recevant le café */}
          <div className="relative flex h-36 w-36 overflow-hidden rounded-full bg-dark-bg">
            <img
              src="/image/coffe1.gif"
              alt="Main recevant le café"
              className="h-full w-full object-cover rounded-full"
            />
            <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          <div className="mt-2 rounded-md bg-avs-primary/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-avs-secondary">
            Main Centrale Réceptrice
          </div>
        </motion.div>

        {/* --- MAINS DONATRICES EN CONVERGENCE --- */}
        {givers.map((giver) => {
          const rad = (giver.angle * Math.PI) / 180;
          const startX = Math.cos(rad) * 130;
          const startY = Math.sin(rad) * 130;
          const targetX = Math.cos(rad) * 65;
          const targetY = Math.sin(rad) * 65;

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
                  width: '45px',
                  transformOrigin: '0 0',
                  transform: `rotate(${giver.angle + 180}deg)`,
                }}
              />

              {/* Main Donatrice tenue avec Tasse */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-avs-secondary/90">
                <Coffee className="h-4 w-4 text-avs-primary" />
              </div>

              {/* Tag de la communauté */}
              <span className="mt-1 text-[9px] font-medium text-avs-accent/38">
                {giver.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Footer de l'animation */}
      <div className="relative z-10 mt-2 flex items-center justify-between pt-3 text-[11px] text-avs-accent/38">
        <div className="flex items-center gap-1.5">
          <Heart className="h-3.5 w-3.5 text-avs-primary fill-avs-primary" />
          <span>Soutien communautaire unifié</span>
        </div>
        <div className="font-mono text-avs-kente">100% direct</div>
      </div>
    </div>
  );
}
