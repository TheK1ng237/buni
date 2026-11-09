# BUNI ICON — L'Iconify de l'Afrique

> **« Chaque icône a une histoire. »**  
> Bibliothèque et catalogue d'icônes SVG ancrées dans les cultures, l'artisanat, la vie quotidienne et les technologies locales du continent africain. Conçu comme une extension naturelle et indissociable de [`buni-avs`](https://buni.idem.africa).

---

## Les Quatre Lois de BUNI

1. **Maxi-Minimalisme Fractal** : Peu d'éléments, chacun très travaillé. Le trait épuré porte des siècles de transmission.
2. **Pixel Habité** : Aucun pixel gratuit. Chaque courbe, chaque évidement a une raison matérielle ou symbolique.
3. **Couleur Souveraine** : Pigments naturels africains (terre cuite de poterie `#C0573E`, lin naturel `#F5EBE0`, obsidienne `#1D1D1B`, or Kente `#D4A017`, vert Ndop `#4A6741`, bleu bogolan `#2A4A6B`).
4. **Le Code comme Acte de Libération** : Copier-coller en un clic (SVG, React JSX, Iconify, JSON, PNG) sans dépendances opaques.

---

## Intégration des Motifs Textiles Authentiques

L'application s'appuie directement sur le package `@buni/patterns` (`PATTERN_CATALOG`) pour relier chaque icône à son héritage textile :
- **Kente Royale & Kente Étoile** (Akan / Ghana)
- **Ndop Sultan & Ndop Cérémoniel** (Bamiléké / Cameroun)
- **Bogolan Fanga & Bogolan Terre** (Bambara / Mali)
- **Adinkra Sankofa** (Akan / Ghana)
- **Wax Dakar & Wax Lagos** (Sénégal & Nigéria)
- **Kuba Kasai** (Kuba / RD Congo)
- **Ndebele Amabhaxa** (Afrique du Sud)
- **Berber Amazigh** (Afrique du Nord)

Chaque icône est associée à son motif d'origine dans `apps/buni-icon/src/lib/pattern-map.ts`, visible en filigrane dans les fiches, dans l'inspecteur interactif de la page d'accueil et sélectionnable en toile de fond dans la page de détail.

---

## Démarrage Rapide

### Prérequis
- Node.js >= 20
- pnpm >= 10.0.0

### Commandes depuis la racine du monorepo

```bash
# 1. Vérification et compilation des données d'icônes
pnpm icons:lint
pnpm icons:build

# 2. Lancer l'application buni-icon en mode dev
pnpm dev:icon

# 3. Compiler l'application pour la production
pnpm --filter @buni/buni-icon build
```

---

## Architecture du Projet

```
buni/
├── apps/
│   └── buni-icon/                   # Application Next.js (App Router)
│       ├── src/
│       │   ├── app/[locale]/        # Routing i18n (FR / EN)
│       │   │   ├── page.tsx         # Page d'accueil éditoriale
│       │   │   ├── icons/page.tsx   # Catalogue plein texte et filtres
│       │   │   └── icons/[slug]/    # Fiche icône détaillée et exports
│       │   ├── components/          # Composants UI, Layout et Catalogue
│       │   ├── lib/
│       │   │   └── pattern-map.ts   # Liaison icônes <-> motifs @buni/patterns
│       │   └── i18n/                # Configuration et dictionnaires next-intl
├── packages/
│   ├── icons-data/                  # Source de vérité des icônes
│   │   ├── src/svg/                 # Fichiers SVG sur grille 24x24
│   │   │   ├── objets-artisanat/
│   │   │   ├── vie-quotidienne/
│   │   │   ├── tech-locale/
│   │   │   └── symboles/            # Symboles ancestraux (Adinkra, etc.)
│   │   ├── src/meta/                # Fiches culturelles JSON (slug.json)
│   │   └── dist/
│   │       ├── icons.json           # Jeu au format standard Iconify
│   │       └── index.json           # Catalogue complet compilé
│   ├── icon-react/                  # Composant React <BuniIcon /> tree-shakable
│   └── patterns/                    # Motifs textiles panafricains vectoriels
```

---

## Comment ajouter une nouvelle icône

### Étape 1 : Dessiner le SVG
Placer le fichier SVG dans `packages/icons-data/src/svg/<famille>/<slug>.svg` :
- **Grille stricte** : `viewBox="0 0 24 24"`
- **Trait uniforme** : `stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"`
- **Zéro couleur en dur** : aucun code hexadécimal (`#...`) ou `rgb()`, utiliser exclusivement `currentColor` ou `none`.

### Étape 2 : Rédiger la fiche de métadonnées
Créer `packages/icons-data/src/meta/<slug>.json` :
```json
{
  "slug": "mon-icone",
  "nameFr": "Nom en français",
  "nameEn": "Name in English",
  "family": "objets-artisanat",
  "tags": ["artisanat", "tradition", "culture"],
  "country": "Sénégal",
  "countryCode": "SN",
  "people": "Wolof",
  "culturalNote": "Histoire, symbolique et contexte culturel de l'objet...",
  "recommendedUse": "Boutons d'action, navigation, profils...",
  "verifiedBy": "Institution ou gardien culturel agréé",
  "license": "CC BY 4.0"
}
```

> [!IMPORTANT]
> Pour toute icône de la famille `symboles`, les champs `culturalNote` (minimum 25 caractères) et `verifiedBy` sont **strictement obligatoires**. Sans eux, le linter échoue.

### Étape 3 : Lier le motif textile associé
Ajouter l'entrée correspondante dans `apps/buni-icon/src/lib/pattern-map.ts`.

### Étape 4 : Linter et compiler
```bash
pnpm icons:lint
pnpm icons:build
```

---

## Publication du jeu Iconify

Le script `pnpm icons:build` génère automatiquement `packages/icons-data/dist/icons.json` selon la spécification officielle **Iconify Collection JSON v2** :
- `prefix`: `"buni"`
- `icons`: dictionnaire des corps SVG optimisés (`body`, `width: 24`, `height: 24`)
- `categories`: classification par famille
- `info`: auteur, licence CC BY 4.0, total d'icônes

### Utilisation dans un projet externe
```bash
npm install @buni/icon-react @buni/icons-data
```

```tsx
import { BuniIcon } from '@buni/icon-react';

export function MonComposant() {
  return <BuniIcon name="sankofa" size={24} className="text-[#C0573E]" />;
}
```

Ou via Iconify :
```tsx
import { Icon } from '@iconify/react';
<Icon icon="buni:calebasse" />
```

---

## Rapport de Direction Artistique (alignement buni-avs)

L'application `buni-icon` a été développée en cohérence stricte avec `buni-avs` :
- **Design Tokens** : Réutilisation directe du package `@buni/tokens` et du preset Tailwind `@buni/config`.
- **Pigments souverains** :
  - Terracotta (Primary) : `#C0573E`
  - Lin naturel (Secondary) : `#F5EBE0`
  - Obsidienne (Accent) : `#1D1D1B`
  - Or Kente : `#D4A017`
  - Vert Ndop : `#4A6741`
  - Bleu Bogolan : `#2A4A6B`
- **Motifs textiles** : Utilisation des motifs CSS du package `@buni/patterns` comme toiles et textures de fond (Kente, Ndop, Bogolan, Adinkra, Kuba, Wax).
- **Typographie** : `BuniDisplay-Regular.otf` en display, `DM Sans` pour le corps, `JetBrains Mono` pour les codes et métadonnées.
- **Ombres** : Ombres dures franches (`shadow-avs` 3px 3px 0 `#1D1D1B`, `shadow-avs-md` 5px 5px 0 `#C0573E`).

---

## Licence
- **Icônes SVG** : [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/)
- **Code source** : Apache License 2.0.
