import { readdir } from "node:fs/promises";
import { relative, resolve } from "node:path";
import architectureRefresh from "../locales/architecture-refresh.mjs";
import es from "../locales/es.mjs";
import portfolioMethodExtra from "../locales/portfolio-method-extra.mjs";
import portfolioRefresh from "../locales/portfolio-refresh.mjs";
import portfolioRefreshExtra from "../locales/portfolio-refresh-extra.mjs";
import studioRefresh from "../locales/studio-refresh.mjs";
import sv from "../locales/sv.mjs";
import toneRefinement from "../locales/tone-refinement.mjs";
import toneRefinementCases from "../locales/tone-refinement-cases.mjs";
import toneRefinementExtra from "../locales/tone-refinement-extra.mjs";

const english = {
  code: "en",
  languageName: "English",
  languageNavLabel: "Language",
  skipLabel: "Skip to content",
  primaryNavLabel: "Primary navigation",
  homeHeading: "I design and engineer systems that make complex behavior understandable.",
  ogLocale: "en_US",
};

function extendLocale(locale) {
  for (const source of [
    architectureRefresh,
    portfolioRefresh,
    portfolioRefreshExtra,
    portfolioMethodExtra,
    toneRefinement,
    toneRefinementExtra,
    toneRefinementCases,
    studioRefresh,
  ]) {
    const additions = source[locale.code] ?? {};
    locale.meta = { ...(locale.meta ?? {}), ...(additions.meta ?? {}) };
    locale.attributes = { ...(locale.attributes ?? {}), ...(additions.attributes ?? {}) };
    locale.keyed = { ...(locale.keyed ?? {}), ...(additions.keyed ?? {}) };
    locale.replacements = [...(locale.replacements ?? []), ...(additions.replacements ?? [])];
  }
  locale.homeHeading = locale.keyed?.["home.heroTitle"] ?? locale.homeHeading;
  return locale;
}

extendLocale(es);
extendLocale(sv);

const retiredSourcePages = [
  "projects/via.html",
  "projects/workstation.html",
  "projects/signal-broker.html",
  "projects/kullaberg.html",
];
for (const locale of [es, sv]) {
  for (const page of retiredSourcePages) delete locale.meta[page];
}

es.ogLocale = "es_ES";
sv.ogLocale = "sv_SE";

export const localeDefinitions = { en: english, es, sv };
export const translatedLocaleCodes = ["es", "sv"];

export async function sourcePagePaths(root) {
  const projectFiles = (await readdir(resolve(root, "projects")))
    .filter((file) => file.endsWith(".html"))
    .sort();

  return ["index.html", "experience.html", ...projectFiles.map((file) => `projects/${file}`)];
}

export function routeForPage(pagePath, localeCode = "en") {
  const suffix = pagePath === "index.html" ? "" : pagePath;
  if (localeCode === "en") return suffix ? `/${suffix}` : "/";
  return suffix ? `/${localeCode}/${suffix}` : `/${localeCode}/`;
}

export function absoluteUrl(pagePath, localeCode = "en") {
  return `https://xtreemze.github.io${routeForPage(pagePath, localeCode)}`;
}

function escapeAttribute(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function pageMetadata(html, pagePath, localeCode) {
  const locale = localeDefinitions[localeCode];
  if (localeCode !== "en") return locale.meta[pagePath];

  const title = html.match(/<title>([^<]+)<\/title>/)?.[1] ?? "Carlos Velasco";
  const description =
    html.match(/<meta\s+name="description"\s+content="([^"]*)"\s*\/?\s*>/)?.[1] ?? "";
  return { title, description };
}

function setDocumentMetadata(html, pagePath, localeCode) {
  const metadata = pageMetadata(html, pagePath, localeCode);
  let output = html.replace(/<title>[^<]*<\/title>/, `<title>${metadata.title}</title>`);
  output = output.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?\s*>/,
    `<meta name="description" content="${escapeAttribute(metadata.description)}">`,
  );

  const properties = [
    ["og:title", metadata.title],
    ["og:description", metadata.description],
  ];
  for (const [property, value] of properties) {
    const tag = `<meta property="${property}" content="${escapeAttribute(value)}">`;
    const matcher = new RegExp(`<meta\\s+property="${property}"\\s+content="[^"]*"\\s*\\/?\\s*>`);
    output = matcher.test(output)
      ? output.replace(matcher, tag)
      : output.replace("</head>", `  ${tag}\n</head>`);
  }

  return output;
}

function localizationLinks(pagePath, localeCode) {
  const locale = localeDefinitions[localeCode];
  const alternatives = Object.keys(localeDefinitions)
    .map(
      (code) => `  <link rel="alternate" hreflang="${code}" href="${absoluteUrl(pagePath, code)}">`,
    )
    .join("\n");
  const alternateOgLocales = Object.entries(localeDefinitions)
    .filter(([code]) => code !== localeCode)
    .map(
      ([, definition]) =>
        `  <meta property="og:locale:alternate" content="${definition.ogLocale}">`,
    )
    .join("\n");

  return [
    '  <link rel="stylesheet" href="/localization.css">',
    `  <link rel="canonical" href="${absoluteUrl(pagePath, localeCode)}">`,
    alternatives,
    `  <link rel="alternate" hreflang="x-default" href="${absoluteUrl(pagePath, "en")}">`,
    `  <meta property="og:url" content="${absoluteUrl(pagePath, localeCode)}">`,
    `  <meta property="og:locale" content="${locale.ogLocale}">`,
    alternateOgLocales,
  ].join("\n");
}

function languageNavigation(pagePath, localeCode) {
  const locale = localeDefinitions[localeCode];
  const links = Object.entries(localeDefinitions)
    .map(([code, definition]) => {
      const current = code === localeCode ? ' aria-current="page"' : "";
      return `<a href="${routeForPage(pagePath, code)}" lang="${code}" hreflang="${code}" aria-label="${definition.languageName}"${current}>${code.toUpperCase()}</a>`;
    })
    .join("");

  return `<nav class="language-nav" aria-label="${locale.languageNavLabel}">${links}</nav>`;
}

export function decorateLocalizationChrome(html, pagePath, localeCode = "en") {
  let output = html
    .replace(/\s*<link\s+rel="canonical"[^>]*>/g, "")
    .replace(/\s*<link\s+rel="alternate"[^>]*>/g, "")
    .replace(/\s*<link\s+rel="stylesheet"\s+href="\/localization\.css"[^>]*>/g, "")
    .replace(/\s*<meta\s+property="og:url"[^>]*>/g, "")
    .replace(/\s*<meta\s+property="og:locale(?::alternate)?"[^>]*>/g, "")
    .replace(/\s*<nav class="language-nav"[\s\S]*?<\/nav>/, "");

  output = setDocumentMetadata(output, pagePath, localeCode);
  output = output.replace("</head>", `${localizationLinks(pagePath, localeCode)}\n</head>`);

  const navigation = languageNavigation(pagePath, localeCode);
  output = output.replace(
    /(<header class="site-header">[\s\S]*?)(<\/header>)/,
    (_, header, close) => {
      const lastContainerClose = header.lastIndexOf("</div>");
      if (lastContainerClose === -1) return `${header}${navigation}${close}`;
      return `${header.slice(0, lastContainerClose)}${navigation}${header.slice(lastContainerClose)}${close}`;
    },
  );

  return output;
}

function rewriteInternalLinks(html, localeCode) {
  if (localeCode === "en") return html;

  return html.replace(/href="(\/[^"]*)"/g, (match, href) => {
    const localizable =
      href === "/" ||
      href.startsWith("/#") ||
      href.startsWith("/experience.html") ||
      href.startsWith("/projects/");
    if (!localizable) return match;
    return `href="/${localeCode}${href}"`;
  });
}

function applyAttributeTranslations(html, locale) {
  let output = html;
  for (const [source, target] of Object.entries(locale.attributes ?? {})) {
    output = output.replaceAll(`="${source}"`, `="${target}"`);
  }
  return output;
}

function applyContentTranslations(html, locale) {
  const replacements = [...locale.replacements].sort(([a], [b]) => b.length - a.length);
  const targets = new Map(replacements);
  const alternatives = replacements.map(([source]) => {
    const escaped = escapeRegExp(source);
    const startsWithWordCharacter = /^[\p{L}\p{N}_]/u.test(source);
    const endsWithWordCharacter = /[\p{L}\p{N}_]$/u.test(source);
    const prefix = startsWithWordCharacter ? "(?<![\\p{L}\\p{N}_])" : "";
    const suffix = endsWithWordCharacter ? "(?![\\p{L}\\p{N}_])" : "";
    return `${prefix}${escaped}${suffix}`;
  });
  const matcher = new RegExp(alternatives.join("|"), "gu");
  return html.replace(matcher, (match) => targets.get(match) ?? match);
}

function applyKeyedTranslations(html, locale) {
  const keyed = locale.keyed ?? {};
  return html.replace(
    /<(p|h1|h2|h3|span|strong|dt|dd)([^>]*?)\sdata-i18n="([^"]+)"([^>]*)>([\s\S]*?)<\/\1>/gu,
    (match, tag, before, key, after) => {
      const translated = keyed[key];
      if (translated === undefined) return match;
      return `<${tag}${before} data-i18n="${key}"${after}>${translated}</${tag}>`;
    },
  );
}

export function localizeHtml(html, pagePath, localeCode) {
  const locale = localeDefinitions[localeCode];
  if (!locale || localeCode === "en") return decorateLocalizationChrome(html, pagePath, "en");

  let output = applyContentTranslations(html, locale);
  output = applyKeyedTranslations(output, locale);
  output = applyAttributeTranslations(output, locale);
  output = output.replace(/<html\b([^>]*?)\blang="en"/, `<html$1lang="${localeCode}"`);
  output = rewriteInternalLinks(output, localeCode);
  return decorateLocalizationChrome(output, pagePath, localeCode);
}

export function sourcePathFromTransformContext(root, filename) {
  if (!filename) return null;
  const path = relative(root, filename).replaceAll("\\", "/");
  if (path === "index.html" || path === "experience.html" || path.startsWith("projects/"))
    return path;
  return null;
}
