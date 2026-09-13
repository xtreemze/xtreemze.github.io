# Portfolio UX / accessibility audit

Audit updated: 2026-09-13

## Status

**Automated browser certification: PASS**

The current portfolio is a static, multilingual, multi-page site with a verified GitHub Pages artifact. The release workflow exercises the same `dist/` output that is deployed.

This record does not claim unconditional WCAG conformance. Automated browser and axe results are strong release evidence, but manual screen-reader, true 200% browser-zoom and final focus-obscuration review remain human certification steps.

## Current evidence

The post-merge certification run for the multilingual portfolio covered 45 public routes: 15 English source pages plus complete Spanish and Swedish variants. Playwright ran 348 checks across Chromium, Firefox and WebKit; 316 passed and 32 were intentional project-specific skips. There were no failures.

The matrix verifies:

- semantic page structure and one stable `main#main` target per page;
- first-tab skip navigation on every route;
- localized language/navigation labels and locale-preserving case-study journeys;
- canonical URLs and `hreflang` alternatives;
- automated axe WCAG A/AA scans on all routes;
- compact navigation reachability and 44px-class targets;
- 320, 390, 768, 1024 and 1440px responsive overflow checks;
- reduced-motion behavior;
- forced-colors behavior in Chromium;
- production-build publication rather than source-only inspection.

## Architecture decisions

The portfolio intentionally remains a mostly static application. Modern browser features are progressive enhancements rather than correctness dependencies.

- **Cross-document View Transitions:** ordinary navigation remains authoritative when unsupported or motion is reduced.
- **Scroll-driven animation:** used only for optional reading-progress feedback.
- **`:has()` / `:target`:** visual state only; navigation semantics do not depend on them.
- **No client router:** static routes improve crawlability, resilience and locale publishing.
- **No mobile-menu script:** compact navigation remains directly available instead of hiding primary destinations behind state.
- **No icon framework requirement:** semantic text remains the accessible name and lightweight decorative cues do not create a runtime dependency.

## Localization certification

English is the authored structural source. Spanish and Swedish pages are generated at build time as real static HTML, not client-side translations. The source verifier requires complete localized metadata and keyed translation coverage, and browser tests confirm that navigation remains in the selected locale.

International publishing includes locale-specific canonical metadata, `hreflang=en`, `es`, `sv`, `x-default`, Open Graph locale metadata and sitemap coverage for every public route.

## Identity and presentation

The portfolio uses a dedicated personal identity layer above individual project brands. The canonical identity assets live in `public/` and are copied directly into the Pages artifact so favicon and mark publication do not depend on bundler asset ordering.

Project logos, screenshots and visual marks remain scoped to the project they represent. The portfolio identity must not imply ownership of third-party or upstream project branding.

## Remaining manual certification

Before making an unconditional accessibility-conformance claim, complete and record:

1. screen-reader traversal of the homepage, Experience page and representative long case studies;
2. true browser 200% zoom at representative desktop and mobile widths;
3. manual focus-order and focus-obscuration review with the sticky header;
4. manual text/graphics contrast spot-checks in rendered browsers;
5. pointer/touch review on at least one real narrow-screen device.

These are release-evidence tasks, not known blocking defects in the current automated matrix.
