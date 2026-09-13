<div align="center">
  <img src="./public/brand-mark.svg" width="84" height="84" alt="Carlos Velasco portfolio mark">

# Carlos Velasco — Portfolio

**Product · Systems · Interaction**

A multilingual portfolio and engineering case-study site for work spanning product engineering, media systems, deterministic simulation, developer tooling, public-service software, local-first applications and programmable input.

[Live portfolio](https://xtreemze.github.io/) · [Español](https://xtreemze.github.io/es/) · [Svenska](https://xtreemze.github.io/sv/)

[![Site quality and Pages](https://github.com/xtreemze/xtreemze.github.io/actions/workflows/site.yml/badge.svg)](https://github.com/xtreemze/xtreemze.github.io/actions/workflows/site.yml)
</div>

## What this repository is

This repository is the source of the current personal portfolio and its project case studies. The site is deliberately static and multi-page: HTML remains the product surface, while the build system adds localization, shared publication metadata, accessibility invariants and a verified GitHub Pages artifact.

The portfolio is organized around the problems each product is trying to solve, what makes the product or interaction model unusual, and the engineering methods used to preserve those ideas in implementation. It is not a generated résumé or a framework showcase.

## Selected case studies

| Area | Projects | Focus |
| --- | --- | --- |
| Flagship systems | [Slipmat](https://xtreemze.github.io/projects/slipmat.html), [FireOne](https://xtreemze.github.io/projects/fireone.html), [Lemonade](https://xtreemze.github.io/projects/lemonade.html) | media authority, uncertainty-driven simulation, deterministic economic simulation |
| Distinct technical products | [Signal Broker](https://xtreemze.github.io/projects/signal-broker.html), [Defend](https://xtreemze.github.io/projects/defend.html), [QMK userspace](https://xtreemze.github.io/projects/qmk.html), [Vial / Halcyon Control Center](https://xtreemze.github.io/projects/via.html) | vehicle telemetry, physical strategy, embedded input, firmware/host configuration |
| Operational product systems | [Booking](https://xtreemze.github.io/projects/booking.html), [Inventory](https://xtreemze.github.io/projects/inventory.html), [Timeline](https://xtreemze.github.io/projects/timeline.html) | configurable domain models, local-first operations, narrative information modeling |
| Public service & knowledge | [Kullaberg](https://xtreemze.github.io/projects/kullaberg.html), [Investigation Workbench](https://xtreemze.github.io/projects/investigation-workbench.html), [Workstation system](https://xtreemze.github.io/projects/workstation.html) | offline public-service UX, provenance-aware knowledge work, reproducible developer environments |

The [Experience](https://xtreemze.github.io/experience.html) page connects the project work to professional history across interactive design, public-service frontend development, planning tools and current product/systems engineering.

## Product and engineering approach

The common method is to make experimentation cheap, test ideas against real behavior, and only then encode proven behavior as durable product and engineering rules. Strict types, deterministic replay, accessibility tests, CI, performance evidence and explicit state ownership are used to protect exploration rather than replace it.

The result is intentionally cross-disciplinary: interaction design and architecture are treated as one system when the product depends on timing, uncertainty, media state, physical input, offline recovery, or complex domain constraints.

## Languages and publishing

English source documents are the authored structural source. Vite generates complete Spanish and Swedish static variants under `/es/` and `/sv/`; visitors do not depend on client-side translation JavaScript. Every generated page receives locale-specific canonical metadata, `hreflang` alternatives and accessibility labels, and all public routes are included in the sitemap.

## Verification

The Pages artifact is gated by the repository's certification workflow. It uses Node 24 LTS, pnpm, Vite/Rolldown, Biome, Playwright and axe-core. The browser matrix exercises Chromium, Firefox and WebKit across all localized routes, including semantic navigation, automated WCAG A/AA scans, locale-preserving keyboard journeys, reduced-motion behavior, forced-colors behavior and responsive overflow checks at representative viewport sizes.

Automated browser evidence is not presented as a substitute for manual assistive-technology review. The current audit record is in [`SITE_AUDIT.md`](./SITE_AUDIT.md), and development/build details are in [`README_DEV.md`](./README_DEV.md).

## Development

```sh
npm install --global --allow-scripts=pnpm pnpm@12.3.4
pnpm install --frozen-lockfile
pnpm exec playwright install
pnpm dev
pnpm check
```

`pnpm check` is the local release gate: lint, production build, and the browser/accessibility suite. GitHub Pages deploys only the verified `dist/` artifact produced by the same workflow.

## Identity

The portfolio mark, favicon and site palette belong to this portfolio presentation. Project logos and marks remain project-specific; the portfolio identity is intentionally neutral enough to sit above software, game, firmware and public-service case studies without implying a shared product brand.
