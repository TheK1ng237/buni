# @buni/tokens

Buni Design System — Design tokens (colors, typography, spacing, shadows, radius) for Tailwind CSS v4.

## Installation

```bash
npm install @buni/tokens
# or
pnpm add @buni/tokens
# or
yarn add @buni/tokens
```

## Usage

### CSS Import (Recommended)

```css
@import '@buni/tokens';
```

### Tailwind CSS v4 Config

```css
@import 'tailwindcss';
@import '@buni/tokens';

@theme {
  --color-avs-primary: #YOUR_BRAND_COLOR;
}
```

### JavaScript/TypeScript Import (SHORT)

```ts
import { AVS_COLORS, AVS_RADIUS, AVS_SHADOW, type AvsColor } from '@buni/tokens';

const primaryColor = AVS_COLORS.primary; // "#C0573E"
const borderRadius = AVS_RADIUS.md; // "0.375rem"
```

## Available Tokens

### Colors
| Token | Value | Description |
|-------|-------|-------------|
| `--color-avs-primary` | `#C0573E` | Terre brûlée (poterie Yoruba) |
| `--color-avs-secondary` | `#F5EBE0` | Lin naturel (tissu Fulani) |
| `--color-avs-accent` | `#1D1D1B` | Obsidienne (basalte Kenya) |
| `--color-avs-kente` | `#D4A017` | Or kente (soie Asante) |
| `--color-avs-ndop` | `#4A6741` | Vert Bamiléké (indigo) |
| `--color-avs-indigo` | `#2A4A6B` | Bleu bogolan (Bambara) |
| `--color-avs-earth` | `#8B4513` | Ocre savane (Sahel) |
| `--color-avs-raffia` | `#C8A96E` | Raphia naturel (palmier) |

### Light Theme
| Token | Value |
|-------|-------|
| `--color-light-bg` | `#FFFFFF` |
| `--color-light-surface` | `#F9F7F4` |
| `--color-light-text` | `#1D1D1B` |
| `--color-light-border` | `#E5E0D8` |

### Dark Theme
| Token | Value |
|-------|-------|
| `--color-dark-bg` | `#0F0E0B` |
| `--color-dark-surface` | `#1A1916` |
| `--color-dark-text` | `#F5EBE0` |
| `--color-dark-border` | `#28251F` |

### Typography
| Token | Value |
|-------|-------|
| `--font-display` | `'Playfair Display', Georgia, serif` |
| `--font-body` | `'DM Sans', 'Helvetica Neue', sans-serif` |
| `--font-mono` | `'JetBrains Mono', monospace` |

### Radius
| Token | Value |
|-------|-------|
| `--radius-avs` | `0.375rem` |
| `--radius-avs-lg` | `1.5rem` |
| `--radius-avs-xl` | `2rem` |

### Shadows
| Token | Value |
|-------|-------|
| `--shadow-avs` | `3px 3px 0px 0px rgb(29 29 27 / 1)` |
| `--shadow-avs-md` | `5px 5px 0px 0px rgb(192 87 62 / 1)` |
| `--shadow-avs-lg` | `8px 8px 0px 0px rgb(29 29 27 / 1)` |

### Transitions
| Token | Value |
|-------|-------|
| `--transition-fast` | `150ms cubic-bezier(0.4, 0, 0.2, 1)` |
| `--transition-base` | `250ms cubic-bezier(0.4, 0, 0.2, 1)` |
| `--transition-slow` | `350ms cubic-bezier(0.4, 0, 0.2, 1)` |

### Utility Classes
```css
.surface-primary { @apply bg-light-surface dark:bg-dark-surface; }
.text-primary { @apply text-light-text dark:text-dark-text; }
.border-primary { @apply border-light-border dark:border-dark-border; }
.shadow-avs { box-shadow: var(--shadow-avs); }
.shadow-avs-md { box-shadow: var(--shadow-avs-md); }
.shadow-avs-lg { box-shadow: var(--shadow-avs-lg); }
```

## JavaScript API

```ts
AVS_COLORS = { primary, secondary, accent, kente, ndop, indigo, earth, raffia } as const;
type AvsColor = keyof typeof AVS_COLORS;
AVS_RADIUS = { sm: '0.375rem', lg: '1.5rem', xl: '2rem', full: '9999px' } as const;
AVS_SHADOW = { sm, md, lg, xl } as const;
```

## Customization

```css
@import '@buni/tokens';

@theme {
  --color-avs-primary: #YOUR_BRAND_COLOR;
  --color-avs-kente: #YOUR_GOLD;
  --font-display: 'Your Font', serif;
}
```

## Requirements
- Tailwind CSS v4+

## License
MIT — Cultural heritage colors are part of humanity's shared legacy.
