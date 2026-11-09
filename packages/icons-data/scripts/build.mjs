import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pkgRoot = path.resolve(__dirname, '..');
const svgDir = path.join(pkgRoot, 'src', 'svg');
const metaDir = path.join(pkgRoot, 'src', 'meta');
const distDir = path.join(pkgRoot, 'dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const families = ['objets-artisanat', 'vie-quotidienne', 'tech-locale', 'symboles'];
const iconifyIcons = {};
const catalog = [];
const categories = {
  'Objets & Artisanat': [],
  'Vie Quotidienne': [],
  'Tech Locale': [],
  'Symboles & Adinkra': [],
};

const familyLabels = {
  'objets-artisanat': 'Objets & Artisanat',
  'vie-quotidienne': 'Vie Quotidienne',
  'tech-locale': 'Tech Locale',
  'symboles': 'Symboles & Adinkra',
};

console.log('⚡ [icons:build] Compilation des icônes BUNI...');

function cleanSvgBody(svgContent) {
  // Enlever la balise d'ouverture <svg ...> et de fermeture </svg>
  const match = svgContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
  if (!match) return svgContent.trim();
  let body = match[1].trim();
  // Nettoyer les retours à la ligne inutiles et espacements redondants
  body = body.replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim();
  return body;
}

for (const family of families) {
  const familyDir = path.join(svgDir, family);
  if (!fs.existsSync(familyDir)) continue;

  const svgFiles = fs.readdirSync(familyDir).filter(f => f.endsWith('.svg')).sort();

  for (const file of svgFiles) {
    const slug = path.basename(file, '.svg');
    const svgPath = path.join(familyDir, file);
    const metaPath = path.join(metaDir, `${slug}.json`);

    const rawSvg = fs.readFileSync(svgPath, 'utf8').trim();
    const body = cleanSvgBody(rawSvg);

    let meta = {
      slug,
      nameFr: slug,
      nameEn: slug,
      family,
      tags: [family],
      country: 'Afrique',
      people: 'Panafricain',
      culturalNote: '',
      verifiedBy: 'BUNI Heritage Lab',
      license: 'CC BY 4.0',
    };

    if (fs.existsSync(metaPath)) {
      meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    }

    iconifyIcons[slug] = {
      body,
      width: 24,
      height: 24,
    };

    const catName = familyLabels[family] || family;
    if (!categories[catName]) categories[catName] = [];
    categories[catName].push(slug);

    catalog.push({
      ...meta,
      svg: rawSvg,
      body,
    });
  }
}

// 1. Génération de icons.json (Format Iconify)
const iconifyData = {
  prefix: 'buni',
  info: {
    name: 'Buni African Icons',
    total: catalog.length,
    author: {
      name: 'Buni Standard',
      url: 'https://buni.idem.africa',
    },
    license: {
      title: 'CC BY 4.0',
      spdx: 'CC-BY-4.0',
      url: 'https://creativecommons.org/licenses/by/4.0/',
    },
    samples: catalog.slice(0, 4).map(c => c.slug),
    height: 24,
  },
  width: 24,
  height: 24,
  icons: iconifyIcons,
  categories,
};

fs.writeFileSync(path.join(distDir, 'icons.json'), JSON.stringify(iconifyData, null, 2), 'utf8');

// 2. Génération de index.json (Catalogue exhaustif)
fs.writeFileSync(path.join(distDir, 'index.json'), JSON.stringify(catalog, null, 2), 'utf8');

// 3. Génération des modules JS/TS exportables
const tsTypeDefinitions = `export interface BuniIconMeta {
  slug: string;
  nameFr: string;
  nameEn: string;
  family: 'objets-artisanat' | 'vie-quotidienne' | 'tech-locale' | 'symboles';
  tags: string[];
  country: string;
  countryCode?: string;
  people: string;
  culturalNote: string;
  recommendedUse?: string;
  verifiedBy: string;
  license: string;
  svg: string;
  body: string;
}

export interface IconifyData {
  prefix: string;
  info: any;
  width: number;
  height: number;
  icons: Record<string, { body: string; width?: number; height?: number }>;
  categories: Record<string, string[]>;
}
`;

const jsContent = `${tsTypeDefinitions}
export const ICONS_CATALOG: BuniIconMeta[] = ${JSON.stringify(catalog, null, 2)};
export const ICONIFY_DATA: IconifyData = ${JSON.stringify(iconifyData, null, 2)};
export const ICONS_BY_SLUG: Record<string, BuniIconMeta> = Object.fromEntries(ICONS_CATALOG.map(i => [i.slug, i]));
export const TOTAL_ICONS = ${catalog.length};
`;

const dtsContent = `${tsTypeDefinitions}
export declare const ICONS_CATALOG: BuniIconMeta[];
export declare const ICONIFY_DATA: IconifyData;
export declare const ICONS_BY_SLUG: Record<string, BuniIconMeta>;
export declare const TOTAL_ICONS: number;
`;

fs.writeFileSync(path.join(distDir, 'index.js'), jsContent, 'utf8');
fs.writeFileSync(path.join(distDir, 'index.mjs'), jsContent, 'utf8');
fs.writeFileSync(path.join(distDir, 'index.d.ts'), dtsContent, 'utf8');

// Copie également dans src/index.ts pour le dev direct
fs.writeFileSync(path.join(pkgRoot, 'src', 'index.ts'), jsContent, 'utf8');

console.log(`✅ [icons:build] ${catalog.length} icônes compilées avec succès dans packages/icons-data/dist !`);
