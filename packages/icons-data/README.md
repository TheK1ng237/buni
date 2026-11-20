# @buni/icons-data

Source de données de BUNI-ICON Core 60.

## Structure

- `src/svg/interface/` : les 60 SVG Core 60, sur grille 24×24 et sans couleur codée en dur.
- `src/meta/` : noms, usages et références associés à chaque icône.
- `dist/icons.json` : collection Iconify au préfixe `buni`.
- `dist/index.json` : catalogue complet utilisé par l’application.

Le guide de conception complet et les aperçus de la collection Core 60 se trouvent dans [`docs/core-60/README.md`](docs/core-60/README.md). Le paquet compile et publie les 60 icônes présentes dans `src/svg/interface/`.

## Scripts

- `pnpm icons:lint` vérifie les SVG et leurs métadonnées.
- `pnpm icons:build` génère le catalogue, les données Iconify et les exports TypeScript.
