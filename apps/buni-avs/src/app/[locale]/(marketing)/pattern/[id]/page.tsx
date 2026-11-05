import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSharePattern } from './share-data';

interface PatternPageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

function getPublicUrl(path: string) {
  return new URL(
    path,
    process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ).toString();
}

export async function generateMetadata({ params }: PatternPageProps): Promise<Metadata> {
  const { id, locale } = await params;
  const pattern = await getSharePattern(id);

  if (!pattern) {
    return { title: locale === 'fr' ? 'Motif non trouvé | Buni' : 'Pattern not found | Buni' };
  }

  const url = getPublicUrl(`/${locale}/pattern/${encodeURIComponent(pattern.slug)}`);
  const imageUrl = getPublicUrl(
    `/${locale}/pattern/${encodeURIComponent(pattern.slug)}/opengraph-image`,
  );
  const title = `${pattern.name} - ${pattern.origin.country}`;

  return {
    title: `${title} | Buni`,
    description: pattern.summary,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: pattern.summary,
      url,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: pattern.name }],
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'fr_FR',
      siteName: 'Buni - Encyclopédie des Motifs Africains',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: pattern.summary,
      images: [imageUrl],
    },
  };
}

export default async function PatternPage({ params }: PatternPageProps) {
  const { id, locale } = await params;
  const pattern = await getSharePattern(id);

  if (!pattern) notFound();

  const isFrench = locale !== 'en';
  const previewClass =
    'previewClass' in pattern && typeof pattern.previewClass === 'string'
      ? pattern.previewClass
      : pattern.cssClass;
  const encyclopediaUrl = `/${locale}/patterns?pattern=${encodeURIComponent(pattern.id)}`;

  return (
    <article className="bg-avs-secondary min-h-[calc(100vh-4rem)] px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="border-avs-accent/10 bg-avs-secondary-dark relative min-h-[360px] overflow-hidden rounded-3xl border shadow-avs-lg sm:min-h-[520px]">
          {pattern.imgUrl ? (
            <img
              src={pattern.imgUrl}
              alt={`${pattern.name} ${isFrench ? '— motif traditionnel' : '— traditional pattern'}`}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div
              aria-label={`${pattern.name} pattern`}
              role="img"
              className={`absolute inset-0 ${previewClass}`}
            />
          )}
          <div className="from-avs-accent/30 absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t to-transparent" />
          <span className="bg-avs-secondary/90 text-avs-accent absolute bottom-5 left-5 rounded-full px-4 py-2 text-xs font-bold tracking-wide uppercase">
            {pattern.origin.country} · {pattern.origin.people}
          </span>
        </div>

        <div className="max-w-xl">
          <p className="text-avs-primary mb-4 text-xs font-bold tracking-[0.2em] uppercase">
            {isFrench ? 'Patrimoine textile africain' : 'African textile heritage'}
          </p>
          <h1 className="text-avs-accent text-4xl font-black tracking-tight sm:text-5xl">
            {pattern.name}
          </h1>
          {pattern.localName && (
            <p className="text-avs-accent/60 mt-3 text-lg">{pattern.localName}</p>
          )}
          <p className="text-avs-accent/75 mt-6 text-base leading-7">{pattern.summary}</p>

          <dl className="border-avs-accent/10 mt-8 grid grid-cols-2 gap-4 border-y py-5">
            <div>
              <dt className="text-avs-accent/50 text-xs font-bold uppercase">
                {isFrench ? 'Origine' : 'Origin'}
              </dt>
              <dd className="text-avs-accent mt-1 font-semibold">
                {pattern.origin.flag} {pattern.origin.country}
              </dd>
            </div>
            <div>
              <dt className="text-avs-accent/50 text-xs font-bold uppercase">
                {isFrench ? 'Période' : 'Period'}
              </dt>
              <dd className="text-avs-accent mt-1 font-semibold">{pattern.era}</dd>
            </div>
          </dl>

          <a
            href={encyclopediaUrl}
            className="bg-avs-primary text-avs-secondary hover:bg-avs-primary/90 mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-colors"
          >
            {isFrench ? 'Explorer la fiche complète' : 'Explore the full entry'}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </article>
  );
}
