import * as React from 'react';
import { ICONS_BY_SLUG, ICONS_CATALOG, type BuniIconMeta } from '@buni/icons-data';

export type BuniIconSlug =
  | 'calebasse'
  | 'djembe'
  | 'tabouret-ashanti'
  | 'pagne'
  | 'poterie'
  | 'pirogue'
  | 'moto-taxi'
  | 'marche'
  | 'bassine'
  | 'kiosque'
  | 'case'
  | 'theiere-ataya'
  | 'mortier-pilon'
  | 'foyer-charbon'
  | 'mobile-money'
  | 'ussd'
  | 'recharge-credit'
  | 'agent-point'
  | 'cybercafe'
  | 'panneau-solaire'
  | 'carte-sim'
  | 'compteur-prepaye'
  | 'sankofa'
  | 'gye-nyame'
  | 'duafe'
  | 'adinkrahene'
  | 'fawohodie'
  | 'dwennimmen'
  | 'bese-saka'
  | 'nkonsonkonson';

export interface BuniIconProps extends React.SVGProps<SVGSVGElement> {
  name: BuniIconSlug | string;
  size?: number | string;
  strokeWidth?: number | string;
  className?: string;
  title?: string;
}

export const BuniIcon = React.forwardRef<SVGSVGElement, BuniIconProps>(
  (
    {
      name,
      size = 24,
      strokeWidth = 1.75,
      className = '',
      title,
      style,
      ...restProps
    },
    ref
  ) => {
    const iconData: BuniIconMeta | undefined = ICONS_BY_SLUG[name];

    if (!iconData) {
      console.warn(`[BuniIcon] Icône "${name}" non trouvée.`);
      return (
        <svg
          ref={ref}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          style={style}
          {...restProps}
        >
          <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="3 3" />
        </svg>
      );
    }

    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
        dangerouslySetInnerHTML={{ __html: iconData.body }}
        {...restProps}
      >
        {title && <title>{title}</title>}
      </svg>
    );
  }
);

BuniIcon.displayName = 'BuniIcon';

// Re-exports
export { ICONS_CATALOG, ICONS_BY_SLUG, type BuniIconMeta } from '@buni/icons-data';

// Helper d'export format
export function getIconifyName(slug: string): string {
  return `buni:${slug}`;
}

export function getSvgCode(slug: string): string {
  const meta = ICONS_BY_SLUG[slug];
  return meta ? meta.svg : '';
}

export function getJsxSnippet(slug: string): string {
  return `<BuniIcon name="${slug}" size={24} />`;
}
