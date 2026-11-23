#!/usr/bin/env node
// packages/patterns/scripts/build.mjs
// Build script for @buni/patterns - generates dist/ with CSS, SVG, symbols, and TypeScript types

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgRoot = path.resolve(__dirname, '..');
const srcDir = path.join(pkgRoot, 'src');
const publicPatternsDir = path.resolve(pkgRoot, '../../apps/buni-avs/public/patterns');
const distDir = path.join(pkgRoot, 'dist');
const svgDistDir = path.join(distDir, 'svg');
const symbolsDistDir = path.join(distDir, 'symbols');

console.log('🔨 Building @buni/patterns...\n');

// Clean and create dist
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true });
}
fs.mkdirSync(distDir, { recursive: true });
fs.mkdirSync(svgDistDir, { recursive: true });
fs.mkdirSync(symbolsDistDir, { recursive: true });

// ============================================================================
// 1. Copy and process patterns.css (main CSS export)
// ============================================================================
const patternsCssSrc = path.join(srcDir, 'theme', 'patterns.css');
const patternsCssDest = path.join(distDir, 'patterns.css');

if (fs.existsSync(patternsCssSrc)) {
  let cssContent = fs.readFileSync(patternsCssSrc, 'utf-8');

  // Replace relative imports with package imports
  cssContent = cssContent.replace(
    /@import\s+['"]\.\.\/theme\/patterns\.css['"];/g,
    ''
  );
  cssContent = cssContent.replace(
    /@import\s+['"]\.\.\/\.\.\/tokens\/src\/css\/avs-tokens\.css['"];/g,
    "@import '@buni/patterns/tokens';"
  );

  // Point CSS assets to their generated package paths.
  cssContent = cssContent.replace(
    /url\(['"]?\/patterns\/([^'")]+)['"]?\)/g,
    (_match, file) => {
      if (file.includes('Symbol')) {
        return `url('@buni/patterns/symbols/${file}')`;
      }

      const directory = file === 'ndop6.svg' || file === 'ndop-bamoum.svg' ? 'svg/ndop' : 'svg';
      return `url('@buni/patterns/${directory}/${file}')`;
    }
  );

  fs.writeFileSync(patternsCssDest, cssContent);
  console.log('✓ Built dist/patterns.css');
} else {
  console.warn('⚠ patterns.css not found at', patternsCssSrc);
}

// ============================================================================
// 2. Build tokens.css (standalone tokens export)
// ============================================================================
const tokensSrc = path.resolve(pkgRoot, '../tokens/src/css/avs-tokens.css');
const tokensDest = path.join(distDir, 'tokens.css');

if (fs.existsSync(tokensSrc)) {
  let tokensContent = fs.readFileSync(tokensSrc, 'utf-8');
  tokensContent = tokensContent.replace(/@import\s+['"]tailwindcss['"];\s*\n?/g, '');
  fs.writeFileSync(tokensDest, tokensContent);
  console.log('✓ Built dist/tokens.css');
} else {
  console.warn('⚠ tokens source not found at', tokensSrc);
}

// ============================================================================
// 3. Copy SVG PATTERNS to dist/svg/
// ============================================================================
const patternSvgFiles = [];
if (fs.existsSync(publicPatternsDir)) {
  function copySvgRecursive(src, dest, relativePath = '') {
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, relativePath, entry.name);
      if (entry.isDirectory()) {
        fs.mkdirSync(destPath, { recursive: true });
        copySvgRecursive(srcPath, dest, path.join(relativePath, entry.name));
      } else if (entry.name.endsWith('.svg') && !entry.name.includes('Symbol')) {
        fs.copyFileSync(srcPath, destPath);
        patternSvgFiles.push(path.join(relativePath, entry.name));
        console.log(`✓ Copied Pattern SVG: ${path.join(relativePath, entry.name)}`);
      }
    }
  }
  copySvgRecursive(publicPatternsDir, svgDistDir);
} else {
  console.warn('⚠ Public patterns directory not found at', publicPatternsDir);
}

// ============================================================================
// 4. Copy SYMBOLS to dist/symbols/
// ============================================================================
const symbolFiles = [];
const ndopDir = path.join(publicPatternsDir, 'ndop');
if (fs.existsSync(ndopDir)) {
  const files = fs.readdirSync(ndopDir).filter(f => f.endsWith('.svg') && f.includes('Symbol'));
  for (const file of files) {
    fs.copyFileSync(
      path.join(ndopDir, file),
      path.join(symbolsDistDir, file)
    );
    symbolFiles.push(file);
    console.log(`✓ Copied Symbol: ${file}`);
  }
}

// ============================================================================
// 5. Build index.js (SHORT EXPORTS - main entry)
// ============================================================================
const indexJs = `// @buni/patterns - Main Entry Point (SHORT IMPORTS)
// Import CSS: import '@buni/patterns' or import '@buni/patterns/css'
// Import Tokens: import '@buni/patterns/tokens'
// Import Symbols: import { ndopSymbol1, ndopSymbol2 } from '@buni/patterns/symbols'

// CSS is imported via "style" export in package.json
// Re-export all TypeScript utilities
export * from './css-classes.js';
export * from './catalog.js';
export * from './registry.js';
export * from './types.js';
export * from './guards.js';
export * from './utils.js';
export * from './svg.registry.js';

// Named exports for CSS classes
export { kente, kenteEtoile, ndop, ndopCeremoniel, bogolan, bogolanTerre, adinkra, ndebele, wax, waxLagos, kuba, berber, fallback } from './css-classes';

// Pattern catalog
export { PATTERN_CATALOG, getPatternBySlug, getPatternsByType, getFeaturedPatterns } from './catalog';

// Registry types
export type { PatternType, PatternStatus, RegionType, PatternLicense, PatternCssClass } from './registry';
export { PATTERN_TYPES, PATTERN_STATUS, REGIONS, PATTERN_LICENSES, CSS_PATTERN_MAP, PATTERN_CSS_CLASSES, FALLBACK_PATTERN_CSS, isPatternType, isRegion, isPatternLicense, isPatternCssClass } from './registry';

// SVG registry
export { SVG_PATTERN_REGISTRY, getSvgPattern, getAllSvgPatterns } from './svg.registry';
`;

fs.writeFileSync(path.join(distDir, 'index.js'), indexJs);
console.log('✓ Built dist/index.js');

// ============================================================================
// 6. Build symbols.js (Symbol SVG imports)
// ============================================================================
const symbolsIndexJs = symbolFiles
  .map(file => {
    const name = file.replace('.svg', '').replace(/[-]/g, '');
    return `export { default as ${name} } from '../symbols/${file}';`;
  })
  .join('\n');

fs.writeFileSync(path.join(distDir, 'symbols.js'),
`// @buni/patterns/symbols - Ndop Symbol SVG Imports
// Usage: import { ndopSymbol1, ndopSymbol2 } from '@buni/patterns/symbols'

${symbolsIndexJs}
`);

const symbolsIndexDts = symbolFiles
  .map(file => {
    const name = file.replace('.svg', '').replace(/[-]/g, '');
    return `export declare const ${name}: string;`;
  })
  .join('\n');

fs.writeFileSync(path.join(distDir, 'symbols.d.ts'),
`// @buni/patterns/symbols - Type Declarations

${symbolsIndexDts}
`);

console.log(`✓ Built dist/symbols.js + symbols.d.ts (${symbolFiles.length} symbols)`);

// ============================================================================
// 7. Build TypeScript declaration file
// ============================================================================
const indexDts = `// @buni/patterns - Type Declarations (SHORT IMPORTS)

// CSS module declarations
declare module '*.css' {
  const content: string;
  export default content;
}

// SVG module declarations
declare module '*.svg' {
  const content: string;
  export default content;
}

// Package exports
export * from './css-classes';
export * from './catalog';
export * from './registry';
export * from './types';
export * from './guards';
export * from './utils';
export * from './svg.registry';

// Named exports for CSS classes
export { kente, kenteEtoile, ndop, ndopCeremoniel, bogolan, bogolanTerre, adinkra, ndebele, wax, waxLagos, kuba, berber, fallback } from './css-classes';

// Pattern catalog
export { PATTERN_CATALOG, getPatternBySlug, getPatternsByType, getFeaturedPatterns } from './catalog';

// Registry types
export type { PatternType, PatternStatus, RegionType, PatternLicense, PatternCssClass } from './registry';
export { PATTERN_TYPES, PATTERN_STATUS, REGIONS, PATTERN_LICENSES, CSS_PATTERN_MAP, PATTERN_CSS_CLASSES, FALLBACK_PATTERN_CSS, isPatternType, isRegion, isPatternLicense, isPatternCssClass } from './registry';

// SVG registry
export { SVG_PATTERN_REGISTRY, getSvgPattern, getAllSvgPatterns } from './svg.registry';

// Symbols
export * from './symbols';
`;

fs.writeFileSync(path.join(distDir, 'index.d.ts'), indexDts);
console.log('✓ Built dist/index.d.ts');

// ============================================================================
// 8. Generate CSS declaration files
// ============================================================================
const cssDts = `declare const patternsCss: string; export default patternsCss;`;
fs.writeFileSync(path.join(distDir, 'patterns.css.d.ts'), cssDts);
fs.writeFileSync(path.join(distDir, 'tokens.css.d.ts'), cssDts);
console.log('✓ Built CSS .d.ts files');

// ============================================================================
// 9. Copy source TypeScript files to dist (for types)
// ============================================================================
const tsFiles = [
  'css-classes.ts',
  'catalog.ts',
  'registry.ts',
  'types.ts',
  'guards.ts',
  'utils.ts',
  'svg.registry.ts',
];

for (const file of tsFiles) {
  const src = path.join(srcDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(distDir, file.replace('.ts', '.js')));
    fs.copyFileSync(src, path.join(distDir, file.replace('.ts', '.d.ts')));
    console.log(`✓ Copied ${file}`);
  }
}

// ============================================================================
// 10. Generate SVG .d.ts files
// ============================================================================
for (const file of patternSvgFiles) {
  const dtsPath = path.join(svgDistDir, file.replace('.svg', '.d.ts'));
  fs.mkdirSync(path.dirname(dtsPath), { recursive: true });
  fs.writeFileSync(dtsPath, `declare const svg: string; export default svg;`);
}

for (const file of symbolFiles) {
  fs.writeFileSync(
    path.join(symbolsDistDir, file.replace('.svg', '.d.ts')),
    `declare const svg: string; export default svg;`
  );
}
console.log(`✓ Generated ${patternSvgFiles.length + symbolFiles.length} SVG .d.ts files`);

// ============================================================================
// 11. Create README for npm
// ============================================================================
const readme = `# @buni/patterns

African cultural patterns library — CSS classes & SVG vectors for Kente, Ndop, Bogolan, Adinkra, Wax, Kuba, Ndebele, Berber.

## Installation

\`\`\`bash
npm install @buni/patterns
# or
pnpm add @buni/patterns
# or
yarn add @buni/patterns
\`\`\`

## Usage

### CSS Import (Recommended)

\`\`\`css
/* Import all patterns + design tokens */
@import '@buni/patterns';

/* Or import patterns only */
@import '@buni/patterns/css';

/* Or import design tokens only */
@import '@buni/patterns/tokens';
\`\`\`

### HTML / JSX Usage

\`\`\`html
<!-- Basic patterns (short class names) -->
<div class="kente h-32 w-full"></div>
<div class="ndop h-32 w-full"></div>
<div class="bogolan h-32 w-full"></div>
<div class="adinkra h-32 w-full"></div>
<div class="wax h-32 w-full"></div>
<div class="kuba h-32 w-full"></div>
<div class="ndebele h-32 w-full"></div>
<div class="berber h-32 w-full"></div>

<!-- Variations -->
<div class="kente-etoile h-32 w-full"></div>
<div class="ndop-ceremoniel h-32 w-full"></div>
<div class="bogolan-terre h-32 w-full"></div>
<div class="wax-lagos h-32 w-full"></div>
\`\`\`

### SVG Import (Build tools)

\`\`\`js
// Vite, Webpack, Next.js, etc.
import ndopBamoum from '@buni/patterns/svg/ndop/ndop-bamoum.svg';
import kenteRoyale from '@buni/patterns/svg/kente/kente-royale.svg';
import toghuBamenda from '@buni/patterns/svg/toghu-bamenda.svg';

// Use as <img src={ndopBamoum} /> or background-image
\`\`\`

### Symbols (Ndop Cultural Symbols)

\`\`\`js
import { ndopSymbol1, ndopSymbol2, ndopSymbol3, ndopSymbol4, ndopSymbol5 } from '@buni/patterns/symbols';
\`\`\`

### TypeScript / Programmatic Access

\`\`\`ts
import {
  kente, ndop, bogolan,
  PATTERN_TYPES,
  getPatternBySlug,
  SVG_PATTERN_REGISTRY
} from '@buni/patterns';

// Use CSS class names
const className = kente; // "kente"

// Get pattern metadata
const pattern = getPatternBySlug('kente-asante');

// Access SVG registry
const svgUrl = SVG_PATTERN_REGISTRY['ndop-bamoum'];
\`\`\`

## Available Patterns

| Pattern | Class | Variations | Origin |
|---------|-------|------------|--------|
| **Kente** | \`.kente\` | \`.kente-etoile\` | Ghana / Akan |
| **Ndop** | \`.ndop\` | \`.ndop-ceremoniel\` | Cameroon / Bamoum |
| **Bogolan** | \`.bogolan\` | \`.bogolan-terre\` | Mali / Bambara |
| **Adinkra** | \`.adinkra\` | — | Ghana / Akan |
| **Wax** | \`.wax\` | \`.wax-lagos\` | Pan-African |
| **Kuba** | \`.kuba\` | — | DRC / Kasai |
| **Ndebele** | \`.ndebele\` | — | South Africa / Zimbabwe |
| **Berber** | \`.berber\` | — | Morocco / Amazigh |

## Design Tokens (via \`@import '@buni/patterns/tokens'\`)

\`\`\`css
@theme {
  /* Colors */
  --color-avs-primary: #C0573E;
  --color-avs-secondary: #F5EBE0;
  --color-avs-accent: #1D1D1B;
  --color-avs-kente: #D4A017;
  --color-avs-ndop: #4A6741;
  --color-avs-indigo: #2A4A6B;
  --color-avs-earth: #8B4513;
  --color-avs-raffia: #C8A96E;

  /* Light theme */
  --color-light-bg: #FFFFFF;
  --color-light-surface: #F9F7F4;
  --color-light-text: #1D1D1B;
  --color-light-border: #E5E0D8;

  /* Dark theme */
  --color-dark-bg: #0F0E0B;
  --color-dark-surface: #1A1916;
  --color-dark-text: #F5EBE0;
  --color-dark-border: #28251F;

  /* Typography */
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'DM Sans', 'Helvetica Neue', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Radius */
  --radius-avs: 0.375rem;
  --radius-avs-lg: 1.5rem;
  --radius-avs-xl: 2rem;

  /* Shadows */
  --shadow-avs: 3px 3px 0px 0px rgb(29 29 27 / 1);
  --shadow-avs-md: 5px 5px 0px 0px rgb(192 87 62 / 1);
  --shadow-avs-lg: 8px 8px 0px 0px rgb(29 29 27 / 1);

  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);
}
\`\`\`

## Customization

Override tokens in your CSS:

\`\`\`css
@import '@buni/patterns';

@theme {
  --color-avs-primary: #YOUR_BRAND_COLOR;
  --color-avs-kente: #YOUR_GOLD;
}
\`\`\`

## Requirements

- Tailwind CSS v4+
- PostCSS (for CSS imports)

## License

MIT — Cultural heritage patterns are part of humanity's shared legacy.

## Credits

Patterns sourced from African cultural heritage. Built with respect for the artisans and communities who preserve these traditions.
`;

fs.writeFileSync(path.join(pkgRoot, 'README.md'), readme);
console.log('✓ Generated README.md');

console.log('\n✅ Build complete!');
console.log(`📦 Output: ${distDir}`);
console.log(`   - patterns.css (main patterns stylesheet)`);
console.log(`   - tokens.css (design tokens)`);
console.log(`   - index.js / index.d.ts (MAIN - short imports)`);
console.log(`   - symbols.js / symbols.d.ts (Ndop symbols)`);
console.log(`   - svg/ (all pattern SVG files)`);
console.log(`   - symbols/ (Ndop symbol SVGs)`);
console.log(`   - *.d.ts (TypeScript declarations)`);