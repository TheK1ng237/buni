# Patterns data

The static catalog entries currently live in
`apps/buni-avs/src/app/[locale]/(marketing)/patterns/mock.ts`.

## Add a CSS pattern

1. Add the CSS rule to `packages/patterns/src/theme/patterns.css`.
2. Give it a short class name, such as `.kente`.
3. If it is a new variation of an existing type, add its short class to
   `PATTERN_CSS_CLASSES` in `packages/patterns/src/registry.ts`. For a new type,
   also add it to `PATTERN_TYPES` and `CSS_PATTERN_MAP`.
4. Add or update the catalog entry with that class:

```typescript
{
  type: 'kente',
  cssClass: 'kente',
}
```

The preview uses that class directly. For new catalog motifs whose views and
downloads should be counted, also add the catalog slug and its motif type to
`avs-backend/src/modules/culture/staticPatternRegistry.ts`.

## Add an uploaded SVG

Upload the SVG through the pattern form. The backend stores it and exposes its
URL as `svgUrl`; the same pattern download endpoint serves the SVG file.
Use `cssClass` only for allowlisted CSS previews; uploaded SVGs are served by
the backend and do not need a CSS class.

## Views and downloads

Do not hard-code engagement totals in the catalog data. Static pattern
statistics are read from the backend and start at zero until real views or
downloads are recorded.
