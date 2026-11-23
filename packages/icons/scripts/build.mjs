#!/usr/bin/env node
// packages/icons/scripts/build.mjs
// Build script for @buni/icons - generates dist/ with React components, CSS, SVG files, symbols, and cultural assets

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgRoot = path.resolve(__dirname, '..');
const srcDir = path.join(pkgRoot, 'src');
const assetsDir = path.join(srcDir, 'assets');
const iconsSrcDir = path.join(srcDir, 'icons');
const publicPatternsDir = path.resolve(pkgRoot, '../../apps/buni-avs/public/patterns');
const distDir = path.join(pkgRoot, 'dist');
const svgDistDir = path.join(distDir, 'svg');
const symbolsDistDir = path.join(distDir, 'symbols');
const culturalDistDir = path.join(distDir, 'cultural');

console.log('🔨 Building @buni/icons...\n');

// Clean and create dist
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true });
}
fs.mkdirSync(distDir, { recursive: true });
fs.mkdirSync(svgDistDir, { recursive: true });
fs.mkdirSync(symbolsDistDir, { recursive: true });
fs.mkdirSync(culturalDistDir, { recursive: true });
fs.mkdirSync(path.join(distDir, 'react'), { recursive: true });

// ============================================================================
// 1. Copy main SVG assets (avs, avs-person, etc.)
// ============================================================================
const mainSvgFiles = ['avs.svg', 'avs-person.svg', 'avs-settings.svg', 'avs-home.svg', 'avs-search.svg'];
// These are inline in CSS, but we also provide them as files

// ============================================================================
// 2. Copy SYMBOLS from public/patterns/ndop/
// ============================================================================
const ndopSymbolsDir = path.join(publicPatternsDir, 'ndop');
const symbolFiles = [];
if (fs.existsSync(ndopSymbolsDir)) {
  const files = fs.readdirSync(ndopSymbolsDir).filter(f => f.endsWith('.svg') && f.includes('Symbol'));
  for (const file of files) {
    fs.copyFileSync(
      path.join(ndopSymbolsDir, file),
      path.join(symbolsDistDir, file)
    );
    symbolFiles.push(file);
    console.log(`✓ Copied Symbol: ${file}`);
  }
} else {
  console.warn('⚠ Ndop symbols directory not found at', ndopSymbolsDir);
}

// ============================================================================
// 3. Copy CULTURAL ASSETS (toghu, etc.)
// ============================================================================
const culturalFiles = [];
if (fs.existsSync(publicPatternsDir)) {
  const files = fs.readdirSync(publicPatternsDir).filter(f => f.endsWith('.svg') && !f.includes('Symbol') && !f.includes('ndop'));
  for (const file of files) {
    // Copy to cultural/
    fs.copyFileSync(
      path.join(publicPatternsDir, file),
      path.join(culturalDistDir, file)
    );
    // Also copy ndop patterns to cultural
    if (file.startsWith('ndop') && !file.includes('Symbol')) {
      fs.copyFileSync(
        path.join(publicPatternsDir, file),
        path.join(culturalDistDir, file)
      );
    }
    culturalFiles.push(file);
    console.log(`✓ Copied Cultural: ${file}`);
  }

  // Copy ndop pattern files (non-symbol)
  const ndopFiles = fs.readdirSync(ndopSymbolsDir).filter(f => f.endsWith('.svg') && !f.includes('Symbol'));
  for (const file of ndopFiles) {
    fs.copyFileSync(
      path.join(ndopSymbolsDir, file),
      path.join(culturalDistDir, file)
    );
    if (!culturalFiles.includes(file)) {
      culturalFiles.push(file);
      console.log(`✓ Copied Cultural Pattern: ${file}`);
    }
  }
}

// ============================================================================
// 4. Build icons.css (CSS classes with data:URI SVGs)
// ============================================================================
const iconsCssSrc = path.join(srcDir, 'icons.css');
const iconsCssDest = path.join(distDir, 'icons.css');

if (fs.existsSync(iconsCssSrc)) {
  let cssContent = fs.readFileSync(iconsCssSrc, 'utf-8');

  cssContent = `/* @buni/icons - CSS Icon Classes
 * Import: @import '@buni/icons/css';
 * Usage: <i class="avs"></i> or <i class="buni-icon avs"></i>
 * Size variants: .avs-sm, .avs-md, .avs-lg, .avs-xl, .avs-2xl
 */\n\n` + cssContent;

  fs.writeFileSync(iconsCssDest, cssContent);
  console.log('✓ Built dist/icons.css');
} else {
  console.warn('⚠ icons.css not found at', iconsCssSrc);
}

// ============================================================================
// 5. Build React Components (tree-shakeable, short imports)
// ============================================================================
const reactDistDir = path.join(distDir, 'react');

if (fs.existsSync(iconsSrcDir)) {
  const tsxFiles = fs.readdirSync(iconsSrcDir).filter(f => f.endsWith('.tsx'));

  for (const file of tsxFiles) {
    const srcPath = path.join(iconsSrcDir, file);
    const content = fs.readFileSync(srcPath, 'utf-8');
    const componentName = file.replace('.tsx', '');

    // Copy source as .tsx for bundlers
    fs.copyFileSync(srcPath, path.join(reactDistDir, file));

    // Generate .js re-export
    fs.writeFileSync(
      path.join(reactDistDir, `${componentName}.js`),
      `export * from './${file}';\n`
    );

    // Generate .d.ts
    const dtsContent = generateDtsFromTsx(content, componentName);
    fs.writeFileSync(path.join(reactDistDir, `${componentName}.d.ts`), dtsContent);

    console.log(`✓ Built React: ${componentName}`);
  }

  // Create react index.js (barrel export - NO 'react' in path)
  const reactIndexJs = tsxFiles
    .map(f => f.replace('.tsx', ''))
    .map(name => `export { ${name} } from './${name}';`)
    .join('\n');

  fs.writeFileSync(path.join(reactDistDir, 'index.js'), reactIndexJs + '\n');

  // Create react index.d.ts
  const reactIndexDts = tsxFiles
    .map(f => f.replace('.tsx', ''))
    .map(name => `export { ${name} } from './${name}';`)
    .join('\n');

  fs.writeFileSync(path.join(reactDistDir, 'index.d.ts'), reactIndexDts + '\n');

  console.log('✓ Built dist/react/index.js + index.d.ts');
}

// ============================================================================
// 6. Build symbols.js (Symbol SVG imports)
// ============================================================================
const symbolsIndexJs = symbolFiles
  .map(file => {
    const name = file.replace('.svg', '').replace(/[-]/g, '');
    return `export { default as ${name} } from '../svg/${file}';`;
  })
  .join('\n');

fs.writeFileSync(path.join(distDir, 'symbols.js'),
`// @buni/icons/symbols - Ndop Symbol SVG Imports
// Usage: import { ndopSymbol1, ndopSymbol2 } from '@buni/icons/symbols'

${symbolsIndexJs}
`);

const symbolsIndexDts = symbolFiles
  .map(file => {
    const name = file.replace('.svg', '').replace(/[-]/g, '');
    return `export declare const ${name}: string;`;
  })
  .join('\n');

fs.writeFileSync(path.join(distDir, 'symbols.d.ts'),
`// @buni/icons/symbols - Type Declarations

${symbolsIndexDts}
`);

console.log(`✓ Built dist/symbols.js + symbols.d.ts (${symbolFiles.length} symbols)`);

// ============================================================================
// 7. Build cultural.js (Cultural SVG assets)
// ============================================================================
const culturalIndexJs = culturalFiles
  .map(file => {
    const name = file.replace('.svg', '').replace(/[-]/g, '');
    return `export { default as ${name} } from '../cultural/${file}';`;
  })
  .join('\n');

fs.writeFileSync(path.join(distDir, 'cultural.js'),
`// @buni/icons/cultural - Cultural Heritage SVG Assets
// Usage: import { ndopBamoum, toghuBamenda, toghuBamileke } from '@buni/icons/cultural'

${culturalIndexJs}
`);

const culturalIndexDts = culturalFiles
  .map(file => {
    const name = file.replace('.svg', '').replace(/[-]/g, '');
    return `export declare const ${name}: string;`;
  })
  .join('\n');

fs.writeFileSync(path.join(distDir, 'cultural.d.ts'),
`// @buni/icons/cultural - Type Declarations

${culturalIndexDts}
`);

console.log(`✓ Built dist/cultural.js + cultural.d.ts (${culturalFiles.length} assets)`);

// ============================================================================
// 8. Build main index.js (SHORT EXPORTS - no react/ in path)
// ============================================================================
const mainIndexJs = `// @buni/icons - Main Entry Point (SHORT IMPORTS)
// Import CSS: import '@buni/icons/css'
// Import React Icons: import { Avs, AvsPerson, AvsSettings, AvsHome, AvsSearch } from '@buni/icons'
// Import Symbols: import { ndopSymbol1, ndopSymbol2 } from '@buni/icons/symbols'
// Import Cultural: import { ndopBamoum, toghuBamenda } from '@buni/icons/cultural'
// Import SVG: import AvsSvg from '@buni/icons/svg/avs.svg'

// React Icons (main export)
export { Avs, AvsPerson, AvsSettings, AvsHome, AvsSearch } from './react/index.js';

// Re-export submodules
export * from './symbols.js';
export * from './cultural.js';

// CSS is imported via "style" export in package.json
`;

fs.writeFileSync(path.join(distDir, 'index.js'), mainIndexJs);
console.log('✓ Built dist/index.js (short exports)');

// ============================================================================
// 9. Build main index.d.ts
// ============================================================================
const mainIndexDts = `// @buni/icons - Type Declarations (SHORT IMPORTS)

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

// Main React Icons
export { Avs, AvsPerson, AvsSettings, AvsHome, AvsSearch } from './react';

// Symbols
export * from './symbols';

// Cultural Assets
export * from './cultural';

// CSS Classes Reference
export const CSS_CLASSES = {
  avs: 'avs',
  'avs-person': 'avs-person',
  'avs-settings': 'avs-settings',
  'avs-home': 'avs-home',
  'avs-search': 'avs-search',
  'avs-sm': 'avs-sm',
  'avs-md': 'avs-md',
  'avs-lg': 'avs-lg',
  'avs-xl': 'avs-xl',
  'avs-2xl': 'avs-2xl',
} as const;

// Symbol Names
export const SYMBOL_NAMES = ${JSON.stringify(symbolFiles.map(f => f.replace('.svg', '').replace(/[-]/g, '')), null, 2)};

// Cultural Names
export const CULTURAL_NAMES = ${JSON.stringify(culturalFiles.map(f => f.replace('.svg', '').replace(/[-]/g, '')), null, 2)};
`;

fs.writeFileSync(path.join(distDir, 'index.d.ts'), mainIndexDts);
console.log('✓ Built dist/index.d.ts (short exports)');

// ============================================================================
// 10. Generate CSS .d.ts files
// ============================================================================
const cssDts = `declare const iconsCss: string; export default iconsCss;`;
fs.writeFileSync(path.join(distDir, 'icons.css.d.ts'), cssDts);

// ============================================================================
// 11. Generate SVG .d.ts files
// ============================================================================
for (const file of symbolFiles) {
  fs.writeFileSync(
    path.join(symbolsDistDir, file.replace('.svg', '.d.ts')),
    `declare const svg: string; export default svg;`
  );
}
for (const file of culturalFiles) {
  fs.writeFileSync(
    path.join(culturalDistDir, file.replace('.svg', '.d.ts')),
    `declare const svg: string; export default svg;`
  );
}

// Also create main svg files (from CSS data URIs)
const mainSvgExports = ['avs', 'avs-person', 'avs-settings', 'avs-home', 'avs-search'];
for (const name of mainSvgExports) {
  fs.writeFileSync(
    path.join(svgDistDir, `${name}.svg`),
    generateMainSvg(name)
  );
  fs.writeFileSync(
    path.join(svgDistDir, `${name}.d.ts`),
    `declare const svg: string; export default svg;`
  );
}
console.log(`✓ Generated ${mainSvgExports.length} main SVG files`);

// ============================================================================
// 12. Generate README for npm
// ============================================================================
const readme = generateReadme(symbolFiles, culturalFiles);
fs.writeFileSync(path.join(pkgRoot, 'README.md'), readme);
console.log('✓ Generated README.md');

console.log('\n✅ Build complete!');
console.log('📦 Output: ' + distDir);
console.log('   - index.js / index.d.ts (MAIN - short imports)');
console.log('   - css/icons.css / icons.css.d.ts (CSS classes)');
console.log('   - react/ (React components)');
console.log('   - symbols.js / symbols.d.ts (Ndop symbols)');
console.log('   - cultural.js / cultural.d.ts (Heritage assets)');
console.log('   - svg/ (Main icon SVGs)');
console.log('   - symbols/ (Ndop symbol SVGs)');
console.log('   - cultural/ (Cultural pattern SVGs)');

// ============================================================================
// Helpers
// ============================================================================
function generateDtsFromTsx(content, componentName) {
  const propsMatch = content.match(/interface\s+(\w+Props)\s*{([\s\S]*?)}/);
  const propsInterface = propsMatch ? propsMatch[0] : '';

  return `// ${componentName}.d.ts
import React from 'react';

${propsInterface}

export interface ${componentName}Props extends React.SVGProps<SVGSVGElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;
  color?: string;
}

declare const ${componentName}: React.FC<${componentName}Props>;
export default ${componentName};
`;
}

function generateMainSvg(name) {
  const svgs = {
    'avs': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6V12L16 14" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    'avs-person': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 20C4 16 7 14 12 14C17 14 20 16 20 20" stroke-linecap="round"/></svg>',
    'avs-settings': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>',
    'avs-home': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>',
    'avs-search': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>',
  };
  return svgs[name] || svgs['avs'];
}

function generateReadme(symbolFiles, culturalFiles) {
  const symbolNames = symbolFiles.map(f => f.replace('.svg', '')).join(', ');
  const culturalNames = culturalFiles.map(f => f.replace('.svg', '')).join(', ');

  return `# @buni/icons

African cultural icons — React components, CSS classes & SVG files for Buni Design System.

## Installation

\`\`\`bash
npm install @buni/icons
# or
pnpm add @buni/icons
# or
yarn add @buni/icons
\`\`\`

## Usage

### 1. React Components (SHORT IMPORTS - Tree-shakeable)

\`\`\`tsx
// ✅ SHORT - Recommended
import { Avs, AvsPerson, AvsSettings, AvsHome, AvsSearch } from '@buni/icons';

// ✅ Individual (smallest bundle)
import { Avs } from '@buni/icons/Avs';
import { AvsPerson } from '@buni/icons/AvsPerson';

function MyComponent() {
  return (
    <div>
      <Avs className="h-6 w-6 text-avs-primary" />
      <AvsPerson size="lg" color="#C0573E" />
      <AvsSettings className="h-8 w-8" />
    </div>
  );
}
\`\`\`

**Props for all React icons:**
| Prop | Type | Default |
|------|------|---------|
| \`className\` | \`string\` | - |
| \`size\` | \`'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| number\` | \`'md'\` |
| \`color\` | \`string\` | \`'currentColor'\` |
| \`...props\` | \`SVGProps<SVGSVGElement>\` | - |

### 2. CSS Classes (Zero Dependencies)

\`\`\`css
@import '@buni/icons/css';
\`\`\`

\`\`\`html
<i class="avs"></i>
<i class="avs-person"></i>
<i class="avs-settings"></i>
<i class="avs-home"></i>
<i class="avs-search"></i>

<!-- Size variants -->
<i class="avs avs-sm"></i>
<i class="avs avs-md"></i>
<i class="avs avs-lg"></i>
<i class="avs avs-xl"></i>
<i class="avs avs-2xl"></i>

<!-- With base class -->
<i class="buni-icon avs"></i>
\`\`\`

### 3. Ndop Symbols (Cultural Symbols)

\`\`\`tsx
import { ndopSymbol1, ndopSymbol2, ndopSymbol3, ndopSymbol4, ndopSymbol5 } from '@buni/icons/symbols';

// As <img>
<img src={ndopSymbol1} alt="Ndop Symbol" width="32" height="32" />

// As background
<div style={{ backgroundImage: \`url(\${ndopSymbol1})\` }} />
\`\`\`

**Available:** ${symbolNames}

### 4. Cultural Heritage Assets

\`\`\`tsx
import { ndopBamoum, toghuBamenda, toghuBamileke } from '@buni/icons/cultural';

// Usage
<img src={ndopBamoum} alt="Ndop Bamoum" />
<img src={toghuBamenda} alt="Toghu Bamenda" />
\`\`\`

**Available:** ${culturalNames}

### 5. SVG Files (Direct Import)

\`\`\`tsx
import AvsSvg from '@buni/icons/svg/avs.svg';
import PersonSvg from '@buni/icons/svg/avs-person.svg';

<img src={AvsSvg} alt="AVS" width="32" height="32" />
\`\`\`

## Available Icons

| Name | React | CSS Class | SVG | Category |
|------|-------|-----------|-----|----------|
| **AVS** | \`<Avs />\` | \`.avs\` | \`avs.svg\` | Brand Logo |
| **Person** | \`<AvsPerson />\` | \`.avs-person\` | \`avs-person.svg\` | User/Profile |
| **Settings** | \`<AvsSettings />\` | \`.avs-settings\` | \`avs-settings.svg\` | Settings |
| **Home** | \`<AvsHome />\` | \`.avs-home\` | \`avs-home.svg\` | Home |
| **Search** | \`<AvsSearch />\` | \`.avs-search\` | \`avs-search.svg\` | Search |

## Cultural Symbols (Ndop)

| Symbol | Import | Origin |
|--------|--------|--------|
${symbolFiles.map(f => '| ' + f.replace('.svg', '') + ' | `import { ' + f.replace('.svg', '').replace(/[-]/g, '') + " } from '@buni/icons/symbols'` | Cameroun / Bamoum |").join('\n')}

## Cultural Assets

| Asset | Import | Origin |
|-------|--------|--------|
${culturalFiles.map(f => '| ' + f.replace('.svg', '') + ' | `import { ' + f.replace('.svg', '').replace(/[-]/g, '') + " } from '@buni/icons/cultural'` | " + (f.includes('toghu') ? 'Cameroun / Bamiléké' : 'Cameroun / Bamoum') + ' |').join('\n')}

## Requirements

- **CSS only**: Any bundler supporting CSS imports
- **React**: React 18+ (peer dependency)
- **SVG imports**: Vite, Webpack 5+, Next.js 13+, or compatible bundler

## License

MIT — Cultural heritage symbols are part of humanity's shared legacy.
`;
}