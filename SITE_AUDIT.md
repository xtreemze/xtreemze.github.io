# Portfolio UX / accessibility audit

Audit date: 2026-09-11

## Status

**Source-level certification: CONDITIONAL PASS**

The site has a strong semantic, dependency-light foundation and is suitable for publication, but this audit does **not** claim complete WCAG conformance or visual/browser certification.

Two evidence limits matter:

1. Product Design's screenshot-based audit workflow requires Work mode/browser capture. That environment was not used for this pass, so visual layout, real keyboard traversal, pointer behavior, color contrast rendered by a browser, and assistive-technology behavior remain runtime checks.
2. Public search/crawler results for the deployed GitHub Pages URL were stale and still represented the former SkillsCV build. Repository `master` is therefore the source of truth for this audit; crawler output is not deployment certification.

## What was inspected

- homepage information architecture and navigation
- project-card interaction model
- case-study navigation and long-form reading structure
- responsive CSS behavior
- focus styling and reduced-motion policy
- semantic HTML landmarks/headings visible in source
- external-link behavior
- modern-web enhancements that can remain progressive and dependency-free

## Findings

### P0 — none found

No source-level issue was found that should block publication outright.

### P1 — mobile navigation hid primary destinations

Before this audit, the `max-width: 860px` rule hid every primary navigation item except GitHub. That made Work, Experience, About and Principles unavailable from the sticky navigation precisely on smaller screens.

**Resolution in this change:** all destinations remain present. Mobile navigation becomes a horizontally resilient second row with 44px minimum targets and no JavaScript/menu state.

### P1 — repeated navigation lacks bypass links on deep pages

The homepage has a first-tab `Skip to content` link and an explicit `main` target. The Experience and project case-study documents do not currently expose the same bypass mechanism.

**Status:** open certification gap. Add a skip link and stable main target to every deep document before claiming WCAG 2.2 Level A/AA conformance across the site.

### P1 — visual/browser audit not executed

Source review cannot certify actual wrapping, clipping, contrast, zoom behavior, touch interaction, keyboard order, browser View Transition behavior, or assistive-technology announcements.

**Status:** open certification gap. Run screenshot + keyboard + accessibility-tree/browser checks in an environment with browser capture.

### P2 — deep-page lateral navigation is intentionally minimal

Case studies provide brand/home-back navigation and sequential next-project navigation, but no project index or quick lateral chooser at the top of each deep page.

**Recommendation:** evaluate a compact native Popover-based project index only if browser testing shows the existing back/next model creates excessive navigation cost. Do not add a hidden menu merely because the API exists.

### P2 — case-study metadata could be richer

The homepage has strong canonical/Open Graph metadata. Detail pages have titles/descriptions but do not yet have equivalent canonical/Open Graph/social metadata for every case study.

**Recommendation:** add per-case canonical URLs and social descriptions when project imagery becomes available.

## Improvements included in this audit

### Navigation

- restore every primary destination on compact layouts
- increase compact-nav hit areas to a 44px class target
- add stable anchor offsets for the sticky header
- add semantic visual cues for Work, Experience, About, Principles and external GitHub navigation without adding an icon dependency
- indicate targeted homepage sections visually using modern `:has()` / `:target` CSS while preserving text labels

### Interaction and orientation

- opt same-origin documents into cross-document View Transitions as a progressive enhancement
- give the persistent brand mark a stable view-transition identity
- add a CSS scroll-progress indicator to long case studies using Scroll-driven Animations behind `@supports`
- disable new motion when `prefers-reduced-motion: reduce` is active

### Readability

- use `text-wrap: balance` for display headings
- use `text-wrap: pretty` for long descriptive copy where supported
- reserve scrollbar gutter space to reduce layout shift

### Accessibility resilience

- preserve the existing high-visibility focus ring
- add `prefers-contrast: more` strengthening for structural borders
- add forced-colors handling for decorative status/navigation elements
- do not replace text labels with icon-only controls

## Technology decisions

The site intentionally remains a multi-page, mostly static application. Modern APIs are used only where they improve the experience without becoming correctness dependencies.

- **Cross-document View Transitions:** progressive enhancement; ordinary navigation remains authoritative.
- **Scroll-driven Animations:** enhancement only; unsupported browsers simply omit the progress line.
- **`:has()` / `:target`:** used for visual section state only, never for navigation semantics.
- **No client router:** the Navigation API is not introduced because the site does not need SPA routing or interception.
- **No icon package:** small semantic cues are CSS masks; text remains the accessible name.
- **No mobile menu JavaScript:** keeping primary destinations visible is simpler and more robust than adding disclosure state.

## Certification matrix

| Area | Status | Evidence / limit |
| --- | --- | --- |
| Semantic page structure | Pass with gap | Homepage strong; deep-page bypass link still required |
| Keyboard focus styling | Source pass | Visible 3px accent focus rule; runtime traversal not executed |
| Reduced motion | Pass | Existing global policy plus new transition/progress suppression |
| Compact navigation | Pass after change | Primary destinations no longer hidden |
| Touch target intent | Pass after change | Compact primary nav uses >=44px minimum height |
| Responsive project grid | Source pass | Grid collapses to one column; screenshot verification pending |
| Contrast | Conditional | Palette is deliberately high contrast, but rendered contrast audit not executed |
| Screen reader / accessibility tree | Not certified | Requires browser/AT evidence |
| Cross-browser behavior | Not certified | Requires current-browser run |
| Visual polish / clipping | Not certified | Requires screenshots at representative viewport classes |
| Motion enhancements | Progressive pass | Feature-gated/ignorable and reduced-motion aware |
| External navigation safety | Source pass | External links use new tab + `rel=noreferrer` in reviewed markup |

## Required browser certification pass

Before changing this document to an unconditional certification, exercise at least:

1. 320px compact portrait
2. 390px mobile portrait
3. 768px tablet portrait
4. 1024px constrained desktop/tablet landscape
5. 1440px desktop
6. 200% browser zoom
7. keyboard-only homepage -> case study -> next/back navigation
8. reduced-motion preference
9. increased-contrast / forced-colors where available
10. automated accessibility scan plus manual landmarks/headings/focus review

For each viewport, capture the homepage, one representative long private case study, one public case study, and the Experience page.
