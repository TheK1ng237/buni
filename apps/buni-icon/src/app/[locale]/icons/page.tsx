import { locales } from '@/i18n';
import { notFound } from 'next/navigation';
import { CatalogClient } from '@/components/catalog/CatalogClient';

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as any)) {
    notFound();
  }

  return <CatalogClient />;
}
