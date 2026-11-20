# BUNI

**L’ingénierie de l’héritage africain au service des standards visuels du monde numérique.**

BUNI est une institution technologique africaine qui développe des outils et des standards de design inspirés des savoirs visuels du continent. Son ambition : créer un pont entre les pratiques artistiques et artisanales africaines et les technologies numériques contemporaines.

L’Afrique ne doit pas seulement utiliser les standards numériques du monde. Elle doit aussi prendre part à leur définition.

## Notre vision

Les grands systèmes de design ont été façonnés par des histoires et des références multiples. BUNI défend la place des cultures africaines dans cette histoire : non comme une couche décorative ajoutée à des interfaces existantes, mais comme une source de principes, de méthodes et de langages visuels capables d’inspirer de nouveaux standards.

Cette démarche s’appuie sur une conviction simple : le patrimoine visuel africain contient des systèmes de conception. Géométrie, rythme, répétition, couleur, symbolisme, matière et organisation de l’espace peuvent nourrir directement le design numérique.

## De l’héritage au système

BUNI étudie les principes portés par les textiles, les symboles et les formes architecturales, puis cherche à les traduire en règles de conception utilisables :

| Référence | Principes explorés |
| --- | --- |
| **Ndop** | Géométrie, symétrie, rythme et organisation visuelle |
| **Kente** | Trames, répétitions, assemblage et systèmes chromatiques |
| **Adinkra** | Symbolisme, représentation et langage visuel |
| **Bogolan** | Texture, contraste, matière et composition |
| **Architecture africaine** | Formes, proportions, spatialité et adaptation au contexte |

Cette traduction peut prendre la forme de tokens, de composants, de motifs vectoriels, d’icônes, de documentation et de ressources pour les créateurs. Elle s’accompagne d’un travail de documentation et de contextualisation : un motif ne se réduit ni à une forme ni à une couleur ; son origine, ses usages et ses significations comptent.

## AVS — African Visual Standard

**African Visual Standard (AVS)** est le premier pilier concret de BUNI et le projet au cœur de ce dépôt. C’est un système de design numérique inspiré des traditions graphiques africaines, conçu pour aider designers et développeurs à créer des interfaces cohérentes, documentées et culturellement situées.

AVS rassemble notamment :

- une encyclopédie de motifs et de symboles documentés ;
- des palettes et des tokens de design ;
- des ressources graphiques destinées aux interfaces et aux produits numériques ;
- des outils, composants et références pour les équipes de création ;
- un espace de contribution pour enrichir et contextualiser le catalogue.

AVS s’inscrit dans la continuité des grands systèmes de design — comme Apple Human Interface Guidelines ou Material Design — tout en proposant une perspective africaine, ses références et sa propre philosophie visuelle.

**Découvrir AVS :** [buni.idem.africa](https://buni.idem.africa)

## Un écosystème en construction

Les projets BUNI sont pensés comme des contributions complémentaires à la création, à la transmission et à la valorisation des cultures visuelles africaines.

| Projet | Intention |
| --- | --- |
| **BUNI AVS** | Développer un standard de design numérique inspiré des systèmes graphiques africains |
| **BUNI Icons** | Concevoir un langage d’icônes ancré dans les réalités et les références africaines |
| **BUNI Artis** | Valoriser les créateurs, les artisans et leurs savoir-faire |
| **BUNI Event** | Organiser des conférences, expositions et ateliers |
| **BUNI Drop** | Explorer les collections et éditions limitées |
| **BUNI Mode** | Explorer les liens entre design, vêtement et identité |

Ces initiatives sont à des stades différents ; AVS est aujourd’hui le projet logiciel principal présenté ici.

## ADN visuel

L’identité de BUNI associe une approche éditoriale contemporaine à des références africaines documentées :

- **Noir carbone** — `#1D1D1B`
- **Ivoire minéral** — `#F5EBE0`
- **Terre cuite** — `#C0573E`

La direction artistique privilégie la clarté, la structure et la matière : minimalisme éditorial, géométries, répétitions, textures et symboles employés avec intention. L’objectif n’est pas d’appliquer un décor « africain », mais de faire émerger des principes visuels précis et réutilisables.

## Le dépôt

Ce dépôt est un monorepo **Nx** et **pnpm** qui regroupe les applications BUNI, les bibliothèques partagées et des services.

```text
apps/
  buni-avs/       Application web et documentation AVS
  buni-icon/      Application BUNI Icons
packages/
  analytics/      Mesure et statistiques
  api/            Client API partagé
  auth/           État et outils d’authentification
  component/      Composants partagés
  icons/          Bibliothèque d’icônes
  patterns/       Données et modèles de motifs
  theme/          Thèmes
  tokens/         Tokens de design
  ui/             Composants d’interface
  utils/          Utilitaires partagés
services/
  api-gateway/
  media-service/
  search-service/
```

L’application AVS utilise notamment **Next.js**, **React**, **TypeScript**, **Tailwind CSS**, **TanStack Query** et **Zustand**. Le dépôt comprend également d’autres packages partagés, dont `config`, `i18n`, `cli`, `icon-react` et `icons-data`.

## Développement

### Prérequis

- Node.js (version indiquée dans [`.nvmrc`](./.nvmrc), ou version LTS compatible)
- pnpm 10+

### Installer les dépendances

```bash
pnpm install
```

### Lancer BUNI AVS

```bash
pnpm dev:avs
```

### Lancer BUNI Icons

```bash
pnpm dev:icon
```

### Vérifier le typage d’AVS

```bash
pnpm --filter @buni/buni-avs typecheck
```

### Construire les icônes

```bash
pnpm icons:build
pnpm icons:lint
```

Nx peut aussi exécuter les tâches configurées par projet, par exemple `pnpm nx build buni-avs` ou `pnpm nx graph`.

## Contribuer

Les contributions qui améliorent le code, la documentation ou la qualité des ressources culturelles sont les bienvenues. Pour les motifs et symboles, privilégiez les informations contextualisées et sourcées, et respectez les droits, les communautés et les usages associés aux références documentées.

Avant de proposer une modification, lancez au minimum la vérification adaptée au périmètre touché. Pour l’application AVS, le contrôle de types est :

```bash
pnpm --filter @buni/buni-avs typecheck
```

## Nous suivre

- [GitHub — dépôt BUNI](https://github.com/TheK1ng237/buni)
- [LinkedIn — BUNI Africa](https://www.linkedin.com/company/buni-africa)
- [Instagram — @buni.africa](https://www.instagram.com/buni.africa)
- [BUNI AVS](https://buni.idem.africa)

## Licence

Le dépôt est distribué sous licence **Apache 2.0**. Consultez [`LICENSE`](./LICENSE) ainsi que les licences propres aux composants avant toute réutilisation ou redistribution.
