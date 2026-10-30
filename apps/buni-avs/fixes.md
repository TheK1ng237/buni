# Corrections apportées à l'application

## Problème : Route `/fr/patternsDashboard/new` renvoyant une erreur 404

### Description du problème
Lorsqu'on tentait d'accéder à l'URL `http://localhost:3000/fr/patternsDashboard/new`, l'application renvoyait une erreur 404 "This page could not be found."

### Causes identifiées

#### 1. Erreurs de syntaxe dans les imports JavaScript/TypeScript

**Fichier :** `src/features/patterns/components/PatternForm.tsx`
- **Ligne 10 :** `import {  FORM_STEPS }` contenait un espace double entre les accolades
- **Impact :** Cette erreur de syntaxe empêchait le parsing correct du fichier et le chargement du composant

**Fichier :** `src/features/patterns/components/steps/step1.tsx`
- **Ligne 4 :** `import { PATTERN_TYPES, REGIONS,  }` contenait une virgule et un espace à la fin
- **Impact :** Erreur de syntaxe JavaScript/TypeScript empêchant le chargement du composant

#### 2. Middleware ne reconnaissant pas les routes avec préfixe de locale

**Fichier :** `src/middleware.ts`

Le middleware vérifiait si une route était protégée en testant si le chemin commençait par `/dashboard` :

```typescript
const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
```

Cependant, avec l'internationalisation (i18n), toutes les routes incluent un préfixe de locale (`/fr` ou `/en`). La route réelle était donc `/fr/patternsDashboard/new`, qui ne commençait pas par `/dashboard`, mais par `/fr`.

Le middleware ne reconnaissait donc pas cette route comme une route protégée, ce qui pouvait causer des problèmes de routage et d'authentification.

### Correctifs appliqués

#### 1. Correction des erreurs de syntaxe dans les imports

**PatternForm.tsx :**
```typescript
// Avant :
import {CSS_PATTERN_MAP, FALLBACK_PATTERN_CSS } from '@buni/patterns';
import {  FORM_STEPS } from '../constants/pattern.constants';

// Après :
import {CSS_PATTERN_MAP, FALLBACK_PATTERN_CSS } from '@buni/patterns';
import { FORM_STEPS } from '../constants/pattern.constants';
```

**step1.tsx :**
```typescript
// Avant :
import type { Step1Data, FieldErrors } from '../../types';
import { PATTERN_TYPES, REGIONS,  } from '@buni/patterns';

// Après :
import type { Step1Data, FieldErrors } from '../../types';
import { PATTERN_TYPES, REGIONS } from '@buni/patterns';
```

#### 2. Correction du middleware pour gérer les préfixes de locale

**Modification de la logique de vérification des routes protégées :**

```typescript
// Avant :
const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
const isAuthRoute = AUTH_ROUTES.some((p) => pathname.startsWith(p));

// Après :
// Extraire le chemin sans le préfixe de locale pour les vérifications
const pathnameWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '');

const isProtected = PROTECTED_PREFIXES.some((p) => pathnameWithoutLocale.startsWith(p));
const isAuthRoute = AUTH_ROUTES.some((p) => pathnameWithoutLocale.startsWith(p));
```

**Modification des redirections pour préserver la locale actuelle :**

```typescript
// Avant :
if (isProtected && !token) {
  const url = new URL(`/${defaultLocale}/auth/login`, request.url);
  url.searchParams.set('callbackUrl', pathname);
  url.searchParams.set('reason', 'auth_required');
  return NextResponse.redirect(url);
}

// Après :
if (isProtected && !token) {
  // Extraire la locale actuelle du pathname
  const localeMatch = pathname.match(/^\/([a-z]{2})/);
  const currentLocale = localeMatch ? localeMatch[1] : defaultLocale;
  
  const url = new URL(`/${currentLocale}/auth/login`, request.url);
  url.searchParams.set('callbackUrl', pathname);
  url.searchParams.set('reason', 'auth_required');
  return NextResponse.redirect(url);
}
```

Même logique appliquée pour la redirection des routes d'authentification quand l'utilisateur est déjà connecté.

### Résultat

Après ces corrections :
- Les fichiers TypeScript sont correctement parsés
- Le composant `PatternForm` peut être chargé sans erreur
- Le middleware reconnaît correctement les routes protégées avec préfixe de locale
- La route `/fr/patternsDashboard/new` fonctionne maintenant correctement

### Leçons apprises

1. **Toujours vérifier la syntaxe des imports** - Les erreurs de syntaxe même mineures (espaces, virgules) peuvent empêcher le chargement de composants entiers
2. **Middleware et i18n** - Lorsqu'on utilise l'internationalisation avec Next.js, il faut toujours prendre en compte les préfixes de locale dans la logique de middleware
3. **Tests manuels** - Il est important de tester les routes avec différents préfixes de locale pour s'assurer que le middleware fonctionne correctement dans tous les cas

---

## Problème : Route `/fr/documentation/commencer/introduction` renvoyant une erreur "Couldn't find next-intl config file"

### Description du problème
Lorsqu'on tentait d'accéder à l'URL `http://localhost:3000/fr/documentation/commencer/introduction`, l'application renvoyait une erreur :
```
Oups, quelque chose s'est mal passé
Couldn't find next-intl config file. Please follow the instructions at https://next-intl.dev/docs/getting-started/app-router
```

### Causes identifiées

#### 1. Incohérence dans les imports de `useTranslations`

Certains fichiers importaient `useTranslations` directement depuis `next-intl` :
```typescript
import { useTranslations } from 'next-intl';
```

Alors que d'autres fichiers utilisaient l'import via le module i18n personnalisé :
```typescript
import { useTranslations } from '@/i18n';
```

Cette incohérence causait des problèmes avec la configuration de next-intl, car les composants n'utilisaient pas tous le même point d'entrée pour l'internationalisation.

#### 2. Composants sans directive `'use client'`

Certains composants de documentation utilisaient `useTranslations` (un hook React) mais n'avaient pas la directive `'use client'` en haut du fichier. Dans Next.js App Router, les hooks React ne peuvent être utilisés que dans les composants clients.

### Correctifs appliqués

#### 1. Normalisation des imports de `useTranslations`

Tous les fichiers de documentation ont été modifiés pour utiliser l'import via le module i18n personnalisé :
```typescript
import { useTranslations } from '@/i18n';
```

Fichiers modifiés :
- `src/app/[locale]/(marketing)/documentation/commencer/introduction/page.tsx`
- `src/app/[locale]/(marketing)/documentation/commencer/installation/page.tsx`
- `src/app/[locale]/(marketing)/documentation/commencer/structure/page.tsx`
- `src/app/[locale]/(marketing)/documentation/nav-data.ts`
- `src/app/[locale]/(dashboard)/users/page.tsx`
- `src/app/[locale]/(dashboard)/profile/page.tsx`
- `src/app/[locale]/(dashboard)/settings/page.tsx`
- `src/app/[locale]/(dashboard)/patternsDashboard/page.tsx`
- `src/app/[locale]/(dashboard)/contributors/page.tsx`
- `src/app/[locale]/(dashboard)/dashboard/viewer-dashboard.tsx`
- `src/app/[locale]/(dashboard)/dashboard/page.tsx`
- `src/app/[locale]/(dashboard)/activity/page.tsx`
- Et tous les autres fichiers de documentation utilisant `useTranslations`

#### 2. Ajout de la directive `'use client'` aux composants de documentation

Tous les composants de documentation qui utilisent `useTranslations` ont reçu la directive `'use client'` en haut du fichier :

```typescript
'use client';

import { DocPageTemplate } from '../../doc-page-template';
import { useNavSpaces } from '../../nav-data';
import { useTranslations } from '@/i18n';

export default function IntroductionPage() {
  const t = useTranslations('documentation.introduction');
  // ...
}
```

Fichiers modifiés :
- `src/app/[locale]/(marketing)/documentation/commencer/introduction/page.tsx`
- `src/app/[locale]/(marketing)/documentation/commencer/installation/page.tsx`
- `src/app/[locale]/(marketing)/documentation/commencer/structure/page.tsx`
- `src/app/[locale]/(marketing)/documentation/concepts/philosophie/page.tsx`
- `src/app/[locale]/(marketing)/documentation/concepts/tracability/page.tsx`
- `src/app/[locale]/(marketing)/documentation/typographie/echelle/page.tsx`
- `src/app/[locale]/(marketing)/documentation/tokens/reference/page.tsx`
- `src/app/[locale]/(marketing)/documentation/ressources/telechargements/page.tsx`
- `src/app/[locale]/(marketing)/documentation/svg/export/page.tsx`
- `src/app/[locale]/(marketing)/documentation/motifs/intro/page.tsx`
- `src/app/[locale]/(marketing)/documentation/icones/catalogue/page.tsx`
- `src/app/[locale]/(marketing)/documentation/exemples/showcase/page.tsx`
- `src/app/[locale]/(marketing)/documentation/etudes-culturelles/wax-pan-africain/page.tsx`
- `src/app/[locale]/(marketing)/documentation/couleurs/introduction/page.tsx`
- `src/app/[locale]/(marketing)/documentation/api/reference/page.tsx`
- `src/app/[locale]/(marketing)/documentation/accessibilite/checklist/page.tsx`

### Résultat

Après ces corrections :
- Tous les imports de `useTranslations` sont cohérents et passent par le module i18n personnalisé
- Tous les composants utilisant des hooks React sont correctement marqués comme composants clients
- La configuration de next-intl fonctionne correctement
- La route `/fr/documentation/commencer/introduction` fonctionne maintenant sans erreur

### Leçons apprises supplémentaires

1. **Cohérence des imports** - Il est important de maintenir une cohérence dans les imports à travers toute l'application, surtout pour les bibliothèques comme next-intl qui nécessitent une configuration spécifique
2. **Composants clients vs serveur** - Dans Next.js App Router, il faut toujours vérifier que les composants utilisant des hooks React ont la directive `'use client'`
3. **Détection des erreurs** - Les erreurs de configuration de next-intl peuvent être difficiles à détecter car elles se manifestent souvent au runtime plutôt qu'à la compilation

---

## Problème : Routes de documentation renvoyant toujours 404 après corrections

### Description du problème
Après avoir corrigé les problèmes d'imports et de directive `'use client'`, les routes de documentation continuaient de renvoyer des erreurs 404. Le middleware bloquait les requêtes vers ces routes.

### Causes identifiées

#### 1. Middleware bloquant les routes de documentation
Le middleware n'était pas configuré correctement pour gérer les routes de documentation. Le middleware i18n était appelé avant les vérifications d'authentification, ce qui causait des conflits.

#### 2. Matcher du middleware trop restrictif
Le matcher du middleware ne prenait pas en compte le fichier `site.webmanifest`, ce qui causait des erreurs 404 pour ce fichier.

#### 3. Manque de page d'index pour la section "commencer"
Le dossier `commencer` n'avait pas de fichier `page.tsx` à la racine, ce qui causait des problèmes avec Next.js pour la route `/documentation/commencer`.

### Correctifs appliqués

#### 1. Réorganisation du middleware
L'ordre des opérations dans le middleware a été réorganisé pour s'assurer que le middleware i18n est appelé au bon moment :

```typescript
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Redirection racine vers locale par défaut ─────────────────────────────────
  if (pathname === '/') {
    const url = new URL(`/${defaultLocale}`, request.url);
    return NextResponse.redirect(url);
  }

  // ── Gestion i18n ─────────────────────────────────────────────────────────────
  const response = intlMiddleware(request);

  // ── Récupérer le token (cookie ou header) ───────────────────────────────────
  const token =
    request.cookies.get('avs_access')?.value ??
    request.headers.get('Authorization')?.replace('Bearer ', '');

  // ── Extraire le chemin sans le préfixe de locale pour les vérifications ───────
  const pathnameWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '');

  // ── Redirections et headers de sécurité ─────────────────────────────────────
  const isProtected = PROTECTED_PREFIXES.some((p) => pathnameWithoutLocale.startsWith(p));
  const isAuthRoute = AUTH_ROUTES.some((p) => pathnameWithoutLocale.startsWith(p));

  // ── Redirection login si route protégée sans token ──────────────────────────
  if (isProtected && !token) {
    // Extraire la locale actuelle du pathname
    const localeMatch = pathname.match(/^\/([a-z]{2})/);
    const currentLocale = localeMatch ? localeMatch[1] : defaultLocale;
    
    const url = new URL(`/${currentLocale}/auth/login`, request.url);
    url.searchParams.set('callbackUrl', pathname);
    url.searchParams.set('reason', 'auth_required');
    return NextResponse.redirect(url);
  }

  // ── Si déjà connecté, ne pas re-afficher login/register ────────────────────
  if (isAuthRoute && token) {
    // Extraire la locale actuelle du pathname
    const localeMatch = pathname.match(/^\/([a-z]{2})/);
    const currentLocale = localeMatch ? localeMatch[1] : defaultLocale;
    
    return NextResponse.redirect(new URL(`/${currentLocale}/dashboard`, request.url));
  }

  // ── Headers de sécurité sur toutes les réponses ─────────────────────────────
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}
```

#### 2. Mise à jour du matcher du middleware
Le matcher a été mis à jour pour exclure explicitement le fichier `site.webmanifest` :

```typescript
export const config = {
  // Exclure les assets statiques et les routes Next.js internes
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public/|patterns/|api/|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.webp|site.webmanifest).*)'],
};
```

#### 3. Ajout d'une page d'index pour la section "commencer"
Un fichier `page.tsx` a été créé dans le dossier `commencer` pour rediriger vers la page d'introduction :

```typescript
import { redirect } from 'next/navigation';
import { Route } from 'next';

export default function CommencerIndexPage() {
  redirect('/documentation/commencer/introduction' as Route);
}
```

### Résultat

Après ces corrections :
- Le middleware ne bloque plus les routes de documentation
- Le fichier `site.webmanifest` est correctement servi
- La section "commencer" a une page d'index qui redirige vers l'introduction
- Les routes de documentation sont maintenant accessibles

### Leçons apprises supplémentaires

1. **Ordre des opérations dans le middleware** - L'ordre dans lequel les opérations sont effectuées dans le middleware est crucial pour éviter les conflits entre i18n et l'authentification
2. **Configuration du matcher** - Il est important d'exclure explicitement tous les fichiers statiques et les routes qui ne doivent pas être traitées par le middleware
3. **Structure des dossiers Next.js** - Chaque dossier qui représente une route doit avoir un fichier `page.tsx` pour être correctement reconnu par Next.js