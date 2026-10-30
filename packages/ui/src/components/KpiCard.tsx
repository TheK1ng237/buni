'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../utils';

export interface KpiCardProps {
  /** The title/label for the KPI card */
  label: React.ReactNode;
  /** The numerical or string metric value */
  value: number | string;
  /** Optional trend text, e.g. "+12.5% vs mois dernier" */
  trend?: string;
  /** Optional trend direction (true = positive/up, false = negative/down). Default: true */
  trendUp?: boolean;
  /** Icon: Lucide Icon component, PrimeIcon string (e.g. "users"), or custom ReactNode */
  icon?: React.ElementType | React.ReactNode | string;
  /** Main accent color (CSS hex or variable) used for icon badge, progress bar, etc. Default: '#C0573E' */
  color?: string;
  /** CSS class for the background pattern motif (e.g. "avs-pattern-kente-royale") */
  patternCss?: string;
  /** Pattern opacity level. Default: 0.07 */
  patternOpacity?: number;
  /** Animation delay in seconds (for Framer Motion entrance staggering) */
  delay?: number;
  /** Value formatting function (e.g. formatNumber from @buni/utils) */
  format?: (val: number) => string;
  /** Progress percentage (0 - 100). If provided, renders progress bar */
  progress?: number;
  /** Optional sub-text or subtitle */
  sub?: string;
  /** Show a colored top accent border line. Default: false */
  topAccent?: boolean;
  /** Additional container classes */
  className?: string;
  /** Optional click handler */
  onClick?: () => void;
}

function useCounter(target: number, duration = 1200) {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if (typeof target !== 'number' || isNaN(target)) {
      return;
    }

    let start: number | null = null;
    let animId: number;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // Easing function (easeOutExpo) for ultra-smooth animation
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.floor(eased * target));
      if (progress < 1) {
        animId = requestAnimationFrame(step);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [target, duration]);

  return value;
}

export function KpiCard({
  label,
  value,
  trend,
  trendUp = true,
  icon,
  color = '#C0573E',
  patternCss,
  patternOpacity = 0.07,
  delay = 0,
  format,
  progress,
  sub,
  topAccent = false,
  className,
  onClick,
}: KpiCardProps) {
  const isNumeric = typeof value === 'number';
  const numericTarget = isNumeric ? (value as number) : 0;
  const count = useCounter(numericTarget);

  const displayedValue = React.useMemo(() => {
    if (!isNumeric) return value;
    if (format) return format(count);
    return count.toLocaleString();
  }, [isNumeric, value, format, count]);

  const renderIcon = () => {
    if (!icon) return null;

    if (typeof icon === 'string') {
      const iconClass = icon.startsWith('pi-') ? icon : `pi pi-${icon}`;
      return <i className={cn(iconClass, 'text-base')} style={{ color }} aria-hidden />;
    }

    if (typeof icon === 'function' || (typeof icon === 'object' && icon !== null && '$$typeof' in icon)) {
      const IconComp = icon as React.ElementType;
      return <IconComp size={16} style={{ color }} aria-hidden />;
    }

    return icon as React.ReactNode;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className={cn(
        'group relative flex flex-col justify-between gap-5 overflow-hidden rounded-2xl border border-avs-accent/8 bg-avs-secondary p-6 transition-all duration-300 hover:border-avs-accent/18 hover:-translate-y-0.5 shadow-avs',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {/* Top Accent Line */}
      {topAccent && (
        <div
          className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl"
          style={{ background: color }}
          aria-hidden
        />
      )}

      {/* Background Motif Pattern Layer (Covering full background) */}
      {patternCss && (
        <div
          className={cn(
            patternCss,
            'pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 group-hover:opacity-[0.14]'
          )}
          style={{ opacity: patternOpacity }}
          aria-hidden="true"
        />
      )}

      {/* Card Header (Label & Icon) */}
      <div className="relative z-10 flex items-center justify-between">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-avs-accent/40">
          {label}
        </p>
        {icon && (
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
            style={{ background: `${color}14` }}
          >
            {renderIcon()}
          </div>
        )}
      </div>

      {/* Metric Value & Trend / Subtitle */}
      <div className="relative z-10">
        <p
          className="font-display text-4xl font-black tabular-nums leading-none text-avs-accent"
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          {displayedValue}
        </p>
        {sub && <p className="mt-1.5 text-xs text-avs-accent/40">{sub}</p>}
        {trend && (
          <p
            className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold"
            style={{ color }}
          >
            {trendUp ? (
              <TrendingUp size={12} aria-hidden />
            ) : (
              <TrendingDown size={12} aria-hidden />
            )}
            {trend}
          </p>
        )}
      </div>

      {/* Progress Bar (if progress is provided) */}
      {typeof progress === 'number' && (
        <div className="relative z-10 h-0.5 w-full overflow-hidden rounded-full bg-avs-accent/6">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            transition={{ duration: 1.4, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="h-full rounded-full"
            style={{ background: color }}
          />
        </div>
      )}
    </motion.div>
  );
}
