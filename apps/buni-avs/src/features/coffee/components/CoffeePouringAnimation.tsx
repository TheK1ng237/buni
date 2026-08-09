'use client';

import { motion } from 'framer-motion';
import { Coffee, Sparkles } from 'lucide-react';

interface CoffeePouringAnimationProps {
  isPouring?: boolean;
  className?: string;
  cupCount?: number;
}

/**
 * Animation 2: Une main qui met/verse le café dans une tasse,
 * utilisant le GIF d'animation /image/coffe1.gif.
 * Conçu avec les tokens du design system Buni.
 */
export function CoffeePouringAnimation({
  isPouring = true,
  className = '',
  cupCount = 1,
}: CoffeePouringAnimationProps) {
  return (
    <div className={`relative flex flex-col items-center justify-center h-full w-full ${className}`}>
      <div className="relative z-10 flex h-full w-full items-center justify-center overflow-hidden rounded-2xl ">
        {/* Le GIF de la main versant / recevant le café */}
        <img
          src="/image/coffe1.gif"
          alt="Main versant le café dans la tasse"
          className="h-full w-full object-contain"
        />

        {/* Overlay subtil avec lueur ambrée */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Vapeur animée au-dessus de la tasse */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 flex gap-2 pointer-events-none">
          {[0, 0.4, 0.8].map((d, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -15, -30], opacity: [0, 0.8, 0], scale: [0.7, 1.3, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: d, ease: 'easeOut' }}
              className="h-5 w-2 rounded-full bg-avs-secondary/40 blur-[1px]"
            />
          ))}
        </div>

        {/* Tag informatif superposé sur le GIF */}
        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3.5 py-1.5 text-xs font-bold text-avs-primary border border-avs-primary/20 shadow-lg">
          <Coffee className="h-3.5 w-3.5" />
          <span>{cupCount} {cupCount === 1 ? 'tasse versée' : 'tasses versées'}</span>
        </div>
      </div>
    </div>
  );
}
