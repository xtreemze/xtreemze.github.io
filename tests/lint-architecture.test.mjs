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
  assert.deepEqual(inspectText("fixture.css", "@media (min-width: 48rem) { .x { display: grid; } }"), []);
});

test("rejects layout concealment and static viewport assumptions", () => {
  const source = `
    body { min-width: 320px; }
    .shell { width: 100vw; overflow-x: hidden; min-height: 100vh; }
    .text { font-size: 14px; }
    .control { outline: none; transition: all 160ms ease; }
  `;
  const rules = new Set(inspectText("fixture.css", source).map(({ rule }) => rule));
  for (const expected of [
    "responsive/no-root-min-width",
    "responsive/no-viewport-inline-lock",
    "responsive/no-horizontal-overflow-mask",
    "responsive/no-static-viewport-height",
    "a11y/no-px-font-size",
    "a11y/no-outline-removal",
    "motion/no-transition-all",
  ]) {
    assert.ok(rules.has(expected), `missing ${expected}`);
  }
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
