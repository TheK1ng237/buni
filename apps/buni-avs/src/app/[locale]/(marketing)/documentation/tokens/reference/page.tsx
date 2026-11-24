'use client';

import { DocPageTemplate } from '../../doc-page-template';
import { useNavSpaces } from '../../nav-data';
import { useTranslations } from '@/i18n';
import { CodeBlock } from '../../doc-primitives';
import { AVS_COLORS, AVS_RADIUS, AVS_SHADOW } from '@buni/tokens';

function getContrastTextColor(hex: string) {
  const channels = hex.match(/[0-9a-f]{2}/gi)?.map((channel) => parseInt(channel, 16) / 255);
  if (!channels || channels.length !== 3) return '#1D1D1B';
  const [redChannel, greenChannel, blueChannel] = channels;
  if (redChannel === undefined || greenChannel === undefined || blueChannel === undefined) return '#1D1D1B';

  const linearize = (channel: number) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  const red = linearize(redChannel);
  const green = linearize(greenChannel);
  const blue = linearize(blueChannel);
  const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
  const darkLuminance = 0.2126 * linearize(29 / 255) + 0.7152 * linearize(29 / 255) + 0.0722 * linearize(27 / 255);
  const darkContrast = (luminance + 0.05) / (darkLuminance + 0.05);
  const lightContrast = 1.05 / (luminance + 0.05);

  return darkContrast >= lightContrast ? '#1D1D1B' : '#FFFFFF';
}

export default function TokensReferencePage() {
  const t = useTranslations('documentation.tokens.reference');
  const NAV_SPACES = useNavSpaces();
  const space = NAV_SPACES.find(s => s.slug === 'tokens')!;

  // Colors from package
  const colors = Object.entries(AVS_COLORS).map(([key, value]) => ({
    name: key,
    value,
    hex: value,
  }));

  const lightColors = {
    '--color-light-bg': '#FFFFFF',
    '--color-light-surface': '#F9F7F4',
    '--color-light-text': '#1D1D1B',
    '--color-light-border': '#E5E0D8',
  };

  const darkColors = {
    '--color-dark-bg': '#0F0E0B',
    '--color-dark-surface': '#1A1916',
    '--color-dark-text': '#F5EBE0',
    '--color-dark-border': '#28251F',
  };

  const radius = Object.entries(AVS_RADIUS).map(([key, value]) => ({ name: key, value }));
  const shadows = Object.entries(AVS_SHADOW).map(([key, value]) => ({ name: key, value }));

  return (
    <DocPageTemplate
      space={space}
      title={t('title')}
      summary={t('summary')}
      explanation={
        <div className="space-y-8">
          {/* Installation */}
          <section id="installation">
            <h2 className="text-2xl font-semibold text-avs-primary mb-4">{t('installation.title')}</h2>
            <CodeBlock id="tokens-installation" lang="bash" title={t('installation.title')} code={`# Installation
pnpm add @buni/tokens

# CSS Import (required for all packages)
@import '@buni/tokens';

# Tailwind v4 Config
@import 'tailwindcss';
@import '@buni/tokens';

@theme {
  --color-avs-primary: #YOUR_BRAND_COLOR;
}

// JS Import (short)
import { AVS_COLORS, AVS_RADIUS, AVS_SHADOW } from '@buni/tokens';`} />
          </section>

          {/* Color Palette */}
          <section id="colors">
            <h2 className="text-2xl font-semibold text-avs-primary mb-4">{t('colors.title')}</h2>
            <p className="text-avs-accent/80 mb-6">{t('colors.description')}</p>

            {/* Main Colors */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-avs-primary">{t('colors.main')}</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {colors.map(({ name, hex }) => (
                  <div
                    key={name}
                    className="surface-primary border-primary border rounded-avs p-4"
                    style={{ backgroundColor: hex }}
                  >
                    <div className="w-full h-20 rounded-avs mb-3 border border-primary" />
                    <div className="space-y-1">
                      <code className="font-semibold capitalize" style={{ color: getContrastTextColor(hex) }}>{name}</code>
                      <code className="text-xs font-mono" style={{ color: getContrastTextColor(hex) }}>{hex}</code>
                      <code className="text-xs font-mono" style={{ color: getContrastTextColor(hex) }}>var(--color-avs-{name})</code>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Light Theme */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-avs-primary">{t('colors.light')}</h3>
              <div className="grid gap-4 md:grid-cols-4">
                {Object.entries(lightColors).map(([name, hex]) => (
                  <div key={name} className="surface-primary border-primary border rounded-avs p-4" style={{ backgroundColor: hex }}>
                    <div className="w-full h-20 rounded-avs mb-3 border border-primary" />
                    <code className="text-xs font-mono block" style={{ color: getContrastTextColor(hex) }}>{name}</code>
                    <code className="text-xs font-mono block" style={{ color: getContrastTextColor(hex) }}>{hex}</code>
                  </div>
                ))}
              </div>
            </div>

            {/* Dark Theme */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-avs-primary">{t('colors.dark')}</h3>
              <div className="grid gap-4 md:grid-cols-4">
                {Object.entries(darkColors).map(([name, hex]) => (
                  <div key={name} className="surface-primary border-primary border rounded-avs p-4" style={{ backgroundColor: hex }}>
                    <div className="w-full h-20 rounded-avs mb-3 border border-primary" />
                    <code className="text-xs font-mono block" style={{ color: getContrastTextColor(hex) }}>{name}</code>
                    <code className="text-xs font-mono block" style={{ color: getContrastTextColor(hex) }}>{hex}</code>
                  </div>
                ))}
              </div>
            </div>

            {/* Usage Examples */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-avs-primary">{t('colors.usage')}</h3>
              <CodeBlock id="tokens-color-usage" lang="css" code={`// CSS Variables
:root {
  --color-avs-primary: #C0573E;
}

.my-button {
  background: var(--color-avs-primary);
  color: var(--color-avs-secondary);
}

// Tailwind Classes
<div className="bg-avs-primary text-avs-secondary rounded-avs shadow-avs">
  Button
</div>

<div className="bg-avs-kente text-avs-accent p-4 rounded-avs-lg">
  Kente accent card
</div>

// Dark mode automatic
<div className="surface-primary text-primary border-primary">
  Adapts to light/dark automatically
</div>`} />
            </div>
          </section>

          {/* Typography */}
          <section id="typography">
            <h2 className="text-2xl font-semibold text-avs-primary mb-4">{t('typography.title')}</h2>
            <p className="text-avs-accent/80 mb-6">{t('typography.description')}</p>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="surface-primary border-primary border rounded-avs p-6">
                <h3 className="font-display text-3xl text-avs-primary mb-2">Display</h3>
                <p className="font-body text-avs-accent/70">{t('typography.display')}</p>
                <code className="text-xs font-mono text-avs-accent/60 block mt-2">font-display / --font-display</code>
              </div>
              <div className="surface-primary border-primary border rounded-avs p-6">
                <h3 className="font-body text-xl text-avs-primary mb-2">Body</h3>
                <p className="font-body text-avs-accent/70">{t('typography.body')}</p>
                <code className="text-xs font-mono text-avs-accent/60 block mt-2">font-body / --font-body</code>
              </div>
              <div className="surface-primary border-primary border rounded-avs p-6">
                <h3 className="font-mono text-lg text-avs-primary mb-2">Mono</h3>
                <p className="font-mono text-avs-accent/70">{t('typography.mono')}</p>
                <code className="text-xs font-mono text-avs-accent/60 block mt-2">font-mono / --font-mono</code>
              </div>
            </div>

            <CodeBlock id="tokens-typography" lang="css" code={`// CSS
font-family: var(--font-display);
font-family: var(--font-body);
font-family: var(--font-mono);

// Tailwind
<h1 className="font-display text-4xl">Titre</h1>
<p className="font-body">Corps de texte</p>
<code className="font-mono">code</code>`} />
          </section>

          {/* Radius */}
          <section id="radius">
            <h2 className="text-2xl font-semibold text-avs-primary mb-4">{t('radius.title')}</h2>
            <div className="grid gap-4 md:grid-cols-4">
              {radius.map(({ name, value }) => (
                <div key={name} className="surface-primary border-primary border rounded-avs p-4 text-center">
                  <div
                    className="mx-auto mb-3 border-4 border-avs-primary"
                    style={{ width: 80, height: 80, borderRadius: value }}
                  />
                  <code className="font-semibold text-avs-primary">{name}</code>
                  <code className="text-xs font-mono text-avs-accent/60 block">{value}</code>
                  <code className="text-xs font-mono text-avs-accent/50 block">var(--radius-avs-{name})</code>
                </div>
              ))}
            </div>
          </section>

          {/* Shadows */}
          <section id="shadows">
            <h2 className="text-2xl font-semibold text-avs-primary mb-4">{t('shadows.title')}</h2>
            <div className="grid gap-4 md:grid-cols-4">
              {shadows.map(({ name, value }) => (
                <div key={name} className="surface-primary border-primary border rounded-avs p-6 text-center">
                  <div
                    className="mx-auto mb-3 w-24 h-24 bg-avs-secondary"
                    style={{ boxShadow: value }}
                  />
                  <code className="font-semibold text-avs-primary">{name}</code>
                  <code className="text-xs font-mono text-avs-accent/60 block">{value}</code>
                  <code className="text-xs font-mono text-avs-accent/50 block">var(--shadow-avs-{name})</code>
                </div>
              ))}
            </div>
          </section>

          {/* JS API */}
          <section id="js-api">
            <h2 className="text-2xl font-semibold text-avs-primary mb-4">{t('js.title')}</h2>
            <p className="text-avs-accent/80 mb-6">{t('js.description')}</p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-avs-primary mb-3">{t('js.colors')}</h3>
                <CodeBlock id="tokens-js-colors" lang="ts" code={`import { AVS_COLORS, type AvsColor } from '@buni/tokens';

AVS_COLORS.primary   // "#C0573E"
AVS_COLORS.kente     // "#D4A017"
AVS_COLORS.ndop      // "#4A6741"

type AvsColor = 'primary' | 'secondary' | 'accent' | 'kente' | 'ndop' | 'indigo' | 'earth' | 'raffia';

// Dynamic access
const color: AvsColor = 'kente';
const hex = AVS_COLORS[color]; // "#D4A017"`} />
              </div>

              <div>
                <h3 className="text-lg font-medium text-avs-primary mb-3">{t('js.radius')}</h3>
                <CodeBlock id="tokens-js-radius" lang="ts" code={`import { AVS_RADIUS } from '@buni/tokens';

AVS_RADIUS.sm  // "0.375rem"
AVS_RADIUS.lg  // "1.5rem"
AVS_RADIUS.xl  // "2rem"
AVS_RADIUS.full // "9999px"`} />
              </div>

              <div>
                <h3 className="text-lg font-medium text-avs-primary mb-3">{t('js.shadows')}</h3>
                <CodeBlock id="tokens-js-shadows" lang="ts" code={`import { AVS_SHADOW } from '@buni/tokens';

AVS_SHADOW.sm  // "2px 2px 0px 0px #1D1D1B"
AVS_SHADOW.md  // "3px 3px 0px 0px #1D1D1B"
AVS_SHADOW.lg  // "5px 5px 0px 0px #C0573E"
AVS_SHADOW.xl  // "8px 8px 0px 0px #1D1D1B"`} />
              </div>

              <div>
                <h3 className="text-lg font-medium text-avs-primary mb-3">{t('js.utility')}</h3>
                <CodeBlock id="tokens-js-utility" lang="ts" code={`// Generate dynamic styles
function getPatternStyle(colorKey: keyof typeof AVS_COLORS) {
  return {
    backgroundColor: AVS_COLORS[colorKey],
    borderRadius: AVS_RADIUS.md,
    boxShadow: AVS_SHADOW.md,
  };
}

// Theme generator
function generateTheme(primary: string, kente: string) {
  return \`
@theme {
  --color-avs-primary: \${primary};
  --color-avs-kente: \${kente};
}\`;
}`} />
              </div>
            </div>
          </section>

          {/* Customization */}
          <section id="customization">
            <h2 className="text-2xl font-semibold text-avs-primary mb-4">{t('customization.title')}</h2>
            <p className="text-avs-accent/80 mb-6">{t('customization.description')}</p>

            <CodeBlock id="tokens-customization" lang="css" code={`@import '@buni/tokens';

@theme {
  /* Brand colors */
  --color-avs-primary: #1A5C4A;
  --color-avs-secondary: #F0F7F4;
  --color-avs-kente: #D4A017;
  --color-avs-ndop: #2D5A3D;

  /* Custom fonts */
  --font-display: 'Your Serif', Georgia, serif;
  --font-body: 'Your Sans', system-ui, sans-serif;

  /* Custom shadows */
  --shadow-avs: 2px 2px 0px 0px #1A5C4A;
  --shadow-avs-md: 4px 4px 0px 0px #D4A017;
}`} />
          </section>
        </div>
      }
      toc={[
        { id: 'installation', level: 2, label: t('toc.installation') },
        { id: 'colors', level: 2, label: t('toc.colors') },
        { id: 'typography', level: 2, label: t('toc.typography') },
        { id: 'radius', level: 2, label: t('toc.radius') },
        { id: 'shadows', level: 2, label: t('toc.shadows') },
        { id: 'js-api', level: 2, label: t('toc.js') },
        { id: 'customization', level: 2, label: t('toc.customization') },
      ]}
    />
  );
}