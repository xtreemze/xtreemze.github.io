# Portfolio development

The production site is a static multi-page application. It deliberately has no client framework or router; build tooling exists to enforce accessibility, validate the full navigation surface, optimize the HTML build, and deploy one verified artifact.

## Toolchain

- Node.js 24.21.0 LTS (`.node-version`)
- pnpm 12.3.4 (`packageManager`)
- Vite 8.2.2, using Rolldown, for local development and multi-page production builds
- Biome 2.5.x for JavaScript/config formatting and linting
- Playwright 1.63 for Chromium, Firefox and WebKit certification
- axe-core through `@axe-core/playwright` for automated WCAG A/AA checks

Versions are intentionally exact in `package.json`; update them through a reviewed dependency change rather than using floating ranges.

## Commands

```sh
npm install --global pnpm@12.3.4
pnpm install --no-frozen-lockfile
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

Canonical hand-authored CSS and the favicon live in `public/`. They are intentionally copied byte-for-byte rather than bundled so cascade order remains an explicit property of the HTML documents. The build also emits `.nojekyll`, `robots.txt`, and `sitemap.xml`.

Do not add page-specific scripts to work around a shared layout/accessibility issue; change the shared build invariant or shared CSS instead.

## Certification

The Playwright suite checks every route for bypass navigation and axe WCAG A/AA violations, compact navigation reachability/touch sizing, representative 320/390/768/1024/1440 layouts, keyboard-only navigation, reduced motion and forced-colors behavior. Chromium certification runs also capture full-page screenshots into the Playwright report.

Automated results are necessary but not sufficient for an unconditional accessibility-conformance claim. Manual screen-reader, 200% browser-zoom and visual review remains a release-level evidence step.

## Deployment

`.github/workflows/site.yml` is the canonical Pages path. Pull requests run the complete verification lane. Pushes to `master` deploy `dist/` only after that same verification job succeeds. GitHub Pages should therefore be configured to use **GitHub Actions** as its deployment source.

The old Vue/SkillsCV `css/` and `js/` bundles were intentionally removed because the current site no longer references them.
