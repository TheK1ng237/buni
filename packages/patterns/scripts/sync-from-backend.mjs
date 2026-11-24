#!/usr/bin/env node
// packages/patterns/scripts/sync-from-backend.mjs
// Sync patterns from avs-backend to @buni/patterns package
// Run this after publishing a new pattern in the backend admin

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgRoot = path.resolve(__dirname, '..');
const backendPath = path.resolve(pkgRoot, '../../../avs-backend');

// Configuration
const BACKEND_API_URL = process.env.AVS_BACKEND_URL || 'http://localhost:3000';
const BACKEND_API_KEY = process.env.AVS_API_KEY; // For authenticated requests

async function fetchPublishedPatterns() {
  const url = `${BACKEND_API_URL}/api/v1/patterns?status=PUBLISHED&perPage=100`;

  const headers = {
    'Accept': 'application/json',
  };

  if (BACKEND_API_KEY) {
    headers['Authorization'] = `Bearer ${BACKEND_API_KEY}`;
  }

  console.log(`📡 Fetching published patterns from ${url}...`);

  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(`Failed to fetch patterns: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.data || [];
}

async function fetchPatternSvg(patternId) {
  const url = `${BACKEND_API_URL}/api/v1/patterns/${patternId}/download`;

  const headers = {
    'Accept': 'image/svg+xml',
  };

  if (BACKEND_API_KEY) {
    headers['Authorization'] = `Bearer ${BACKEND_API_KEY}`;
  }

  try {
    const response = await fetch(url, { headers });
    if (response.ok) {
      return await response.text();
    }
  } catch (e) {
    console.warn(`⚠ Could not fetch SVG for pattern ${patternId}`);
  }
  return null;
}

function generateCssClassFromPattern(pattern) {
  // Generate CSS class from pattern type and slug
  const baseClass = pattern.patternType.toLowerCase();
  const slugParts = pattern.slug.split('-');

  if (slugParts.length > 1) {
    // e.g., ndop-bamoum -> ndop-ceremoniel (if it's a variation)
    return `${baseClass}-${slugParts.slice(1).join('-')}`;
  }

  return baseClass;
}

function generatePatternCss(pattern) {
  const cssClass = generateCssClassFromPattern(pattern);
  const colors = pattern.colors;

  // If pattern has custom CSS code, use it
  if (pattern.cssCode) {
    return pattern.cssCode;
  }

  // Otherwise generate from template based on type
  const type = pattern.patternType.toUpperCase();
  const primary = colors?.primary || '#C0573E';
  const secondary = colors?.secondary || '#F5EBE0';
  const accent = colors?.accent || '#1D1D1B';

  return generateCssTemplate(type, cssClass, primary, secondary, accent, pattern.svgContent);
}

function generateCssTemplate(type, cssClass, primary, secondary, accent, svgContent = null) {
  const templates = {
    KENTE: `
.avs-pattern-${cssClass},
.${cssClass} {
  background-color: #1a1208;
  background-image:
    repeating-linear-gradient(
      90deg,
      var(--avs-kente, #d4a017) 0px,
      var(--avs-kente, #d4a017) 6px,
      transparent 6px,
      transparent 12px,
      var(--avs-primary, ${primary}) 12px,
      var(--avs-primary, ${primary}) 16px,
      transparent 16px,
      transparent 22px,
      var(--avs-ndop, #4a6741) 22px,
      var(--avs-ndop, #4a6741) 26px,
      transparent 26px,
      transparent 32px,
      var(--avs-kente, #d4a017) 32px,
      var(--avs-kente, #d4a017) 36px,
      #1a1208 36px,
      #1a1208 48px
    ),
    repeating-linear-gradient(
      0deg,
      rgba(245, 235, 224, 0.06) 0px,
      rgba(245, 235, 224, 0.06) 2px,
      transparent 2px,
      transparent 6px,
      rgba(212, 160, 23, 0.12) 6px,
      rgba(212, 160, 23, 0.12) 8px,
      transparent 8px,
      transparent 16px
    ),
    repeating-linear-gradient(
      90deg,
      transparent 0px,
      transparent 22px,
      rgba(192, 87, 62, 0.15) 22px,
      rgba(192, 87, 62, 0.15) 24px,
      transparent 24px,
      transparent 48px
    );
  background-size:
    48px 100%,
    100% 16px,
    48px 100%;
}
`,
    NDOP: `
.avs-pattern-${cssClass},
.${cssClass} {
  background-color: #060f1a;
  background-image:
    repeating-linear-gradient(
      30deg,
      rgba(200, 169, 110, 0.22) 0px,
      rgba(200, 169, 110, 0.22) 1px,
      transparent 1px,
      transparent 14px
    ),
    repeating-linear-gradient(
      150deg,
      rgba(200, 169, 110, 0.22) 0px,
      rgba(200, 169, 110, 0.22) 1px,
      transparent 1px,
      transparent 14px
    ),
    repeating-linear-gradient(
      90deg,
      rgba(200, 169, 110, 0.22) 0px,
      rgba(200, 169, 110, 0.22) 1px,
      transparent 1px,
      transparent 14px
    ),
    radial-gradient(
      circle at 50% 50%,
      rgba(200, 169, 110, 0.6) 2.5px,
      rgba(200, 169, 110, 0.1) 3px,
      transparent 4px
    ),
    radial-gradient(circle at 0% 100%, rgba(200, 169, 110, 0.4) 2px, transparent 3px),
    radial-gradient(circle at 100% 0%, rgba(200, 169, 110, 0.4) 2px, transparent 3px);
  background-size:
    28px 28px,
    28px 28px,
    28px 28px,
    28px 28px,
    28px 28px,
    28px 28px;
}
`,
    BOGOLAN: `
.avs-pattern-${cssClass},
.${cssClass} {
  background-color: #2a1506;
  background-image:
    repeating-linear-gradient(
      60deg,
      #8b4513 0px,
      #8b4513 4px,
      #5c2e0e 4px,
      #5c2e0e 8px,
      #3d1f0a 8px,
      #3d1f0a 12px,
      rgba(245, 235, 224, 0.1) 12px,
      rgba(245, 235, 224, 0.1) 14px,
      #3d1f0a 14px,
      #3d1f0a 20px
    ),
    repeating-linear-gradient(
      -60deg,
      transparent 0px,
      transparent 8px,
      rgba(192, 87, 62, 0.2) 8px,
      rgba(192, 87, 62, 0.2) 10px,
      transparent 10px,
      transparent 20px
    ),
    repeating-linear-gradient(
      0deg,
      transparent 0px,
      transparent 18px,
      rgba(245, 235, 224, 0.05) 18px,
      rgba(245, 235, 224, 0.05) 20px
    );
  background-size:
    20px 20px,
    20px 20px,
    100% 20px;
}
`,
    ADINKRA: `
.avs-pattern-${cssClass},
.${cssClass} {
  background-color: #1a0f00;
  background-image:
    radial-gradient(
      circle at 25% 25%,
      rgba(212, 160, 23, 0.45) 3px,
      rgba(212, 160, 23, 0.12) 5px,
      transparent 8px
    ),
    radial-gradient(
      circle at 75% 75%,
      rgba(212, 160, 23, 0.45) 3px,
      rgba(212, 160, 23, 0.12) 5px,
      transparent 8px
    ),
    radial-gradient(circle at 75% 25%, rgba(192, 87, 62, 0.35) 2.5px, transparent 5px),
    radial-gradient(circle at 25% 75%, rgba(192, 87, 62, 0.35) 2.5px, transparent 5px),
    repeating-linear-gradient(
      45deg,
      transparent 0px,
      transparent 15px,
      rgba(212, 160, 23, 0.08) 15px,
      rgba(212, 160, 23, 0.08) 16px,
      transparent 16px,
      transparent 32px
    ),
    repeating-linear-gradient(
      -45deg,
      transparent 0px,
      transparent 15px,
      rgba(212, 160, 23, 0.08) 15px,
      rgba(212, 160, 23, 0.08) 16px,
      transparent 16px,
      transparent 32px
    ),
    radial-gradient(circle, rgba(212, 160, 23, 0.06) 1px, transparent 1px);
  background-size:
    32px 32px,
    32px 32px,
    32px 32px,
    32px 32px,
    32px 32px,
    32px 32px,
    8px 8px;
  background-position:
    0 0,
    16px 16px,
    0 16px,
    16px 0,
    0 0,
    0 0,
    4px 4px;
}
`,
    WAX: `
.avs-pattern-${cssClass},
.${cssClass} {
  background-color: var(--avs-secondary, ${secondary});
  background-image:
    radial-gradient(
      circle at 50% 50%,
      rgba(192, 87, 62, 0.28) 5px,
      rgba(192, 87, 62, 0.1) 8px,
      transparent 11px
    ),
    radial-gradient(
      circle at 0% 0%,
      rgba(42, 74, 107, 0.25) 3px,
      rgba(42, 74, 107, 0.08) 5px,
      transparent 8px
    ),
    radial-gradient(circle at 50% 0%, rgba(212, 160, 23, 0.3) 2px, transparent 4px),
    radial-gradient(circle at 0% 50%, rgba(212, 160, 23, 0.3) 2px, transparent 4px),
    radial-gradient(circle at 100% 50%, rgba(192, 87, 62, 0.2) 2px, transparent 4px),
    radial-gradient(circle at 50% 100%, rgba(192, 87, 62, 0.2) 2px, transparent 4px),
    repeating-linear-gradient(
      45deg,
      transparent 0px,
      transparent 10px,
      rgba(192, 87, 62, 0.06) 10px,
      rgba(192, 87, 62, 0.06) 11px,
      transparent 11px,
      transparent 22px
    ),
    repeating-linear-gradient(
      -45deg,
      transparent 0px,
      transparent 10px,
      rgba(42, 74, 107, 0.06) 10px,
      rgba(42, 74, 107, 0.06) 11px,
      transparent 11px,
      transparent 22px
    );
  background-size:
    44px 44px,
    44px 44px,
    44px 44px,
    44px 44px,
    44px 44px,
    44px 44px,
    44px 44px,
    44px 44px,
    44px 44px;
  background-position:
    22px 22px,
    0 0,
    22px 0,
    0 22px,
    44px 22px,
    22px 44px,
    0 0,
    0 0;
}
`,
    KUBA: `
.avs-pattern-${cssClass},
.${cssClass} {
  background-color: #1c1008;
  background-image:
    repeating-linear-gradient(
      0deg,
      rgba(200, 169, 110, 0.35) 0px,
      rgba(200, 169, 110, 0.35) 2px,
      transparent 2px,
      transparent 8px,
      rgba(200, 169, 110, 0.15) 8px,
      rgba(200, 169, 110, 0.15) 9px,
      transparent 9px,
      transparent 16px
    ),
    repeating-linear-gradient(
      90deg,
      rgba(200, 169, 110, 0.35) 0px,
      rgba(200, 169, 110, 0.35) 2px,
      transparent 2px,
      transparent 8px,
      rgba(200, 169, 110, 0.15) 8px,
      rgba(200, 169, 110, 0.15) 9px,
      transparent 9px,
      transparent 16px
    ),
    repeating-linear-gradient(
      45deg,
      transparent 0px,
      transparent 6px,
      rgba(192, 87, 62, 0.2) 6px,
      rgba(192, 87, 62, 0.2) 8px,
      transparent 8px,
      transparent 16px
    ),
    repeating-linear-gradient(
      -45deg,
      transparent 0px,
      transparent 6px,
      rgba(212, 160, 23, 0.15) 6px,
      rgba(212, 160, 23, 0.15) 8px,
      transparent 8px,
      transparent 16px
    ),
    radial-gradient(circle, rgba(200, 169, 110, 0.4) 1.5px, transparent 2px);
  background-size:
    16px 16px,
    16px 16px,
    16px 16px,
    16px 16px,
    8px 8px;
  background-position:
    0 0,
    0 0,
    0 0,
    0 0,
    4px 4px;
}
`,
    NDEBELE: `
.avs-pattern-${cssClass},
.${cssClass} {
  background-color: var(--avs-secondary, ${secondary});
  background-image:
    repeating-linear-gradient(
      90deg,
      var(--avs-primary, ${primary}) 0px,
      var(--avs-primary, ${primary}) 6px,
      var(--avs-secondary, ${secondary}) 6px,
      var(--avs-secondary, ${secondary}) 10px,
      var(--avs-indigo, #2a4a6b) 10px,
      var(--avs-indigo, #2a4a6b) 16px,
      var(--avs-secondary, ${secondary}) 16px,
      var(--avs-secondary, ${secondary}) 20px,
      var(--avs-kente, #d4a017) 20px,
      var(--avs-kente, #d4a017) 26px,
      var(--avs-secondary, ${secondary}) 26px,
      var(--avs-secondary, ${secondary}) 30px,
      var(--avs-ndop, #4a6741) 30px,
      var(--avs-ndop, #4a6741) 36px,
      var(--avs-secondary, ${secondary}) 36px,
      var(--avs-secondary, ${secondary}) 42px,
      var(--avs-primary, ${primary}) 42px,
      var(--avs-primary, ${primary}) 48px,
      var(--avs-accent, ${accent}) 48px,
      var(--avs-accent, ${accent}) 52px,
      var(--avs-secondary, ${secondary}) 52px,
      var(--avs-secondary, ${secondary}) 60px
    ),
    repeating-linear-gradient(
      0deg,
      rgba(29, 29, 27, 0.1) 0px,
      rgba(29, 29, 27, 0.1) 2px,
      transparent 2px,
      transparent 18px,
      rgba(29, 29, 27, 0.08) 18px,
      rgba(29, 29, 27, 0.08) 20px,
      transparent 20px,
      transparent 40px,
      rgba(29, 29, 27, 0.06) 40px,
      rgba(29, 29, 27, 0.06) 42px,
      transparent 42px,
      transparent 60px
    );
  background-size:
    60px 100%,
    100% 60px;
}
`,
    BERBER: `
.avs-pattern-${cssClass},
.${cssClass} {
  background-color: #2a1506;
  background-image:
    repeating-linear-gradient(
      60deg,
      rgba(200, 169, 110, 0.3) 0px,
      rgba(200, 169, 110, 0.3) 1.5px,
      transparent 1.5px,
      transparent 12px
    ),
    repeating-linear-gradient(
      -60deg,
      rgba(200, 169, 110, 0.3) 0px,
      rgba(200, 169, 110, 0.3) 1.5px,
      transparent 1.5px,
      transparent 12px
    ),
    repeating-linear-gradient(
      0deg,
      rgba(192, 87, 62, 0.25) 0px,
      rgba(192, 87, 62, 0.25) 1.5px,
      transparent 1.5px,
      transparent 12px
    ),
    radial-gradient(circle at 50% 50%, rgba(200, 169, 110, 0.55) 2px, transparent 3px),
    radial-gradient(circle at 0% 50%, rgba(192, 87, 62, 0.4) 1.5px, transparent 2.5px),
    radial-gradient(circle at 100% 50%, rgba(192, 87, 62, 0.4) 1.5px, transparent 2.5px),
    radial-gradient(circle at 50% 0%, rgba(200, 169, 110, 0.35) 1.5px, transparent 2.5px),
    radial-gradient(circle at 50% 100%, rgba(200, 169, 110, 0.35) 1.5px, transparent 2.5px);
  background-size:
    24px 24px,
    24px 24px,
    24px 24px,
    24px 24px,
    24px 24px,
    24px 24px,
    24px 24px,
    24px 24px,
    24px 24px;
}
`,
  };

  return templates[type] || templates['WAX'];
}

function generateCatalogEntry(pattern) {
  const cssClass = generateCssClassFromPattern(pattern);
  return {
    slug: pattern.slug,
    name: pattern.nameFr,
    nameEn: pattern.nameEn,
    nameLocal: pattern.nameLocal,
    type: pattern.patternType.toLowerCase(),
    region: pattern.region,
    country: pattern.country,
    cssClass,
    colors: pattern.colors,
    summary: pattern.summary,
    isPublished: pattern.isPublished,
    isFeatured: pattern.status === 'PUBLISHED', // Simplified
  };
}

async function syncFromBackend() {
  console.log('🔄 Syncing patterns from backend...\n');

  try {
    const patterns = await fetchPublishedPatterns();
    console.log(`📥 Found ${patterns.length} published patterns\n`);

    if (patterns.length === 0) {
      console.log('No published patterns to sync.');
      return;
    }

    // Generate CSS for each pattern
    let cssOutput = '/* @buni/patterns - Auto-generated from backend */\n\n';
    const catalogEntries = [];
    const svgRegistry = {};

    for (const pattern of patterns) {
      console.log(`  Processing: ${pattern.slug} (${pattern.patternType})`);

      // Generate CSS
      const patternCss = generatePatternCss(pattern);
      cssOutput += `\n/* ${pattern.nameFr} (${pattern.slug}) */\n`;
      cssOutput += patternCss + '\n';

      // Generate catalog entry
      catalogEntries.push(generateCatalogEntry(pattern));

      // Fetch and save SVG if available
      const svg = await fetchPatternSvg(pattern.id);
      if (svg) {
        const svgFileName = `${pattern.slug}.svg`;
        const svgDir = path.join(pkgRoot, 'src/svg', pattern.patternType.toLowerCase());
        fs.mkdirSync(svgDir, { recursive: true });
        fs.writeFileSync(path.join(svgDir, svgFileName), svg);
        svgRegistry[pattern.slug] = `./svg/${pattern.patternType.toLowerCase()}/${svgFileName}`;
        console.log(`    ✓ SVG saved`);
      }
    }

    // Write patterns.css
    const patternsCssPath = path.join(pkgRoot, 'src/theme/patterns.css');
    fs.writeFileSync(patternsCssPath, cssOutput);
    console.log(`\n✅ Generated ${patternsCssPath}`);

    // Update catalog.ts
    const catalogTs = `// @buni/patterns - Pattern Catalog (Auto-generated from backend)
// DO NOT EDIT MANUALLY - Run 'pnpm run sync:backend' to update

export interface PatternCatalogEntry {
  slug: string;
  name: string;
  nameEn: string;
  nameLocal: string;
  type: string;
  region: string;
  country: string;
  cssClass: string;
  colors: { primary: string; secondary: string; accent: string };
  summary: string;
  isPublished: boolean;
  isFeatured: boolean;
}

export const PATTERN_CATALOG: PatternCatalogEntry[] = ${JSON.stringify(catalogEntries, null, 2)};

export function getPatternBySlug(slug: string): PatternCatalogEntry | undefined {
  return PATTERN_CATALOG.find(p => p.slug === slug);
}

export function getPatternsByType(type: string): PatternCatalogEntry[] {
  return PATTERN_CATALOG.filter(p => p.type === type);
}

export function getFeaturedPatterns(): PatternCatalogEntry[] {
  return PATTERN_CATALOG.filter(p => p.isFeatured);
}

export function getAllPatterns(): PatternCatalogEntry[] {
  return PATTERN_CATALOG;
}
`;

    fs.writeFileSync(path.join(pkgRoot, 'src/catalog.ts'), catalogTs);
    console.log(`✅ Generated ${path.join(pkgRoot, 'src/catalog.ts')}`);

    // Update svg.registry.ts
    const svgRegistryTs = `// @buni/patterns - SVG Pattern Registry (Auto-generated from backend)
// DO NOT EDIT MANUALLY - Run 'pnpm run sync:backend' to update

export const SVG_PATTERN_REGISTRY: Record<string, string> = ${JSON.stringify(svgRegistry, null, 2)};

export function getSvgPattern(slug: string): string | undefined {
  return SVG_PATTERN_REGISTRY[slug];
}

export function getAllSvgPatterns(): Record<string, string> {
  return SVG_PATTERN_REGISTRY;
}
`;

    fs.writeFileSync(path.join(pkgRoot, 'src/svg.registry.ts'), svgRegistryTs);
    console.log(`✅ Generated ${path.join(pkgRoot, 'src/svg.registry.ts')}`);

    // Update css-classes.ts with new patterns
    const cssClasses = [...new Set(catalogEntries.map(e => e.cssClass))];
    const cssClassesTs = `// @buni/patterns - CSS Classes (Auto-generated from backend)
// DO NOT EDIT MANUALLY - Run 'pnpm run sync:backend' to update

export const kente = 'kente';
export const bogolan = 'bogolan';
export const adinkra = 'adinkra';
export const ndebele = 'ndebele';
export const ndop = 'ndop';
export const wax = 'wax';
export const kuba = 'kuba';
export const berber = 'berber';

${cssClasses.filter(c => !['kente','bogolan','adinkra','ndebele','ndop','wax','kuba','berber'].includes(c))
  .map(c => `export const ${c.replace(/-/g, '')} = '${c}';`).join('\n')}

// Fallback
export const fallback = 'wax';
`;

    fs.writeFileSync(path.join(pkgRoot, 'src/css-classes.ts'), cssClassesTs);
    console.log(`✅ Generated ${path.join(pkgRoot, 'src/css-classes.ts')}`);

    console.log('\n🎉 Sync complete! Run "pnpm run build" to build the package.');

  } catch (error) {
    console.error('❌ Sync failed:', error);
    process.exit(1);
  }
}

syncFromBackend();