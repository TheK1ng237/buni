# Patterns data

`packages/patterns/src/catalog.ts` is the canonical catalog for motif IDs,
types, names, CSS preview classes, origins, and hero palette metadata. The
homepage hero, homepage gallery, SVG registry, and encyclopedia all derive
their motif identity and preview class from this catalog.

The canonical motif CSS lives in `packages/patterns/src/theme/patterns.css`.
The app imports that stylesheet from `src/app/globals.css`; do not maintain a
second app-local copy. The encyclopedia's `mock.ts` contains long-form
documentation only and overlays it onto the canonical catalog.

## Add a CSS pattern

1. Add the motif's CSS class to `packages/patterns/src/theme/patterns.css`.
2. Add the motif's metadata and full CSS preview class to
   `PATTERN_CATALOG` in `packages/patterns/src/catalog.ts`.
3. If it introduces a new type, add it to `PATTERN_TYPES` and
   `CSS_PATTERN_MAP` in `packages/patterns/src/registry.ts`.
4. Add its long-form research and documentation to the encyclopedia's
   `mock.ts` entry, keyed by the catalog ID.

```typescript
{
  id: 'kente-asante',
  type: 'kente',
  cssClass: 'avs-pattern-kente-royale',
}
```

The homepage and encyclopedia previews use the canonical CSS class. CSS motif
downloads are serialized from the browser's computed CSS so the downloaded SVG
uses the same appearance as the site. Add the catalog ID to the backend static registry in
`avs-backend/src/modules/culture/staticPatternRegistry.ts` so public views and
downloads can be counted and served by the API.

## Add an uploaded SVG

Upload the SVG through the pattern form. The backend stores it and exposes its
URL as `svgUrl`; the same pattern download endpoint serves the SVG file.
Use `cssClass` only for allowlisted CSS previews; uploaded SVGs are served by
the backend and do not need a CSS class.

## Views and downloads

Do not hard-code engagement totals in the catalog data. Static pattern
statistics are read from the backend and start at zero until real views or
downloads are recorded.
