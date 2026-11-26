#!/usr/bin/env node
// packages/ui/scripts/build.mjs
// Build script for @bui/ui - generates dist/ with React components, CSS, and TypeScript types

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgRoot = path.resolve(__dirname, '..');
const srcDir = path.join(pkgRoot, 'src');
const componentsDir = path.join(srcDir, 'components');
const distDir = path.join(pkgRoot, 'dist');
const componentsDistDir = path.join(distDir, 'components');

console.log('🔨 Building @buni-design/ui...\n');

// Clean and create dist
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true });
}
fs.mkdirSync(distDir, { recursive: true });
fs.mkdirSync(componentsDistDir, { recursive: true });

// ============================================================================
// 1. Build styles.css (imports tokens + component styles)
// ============================================================================
const stylesCss = `/* @buni-design/ui - Component Styles
 * Import: @import '@buni-design/ui/styles.css' or @import '@buni-design/ui/css'
 * Requires: @import '@buni-design/tokens'; (for design tokens)
 */

@import '@buni-design/tokens';
`;

fs.writeFileSync(path.join(distDir, 'styles.css'), stylesCss);
console.log('✓ Built dist/styles.css');

// ============================================================================
// 2. Process each component - AUTO DISCOVERY
// ============================================================================
const componentFiles = fs.readdirSync(componentsDir)
  .filter(f => f.endsWith('.tsx') && !f.includes('.test.') && !f.includes('.stories.'));

console.log(`\n📦 Processing ${componentFiles.length} components (auto-discovered)...`);

const barrelExports = [];
const barrelDtsExports = [];
const componentNames = [];

for (const file of componentFiles) {
  const componentName = file.replace('.tsx', '');
  const srcPath = path.join(componentsDir, file);
  const content = fs.readFileSync(srcPath, 'utf-8');

  // Copy source to dist/components/
  fs.copyFileSync(srcPath, path.join(componentsDistDir, file));

  // Generate .js re-export
  fs.writeFileSync(
    path.join(componentsDistDir, `${componentName}.js`),
    `export * from './${file}';\n`
  );

  // Generate .d.ts from source
  const dtsContent = generateComponentDts(content, componentName);
  fs.writeFileSync(path.join(componentsDistDir, `${componentName}.d.ts`), dtsContent);

  // Add to barrel exports
  barrelExports.push(`export * from './components/${componentName}';`);
  barrelDtsExports.push(`export * from './components/${componentName}';`);
  componentNames.push(componentName);

  console.log(`  ✓ ${componentName}`);
}

// ============================================================================
// 3. Build utils.ts
// ============================================================================
const utilsSrc = path.join(srcDir, 'utils.ts');
if (fs.existsSync(utilsSrc)) {
  const utilsContent = fs.readFileSync(utilsSrc, 'utf-8');
  fs.copyFileSync(utilsSrc, path.join(distDir, 'utils.ts'));
  fs.writeFileSync(path.join(distDir, 'utils.js'), `export * from './utils.ts';\n`);
  fs.writeFileSync(path.join(distDir, 'utils.d.ts'), utilsContent);

  barrelExports.push(`export * from './utils';`);
  barrelDtsExports.push(`export * from './utils';`);

  console.log('  ✓ utils');
}

// ============================================================================
// 4. Build main index.js (SHORT EXPORTS - main entry)
// ============================================================================
const mainIndexJs = `// @buni-design/ui - Main Entry Point (SHORT IMPORTS)
// Import styles: import '@buni-design/ui' or import '@buni-design/ui/css'
// Import components: import { Button, Card, Input, ... } from '@buni-design/ui'

${barrelExports.join('\n')}

// Re-export tokens for convenience
export * from '@buni-design/tokens';
`;

fs.writeFileSync(path.join(distDir, 'index.js'), mainIndexJs);
console.log('✓ Built dist/index.js (short exports)');

// ============================================================================
// 5. Build main index.d.ts
// ============================================================================
const mainIndexDts = `// @buni-design/ui - Type Declarations (SHORT IMPORTS)

// CSS module declarations
declare module '*.css' {
  const content: string;
  export default content;
}

${barrelDtsExports.join('\n')}

// Re-export tokens types
export * from '@buni-design/tokens';

// Auto-discovered component list
export const COMPONENT_NAMES = ${JSON.stringify(componentNames, null, 2)} as const;
`;

fs.writeFileSync(path.join(distDir, 'index.d.ts'), mainIndexDts);
console.log('✓ Built dist/index.d.ts (short exports)');

// ============================================================================
// 6. Generate CSS .d.ts
// ============================================================================
const cssDts = `declare const stylesCss: string; export default stylesCss;`;
fs.writeFileSync(path.join(distDir, 'styles.css.d.ts'), cssDts);
console.log('✓ Built dist/styles.css.d.ts');

// ============================================================================
// 7. Generate README for npm
// ============================================================================
const readme = generateReadme(componentNames);
fs.writeFileSync(path.join(pkgRoot, 'README.md'), readme);
console.log('✓ Generated README.md');

console.log('\n✅ Build complete!');
console.log(`📦 Output: ${distDir}`);
console.log(`   - index.js / index.d.ts (MAIN - short imports)`);
console.log(`   - styles.css / styles.css.d.ts (component styles)`);
console.log(`   - components/ (each component: .js, .tsx, .d.ts)`);
console.log(`   - utils.js / utils.d.ts (utility functions)`);

// ============================================================================
// Helpers
// ============================================================================
function generateComponentDts(content, componentName) {
  // Extract exports from the component file
  const exports = extractExports(content);

  return `// ${componentName}.d.ts - Auto-generated
import React from 'react';

${exports.map(e => `export ${e}`).join('\n')}

// Default export if component is default exported
${content.includes('export default') ? `declare const ${componentName}: React.ComponentType<any>; export default ${componentName};` : ''}
`;
}

function extractExports(content) {
  const exports = [];

  // Match: export { ... } from ...
  const reExportMatches = content.match(/export\s*{([^}]+)}\s*from\s*['"][^'"]+['"];?/g);
  if (reExportMatches) {
    for (const match of reExportMatches) {
      const inner = match.match(/{([^}]+)}/);
      if (inner) {
        exports.push(...inner[1].split(',').map(s => s.trim()).filter(Boolean));
      }
    }
  }

  // Match: export const/function/class/interface/type ...
  const directExports = content.match(/^export\s+(const|function|class|interface|type)\s+(\w+)/gm);
  if (directExports) {
    for (const match of directExports) {
      const parts = match.trim().split(/\s+/);
      if (parts.length >= 3) {
        exports.push(parts[2]);
      }
    }
  }

  // Match: export { name, name2 }
  const namedExports = content.match(/export\s*{([^}]+)}/g);
  if (namedExports) {
    for (const match of namedExports) {
      const inner = match.match(/{([^}]+)}/);
      if (inner) {
        exports.push(...inner[1].split(',').map(s => s.trim()).filter(Boolean));
      }
    }
  }

  return [...new Set(exports)];
}

function generateReadme(componentNames) {
  return `# @buni-design/ui

Buni Design System — React components built with Radix UI, Tailwind CSS v4 & Class Variance Authority.

## Installation

\`\`\`bash
npm install @buni-design/ui
# or
pnpm add @buni-design/ui
# or
yarn add @buni-design/ui

# Peer dependencies (required)
pnpm add react react-dom tailwindcss class-variance-authority clsx tailwind-merge lucide-react \\
  @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-dropdown-menu \\
  @radix-ui/react-select @radix-ui/react-tabs @radix-ui/react-tooltip \\
  @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-avatar \\
  @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-popover \\
  @radix-ui/react-scroll-area @radix-ui/react-separator @radix-ui/react-switch \\
  @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-progress \\
  @radix-ui/react-label
\`\`\`

## Setup

### 1. Import Styles

\`\`\`css
@import '@buni-design/ui';
@import '@buni-design/tokens'; /* Required for design tokens */
\`\`\`

### 2. Tailwind CSS v4 Config

\`\`\`css
@import 'tailwindcss';
@import '@buni-design/tokens';
@import '@buni-design/ui';

@theme {
  --color-avs-primary: #YOUR_BRAND_COLOR;
}
\`\`\`

### 3. Use Components (SHORT IMPORTS)

\`\`\`tsx
// ✅ SHORT - Recommended
import { Button, Card, CardHeader, CardContent, CardFooter, Avatar } from '@buni-design/ui';

function MyComponent() {
  return (
    <Card className="w-80">
      <CardHeader>
        <Avatar className="h-12 w-12 bg-avs-kente" />
        <h3 className="text-avs-primary">Welcome</h3>
      </CardHeader>
      <CardContent>
        <p className="text-avs-accent/60">Build beautiful African-inspired interfaces.</p>
      </CardContent>
      <CardFooter>
        <Button variant="kente" size="lg">Get Started</Button>
      </CardFooter>
    </Card>
  );
}
\`\`\`

### 4. Individual Imports (Smallest Bundle)

\`\`\`tsx
import { Button } from '@buni-design/ui/Button';
import { Card } from '@buni-design/ui/Card';
import { cn } from '@buni-design/ui/utils';
\`\`\`

## Available Components (${componentNames.length} auto-discovered)

| Component | Description |
|-----------|-------------|
${componentNames.map(name => `| ${name} | ${getComponentDescription(name)} |`).join('\n')}

## Button Variants

\`\`\`tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="outline">Outline</Button>
<Button variant="danger">Danger</Button>
<Button variant="kente">Kente</Button>
<Button variant="link">Link</Button>
<Button variant="muted">Muted</Button>

<Button size="xs">XS</Button>
<Button size="sm">SM</Button>
<Button size="md">MD</Button>
<Button size="lg">LG</Button>
<Button size="xl">XL</Button>
<Button size="icon">🔍</Button>
\`\`\`

## Design Tokens (from @buni-design/tokens)

All components use these tokens via Tailwind CSS v4. See \`@buni-design/tokens\` for full list.

## Utility Functions

\`\`\`ts
import { cn } from '@buni-design/ui';
// or
import { cn } from '@buni-design/ui/utils';

cn('base-class', condition && 'conditional-class', 'another-class');
\`\`\`

## Requirements

- React 18+
- Tailwind CSS v4+
- Peer dependencies (see Installation)

## Accessibility

All components built on Radix UI primitives — fully accessible (ARIA, keyboard navigation, focus management).

## Auto-Discovery

New components added to \`packages/ui/src/components/\` are automatically included in the build and exports. Just create a \`.tsx\` file and it will be picked up.

## License

MIT
`;
}

function getComponentDescription(name) {
  const descriptions = {
    Button: 'Multi-variant button (primary, secondary, ghost, outline, danger, kente, link, muted)',
    Badge: 'Status badges with variants',
    Input: 'Form input & Textarea',
    Card: 'Content containers (Card, CardHeader, CardContent, CardFooter)',
    Avatar: 'User avatars with fallback',
    Loader: 'Loading states (Spinner, Skeleton, LoadingPage)',
    Toggle: 'Toggle switches',
    Separator: 'Visual dividers',
    Progress: 'Progress bars',
    Checkbox: 'Checkbox inputs',
    Alert: 'Alert messages',
    Dialog: 'Modal dialogs (Dialog, DialogTrigger, DialogContent, ...)',
    Toast: 'Toast notifications (ToastProvider, useToast)',
    Tabs: 'Tab navigation (Tabs, TabsList, TabsTrigger, TabsContent)',
    Accordion: 'Collapsible sections',
    Tooltip: 'Tooltips (TooltipProvider, Tooltip, TooltipTrigger, TooltipContent)',
    Select: 'Select dropdowns (Select, SelectTrigger, SelectContent, SelectItem, ...)',
    DropdownMenu: 'Context menus (DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, ...)',
    ScrollArea: 'Custom scrollbars (ScrollArea, ScrollBar)',
    BuniLoader: 'Branded loader',
    Comingsoon: 'Coming soon placeholder',
    KpiCard: 'KPI metric cards',
  };
  return descriptions[name] || 'React component';
}