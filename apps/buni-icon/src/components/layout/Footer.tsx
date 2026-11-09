'use client';

import * as React from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from '@/i18n';
import { ArrowUpRight, Heart, Sparkles } from 'lucide-react';
import { BuniIcon } from '@buni/icon-react';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  return (
    <footer className="border-t border-avs-accent/10 bg-avs-secondary pt-16 pb-12 transition-colors">
      <div className="avs-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-avs-accent/10">
          {/* Brand & Manifesto */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-avs bg-avs-primary text-avs-secondary flex items-center justify-center font-bold text-sm shadow-avs">
                <BuniIcon name="sankofa" size={17} />
              </div>
              <span className="font-display font-black tracking-wider text-lg text-avs-accent">
                BUNI<span className="text-avs-primary">.</span>ICON
              </span>
              <span className="px-2 py-0.5 rounded-avs bg-avs-primary/10 text-avs-primary text-[10px] font-mono font-bold tracking-wider uppercase">
                CC BY 4.0
              </span>
            </div>
            <p className="text-sm text-avs-accent/70 max-w-md leading-relaxed">
              {t('manifesto')}
            </p>
            {/* Palette swatch */}
            <div className="flex items-center gap-2 pt-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-avs-accent/50 mr-2">
                Pigments :
              </span>
              <span className="w-4 h-4 rounded-full bg-[#C0573E] ring-1 ring-black/10" title="Terre cuite" />
              <span className="w-4 h-4 rounded-full bg-[#D4A017] ring-1 ring-black/10" title="Or Kente" />
              <span className="w-4 h-4 rounded-full bg-[#4A6741] ring-1 ring-black/10" title="Vert Ndop" />
              <span className="w-4 h-4 rounded-full bg-[#2A4A6B] ring-1 ring-black/10" title="Bleu Bogolan" />
              <span className="w-4 h-4 rounded-full bg-[#1D1D1B] ring-1 ring-black/10" title="Obsidienne" />
            </div>
          </div>

          {/* Links Standard */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-avs-primary">
              {t('linksStandard')}
            </h4>
            <ul className="space-y-2 text-sm text-avs-accent/75">
              <li>
                <Link href={`/${locale}/icons` as any} className="hover:text-avs-primary transition-colors">
                  Catalogue complet (30)
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/#familles` as any} className="hover:text-avs-primary transition-colors">
                  Familles d’icônes
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/#lois` as any} className="hover:text-avs-primary transition-colors">
                  Les 4 Lois BUNI
                </Link>
              </li>
              <li>
                <a
                  href="https://buni.idem.africa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-avs-primary transition-colors inline-flex items-center gap-1"
                >
                  <span>AVS Visual Standard</span>
                  <ArrowUpRight size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Links Ecosystem */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-avs-primary">
              {t('linksResources')}
            </h4>
            <ul className="space-y-2 text-sm text-avs-accent/75">
              <li>
                <a
                  href="https://iconify.design"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-avs-primary transition-colors inline-flex items-center gap-1"
                >
                  <span>Iconify Dataset</span>
                  <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://creativecommons.org/licenses/by/4.0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-avs-primary transition-colors inline-flex items-center gap-1"
                >
                  <span>Licence CC BY 4.0</span>
                  <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-avs-primary transition-colors inline-flex items-center gap-1"
                >
                  <span>GitHub Repository</span>
                  <ArrowUpRight size={12} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-avs-accent/60">
          <p>{t('rights')}</p>
          <div className="flex items-center gap-2">
            <span>Le Code comme Acte de Libération</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

