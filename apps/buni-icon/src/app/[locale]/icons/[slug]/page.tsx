import { notFound } from 'next/navigation';
import { ICONS_BY_SLUG, ICONS_CATALOG, type BuniIconMeta } from '@buni/icons-data';
import { IconDetailClient } from '@/components/icons/IconDetailClient';

export default async function IconDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const icon: BuniIconMeta | undefined = ICONS_BY_SLUG[slug];

  if (!icon) {
    notFound();
  }

  const relatedIcons = ICONS_CATALOG.filter(
    i => i.family === icon.family && i.slug !== icon.slug
  ).slice(0, 4);

  return (
    <IconDetailClient
      icon={icon}
      relatedIcons={relatedIcons}
      locale={locale}
    />
  );
}
