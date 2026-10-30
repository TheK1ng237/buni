'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@buni/ui';
import { useLocale, useTranslations } from '@/i18n';
import type { Pattern } from '@/features/patterns/types';

interface ShareMenuProps {
  pattern: Pattern;
}

type SocialPlatform = 'whatsapp' | 'facebook' | 'x' | 'instagram';

const SOCIAL_PLATFORMS: Array<{
  id: SocialPlatform;
  name: string;
  icon: string;
  color: string;
}> = [
  { id: 'whatsapp', name: 'WhatsApp', icon: 'pi-whatsapp', color: '#25D366' },
  { id: 'facebook', name: 'Facebook', icon: 'pi-facebook', color: '#1877F2' },
  { id: 'x', name: 'X', icon: 'pi-twitter', color: '#000000' },
  { id: 'instagram', name: 'Instagram', icon: 'pi-instagram', color: '#E4405F' },
];

export function ShareMenu({ pattern }: ShareMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPreparingImage, setIsPreparingImage] = useState(false);
  const { add: addToast } = useToast();
  const { locale } = useLocale();
  const t = useTranslations('patterns.share');
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const slug = pattern.slug || pattern.id;
  const path = `/${locale}/pattern/${encodeURIComponent(slug)}`;
  const imagePath = `${path}/opengraph-image`;
  const url = typeof window === 'undefined' ? '' : new URL(path, window.location.origin).toString();

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleEscape);
      triggerRef.current?.focus();
    };
  }, [isOpen]);

  const downloadShareImage = async () => {
    const response = await fetch(imagePath);
    if (!response.ok) throw new Error(`Image preview failed with status ${response.status}`);

    const image = new File(
      [await response.blob()],
      `${slug}-buni.png`,
      { type: 'image/png' },
    );

    if (navigator.canShare?.({ files: [image] }) && navigator.share) {
      await navigator.share({
        title: pattern.name,
        text: pattern.summary,
        url,
        files: [image],
      });
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    const anchor = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = image.name;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
    addToast({ variant: 'info', message: t('instagramDownloaded') });
  };

  const handleShare = async (platform: SocialPlatform) => {
    if (platform === 'instagram') {
      setIsPreparingImage(true);
      try {
        await downloadShareImage();
        setIsOpen(false);
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          console.error('Unable to prepare the pattern image for sharing:', error);
          addToast({ variant: 'error', message: t('imageError') });
        }
      } finally {
        setIsPreparingImage(false);
      }
      return;
    }

    const message = `${pattern.name} — ${pattern.origin.country}`;
    const shareUrl =
      platform === 'whatsapp'
        ? `https://wa.me/?text=${encodeURIComponent(`${message}\n${pattern.summary}\n${url}`)}`
        : platform === 'facebook'
          ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(message)}`
          : `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${message} #ArtAfricain #Patrimoine`)}&url=${encodeURIComponent(url)}`;

    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=600');
    setIsOpen(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      addToast({ variant: 'success', message: t('linkCopied') });
      setIsOpen(false);
    } catch (error) {
      console.error('Unable to copy the pattern share link:', error);
      addToast({ variant: 'error', message: t('copyError') });
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label={t('button')}
        className="bg-avs-primary/10 text-avs-primary hover:bg-avs-primary/20 flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all duration-200"
      >
        <i className="pi pi-share-alt" aria-hidden="true" style={{ fontSize: '11px' }} />
        {t('button')}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-avs-accent/60 p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setIsOpen(false);
            }}
          >
            <motion.section
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="share-dialog-title"
              className="w-full max-w-md overflow-hidden rounded-3xl border border-avs-accent/10 bg-avs-secondary shadow-avs-lg"
            >
              <div className="border-avs-accent/10 flex items-center justify-between border-b px-5 py-4 sm:px-6">
                <div>
                  <p className="text-avs-accent font-mono text-[9px] font-bold tracking-[0.16em] uppercase">
                    {t('menuTitle')}
                  </p>
                  <h2
                    id="share-dialog-title"
                    className="text-avs-accent mt-1 text-lg font-bold"
                  >
                    {pattern.name}
                  </h2>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label={t('close')}
                  className="text-avs-accent/60 hover:bg-avs-accent/10 hover:text-avs-accent flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                >
                  <i className="pi pi-times" aria-hidden="true" />
                </button>
              </div>

              <div className="grid gap-2 p-4 sm:grid-cols-2 sm:p-5">
                {SOCIAL_PLATFORMS.map((platform) => (
                  <button
                    key={platform.id}
                    type="button"
                    disabled={isPreparingImage}
                    onClick={() => void handleShare(platform.id)}
                    className="group flex min-h-14 items-center gap-3 rounded-2xl border border-avs-accent/10 px-4 py-3 text-left transition-colors hover:border-avs-primary/30 hover:bg-avs-secondary-dark disabled:opacity-60"
                  >
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform group-hover:scale-110"
                      style={{ backgroundColor: platform.color }}
                      aria-hidden="true"
                    >
                      <i className={`pi ${platform.icon} text-white`} style={{ fontSize: '15px' }} />
                    </span>
                    <span className="text-avs-accent text-sm font-semibold group-hover:text-avs-primary">
                      {platform.id === 'instagram' && isPreparingImage
                        ? t('preparingImage')
                        : platform.name}
                    </span>
                    {platform.id === 'instagram' && (
                      <span className="text-avs-accent/50 ml-auto text-[10px]">{t('image')}</span>
                    )}
                  </button>
                ))}
              </div>

              <div className="border-avs-accent/10 border-t p-4 sm:px-5">
                <button
                  type="button"
                  onClick={() => void handleCopyLink()}
                  className="group flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-avs-primary/10 px-4 py-3 text-sm font-semibold text-avs-primary transition-colors hover:bg-avs-primary/20"
                >
                  <i className="pi pi-link" aria-hidden="true" />
                  {t('copyLink')}
                </button>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
