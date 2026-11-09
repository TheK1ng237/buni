import { locales } from '@/i18n';
import { notFound } from 'next/navigation';
import { HomeClient } from '@/components/home/HomeClient';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as any)) {
    notFound();
  }

  return <HomeClient />;
}
