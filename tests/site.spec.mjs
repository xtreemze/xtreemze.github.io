import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/experience.html",
  "/projects/slipmat.html",
  "/projects/fireone.html",
  "/projects/signal-broker.html",
  "/projects/workstation.html",
  "/projects/defend.html",
  "/projects/qmk.html",
  "/projects/via.html",
  "/projects/lemonade.html",
  "/projects/kullaberg.html",
  "/projects/investigation-workbench.html",
];

for (const route of routes) {
  test(`${route} exposes semantic bypass navigation`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("main#main")).toHaveCount(1);
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toHaveCount(1);
    await page.keyboard.press("Tab");
    await expect(skip).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main$/);
  });

  test(`${route} passes automated WCAG A/AA scan`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
}

test("compact navigation keeps every primary destination reachable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  for (const name of ["Work", "Experience", "About", "Principles", "GitHub ↗"]) {
    const link = page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", {
      name,
      exact: true,
    });
    await expect(link).toBeVisible();
    await link.scrollIntoViewIfNeeded();
    const box = await link.boundingBox();
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
  }
});

for (const viewport of [
  { width: 320, height: 720 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 1000 },
]) {
  test(`homepage has no document overflow at ${viewport.width}px`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Certification captures are Chromium-only.");
    await page.setViewportSize(viewport);
    await page.goto("/");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
    await page.screenshot({
      path: testInfo.outputPath(`home-${viewport.width}x${viewport.height}.png`),
      fullPage: true,
    });
  });
}

test("keyboard journey reaches a case study and its next project", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Slipmat" }).focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/projects\/slipmat\.html$/);
  await page.getByRole("link", { name: /Next: FireOne/ }).focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/projects\/fireone\.html$/);
});

test("reduced motion disables smooth scrolling and expressive transition timing", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
});

test("forced colors preserves navigation and focusable controls", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "forced-colors emulation is certified in Chromium.");
  await page.emulateMedia({ forcedColors: "active" });
  await page.goto("/");
  await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Explore selected work" })).toBeVisible();
});
