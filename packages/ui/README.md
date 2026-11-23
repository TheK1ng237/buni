# @buni/ui

Buni Design System — React components built with Radix UI, Tailwind CSS v4 & Class Variance Authority.

## Installation

```bash
npm install @buni/ui
# or
pnpm add @buni/ui
# or
yarn add @buni/ui

# Peer dependencies (required)
pnpm add react react-dom tailwindcss class-variance-authority clsx tailwind-merge lucide-react \
  @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-dropdown-menu \
  @radix-ui/react-select @radix-ui/react-tabs @radix-ui/react-tooltip \
  @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-avatar \
  @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-popover \
  @radix-ui/react-scroll-area @radix-ui/react-separator @radix-ui/react-switch \
  @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-progress \
  @radix-ui/react-label
```

## Setup

### 1. Import Styles

```css
@import '@buni/ui';
@import '@buni/tokens'; /* Required for design tokens */
```

### 2. Tailwind CSS v4 Config

```css
@import 'tailwindcss';
@import '@buni/tokens';
@import '@buni/ui';

@theme {
  --color-avs-primary: #YOUR_BRAND_COLOR;
}
```

### 3. Use Components (SHORT IMPORTS)

```tsx
// ✅ SHORT - Recommended
import { Button, Card, CardHeader, CardContent, CardFooter, Avatar } from '@buni/ui';

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
```

### 4. Individual Imports (Smallest Bundle)

```tsx
import { Button } from '@buni/ui/Button';
import { Card } from '@buni/ui/Card';
import { cn } from '@buni/ui/utils';
```

## Available Components (23 auto-discovered)

| Component | Description |
|-----------|-------------|
| Accordion | Collapsible sections |
| Alert | Alert messages |
| Avatar | User avatars with fallback |
| Badge | Status badges with variants |
| BuniLoader | Branded loader |
| Button | Multi-variant button (primary, secondary, ghost, outline, danger, kente, link, muted) |
| Card | Content containers (Card, CardHeader, CardContent, CardFooter) |
| Checkbox | Checkbox inputs |
| Dialog | Modal dialogs (Dialog, DialogTrigger, DialogContent, ...) |
| DropdownMenu | Context menus (DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, ...) |
| Input | Form input & Textarea |
| KpiCard | KPI metric cards |
| Loader | Loading states (Spinner, Skeleton, LoadingPage) |
| Progress | Progress bars |
| ScrollArea | Custom scrollbars (ScrollArea, ScrollBar) |
| Select | Select dropdowns (Select, SelectTrigger, SelectContent, SelectItem, ...) |
| Separator | Visual dividers |
| Tabs | Tab navigation (Tabs, TabsList, TabsTrigger, TabsContent) |
| Toast | Toast notifications (ToastProvider, useToast) |
| Toggle | Toggle switches |
| Tooltip | Tooltips (TooltipProvider, Tooltip, TooltipTrigger, TooltipContent) |
| comingsoon | React component |
| theme-toggle | React component |

## Button Variants

```tsx
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
```

## Design Tokens (from @buni/tokens)

All components use these tokens via Tailwind CSS v4. See `@buni/tokens` for full list.

## Utility Functions

```ts
import { cn } from '@buni/ui';
// or
import { cn } from '@buni/ui/utils';

cn('base-class', condition && 'conditional-class', 'another-class');
```

## Requirements

- React 18+
- Tailwind CSS v4+
- Peer dependencies (see Installation)

## Accessibility

All components built on Radix UI primitives — fully accessible (ARIA, keyboard navigation, focus management).

## Auto-Discovery

New components added to `packages/ui/src/components/` are automatically included in the build and exports. Just create a `.tsx` file and it will be picked up.

## License

MIT
