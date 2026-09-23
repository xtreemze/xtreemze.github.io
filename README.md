<div align="center">
  <img src="./public/brand-mark.svg" width="84" height="84" alt="Carlos Velasco portfolio mark">

# Carlos Velasco — Portfolio

**Interactive systems studio · Product · Engineering**

A multilingual boutique-studio portfolio for product architecture, interaction design and systems engineering, with active case studies across media, simulation, local-first information systems and programmable input.

[Live portfolio](https://xtreemze.github.io/) · [Español](https://xtreemze.github.io/es/) · [Svenska](https://xtreemze.github.io/sv/)

[![Site quality and Pages](https://github.com/xtreemze/xtreemze.github.io/actions/workflows/site.yml/badge.svg)](https://github.com/xtreemze/xtreemze.github.io/actions/workflows/site.yml)
</div>

## What this repository is

This repository is the source of the current studio portfolio and its project case studies. The site is deliberately static and multi-page: Astro generates the HTML publication surface, while native browser capabilities provide progressive interaction. Cross-document View Transitions, the Web Animations API and scroll-driven accents enhance navigation without making core content depend on JavaScript.

The portfolio is organized around the problems each product is trying to solve, what makes the product or interaction model unusual, and the engineering methods used to preserve those ideas in implementation. It is not a generated résumé or a framework showcase.

## Selected case studies

| Area | Projects | Focus |
| --- | --- | --- |
| Primary studies | [Timeline](https://xtreemze.github.io/projects/timeline.html), [Slipmat](https://xtreemze.github.io/projects/slipmat.html), [Defend](https://xtreemze.github.io/projects/defend.html), [Lemonade](https://xtreemze.github.io/projects/lemonade.html) | information modeling, media authority, behavioral-parity modernization, deterministic economic simulation |
| Active lab | [QMK / Vial / Halcyon](https://xtreemze.github.io/projects/qmk.html), [FireOne](https://xtreemze.github.io/projects/fireone.html), [Booking](https://xtreemze.github.io/projects/booking.html), [Investigation Workbench](https://xtreemze.github.io/projects/investigation-workbench.html) | embedded input, uncertainty-driven simulation, configurable domain modeling, provenance-aware knowledge systems |
| Supporting active work | [Inventory](https://xtreemze.github.io/projects/inventory.html) | local-first operational software and offline accountability |

Older Signal Broker work and the Kullaberg application family are no longer presented as current portfolio projects. Kullaberg remains documented in the professional-experience narrative where its historical context is accurate.

The [Experience](https://xtreemze.github.io/experience.html) page connects the project work to professional history across interactive design, public-service frontend development, planning tools and current product/systems engineering.

## Product and engineering approach

The common method is to make experimentation cheap, test ideas against real behavior, and only then encode proven behavior as durable product and engineering rules. Strict types, deterministic replay, accessibility tests, CI, performance evidence and explicit state ownership are used to protect exploration rather than replace it.

The result is intentionally cross-disciplinary: interaction design and architecture are treated as one system when the product depends on timing, uncertainty, media state, physical input, offline recovery, or complex domain constraints.

## Languages and publishing

English source documents remain the authored structural source during the Astro migration. Astro generates complete Spanish and Swedish static variants under `/es/` and `/sv/`; visitors do not depend on client-side translation JavaScript. Every generated page receives locale-specific canonical metadata, `hreflang` alternatives and accessibility labels, and all public routes are included in the generated sitemap.

## Verification

The Pages artifact is gated by the repository's certification workflow. It uses Node 24 LTS, pnpm, Astro 7 on Vite 8, strict TypeScript, Biome, Playwright and axe-core. The browser matrix exercises Chromium, Firefox and WebKit across all localized routes, including semantic navigation, automated WCAG A/AA scans, locale-preserving keyboard journeys, reduced-motion behavior, forced-colors behavior and responsive overflow checks at representative viewport sizes.

Automated browser evidence is not presented as a substitute for manual assistive-technology review. The current audit record is in [`SITE_AUDIT.md`](./SITE_AUDIT.md), and development/build details are in [`README_DEV.md`](./README_DEV.md).

## Development

```sh
npm install --global --allow-scripts=pnpm pnpm@12.3.4
pnpm install --frozen-lockfile
pnpm exec playwright install
pnpm dev
pnpm check
```

`pnpm check` is the local release gate: lint, Astro/TypeScript diagnostics, production build, and the browser/accessibility suite. GitHub Pages deploys only the verified `dist/` artifact produced by the same workflow.

## Identity

The portfolio mark, favicon and site palette belong to this portfolio presentation. Project logos and marks remain project-specific; the portfolio identity is intentionally neutral enough to sit above software, game, firmware and public-service case studies without implying a shared product brand.
