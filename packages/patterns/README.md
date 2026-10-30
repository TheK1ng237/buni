# @buni/patterns - African Pattern CSS Classes

Easy-to-use African pattern CSS classes for any React project.

## 🚀 Quick Start

### Installation

```bash
npm install @buni/patterns
```

### CSS Import Required

For the CSS classes to work, you need to import the CSS in your global CSS file:

```css
/* In your globals.css or main CSS file */
@import '@buni/patterns/css';
```

### Basic Usage

```jsx
import { kente, ndop, bogolan } from '@buni/patterns';

function App() {
  return (
    <div>
      {/* Simple pattern background */}
      <div className={kente} className="h-64" />
      
      {/* Pattern as section */}
      <section className={ndop}>
        <h1>Content with Ndop pattern</h1>
      </section>
      
      {/* Pattern with custom styles */}
      <div 
        className={bogolan}
        className="opacity-30 rounded-xl"
      >
        <p>Overlay content</p>
      </div>
    </div>
  );
}
```

### Direct Tailwind Usage (Recommended)

```jsx
// Even simpler - use pattern classes directly with Tailwind
<div className="ndop h-20 w-full" />
<div className="kente h-32 w-32 rounded-full" />
<div className="bogolan h-16 w-full opacity-20" />

// Combined with other Tailwind classes
<section className="ndop min-h-screen relative">
  <div className="absolute inset-0 bg-black/50" />
  <div className="relative z-10 p-8">
    <h1 className="text-white">Your content</h1>
  </div>
</section>
```

## 🎨 Available Pattern Classes

```typescript
import { 
  kente, 
  bogolan, 
  adinkra, 
  ndebele, 
  ndop, 
  wax, 
  kuba, 
  berber 
} from '@buni/patterns';
```

Available patterns:
- `kente` - Kente patterns (Ghana)
- `bogolan` - Bogolan patterns (Mali)
- `adinkra` - Adinkra symbols (Ghana)
- `ndebele` - Ndebele patterns (Zimbabwe)
- `ndop` - Ndop patterns (Cameroon)
- `wax` - Wax patterns (Pan-african)
- `kuba` - Kuba patterns (DRC)
- `berber` - Berber patterns (North Africa)

Additional variations:
- `kenteEtoile` - Kente étoile variation
- `ndopCeremoniel` - Ndop cérémoniel variation
- `bogolanTerre` - Bogolan terre variation
- `waxLagos` - Wax Lagos variation

## 🎯 Advanced Examples

### Pattern Backgrounds

```jsx
function PatternBackground() {
  return (
    <div className="kente h-48">
      <h1 className="text-white">Kente Background</h1>
    </div>
  );
}

function PatternSection() {
  return (
    <section className="ndop">
      <div className="p-8">
        <h2>Section with Ndop pattern</h2>
        <p>Your content here</p>
      </div>
    </section>
  );
}

function PatternWithOpacity() {
  return (
    <div className="bogolan opacity-30">
      <p>Subtle bogolan pattern overlay</p>
    </div>
  );
}
```

### Interactive Pattern Cards

### Interactive Pattern Cards

```jsx
import { kente, ndop, bogolan } from '@buni/patterns';

function PatternCard({ pattern, onClick }) {
  const patternClass = {
    KENTE: kente,
    NDOP: ndop,
    BOGOLAN: bogolan
  }[pattern.type] || kente;

  return (
    <div 
      className={`${patternClass} p-6 rounded-lg cursor-pointer hover:scale-105 transition-transform`}
      onClick={onClick}
    >
      <div className="bg-white/90 backdrop-blur-sm p-4 rounded">
        <h3 className="font-bold text-lg">{pattern.name}</h3>
        <p className="text-sm opacity-75">{pattern.description}</p>
      </div>
    </div>
  );
}
```

### Pattern Sections

```jsx
import { kente, ndop, bogolan } from '@buni/patterns';

function PatternSection({ title, type, children }) {
  const patternClass = {
    KENTE: kente,
    NDOP: ndop,
    BOGOLAN: bogolan
  }[type] || kente;

  return (
    <section className="py-16">
      <header 
        className={`${patternClass} h-32 flex items-center justify-center`}
      >
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">
          {title}
        </h1>
      </header>
      
      <main className="container mx-auto px-4">
        {children}
      </main>
    </section>
  );
}

// Usage
<PatternSection 
  title="African Patterns" 
  type="KENTE"
>
  <p>Your content here...</p>
</PatternSection>
```

### Pattern Overlays

```jsx
import { kente, ndop, bogolan } from '@buni/patterns';

function PatternOverlay({ type, children }) {
  const patternClass = {
    KENTE: kente,
    NDOP: ndop,
    BOGOLAN: bogolan
  }[type] || kente;

  return (
    <div className="relative">
      <div 
        className={`${patternClass} absolute inset-0 z-0`}
        style={{ opacity: 0.15 }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
```

## 🎨 CSS Classes Reference

Each pattern has a short name for direct Tailwind usage:

```css
.kente      /* Kente pattern - short name */
.ndop       /* Ndop pattern - short name */
.bogolan    /* Bogolan pattern - short name */
.wax        /* Wax pattern - short name */
.adinkra    /* Adinkra pattern - short name */
.kuba       /* Kuba pattern - short name */
.berber     /* Berber pattern - short name */
.ndebele    /* Ndebele pattern - short name */
```

The full class names are still available for backward compatibility:
```css
.avs-pattern-kente-royale      /* kente */
.avs-pattern-ndop-sultan       /* ndop */
.avs-pattern-bogolan-fanga     /* bogolan */
.avs-pattern-wax-dakar         /* wax */
.avs-pattern-adinkra-sankofa   /* adinkra */
.avs-pattern-kuba-kasai        /* kuba */
.avs-pattern-berber-amazigh    /* berber */
.avs-pattern-ndebele-amabhaxa  /* ndebele */
```

## 🔄 TypeScript Support

Full TypeScript support with proper type definitions:

```typescript
import { kente, ndop, bogolan } from '@buni/patterns';

// Fully typed imports
const patternClass: string = kente; // Type: string
```

## 📦 Distribution

This package is designed for easy distribution:

- **Zero dependencies** - Works with any CSS framework
- **Tree-shakable** - Only imports what you use
- **TypeScript first** - Full type safety
- **Framework agnostic** - Works with Next.js, Vite, Create React App, vanilla CSS

## 🌍 Cultural Context

These patterns represent authentic African textile traditions:

- **Kente**: Ghanaian royal weaving tradition
- **Ndop**: Cameroonian Bamoum sacred textiles
- **Bogolan**: Malian mud-dyed cloth tradition
- **Adinkra**: Ghanaian symbolic stamping tradition
- **Toghu**: Cameroonian Bamiléké prestige textiles

Each pattern includes cultural context and historical significance.

## 🤝 Contributing

To add new patterns:

1. Design the pattern with cultural authenticity
2. Add CSS class to the pattern system
3. Update the type definitions
4. Document the cultural significance

## 📄 License

All patterns are available under Creative Commons licenses (CC-BY, CC0, CC-BY-SA).

Please respect the cultural origins and attribute appropriately when using these patterns.
