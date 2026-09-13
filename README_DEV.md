# Portfolio development

The production site is a static multi-page application. It deliberately has no client framework or router; build tooling exists to enforce accessibility, validate the full navigation surface, optimize the HTML build, and deploy one verified artifact.

## Toolchain

- Node.js 24.21.0 LTS (`.node-version`)
- pnpm 12.3.4 (`packageManager`)
- Vite 8.2.2, using Rolldown, for local development and multi-page production builds
- Biome 2.5.x for JavaScript/config formatting and linting
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
pnpm test
pnpm check
```

`pnpm test` performs a production build first and then serves `dist/` through `vite preview`, so browser tests exercise the same generated artifact that Pages publishes.

## Build invariants

`vite.config.mjs` owns cross-page publication invariants. Every generated page receives:

- a first-tab `Skip to content` link;
- a stable `main#main` target;
- a `color-scheme` declaration.

Canonical hand-authored CSS and identity assets live in `public/`. They are intentionally copied byte-for-byte rather than bundled so cascade order and published branding remain explicit properties of the static artifact. The build also emits `.nojekyll`, `robots.txt`, and `sitemap.xml`.

Do not add page-specific scripts to work around a shared layout/accessibility issue; change the shared build invariant or shared CSS instead.

## Portfolio identity

`public/favicon.ico` and `public/brand-mark.svg` are the canonical portfolio identifiers. The mark is a portfolio-level identity, not a project logo. Individual product marks remain scoped to their own case studies.

When changing identity assets, keep the favicon, README presentation and published site visually consistent and verify that no retired site/product naming is reintroduced into current source or documentation.

## Certification

The Playwright suite checks every route for bypass navigation and axe WCAG A/AA violations, compact navigation reachability/touch sizing, representative 320/390/768/1024/1440 layouts, keyboard-only navigation, reduced motion and forced-colors behavior. Chromium certification runs also capture full-page screenshots into the Playwright report.

Automated results are necessary but not sufficient for an unconditional accessibility-conformance claim. Manual screen-reader, true 200% browser-zoom and final visual/focus-obscuration review remain release-level evidence steps.

## Deployment

`.github/workflows/site.yml` is the canonical Pages path. Pull requests run the complete verification lane. Pushes to `master` deploy `dist/` only after that same verification job succeeds. GitHub Pages should therefore be configured to use **GitHub Actions** as its deployment source.
