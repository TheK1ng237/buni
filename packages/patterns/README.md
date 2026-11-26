# @buni-design/patterns

African cultural patterns library — CSS classes & SVG vectors for Kente, Ndop, Bogolan, Adinkra, Wax, Kuba, Ndebele, Berber.

## Installation

```bash
npm install @buni-design/patterns
# or
pnpm add @buni-design/patterns
# or
yarn add @buni-design/patterns
```

## Usage

### CSS Import (Recommended)

```css
/* Import all patterns + design tokens */
@import '@buni-design/patterns';

/* Or import patterns only */
@import '@buni-design/patterns/css';

/* Or import design tokens only */
@import '@buni-design/patterns/tokens';
```

### HTML / JSX Usage

```html
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
```

### SVG Import (Build tools)

```js
// Vite, Webpack, Next.js, etc.
import ndopBamoum from '@buni-design/patterns/svg/ndop/ndop-bamoum.svg';
import kenteRoyale from '@buni-design/patterns/svg/kente/kente-royale.svg';
import toghuBamenda from '@buni-design/patterns/svg/toghu-bamenda.svg';

// Use as <img src={ndopBamoum} /> or background-image
```

### Symbols (Ndop Cultural Symbols)

```js
import { ndopSymbol1, ndopSymbol2, ndopSymbol3, ndopSymbol4, ndopSymbol5 } from '@buni-design/patterns/symbols';
```

### TypeScript / Programmatic Access

```ts
import {
  kente, ndop, bogolan,
  PATTERN_TYPES,
  getPatternBySlug,
  SVG_PATTERN_REGISTRY
} from '@buni-design/patterns';

// Use CSS class names
const className = kente; // "kente"

// Get pattern metadata
const pattern = getPatternBySlug('kente-asante');

// Access SVG registry
const svgUrl = SVG_PATTERN_REGISTRY['ndop-bamoum'];
```

## Available Patterns

| Pattern | Class | Variations | Origin |
|---------|-------|------------|--------|
| **Kente** | `.kente` | `.kente-etoile` | Ghana / Akan |
| **Ndop** | `.ndop` | `.ndop-ceremoniel` | Cameroon / Bamoum |
| **Bogolan** | `.bogolan` | `.bogolan-terre` | Mali / Bambara |
| **Adinkra** | `.adinkra` | — | Ghana / Akan |
| **Wax** | `.wax` | `.wax-lagos` | Pan-African |
| **Kuba** | `.kuba` | — | DRC / Kasai |
| **Ndebele** | `.ndebele` | — | South Africa / Zimbabwe |
| **Berber** | `.berber` | — | Morocco / Amazigh |

## Design Tokens (via `@import '@buni-design/patterns/tokens'`)

```css
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
```

## Customization

Override tokens in your CSS:

```css
@import '@buni-design/patterns';

@theme {
  --color-avs-primary: #YOUR_BRAND_COLOR;
  --color-avs-kente: #YOUR_GOLD;
}
```

## Requirements

- Tailwind CSS v4+
- PostCSS (for CSS imports)

## License

MIT — Cultural heritage patterns are part of humanity's shared legacy.

## Credits

Patterns sourced from African cultural heritage. Built with respect for the artisans and communities who preserve these traditions.
