import { html, raw, type TrustedHtml } from "#shared/html/html.ts";
import { assetPrefix, relativeHref } from "#shared/locale/locale-paths.ts";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "#shared/locale/locales.ts";
import type { Copy } from "#shared/page/copy.en.ts";
import { stylesheetFor } from "#shared/page/stylesheet.ts";
import { fontsHref } from "#shared/page/webfonts.ts";
import { assetUrl, canonicalUrl } from "#shared/site/site-address.ts";


const SOCIAL_IMAGE = "img/social-cover.png";

const FAVICON = "favicon.svg";

const renderAlternateLinks = (): TrustedHtml =>
  raw(
    LOCALES.map(
      (target) => html`<link rel="alternate" hreflang="${target}" href="${canonicalUrl(target)}">`,
    ).join("\n") +
      "\n" +
      html`<link rel="alternate" hreflang="x-default" href="${canonicalUrl(DEFAULT_LOCALE)}">`,
  );

const renderSocialTags = (locale: Locale, copy: Copy, description: string): TrustedHtml =>
  raw(html`<meta property="og:type" content="website">
<meta property="og:title" content="${copy.siteName}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${canonicalUrl(locale)}">
<meta property="og:image" content="${assetUrl(SOCIAL_IMAGE)}">
<meta property="og:locale" content="${locale}">
<meta name="twitter:card" content="summary_large_image">`);

const renderHead = (locale: Locale, copy: Copy, description: string): TrustedHtml =>
  raw(html`<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${copy.siteName}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${canonicalUrl(locale)}">
${renderAlternateLinks()}
${renderSocialTags(locale, copy, description)}
<link rel="icon" href="${assetPrefix(locale) + FAVICON}" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${fontsHref(locale)}" rel="stylesheet">
<style>${raw(stylesheetFor(locale))}</style>`);

const renderLanguageLink = (current: Locale, target: Locale, copy: Copy): string =>
  html`<a href="${relativeHref(current, target)}" lang="${target}" aria-label="${
    copy.languageNames[target]
  }"${current === target ? raw(' aria-current="page"') : raw("")}>${
    copy.languageShortNames[target]
  }</a>`;

const renderHeader = (locale: Locale, copy: Copy): TrustedHtml =>
  raw(html`<header class="header"><div class="hwrap">
<nav class="switch" aria-label="${copy.languageSwitcherLabel}">${raw(
    LOCALES.map((target) => renderLanguageLink(locale, target, copy)).join(""),
  )}</nav>
</div></header>`);

export type FooterFacts = { snapshotDate: string; instagramHandle: string };

const renderFooter = (copy: Copy, facts: FooterFacts): TrustedHtml =>
  raw(html`<footer class="night foot"><div class="wrap">
<p>${copy.menuSnapshotNoteBefore}${facts.snapshotDate}${copy.menuSnapshotNoteAfter}</p>
<p>${copy.photosBorrowedNoteBefore}${facts.instagramHandle}${copy.photosBorrowedNoteAfter}</p>
<p>${copy.georgianDraftNote}</p>
</div></footer>`);

export const renderPageShell = (
  locale: Locale,
  copy: Copy,
  description: string,
  facts: FooterFacts,
  body: string,
): string =>
  html`<!doctype html>
<html lang="${locale}">
<head>
${renderHead(locale, copy, description)}
</head>
<body>
${renderHeader(locale, copy)}
<main>${raw(body)}</main>
${renderFooter(copy, facts)}
</body>
</html>
`;
