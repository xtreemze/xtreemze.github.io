import assert from "node:assert/strict";
import test from "node:test";
import { compareToBaseline, inspectText } from "../scripts/lint-architecture.mjs";

test("rejects desktop-first and pixel breakpoints", () => {
  const findings = inspectText("fixture.css", "@media (max-width: 800px) { .x { display: block; } }");
  assert.deepEqual(
    findings.map(({ rule }) => rule).sort(),
    ["responsive/no-desktop-first-breakpoint", "responsive/no-px-breakpoint"],
  );
});

test("accepts a mobile-first scalable breakpoint", () => {
  assert.deepEqual(
    inspectText("fixture.css", "@media (width >= 48rem) { .x { display: grid; } }"),
    [],
  );
});

test("rejects layout concealment and static viewport assumptions", () => {
  const source = `
    body { min-width: 320px; }
    .shell { width: 100vw; overflow-x: hidden; min-height: 100vh; }
    .text { font-size: 14px; text-size-adjust: none; }
    .scroll { scrollbar-width: none; }
    .control { outline: none; transition: all 160ms ease; }
    @media (orientation: landscape) { .x { display: grid; } }
    @media (device-width: 390px) { .x { display: block; } }
    <meta name="viewport" content="width=device-width, maximum-scale=1">
  `;
  const rules = new Set(inspectText("fixture.css", source).map(({ rule }) => rule));
  for (const expected of [
    "responsive/no-root-min-width",
    "responsive/no-viewport-inline-lock",
    "responsive/no-horizontal-overflow-mask",
    "responsive/no-static-viewport-height",
    "a11y/no-px-font-size",
    "a11y/no-zoom-lock",
    "a11y/no-text-size-adjust-lock",
    "a11y/no-hidden-scrollbar",
    "a11y/no-outline-removal",
    "responsive/no-device-breakpoint",
    "responsive/no-orientation-breakpoint",
    "motion/no-transition-all",
  ]) {
    assert.ok(rules.has(expected), `missing ${expected}`);
  }
});

test("rejects hidden webkit scrollbars", () => {
  const findings = inspectText(
    "fixture.css",
    ".rail::-webkit-scrollbar { display: none; }",
  );
  assert.ok(findings.some(({ rule }) => rule === "a11y/no-hidden-scrollbar"));
});

test("does not treat preference media queries as viewport breakpoints", () => {
  assert.deepEqual(
    inspectText("fixture.css", "@media (prefers-reduced-motion: reduce) { .x { transition: none; } }"),
    [],
  );
});

test("baseline is a ratchet: increases and stale reductions both fail", () => {
  const findings = inspectText("fixture.css", "@media (max-width: 800px) {}");
  const exact = {
    "responsive/no-desktop-first-breakpoint": { "fixture.css": 1 },
    "responsive/no-px-breakpoint": { "fixture.css": 1 },
  };
  assert.deepEqual(compareToBaseline(findings, exact), []);

  const tooLow = {
    "responsive/no-desktop-first-breakpoint": { "fixture.css": 0 },
    "responsive/no-px-breakpoint": { "fixture.css": 1 },
  };
  assert.ok(compareToBaseline(findings, tooLow).some((message) => message.includes("debt increased")));

  const tooHigh = {
    "responsive/no-desktop-first-breakpoint": { "fixture.css": 2 },
    "responsive/no-px-breakpoint": { "fixture.css": 1 },
  };
  assert.ok(compareToBaseline(findings, tooHigh).some((message) => message.includes("debt decreased")));
});
