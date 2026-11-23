'use client';

import { DocPageTemplate } from '../doc-page-template';
import { useNavSpaces } from '../nav-data';
import { useTranslations } from '@/i18n';
import {
  Button, Card, CardHeader, CardContent, CardFooter, AvsAvatar as Avatar,
  Input, Textarea, Badge, cn, Dialog, DialogTrigger, DialogContent, DialogHeader,
  DialogTitle, DialogDescription, DialogBody, DialogFooter,
} from '@buni/ui';

export default function ComponentsPage() {
  const t = useTranslations('documentation.composants');
  const NAV_SPACES = useNavSpaces();
  const space = NAV_SPACES.find(s => s.slug === 'composants')!;

  // Auto-discovered component list (in real app, this would come from the package)
  const components = [
    {
      id: 'button',
      name: 'Button',
      description: t('button.description'),
      variants: ['primary', 'secondary', 'ghost', 'outline', 'danger', 'kente', 'link', 'muted'],
      sizes: ['xs', 'sm', 'md', 'lg', 'xl', 'icon'],
      example: <ButtonShowcase />,
      code: '',
    },
    {
      id: 'card',
      name: 'Card',
      description: t('card.description'),
      subComponents: ['CardHeader', 'CardContent', 'CardFooter'],
      example: <CardShowcase />,
      code: '',
    },
    {
      id: 'avatar',
      name: 'Avatar',
      description: t('avatar.description'),
      example: <AvatarShowcase />,
      code: '',
    },
    {
      id: 'input',
      name: 'Input & Textarea',
      description: t('input.description'),
      subComponents: ['Input', 'Textarea'],
      example: <InputShowcase />,
      code: '',
    },
    {
      id: 'badge',
      name: 'Badge',
      description: t('badge.description'),
      variants: ['default', 'secondary', 'destructive', 'outline', 'kente'],
      example: <BadgeShowcase />,
      code: '',
    },
    {
      id: 'dialog',
      name: 'Dialog',
      description: t('dialog.description'),
      subComponents: ['DialogTrigger', 'DialogContent', 'DialogHeader', 'DialogTitle', 'DialogDescription', 'DialogBody', 'DialogFooter', 'DialogClose'],
      example: <DialogShowcase />,
      code: '',
    },
  ];

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
            <pre className="bg-avs-accent/5 p-4 rounded-avs overflow-x-auto"><code>{`// Installation
pnpm add @buni/ui

# Peer dependencies (required)
pnpm add react react-dom tailwindcss class-variance-authority clsx tailwind-merge lucide-react \\
  @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-dropdown-menu \\
  @radix-ui/react-select @radix-ui/react-tabs @radix-ui/react-tooltip \\
  @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-avatar \\
  @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-popover \\
  @radix-ui/react-scroll-area @radix-ui/react-separator @radix-ui/react-switch \\
  @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-progress \\
  @radix-ui/react-label

// CSS Import
@import '@buni/ui';
@import '@buni/tokens'; // Required

// Tailwind v4 Config
@import 'tailwindcss';
@import '@buni/tokens';
@import '@buni/ui';

@theme {
  --color-avs-primary: #YOUR_BRAND_COLOR;
}`}</code></pre>
          </section>

          {/* Quick Start */}
          <section id="quickstart">
            <h2 className="text-2xl font-semibold text-avs-primary mb-4">{t('quickstart.title')}</h2>
            <p className="text-avs-accent/80 mb-6">{t('quickstart.description')}</p>

            <pre className="bg-avs-accent/5 p-4 rounded-avs overflow-x-auto"><code>{`// SHORT IMPORTS (recommended)
import { Button, Card, CardHeader, CardContent, CardFooter, Avatar } from '@buni/ui';

function Dashboard() {
  return (
    <Card className="w-80">
      <CardHeader>
        <Avatar name="AVS" className="h-12 w-12 bg-avs-kente" />
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
}`}</code></pre>

            <div className="mt-6 p-4 surface-primary border-primary border rounded-avs">
              <Card className="w-full max-w-xs">
                <CardHeader>
                  <Avatar name="AVS" className="h-12 w-12 bg-avs-kente" />
                  <h3 className="text-avs-primary">Welcome</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-avs-accent/60">Build beautiful African-inspired interfaces.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="kente" size="lg">Get Started</Button>
                </CardFooter>
              </Card>
            </div>
          </section>

          {/* Components Grid */}
          <section id="components">
            <h2 className="text-2xl font-semibold text-avs-primary mb-4">{t('components.title')}</h2>
            <p className="text-avs-accent/80 mb-6">{t('components.description')}</p>

            <div className="space-y-8">
              {components.map((component) => (
                <section key={component.id} id={component.id} className="space-y-4">
                  <div className="flex items-center gap-4">
                    <h3 className="text-xl font-semibold text-avs-primary">{component.name}</h3>
                    <span className="text-sm bg-avs-secondary text-avs-accent px-3 py-1 rounded-full">{component.id}</span>
                  </div>
                  <p className="text-avs-accent/70">{component.description}</p>

                  {/* Variants/Sub-components */}
                  {(component.variants || component.subComponents) && (
                    <div className="flex flex-wrap gap-2">
                      {(component.variants || component.subComponents).map((v) => (
                        <code key={v} className="text-xs bg-avs-secondary text-avs-accent px-2 py-1 rounded">
                          {v}
                        </code>
                      ))}
                    </div>
                  )}

                  {/* Sizes */}
                  {component.sizes && (
                    <div className="flex flex-wrap gap-2">
                      {component.sizes.map((s) => (
                        <code key={s} className="text-xs bg-avs-kente/10 text-avs-kente px-2 py-1 rounded">
                          size={s}
                        </code>
                      ))}
                    </div>
                  )}

                  {/* Live Example */}
                  <div className="surface-primary border-primary border rounded-avs p-4">
                    {component.example}
                  </div>

                  {/* Code */}
                  <details className="group">
                    <summary className="text-sm text-avs-kete hover:text-avs-primary cursor-pointer flex items-center gap-1">
                      <span>{t('showCode')}</span>
                      <svg className="w-3 h-3 transition-transform group-open:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </summary>
                    <pre className="bg-avs-accent/5 p-4 rounded-avs text-sm overflow-x-auto mt-2"><code>{component.code}</code></pre>
                  </details>
                </section>
              ))}
            </div>
          </section>

          {/* All Components Reference */}
          <section id="reference">
            <h2 className="text-2xl font-semibold text-avs-primary mb-4">{t('reference.title')}</h2>
            <p className="text-avs-accent/80 mb-6">{t('reference.description')}</p>

            <div className="overflow-x-auto">
              <table className="w-full surface-primary border-primary border rounded-avs">
                <thead>
                  <tr className="border-b border-primary">
                    <th className="p-4 text-left font-semibold text-avs-primary">{t('reference.component')}</th>
                    <th className="p-4 text-left font-semibold text-avs-primary">{t('reference.import')}</th>
                    <th className="p-4 text-left font-semibold text-avs-primary">{t('reference.descriptionColumn')}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Button', import: 'Button, buttonVariants', desc: 'Multi-variant button' },
                    { name: 'Badge', import: 'Badge, badgeVariants', desc: 'Status badges' },
                    { name: 'Input', import: 'Input, Textarea', desc: 'Form inputs' },
                    { name: 'Card', import: 'Card, CardHeader, CardContent, CardFooter', desc: 'Content containers' },
                    { name: 'Avatar', import: 'Avatar', desc: 'User avatars' },
                    { name: 'Loader', import: 'Spinner, Skeleton, LoadingPage', desc: 'Loading states' },
                    { name: 'Toggle', import: 'Toggle', desc: 'Toggle switches' },
                    { name: 'Separator', import: 'Separator', desc: 'Visual dividers' },
                    { name: 'Progress', import: 'Progress', desc: 'Progress bars' },
                    { name: 'Checkbox', import: 'Checkbox', desc: 'Checkbox inputs' },
                    { name: 'Alert', import: 'Alert', desc: 'Alert messages' },
                    { name: 'Dialog', import: 'Dialog, DialogTrigger, DialogContent, ...', desc: 'Modal dialogs' },
                    { name: 'Toast', import: 'ToastProvider, useToast', desc: 'Toast notifications' },
                    { name: 'Tabs', import: 'Tabs, TabsList, TabsTrigger, TabsContent', desc: 'Tab navigation' },
                    { name: 'Accordion', import: 'Accordion, AccordionItem, AccordionTrigger, AccordionContent', desc: 'Collapsible sections' },
                    { name: 'Tooltip', import: 'TooltipProvider, Tooltip, TooltipTrigger, TooltipContent', desc: 'Tooltips' },
                    { name: 'Select', import: 'Select, SelectTrigger, SelectContent, SelectItem, ...', desc: 'Select dropdowns' },
                    { name: 'DropdownMenu', import: 'DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, ...', desc: 'Context menus' },
                    { name: 'ScrollArea', import: 'ScrollArea, ScrollBar', desc: 'Custom scrollbars' },
                    { name: 'BuniLoader', import: 'BuniLoader', desc: 'Branded loader' },
                    { name: 'Comingsoon', import: 'Comingsoon', desc: 'Coming soon placeholder' },
                    { name: 'KpiCard', import: 'KpiCard, type KpiCardProps', desc: 'KPI metric cards' },
                    { name: 'cn', import: 'cn', desc: 'Utility: clsx + tailwind-merge' },
                  ].map((comp) => (
                    <tr key={comp.name} className="border-b border-primary/50">
                      <td className="p-4 font-mono text-sm text-avs-primary">{comp.name}</td>
                      <td className="p-4 font-mono text-xs text-avs-accent/70">{comp.import}</td>
                      <td className="p-4 text-sm text-avs-accent/70">{comp.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Auto-Discovery */}
          <section id="auto-discovery">
            <h2 className="text-2xl font-semibold text-avs-primary mb-4">{t('autodiscovery.title')}</h2>
            <p className="text-avs-accent/80 mb-6">{t('autodiscovery.description')}</p>

            <div className="space-y-4">
              <div className="surface-primary border-primary border rounded-avs p-4">
                <h3 className="font-semibold text-avs-primary mb-2">{t('autodiscovery.howItWorks')}</h3>
                <p className="text-avs-accent/70 text-sm mb-4">{t('autodiscovery.explanation')}</p>
                <pre className="bg-avs-accent/5 p-4 rounded-avs overflow-x-auto text-sm"><code>{`// 1. Create new component
// packages/ui/src/components/MyComponent.tsx
'use client';
import { cn } from '../utils';

export interface MyComponentProps {
  className?: string;
  variant?: 'default' | 'primary';
}

export const MyComponent = ({ className, variant = 'default', ...props }: MyComponentProps) => {
  return (
    <div
      className={cn('base-styles', variantStyles[variant], className)}
      {...props}
    />
  );
};

// 2. That's it! Auto-discovered on next build
// Available immediately via:
import { MyComponent } from '@buni/ui';
// or
import { MyComponent } from '@buni/ui/MyComponent';`}</code></pre>
              </div>

              <div className="surface-primary border-primary border rounded-avs p-4">
                <h3 className="font-semibold text-avs-primary mb-2">{t('autodiscovery.requirements')}</h3>
                <ul className="text-avs-accent/70 text-sm space-y-1 list-disc list-inside">
                  <li>{t('autodiscovery.req1')}</li>
                  <li>{t('autodiscovery.req2')}</li>
                  <li>{t('autodiscovery.req3')}</li>
                  <li>{t('autodiscovery.req4')}</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      }
      toc={[
        { id: 'installation', level: 2, label: t('toc.installation') },
        { id: 'quickstart', level: 2, label: t('toc.quickstart') },
        { id: 'components', level: 2, label: t('toc.components') },
        { id: 'reference', level: 2, label: t('toc.reference') },
        { id: 'auto-discovery', level: 2, label: t('toc.autodiscovery') },
      ]}
    />
  );
}

// ============================================================================
// Showcase Components
// ============================================================================

function ButtonShowcase() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="kente">Kente</Button>
      <Button variant="link">Link</Button>
      <Button variant="muted">Muted</Button>
    </div>
  );
}

function CardShowcase() {
  return (
    <Card className="w-72">
      <CardHeader>
        <Avatar name="AVS" className="h-10 w-10 bg-avs-kente" />
        <h3 className="text-avs-primary">Card Title</h3>
      </CardHeader>
      <CardContent>
        <p className="text-avs-accent/70 text-sm">Card content goes here with some description.</p>
      </CardContent>
      <CardFooter>
        <Button variant="kente" size="sm">Action</Button>
      </CardFooter>
    </Card>
  );
}

function AvatarShowcase() {
  return (
    <div className="flex items-center gap-4">
      <Avatar name="Awa S." className="h-16 w-16 bg-avs-primary" />
      <Avatar name="Buni Design" className="h-12 w-12 bg-avs-kente" />
      <Avatar name="Amadou" className="h-8 w-8 bg-avs-ndop" />
      <Avatar name="Mina" className="h-6 w-6 bg-avs-indigo" />
    </div>
  );
}

function InputShowcase() {
  return (
    <div className="flex flex-wrap gap-4 items-end">
      <div className="w-48">
        <label className="block text-xs font-medium text-avs-accent/70 mb-1">Email</label>
        <Input type="email" placeholder="email@buni.africa" />
      </div>
      <div className="w-48">
        <label className="block text-xs font-medium text-avs-accent/70 mb-1">Message</label>
        <Textarea className="h-20 w-full" placeholder="Your message..." />
      </div>
    </div>
  );
}

function BadgeShowcase() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="kente">Kente</Badge>
    </div>
  );
}

function DialogShowcase() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription>Are you sure you want to proceed?</DialogDescription>
          </DialogHeader>
          <DialogBody>
            <p className="text-avs-accent/70">This action cannot be undone. Please confirm.</p>
          </DialogBody>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => setOpen(false)}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Import React for hooks
import React from 'react';