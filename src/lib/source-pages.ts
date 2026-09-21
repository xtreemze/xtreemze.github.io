import { access, readFile } from "node:fs/promises";
import { basename, resolve } from "node:path";
import { localeDefinitions, localizeHtml, sourcePagePaths } from "../../scripts/localization.mjs";

export const supportedLocales = ["en", "es", "sv"] as const;
export const translatedLocales = ["es", "sv"] as const;

export type SupportedLocale = (typeof supportedLocales)[number];

export interface SourceDocument {
  lang: SupportedLocale;
  head: string;
  body: string;
  bodyClass?: string;
}

const root = process.cwd();

function enforceAccessibilityInvariants(html: string, locale: SupportedLocale) {
  let output = html;

  if (!output.includes('class="skip-link"')) {
    const skipLabel = localeDefinitions[locale].skipLabel;
    output = output.replace(
      "<body>",
      `<body>\n  <a class="skip-link" href="#main">${skipLabel}</a>`,
    );
  }

  if (!/<main[^>]*\bid="main"/.test(output)) {
    output = output.replace(/<main\b/, '<main id="main"');
  }

  if (!output.includes('name="color-scheme"')) {
    output = output.replace("</head>", '  <meta name="color-scheme" content="dark">\n</head>');
  }

  return output;
}

async function includeSharedLayoutLayer(html: string) {
  const layoutPath = resolve(root, "public/layout-grid.css");

  try {
    await access(layoutPath);
  } catch {
    return html;
  }

  if (html.includes('href="/layout-grid.css"')) return html;

  return html.replace("</head>", '  <link rel="stylesheet" href="/layout-grid.css">\n</head>');
}

function extractDocument(html: string, locale: SupportedLocale): SourceDocument {
  const head = html.match(/<head>([\s\S]*?)<\/head>/i)?.[1]?.trim() ?? "";
  const bodyMatch = html.match(/<body([^>]*)>([\s\S]*?)<\/body>/i);
  const bodyAttributes = bodyMatch?.[1] ?? "";
  const body = bodyMatch?.[2]?.trim() ?? "";
  const bodyClass = bodyAttributes.match(/\bclass="([^"]+)"/i)?.[1];

  if (!head || !body) {
    throw new Error("Source document is missing a complete <head> or <body>.");
  }

  return {
    lang: locale,
    head,
    body,
    ...(bodyClass ? { bodyClass } : {}),
  };
}

export async function renderSourceDocument(
  pagePath: string,
  locale: SupportedLocale,
): Promise<SourceDocument> {
  const source = await readFile(resolve(root, pagePath), "utf8");
  const localized = localizeHtml(source, pagePath, locale);
  const accessible = enforceAccessibilityInvariants(localized, locale);
  const withSharedLayout = await includeSharedLayoutLayer(accessible);

  return extractDocument(withSharedLayout, locale);
}

export async function projectSlugs() {
  const pages = await sourcePagePaths(root);

  return pages
    .filter((pagePath: string) => pagePath.startsWith("projects/"))
    .map((pagePath: string) => basename(pagePath, ".html"));
}
