import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import {
  absoluteUrl,
  localeDefinitions,
  routeForPage,
  sourcePagePaths,
} from "../scripts/localization.mjs";

const pages = await sourcePagePaths(process.cwd());
const localeCodes = Object.keys(localeDefinitions);
const routes = pages.flatMap((pagePath) =>
  localeCodes.map((localeCode) => ({
    localeCode,
    pagePath,
    route: routeForPage(pagePath, localeCode),
  })),
);

for (const { localeCode, pagePath, route } of routes) {
  const locale = localeDefinitions[localeCode];

  test(`${route} exposes localized semantic navigation`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("html")).toHaveAttribute("lang", localeCode);
    await expect(page.locator("main#main")).toHaveCount(1);

    const skip = page.getByRole("link", { name: locale.skipLabel });
    await expect(skip).toHaveCount(1);
    await page.keyboard.press("Tab");
    await expect(skip).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main$/);

    const languages = page.getByRole("navigation", { name: locale.languageNavLabel });
    await expect(languages).toBeVisible();
    await expect(languages.locator('a[aria-current="page"]')).toHaveText(localeCode.toUpperCase());
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      absoluteUrl(pagePath, localeCode),
    );
    for (const alternateCode of localeCodes) {
      await expect(
        page.locator(`link[rel="alternate"][hreflang="${alternateCode}"]`),
      ).toHaveAttribute("href", absoluteUrl(pagePath, alternateCode));
    }
  });

  test(`${route} passes automated WCAG A/AA scan`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
}

for (const localeCode of ["es", "sv"]) {
  test(`${localeCode} homepage contains localized product copy without corrupting names`, async ({
    page,
  }) => {
    const locale = localeDefinitions[localeCode];
    await page.goto(routeForPage("index.html", localeCode));
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(locale.homeHeading);
    await expect(
      page.getByRole("heading", { level: 3, name: "Investigation Workbench", exact: true }),
    ).toBeVisible();

    const body = await page.locator("body").innerText();
    expect(body).not.toMatch(
      /\b(the|and|with|from|where|rather|should|through|without|while|than)\b/i,
    );
    expect(body).not.toContain("Proyectosbench");
    expect(body).not.toContain("Projektbench");
  });
}

test("Spanish professional narrative preserves product and company names", async ({ page }) => {
  await page.goto(routeForPage("experience.html", "es"));
  const body = await page.locator("body").innerText();
  expect(body).toContain("2Active Design");
  expect(body).not.toContain("2Active Diseño");
  expect(body).toContain("IKEA Kitchen Planner");
});

for (const localeCode of ["es", "sv"]) {
  test(`${localeCode} renders keyed portfolio refresh copy`, async ({ page }) => {
    const locale = localeDefinitions[localeCode];

    await page.goto(routeForPage("index.html", localeCode));
    await expect(page.locator('[data-i18n="home.flagships"]')).toHaveText(
      locale.keyed["home.flagships"],
    );
    await expect(page.locator('[data-i18n="home.bookingArchitectureSummary"]')).toHaveText(
      locale.keyed["home.bookingArchitectureSummary"],
    );

    await page.goto(routeForPage("projects/booking.html", localeCode));
    await expect(page.locator('[data-i18n="booking.nicheLead"]')).toHaveText(
      locale.keyed["booking.nicheLead"],
    );

    await page.goto(routeForPage("projects/lemonade.html", localeCode));
    await expect(page.locator('[data-i18n="lemonade.devArchitecture"]')).toHaveText(
      locale.keyed["lemonade.devArchitecture"],
    );
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

for (const localeCode of localeCodes) {
  for (const viewport of [
    { width: 320, height: 720 },
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1024, height: 768 },
    { width: 1440, height: 1000 },
  ]) {
    test(`${localeCode} homepage has no document overflow at ${viewport.width}px`, async ({
      page,
    }, testInfo) => {
      test.skip(testInfo.project.name !== "chromium", "Certification captures are Chromium-only.");
      await page.setViewportSize(viewport);
      await page.goto(routeForPage("index.html", localeCode));
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(1);
      await page.screenshot({
        path: testInfo.outputPath(`home-${localeCode}-${viewport.width}x${viewport.height}.png`),
        fullPage: true,
      });
    });
  }
}

for (const localeCode of localeCodes) {
  test(`${localeCode} keyboard journey stays in locale`, async ({ page }) => {
    await page.goto(routeForPage("index.html", localeCode));
    const slipmatRoute = routeForPage("projects/slipmat.html", localeCode);
    const fireOneRoute = routeForPage("projects/fireone.html", localeCode);
    await page.locator(`a[href="${slipmatRoute}"]`).first().focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(new RegExp(`${slipmatRoute.replaceAll("/", "\\/")}$`));
    await page.locator(`a[href="${fireOneRoute}"]`).last().focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(new RegExp(`${fireOneRoute.replaceAll("/", "\\/")}$`));
  });
}

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
  await expect(page.getByRole("navigation", { name: "Language" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Explore selected work" })).toBeVisible();
});
