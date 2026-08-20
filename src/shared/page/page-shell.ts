import { html, raw } from "#shared/html/html.ts";
import { relativeHref } from "#shared/locale/locale-paths.ts";
import { LOCALES, type Locale } from "#shared/locale/locales.ts";
import type { Copy } from "#shared/page/copy.en.ts";


const renderLanguageLink = (current: Locale, target: Locale, copy: Copy): string =>
  html`<a href="${relativeHref(current, target)}" lang="${target}"${
    current === target ? raw(' aria-current="page"') : raw("")
  }>${copy.languageNames[target]}</a>`;

const renderLanguageSwitcher = (current: Locale, copy: Copy): string =>
  html`<nav aria-label="${copy.languageSwitcherLabel}">${raw(
    LOCALES.map((target) => renderLanguageLink(current, target, copy)).join(" "),
  )}</nav>`;

export const renderPageShell = (locale: Locale, copy: Copy, body: string): string =>
  html`<!doctype html>
<html lang="${locale}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${copy.siteName}</title>
</head>
<body>
<header>
<h1>${copy.siteName}</h1>
${raw(renderLanguageSwitcher(locale, copy))}
</header>
<main>${raw(body)}</main>
</body>
</html>
`;
