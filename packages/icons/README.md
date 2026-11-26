# @buni-design/icons

African cultural icons — React components, CSS classes & SVG files for Buni Design System.

## Installation

```bash
npm install @buni-design/icons
# or
pnpm add @buni-design/icons
# or
yarn add @buni-design/icons
```

## Usage

### 1. React Components (SHORT IMPORTS - Tree-shakeable)

```tsx
// ✅ SHORT - Recommended
import { Avs, AvsPerson, AvsSettings, AvsHome, AvsSearch } from '@buni-design/icons';

// ✅ Individual (smallest bundle)
import { Avs } from '@buni-design/icons/Avs';
import { AvsPerson } from '@buni-design/icons/AvsPerson';

function MyComponent() {
  return (
    <div>
      <Avs className="h-6 w-6 text-avs-primary" />
      <AvsPerson size="lg" color="#C0573E" />
      <AvsSettings className="h-8 w-8" />
    </div>
  );
}
```

**Props for all React icons:**
| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | - |
| `size` | `'sm' | 'md' | 'lg' | 'xl' | '2xl' | number` | `'md'` |
| `color` | `string` | `'currentColor'` |
| `...props` | `SVGProps<SVGSVGElement>` | - |

### 2. CSS Classes (Zero Dependencies)

```css
@import '@buni-design/icons/css';
```

```html
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
```

### 3. Ndop Symbols (Cultural Symbols)

```tsx
import { ndopSymbol1, ndopSymbol2, ndopSymbol3, ndopSymbol4, ndopSymbol5 } from '@buni-design/icons/symbols';

// As <img>
<img src={ndopSymbol1} alt="Ndop Symbol" width="32" height="32" />

// As background
<div style={{ backgroundImage: `url(${ndopSymbol1})` }} />
```

**Available:** ndopSymbol1, ndopSymbol2, ndopSymbol3, ndopSymbol4, ndopSymbol5

### 4. Cultural Heritage Assets

```tsx
import { ndopBamoum, toghuBamenda, toghuBamileke } from '@buni-design/icons/cultural';

// Usage
<img src={ndopBamoum} alt="Ndop Bamoum" />
<img src={toghuBamenda} alt="Toghu Bamenda" />
```

**Available:** toghu-bamenda, toghu-bamileke, ndop-bamoum, ndop6

### 5. SVG Files (Direct Import)

```tsx
import AvsSvg from '@buni-design/icons/svg/avs.svg';
import PersonSvg from '@buni-design/icons/svg/avs-person.svg';

<img src={AvsSvg} alt="AVS" width="32" height="32" />
```

## Available Icons

| Name | React | CSS Class | SVG | Category |
|------|-------|-----------|-----|----------|
| **AVS** | `<Avs />` | `.avs` | `avs.svg` | Brand Logo |
| **Person** | `<AvsPerson />` | `.avs-person` | `avs-person.svg` | User/Profile |
| **Settings** | `<AvsSettings />` | `.avs-settings` | `avs-settings.svg` | Settings |
| **Home** | `<AvsHome />` | `.avs-home` | `avs-home.svg` | Home |
| **Search** | `<AvsSearch />` | `.avs-search` | `avs-search.svg` | Search |

## Cultural Symbols (Ndop)

| Symbol | Import | Origin |
|--------|--------|--------|
| ndopSymbol1 | `import { ndopSymbol1 } from '@buni-design/icons/symbols'` | Cameroun / Bamoum |
| ndopSymbol2 | `import { ndopSymbol2 } from '@buni-design/icons/symbols'` | Cameroun / Bamoum |
| ndopSymbol3 | `import { ndopSymbol3 } from '@buni-design/icons/symbols'` | Cameroun / Bamoum |
| ndopSymbol4 | `import { ndopSymbol4 } from '@buni-design/icons/symbols'` | Cameroun / Bamoum |
| ndopSymbol5 | `import { ndopSymbol5 } from '@buni-design/icons/symbols'` | Cameroun / Bamoum |

## Cultural Assets

| Asset | Import | Origin |
|-------|--------|--------|
| toghu-bamenda | `import { toghubamenda } from '@buni-design/icons/cultural'` | Cameroun / Bamiléké |
| toghu-bamileke | `import { toghubamileke } from '@buni-design/icons/cultural'` | Cameroun / Bamiléké |
| ndop-bamoum | `import { ndopbamoum } from '@buni-design/icons/cultural'` | Cameroun / Bamoum |
| ndop6 | `import { ndop6 } from '@buni-design/icons/cultural'` | Cameroun / Bamoum |

## Requirements

- **CSS only**: Any bundler supporting CSS imports
- **React**: React 18+ (peer dependency)
- **SVG imports**: Vite, Webpack 5+, Next.js 13+, or compatible bundler

## License

MIT — Cultural heritage symbols are part of humanity's shared legacy.
