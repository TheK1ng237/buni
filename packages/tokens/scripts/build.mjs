#!/usr/bin/env node
// packages/tokens/scripts/build.mjs
// Build script for @buni/tokens - generates dist/ with CSS tokens, JS/TS exports

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgRoot = path.resolve(__dirname, '..');
const srcDir = path.join(pkgRoot, 'src');
const cssDir = path.join(srcDir, 'css');
const distDir = path.join(pkgRoot, 'dist');

console.log('🔨 Building @buni/tokens...\n');

// Clean and create dist
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true });
}
fs.mkdirSync(distDir, { recursive: true });

// ============================================================================
// 1. Build tokens.css (main CSS export with @theme)
// ============================================================================
const tokensCssSrc = path.join(cssDir, 'avs-tokens.css');
const tokensCssDest = path.join(distDir, 'tokens.css');

if (fs.existsSync(tokensCssSrc)) {
  let cssContent = fs.readFileSync(tokensCssSrc, 'utf-8');
  cssContent = `/* @buni/tokens - Design Tokens for Tailwind CSS v4
 * Import: @import '@buni/tokens' or @import '@buni/tokens/css'
 */\n\n` + cssContent;
  fs.writeFileSync(tokensCssDest, cssContent);
  console.log('✓ Built dist/tokens.css');
} else {
  console.warn('⚠ avs-tokens.css not found at', tokensCssSrc);
}

// Copy index.css if exists
const indexCssSrc = path.join(srcDir, 'index.css');
const indexCssDest = path.join(distDir, 'index.css');
if (fs.existsSync(indexCssSrc)) {
  fs.copyFileSync(indexCssSrc, indexCssDest);
  console.log('✓ Copied dist/index.css');
}

// ============================================================================
// 2. Build tokens.js (JS/TS token objects)
// ============================================================================
const tokensJsSrc = path.join(srcDir, 'index.ts');
if (fs.existsSync(tokensJsSrc)) {
  const tsContent = fs.readFileSync(tokensJsSrc, 'utf-8');
  fs.copyFileSync(tokensJsSrc, path.join(distDir, 'tokens.ts'));
  fs.writeFileSync(path.join(distDir, 'tokens.js'), `export * from './tokens.ts';\n`);
  fs.copyFileSync(tokensJsSrc, path.join(distDir, 'tokens.d.ts'));
  console.log('✓ Built dist/tokens.js + tokens.d.ts');
}

// ============================================================================
// 3. Build main index.js (SHORT EXPORTS)
// ============================================================================
const mainIndexJs = `// @buni/tokens - Main Entry Point (SHORT IMPORTS)
// Import CSS: import '@buni/tokens' or import '@buni/tokens/css'
// Import JS tokens: import { AVS_COLORS, AVS_RADIUS, AVS_SHADOW } from '@buni/tokens'

// CSS is imported via "style" export in package.json
// Re-export JS tokens
export * from './tokens.js';
`;

fs.writeFileSync(path.join(distDir, 'index.js'), mainIndexJs);
console.log('✓ Built dist/index.js');

// ============================================================================
// 4. Build main index.d.ts
// ============================================================================
const mainIndexDts = `// @buni/tokens - Type Declarations (SHORT IMPORTS)

// CSS module declarations
declare module '*.css' {
  const content: string;
  export default content;
}

// JS Tokens
export * from './tokens';

// Named exports for convenience
export {
  AVS_COLORS,
  type AvsColor,
  AVS_RADIUS,
  AVS_SHADOW,
} from './tokens';
`;

fs.writeFileSync(path.join(distDir, 'index.d.ts'), mainIndexDts);
console.log('✓ Built dist/index.d.ts');

// ============================================================================
// 5. Generate CSS .d.ts
// ============================================================================
const cssDts = `declare const tokensCss: string; export default tokensCss;`;
fs.writeFileSync(path.join(distDir, 'tokens.css.d.ts'), cssDts);
fs.writeFileSync(path.join(distDir, 'index.css.d.ts'), cssDts);
console.log('✓ Built CSS .d.ts files');

// ============================================================================
// 6. Generate README for npm
// ============================================================================
const readme = `# @buni/tokens

Buni Design System — Design tokens (colors, typography, spacing, shadows, radius) for Tailwind CSS v4.

## Installation

\`\`\`bash
npm install @buni/tokens
# or
pnpm add @buni/tokens
# or
yarn add @buni/tokens
\`\`\`

## Usage

### CSS Import (Recommended)

\`\`\`css
@import '@buni/tokens';
\`\`\`

### Tailwind CSS v4 Config

\`\`\`css
@import 'tailwindcss';
@import '@buni/tokens';

@theme {
  --color-avs-primary: #YOUR_BRAND_COLOR;
}
\`\`\`

### JavaScript/TypeScript Import (SHORT)

\`\`\`ts
import { AVS_COLORS, AVS_RADIUS, AVS_SHADOW, type AvsColor } from '@buni/tokens';

const primaryColor = AVS_COLORS.primary; // "#C0573E"
const borderRadius = AVS_RADIUS.md; // "0.375rem"
\`\`\`

## Available Tokens

### Colors
| Token | Value | Description |
|-------|-------|-------------|
| \`--color-avs-primary\` | \`#C0573E\` | Terre brûlée (poterie Yoruba) |
| \`--color-avs-secondary\` | \`#F5EBE0\` | Lin naturel (tissu Fulani) |
| \`--color-avs-accent\` | \`#1D1D1B\` | Obsidienne (basalte Kenya) |
| \`--color-avs-kente\` | \`#D4A017\` | Or kente (soie Asante) |
| \`--color-avs-ndop\` | \`#4A6741\` | Vert Bamiléké (indigo) |
| \`--color-avs-indigo\` | \`#2A4A6B\` | Bleu bogolan (Bambara) |
| \`--color-avs-earth\` | \`#8B4513\` | Ocre savane (Sahel) |
| \`--color-avs-raffia\` | \`#C8A96E\` | Raphia naturel (palmier) |

### Light Theme
| Token | Value |
|-------|-------|
| \`--color-light-bg\` | \`#FFFFFF\` |
| \`--color-light-surface\` | \`#F9F7F4\` |
| \`--color-light-text\` | \`#1D1D1B\` |
| \`--color-light-border\` | \`#E5E0D8\` |

### Dark Theme
| Token | Value |
|-------|-------|
| \`--color-dark-bg\` | \`#0F0E0B\` |
| \`--color-dark-surface\` | \`#1A1916\` |
| \`--color-dark-text\` | \`#F5EBE0\` |
| \`--color-dark-border\` | \`#28251F\` |

### Typography
| Token | Value |
|-------|-------|
| \`--font-display\` | \`'Playfair Display', Georgia, serif\` |
| \`--font-body\` | \`'DM Sans', 'Helvetica Neue', sans-serif\` |
| \`--font-mono\` | \`'JetBrains Mono', monospace\` |

### Radius
| Token | Value |
|-------|-------|
| \`--radius-avs\` | \`0.375rem\` |
| \`--radius-avs-lg\` | \`1.5rem\` |
| \`--radius-avs-xl\` | \`2rem\` |

### Shadows
| Token | Value |
|-------|-------|
| \`--shadow-avs\` | \`3px 3px 0px 0px rgb(29 29 27 / 1)\` |
| \`--shadow-avs-md\` | \`5px 5px 0px 0px rgb(192 87 62 / 1)\` |
| \`--shadow-avs-lg\` | \`8px 8px 0px 0px rgb(29 29 27 / 1)\` |

### Transitions
| Token | Value |
|-------|-------|
| \`--transition-fast\` | \`150ms cubic-bezier(0.4, 0, 0.2, 1)\` |
| \`--transition-base\` | \`250ms cubic-bezier(0.4, 0, 0.2, 1)\` |
| \`--transition-slow\` | \`350ms cubic-bezier(0.4, 0, 0.2, 1)\` |

### Utility Classes
\`\`\`css
.surface-primary { @apply bg-light-surface dark:bg-dark-surface; }
.text-primary { @apply text-light-text dark:text-dark-text; }
.border-primary { @apply border-light-border dark:border-dark-border; }
.shadow-avs { box-shadow: var(--shadow-avs); }
.shadow-avs-md { box-shadow: var(--shadow-avs-md); }
.shadow-avs-lg { box-shadow: var(--shadow-avs-lg); }
\`\`\`

## JavaScript API

\`\`\`ts
AVS_COLORS = { primary, secondary, accent, kente, ndop, indigo, earth, raffia } as const;
type AvsColor = keyof typeof AVS_COLORS;
AVS_RADIUS = { sm: '0.375rem', lg: '1.5rem', xl: '2rem', full: '9999px' } as const;
AVS_SHADOW = { sm, md, lg, xl } as const;
\`\`\`

## Customization

\`\`\`css
@import '@buni/tokens';

@theme {
  --color-avs-primary: #YOUR_BRAND_COLOR;
  --color-avs-kente: #YOUR_GOLD;
  --font-display: 'Your Font', serif;
}
\`\`\`

## Requirements
- Tailwind CSS v4+

## License
MIT — Cultural heritage colors are part of humanity's shared legacy.
`;

fs.writeFileSync(path.join(pkgRoot, 'README.md'), readme);
console.log('✓ Generated README.md');

console.log('✅ Build complete!');
console.log('📦 Output: ' + distDir);
console.log('   - tokens.css / tokens.css.d.ts (CSS custom properties)');
console.log('   - index.js / index.d.ts (MAIN - short imports)');
console.log('   - tokens.js / tokens.d.ts / tokens.ts (JS/TS token objects)');