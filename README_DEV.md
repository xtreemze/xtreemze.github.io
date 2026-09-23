# Portfolio development

The production site is a static multi-page application built with Astro. It deliberately has no client UI framework or application router; Astro provides typed page composition, static routing, publication tooling and a path away from bespoke build transforms without adding client-side JavaScript to ordinary pages.

## Toolchain

- Node.js 24.21.0 LTS (`.node-version`)
- pnpm 12.3.4 (`packageManager`)
- Astro 7.3.3 on Vite 8 for static page generation
- TypeScript 6 through the compatibility package required by Astro language tooling while TypeScript 7 lacks the programmatic API Astro needs
- `@astrojs/sitemap` for generated publication sitemaps
- Biome 2.5.x for JavaScript/TypeScript/config formatting and linting
- Playwright 1.63 for Chromium, Firefox and WebKit certification
- axe-core through `@axe-core/playwright` for automated WCAG A/AA checks

Versions are exact in `package.json`, dependency resolution is committed in `pnpm-lock.yaml`, and CI installs with `--frozen-lockfile`. GitHub Actions are pinned to reviewed immutable commit SHAs with major-version comments for update tooling.

## Commands

```sh
npm install --global --allow-scripts=pnpm pnpm@12.3.4
pnpm install --frozen-lockfile
pnpm exec playwright install
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm check
```

`pnpm test` performs a production build first and then serves `dist/` through `astro preview`, so browser tests exercise the same generated artifact that Pages publishes.

## Astro migration architecture

The existing English HTML documents remain the authored body source during the migration stage, but project publication is now explicit and schema-validated. `src/content.config.ts` defines the Astro project collection and `src/content/projects/*.json` records the published slug, source document, portfolio tier, visibility and stack. Both English and localized project routes are generated from that typed collection rather than from whatever files happen to exist in `projects/`.

`src/lib/source-pages.ts` is therefore limited to the remaining compatibility responsibility: loading a registered source document, applying the existing locale data, enforcing shared accessibility invariants and rendering the result through `SourceDocument.astro`. `scripts/verify-source.mjs` rejects drift between the typed registry and legacy project documents.

This bridge is intentionally shrinking. The next migration stage is to move repeated page chrome and case-study structures into Astro components, then move localized project body content into the schema-validated content model until the legacy HTML transformation layer can be removed.

Do not add new cross-page behavior to the legacy HTML transformation layer. New reusable presentation behavior belongs in Astro components or shared CSS so the compatibility bridge can continue shrinking.

## Build invariants

The Astro source-page bridge preserves these cross-page publication invariants:

- a first-tab `Skip to content` link;
- a stable `main#main` target;
- a `color-scheme` declaration;
- locale-specific canonical and `hreflang` metadata;
- language navigation generated from the existing translation data.

Canonical hand-authored CSS and identity assets remain in `public/` and are copied byte-for-byte. Astro generates the sitemap, while `public/.nojekyll` and `public/robots.txt` define the GitHub Pages publication surface.

If `public/layout-grid.css` exists, the bridge loads it on every generated page. This keeps the responsive-grid design lane independent from the tooling migration.

## Portfolio identity

`public/favicon.ico` and `public/brand-mark.svg` are the canonical portfolio identifiers. The mark is a portfolio-level identity, not a project logo. Individual product marks remain scoped to their own case studies.

When changing identity assets, keep the favicon, README presentation and published site visually consistent and verify that no retired site/product naming is reintroduced into current source or documentation.

## Certification

The Playwright suite checks every route for bypass navigation and axe WCAG A/AA violations, compact navigation reachability/touch sizing, representative 320/390/768/1024/1440 layouts, keyboard-only navigation, reduced motion and forced-colors behavior. Chromium certification runs also capture full-page screenshots into the Playwright report.

`astro check` runs before browser certification so route/component/type errors fail earlier than the end-to-end suite.

Automated results are necessary but not sufficient for an unconditional accessibility-conformance claim. Manual screen-reader, true 200% browser-zoom and final visual/focus-obscuration review remain release-level evidence steps.

## Deployment

`.github/workflows/site.yml` is the canonical Pages path. Pull requests run the complete verification lane. Pushes to `master` deploy `dist/` only after that same verification job succeeds. GitHub Pages should therefore be configured to use **GitHub Actions** as its deployment source.
