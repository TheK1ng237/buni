import type { Metadata } from 'next';
import { PricingContent } from './pricing-content';
import { getTranslations } from '@/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('pricing', locale);

  return {
    title: `${t('title')} — AVS Pricing (FCFA)`,
    description: t('subtitle'),
  };
}

export default function PricingPage() {
  return <PricingContent />;
}
