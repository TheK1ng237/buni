# @buni/icons-data

> Source de vérité vectorielle et culturelle pour les icônes africaines BUNI.

## Structure
- `src/svg/` : 30 icônes SVG sur grille 24x24 sans couleur en dur
- `src/meta/` : Métadonnées culturelles validées au format JSON
- `dist/icons.json` : Format officiel Iconify (`prefix: "buni"`)
- `dist/index.json` : Index complet du catalogue

## Scripts
- `npm run lint` : Vérifie la conformité (grille 24x24, pas de couleur en dur, validation des métadonnées et fiches culturelles).
- `npm run build` : Compile les SVG et génère le catalogue et les formats Iconify.
