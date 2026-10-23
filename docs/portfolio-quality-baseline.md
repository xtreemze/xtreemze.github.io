# Portfolio quality baseline (draft v0.1)

Tracking: [portfolio-wide quality initiative](https://github.com/xtreemze/xtreemze.github.io/issues/44).

## Evidence and scope

The October 23, 2026 reconnaissance identified 61 owned repositories. Root directory contents were inspected for all 61; GitHub Actions workflow directories were inspected for eight pilot repositories. This document is a proposed standard, **not** a certificate that any repository passes it. Do not publish details retrieved from private repositories in public reports.

## State model

Each criterion has one of `pass`, `fail`, `unknown`, `not-applicable`, or `waived`. A `pass` requires recorded evidence (file path, workflow run, reproducible command or test result). A `fail` requires a reproducible defect or a verified absence of a mandatory capability. An unavailable API, inaccessible CI, or missing local tool implies `unknown`, never `pass` or `fail`. Waivers require rationale, owner, expiry and compensating control.

## Classification

Classify each repository as production application, reusable library, research/prototype, third-party fork, infrastructure, or legacy maintenance. Do not archive or rewrite a project based on age alone. Add profiles only where applicable: web/PWA, native/mobile, TV/D-pad, server, real-time audio, rendering/3D, firmware/hardware, and documentation/static content.

## Universal checks

1. Repository identity: purpose, owner, current lifecycle, license or private policy, README with setup/build/test, supported platforms.
2. Reproducible toolchain: explicit runtime/SDK versions, resolved dependencies and lockfiles where supported; build from clean checkout.
3. Verification: relevant formatting, linting, types, unit/contract tests, CI on pull requests; exceptions require explicit scope.
4. Security: no tracked credentials, minimal CI permissions, dependency vulnerability strategy, disclosed external attack surface and security reporting for relevant products.
5. Delivery: deployment/release build verified, environment configuration documented, reversible releases where relevant.
6. Operational quality: performance/resource targets, observability and fault boundaries for deployed services; accessibility and interaction tests for user interfaces.
7. Data and licensing: migrations and backup for stateful systems; asset/source provenance and redistribution rights.

## Severity

- P0: exploitable secret exposure, serious security vulnerability, data corruption, critical breakage in production.
- P1: broken release, high-confidence critical regression, missing essential verification for deployed code.
- P2: reproducibility, accessibility, test coverage, performance or maintainability gaps with defined impact.
- P3: improvements and modernization with no demonstrated near-term risk.

## Cross-repository extraction

Before publishing a shared package: identify two real consuming repositories; document the invariant/API and ownership; add independent contract tests, versioning, release automation, license/provenance check, backwards compatibility policy and rollout/rollback. Prefer copying *knowledge* and configuration patterns over extracting product-specific state. Shared workflow templates may be adopted before runtime libraries.

## Suggested pilot projects

- `booking`: workspace/compliance checks and CodeQL.
- `xtreemze.github.io`: Astro, typecheck, Playwright and accessibility.
- `castaway`: animation and story-validation tests.
- `timeline`: domain and graph architecture tests.
- `slipmat`: native/audio parity and cross-platform fixtures.
- `verge`: workspace and Android/WebRTC certification.
- `scanner`: native/mobile and 3D capture.
- `teldra`: schema, fixtures and quality infrastructure.

Review legacy Webpack/Travis projects as a second cohort; verify whether apparent `node_modules` directories are actually tracked before filing defects.

## Deliverables

- Machine-readable inventory with private information properly redacted.
- Repeatable read-only audit with evidence and explicit unknown states.
- Per-repository gap report and prioritized remediation issues.
- Pilot changes in separate repositories with CI/rollback evidence.
- Shared capability decision records and compatibility matrix.
