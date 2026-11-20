# BUNI-ICON Core 60

Application et bibliothèque de 60 icônes SVG d’interface outline décrites dans la référence [BUNI-ICON Core 60](../../packages/icons-data/docs/core-60/README.md) : grille 24×24, `currentColor`, fond transparent et trait de référence 1.7.

## Utilisation

Depuis la racine du monorepo :

```bash
pnpm icons:lint
pnpm icons:build
pnpm dev:icon
pnpm --filter @buni/buni-icon build
```

Les 60 SVG utilisés par l’application et la bibliothèque sont maintenus dans `packages/icons-data/src/svg/interface/`, avec leurs métadonnées dans `packages/icons-data/src/meta/`. La référence Core 60 et ses aperçus sont dans `packages/icons-data/docs/core-60/`. Le script de build génère le catalogue, les données Iconify et les exports du composant React.

Les motifs textiles `@buni/patterns` restent intégrés à l’identité visuelle : filigrane et bordures des cartes, aperçu interactif de l’accueil, ainsi que motif et palette personnalisables dans chaque fiche. Les associations d’affichage sont définies dans `src/lib/pattern-map.ts`.

```tsx
import { BuniIcon } from '@buni/icon-react';

export function HomeButton() {
  return <BuniIcon name="home" size={24} className="text-[#C0573E]" />;
}
```

La couleur est héritée de `currentColor`. Les icônes `favorite` et `help` ont des références Akan signalées dans leur fiche ; le README Core 60 recommande une validation culturelle avant leur diffusion publique.

## Licence

- Icônes SVG : [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/)
- Code source : Apache License 2.0.
