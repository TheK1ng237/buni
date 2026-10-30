'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function BuniLogoMark({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <polygon
        points="50,4 96,50 50,96 4,50"
        stroke="currentColor"
        strokeWidth="3.5"
        className="text-[#C8A96E]"
      />
      <rect
        x="26"
        y="26"
        width="48"
        height="48"
        rx="2"
        stroke="currentColor"
        strokeWidth="2.5"
        className="text-[#C0573E]"
        transform="rotate(45 50 50)"
      />
      <circle cx="50" cy="50" r="14" stroke="currentColor" strokeWidth="2.5" className="text-[#D4A017]" />
      <circle cx="50" cy="50" r="5" fill="currentColor" className="text-[#F5EBE0]" />
      <circle cx="50" cy="18" r="2.5" fill="currentColor" className="text-[#C8A96E]" />
      <circle cx="82" cy="50" r="2.5" fill="currentColor" className="text-[#C8A96E]" />
      <circle cx="50" cy="82" r="2.5" fill="currentColor" className="text-[#C8A96E]" />
      <circle cx="18" cy="50" r="2.5" fill="currentColor" className="text-[#C8A96E]" />
    </svg>
  );
}

function NdopBackgroundGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.06] aria-hidden">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="ndop-matrix-avs-v4-pi" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="#C8A96E" strokeWidth="0.8" />
            <path d="M30 10 L50 30 L30 50 L10 30 Z" fill="none" stroke="#C0573E" strokeWidth="0.5" strokeDasharray="2 2" />
            <circle cx="30" cy="30" r="2" fill="#D4A017" />
            <circle cx="0" cy="0" r="1.5" fill="#C8A96E" />
            <circle cx="60" cy="0" r="1.5" fill="#C8A96E" />
            <circle cx="0" cy="60" r="1.5" fill="#C8A96E" />
            <circle cx="60" cy="60" r="1.5" fill="#C8A96E" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ndop-matrix-avs-v4-pi)" />
      </svg>
    </div>
  );
}

function HeroMotifEmblem() {
  return (
    <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center select-none">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#C0573E]/20 via-[#D4A017]/15 to-[#2A4A6B]/20 rounded-full blur-3xl animate-pulse pointer-events-none" />

      <motion.svg
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 w-full h-full text-[#C8A96E]/25"
        viewBox="0 0 300 300"
        fill="none"
      >
        <circle cx="150" cy="150" r="140" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
        <circle cx="150" cy="150" r="128" stroke="#D4A017" strokeWidth="0.5" strokeOpacity="0.4" />
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <line
            key={deg}
            x1="150"
            y1="10"
            x2="150"
            y2="20"
            stroke="currentColor"
            strokeWidth="1.5"
            transform={`rotate(${deg} 150 150)`}
          />
        ))}
      </motion.svg>

      <motion.svg
        animate={{ rotate: -360 }}
        transition={{ duration: 75, repeat: Infinity, ease: 'linear' }}
        className="absolute w-4/5 h-4/5 text-[#C0573E]/40"
        viewBox="0 0 240 240"
        fill="none"
      >
        <rect
          x="30"
          y="30"
          width="180"
          height="180"
          rx="12"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="6 6"
          transform="rotate(45 120 120)"
        />
      </motion.svg>

      <div className="relative z-10 w-44 h-44 sm:w-56 sm:h-56 p-6 rounded-full bg-[#0F1523]/90 backdrop-blur-xl flex items-center justify-center shadow-2xl border border-[#C8A96E]/30">
        <svg viewBox="0 0 160 160" fill="none" className="w-full h-full">
          <path
            d="M80,20 C100,20 120,35 120,60 C120,85 95,100 80,135 C65,100 40,85 40,60 C40,35 60,20 80,20 Z"
            stroke="#D4A017"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M80,38 C92,38 104,48 104,62 C104,78 88,90 80,112 C72,90 56,78 56,62 C56,48 68,38 80,38 Z"
            stroke="#C0573E"
            strokeWidth="2.5"
          />
          <circle cx="80" cy="58" r="6" fill="#F5EBE0" />
          <circle cx="80" cy="58" r="2.5" fill="#070A10" />
          <line x1="20" y1="80" x2="50" y2="80" stroke="#C8A96E" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="110" y1="80" x2="140" y2="80" stroke="#C8A96E" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="20" cy="80" r="3" fill="#D4A017" />
          <circle cx="140" cy="80" r="3" fill="#D4A017" />
          <circle cx="80" cy="148" r="4" fill="#C0573E" />
        </svg>
      </div>
    </div>
  );
}

export default function BuniComingSoonPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [activePattern, setActivePattern] = useState<'ndop' | 'kente' | 'adinkra' | 'bogolan'>('ndop');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setErrorMessage('Veuillez entrer une adresse e-mail valide.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 900);
  };

  const copyCommand = () => {
    navigator.clipboard.writeText('npm i @buni/tokens');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen bg-[#070A10] text-[#F5EBE0] flex flex-col justify-between overflow-x-hidden selection:bg-[#C0573E] selection:text-[#F5EBE0]">
      <NdopBackgroundGrid />

      <div className="h-1.5 w-full bg-gradient-to-r from-[#C0573E] via-[#D4A017] to-[#2A4A6B] opacity-90" />

      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#C0573E]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-[#D4A017]/10 rounded-full blur-[120px] pointer-events-none" />

      <header className="relative z-20 max-w-7xl mx-auto w-full px-6 py-8 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3.5 group cursor-default"
        >
          <div className="p-2.5 rounded-xl bg-[#0F1523]/80 backdrop-blur-md border border-[#C8A96E]/25 group-hover:border-[#C8A96E]/60 transition-colors shadow-sm">
            <BuniLogoMark className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xl sm:text-2xl font-bold tracking-wider text-[#F5EBE0]">
              BUNI
            </span>
            <span className="text-[10px] tracking-widest uppercase text-[#C8A96E] font-mono font-medium">
              African Visual Standard
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-3"
        >
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F1523]/90 backdrop-blur-md text-xs font-mono text-[#C8A96E] border border-[#C8A96E]/25">
            <span className="w-2 h-2 rounded-full bg-[#D4A017] animate-ping" />
            <span>VOL. 01 — BÊTA PRIVÉE</span>
          </div>

          <button
            onClick={copyCommand}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F1523]/90 backdrop-blur-md hover:bg-[#172033] text-xs font-mono text-[#F5EBE0]/90 transition-all border border-[#C8A96E]/25 hover:border-[#C8A96E]/50 active:scale-95 shadow-sm"
            title="Copier la commande de tokens"
          >
            <i className={`pi ${copied ? 'pi-check text-[#D4A017]' : 'pi-copy text-[#C8A96E]'}`} style={{ fontSize: '12px' }} />
            <span className="hidden md:inline">npm i @buni/tokens</span>
            <span className="md:hidden">npm i</span>
          </button>
        </motion.div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto w-full px-6 py-12 md:py-20 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0F1523]/80 backdrop-blur-md border border-[#C0573E]/35 text-xs font-mono text-[#F5EBE0] mb-8"
        >
          <i className="pi pi-sparkles text-[#D4A017]" style={{ fontSize: '12px' }} />
          <span>Design System Africain & Standard Numérique</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-center max-w-4xl leading-[1.1] text-[#F5EBE0]"
        >
          Un standard de design né du{' '}
          <span className="bg-gradient-to-r from-[#C0573E] via-[#D4A017] to-[#C8A96E] bg-clip-text text-transparent italic">
            patrimoine textile
          </span>{' '}
          africain.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-[#8E9BB0] text-center max-w-2xl font-normal leading-relaxed"
        >
          Buni dresse, numérise et structure les motifs ancestraux (Ndop, Kente, Adinkra, Bogolan)
          en tokens de design, grilles géométriques et composants React prêts pour le développement moderne.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="my-10 md:my-14"
        >
          <HeroMotifEmblem />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="w-full max-w-xl mb-12"
        >
          <div className="flex items-center justify-center gap-2 p-1.5 rounded-2xl bg-[#0F1523]/90 border border-[#C8A96E]/20 backdrop-blur-md">
            {[
              { id: 'ndop', name: 'Ndop (Bamoum)' },
              { id: 'kente', name: 'Kente (Akan)' },
              { id: 'adinkra', name: 'Adinkra (Ghana)' },
              { id: 'bogolan', name: 'Bogolan (Mali)' },
            ].map((pattern) => (
              <button
                key={pattern.id}
                onClick={() => setActivePattern(pattern.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-200 ${
                  activePattern === pattern.id
                    ? 'bg-[#C0573E] text-[#F5EBE0] font-bold shadow-md'
                    : 'text-[#8E9BB0] hover:text-[#F5EBE0] hover:bg-[#172033]'
                }`}
              >
                {pattern.name}
              </button>
            ))}
          </div>

          <div className="mt-3 p-4 rounded-2xl bg-[#0F1523]/80 border border-[#C8A96E]/20 relative overflow-hidden transition-all">
            <div
              className={`absolute inset-0 opacity-15 ${
                activePattern === 'ndop'
                  ? 'avs-pattern-ndop-ceremoniel'
                  : activePattern === 'kente'
                  ? 'avs-pattern-kente-royale'
                  : activePattern === 'adinkra'
                  ? 'avs-pattern-adinkra-sankofa'
                  : 'avs-pattern-bogolan-terre'
              }`}
            />
            <div className="relative z-10 flex items-center justify-between text-xs font-mono text-[#F5EBE0]">
              <span className="flex items-center gap-2">
                <i className="pi pi-book text-[#D4A017]" style={{ fontSize: '13px' }} />
                <span className="text-[#C8A96E]">Motif actif :</span> {activePattern.toUpperCase()}
              </span>
              <span className="text-[#8E9BB0]">v2.0 CSS Standard</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full max-w-md"
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success-message"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-6 rounded-2xl bg-[#0F1523]/90 backdrop-blur-xl border border-[#D4A017]/40 text-center flex flex-col items-center gap-3 shadow-xl"
              >
                <div className="w-12 h-12 rounded-full bg-[#D4A017]/15 border border-[#D4A017]/40 flex items-center justify-center text-[#D4A017]">
                  <i className="pi pi-check-circle" style={{ fontSize: '24px' }} />
                </div>
                <h3 className="font-display font-bold text-xl text-[#F5EBE0]">Vous êtes inscrit !</h3>
                <p className="text-sm text-[#8E9BB0] leading-relaxed">
                  Merci de votre intérêt. Vous recevrez un accès prioritaire dès l&apos;ouverture de la bêta privée de BUNI.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-2 text-xs font-mono text-[#C8A96E] hover:underline"
                >
                  Inscrire une autre adresse →
                </button>
              </motion.div>
            ) : (
              <form key="email-form" onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <div className="relative flex items-center">
                  <i className="pi pi-envelope absolute left-4 text-[#8E9BB0]" style={{ fontSize: '16px' }} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder="Entrez votre adresse e-mail..."
                    disabled={status === 'loading'}
                    className="w-full pl-12 pr-36 py-4 rounded-2xl bg-[#0A0F1A]/80 backdrop-blur-md border border-[#C8A96E]/25 text-sm text-[#F5EBE0] placeholder-[#8E9BB0]/60 focus:outline-none focus:ring-2 focus:ring-[#C0573E] focus:border-transparent transition-all"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="absolute right-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C0573E] to-[#B0462D] hover:from-[#D1644B] hover:to-[#C0573E] text-sm font-semibold text-[#F5EBE0] flex items-center gap-2 shadow-lg shadow-[#C0573E]/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                  >
                    {status === 'loading' ? (
                      <i className="pi pi-spin pi-spinner text-white text-sm" />
                    ) : (
                      <>
                        <span>Rejoindre</span>
                        <i className="pi pi-arrow-right text-xs" />
                      </>
                    )}
                  </button>
                </div>

                {status === 'error' && (
                  <p className="text-xs text-[#C0573E] pl-2 font-medium">{errorMessage}</p>
                )}

                <p className="text-center text-xs text-[#8E9BB0]/70 font-light">
                  Sois notifié au lancement. Aucun spam, désinscription à tout moment.
                </p>
              </form>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full"
        >
          <div className="p-6 rounded-2xl bg-[#0F1523]/80 backdrop-blur-md hover:bg-[#131B2D] border border-[#C8A96E]/15 hover:border-[#C8A96E]/35 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-[#C0573E]/15 border border-[#C0573E]/30 flex items-center justify-center text-[#C0573E] mb-4 group-hover:scale-110 transition-transform">
              <i className="pi pi-palette" style={{ fontSize: '18px' }} />
            </div>
            <h3 className="font-display font-bold text-lg text-[#F5EBE0] mb-1.5">Tokens Tinctoriaux</h3>
            <p className="text-xs text-[#8E9BB0] leading-relaxed">
              Palettes dérivées des teintures traditionnelles (Indigo Bambara, Ocre Sahel, Terre Yoruba, Or Kente) documentées avec contrastes accessibles.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0F1523]/80 backdrop-blur-md hover:bg-[#131B2D] border border-[#C8A96E]/15 hover:border-[#C8A96E]/35 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-[#D4A017]/15 border border-[#D4A017]/30 flex items-center justify-center text-[#D4A017] mb-4 group-hover:scale-110 transition-transform">
              <i className="pi pi-th-large" style={{ fontSize: '18px' }} />
            </div>
            <h3 className="font-display font-bold text-lg text-[#F5EBE0] mb-1.5">Grilles Ndop & Kente</h3>
            <p className="text-xs text-[#8E9BB0] leading-relaxed">
              Systèmes de mise en page structurés sur la géométrie des losanges Bamiléké et le rythme des bandes tissées Akan.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0F1523]/80 backdrop-blur-md hover:bg-[#131B2D] border border-[#C8A96E]/15 hover:border-[#C8A96E]/35 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-[#2A4A6B]/30 border border-[#2A4A6B]/50 flex items-center justify-center text-[#7BA5D1] mb-4 group-hover:scale-110 transition-transform">
              <i className="pi pi-layer-group" style={{ fontSize: '18px' }} />
            </div>
            <h3 className="font-display font-bold text-lg text-[#F5EBE0] mb-1.5">Composants React</h3>
            <p className="text-xs text-[#8E9BB0] leading-relaxed">
              Composants typés Tailwind CSS v4 et Framer Motion, prêts pour Next.js App Router sans compromis de performance.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0F1523]/80 backdrop-blur-md hover:bg-[#131B2D] border border-[#C8A96E]/15 hover:border-[#C8A96E]/35 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-[#C8A96E]/15 border border-[#C8A96E]/30 flex items-center justify-center text-[#C8A96E] mb-4 group-hover:scale-110 transition-transform">
              <i className="pi pi-shield" style={{ fontSize: '18px' }} />
            </div>
            <h3 className="font-display font-bold text-lg text-[#F5EBE0] mb-1.5">Traçabilité & Ethique</h3>
            <p className="text-xs text-[#8E9BB0] leading-relaxed">
              Chaque symbole est associé à son histoire, son peuple créateur et sa signification culturelle et spirituelle.
            </p>
          </div>
        </motion.div>
      </main>

      <footer className="relative z-20 max-w-7xl mx-auto w-full px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-[#C8A96E]/15 mt-16">
        <div className="flex items-center gap-3">
          <BuniLogoMark className="w-5 h-5" />
          <span className="text-xs text-[#8E9BB0] font-light">
            © 2026 BUNI Design System. Créé avec rigueur et respect du patrimoine.
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-[#0F1523]/80 backdrop-blur-md hover:bg-[#172033] text-[#8E9BB0] hover:text-[#F5EBE0] transition-colors border border-[#C8A96E]/15 flex items-center justify-center"
            aria-label="LinkedIn BUNI"
          >
            <i className="pi pi-linkedin" style={{ fontSize: '14px' }} />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-[#0F1523]/80 backdrop-blur-md hover:bg-[#172033] text-[#8E9BB0] hover:text-[#F5EBE0] transition-colors border border-[#C8A96E]/15 flex items-center justify-center"
            aria-label="X (Twitter) BUNI"
          >
            <i className="pi pi-twitter" style={{ fontSize: '14px' }} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-[#0F1523]/80 backdrop-blur-md hover:bg-[#172033] text-[#8E9BB0] hover:text-[#F5EBE0] transition-colors border border-[#C8A96E]/15 flex items-center justify-center"
            aria-label="Instagram BUNI"
          >
            <i className="pi pi-instagram" style={{ fontSize: '14px' }} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-[#0F1523]/80 backdrop-blur-md hover:bg-[#172033] text-[#8E9BB0] hover:text-[#F5EBE0] transition-colors border border-[#C8A96E]/15 flex items-center justify-center"
            aria-label="GitHub BUNI"
          >
            <i className="pi pi-github" style={{ fontSize: '14px' }} />
          </a>
        </div>
      </footer>

      <div className="h-1.5 w-full bg-gradient-to-r from-[#2A4A6B] via-[#D4A017] to-[#C0573E] opacity-90" />
    </div>
  );
}
