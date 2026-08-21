import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { MENU, MENU_CAPTURED_ON, MENU_SOURCE_URL, type MenuItem } from "#data/menu.ts";
import { MENU_SHOWCASE } from "#data/menu-showcase.ts";
import { MENU_TRANSLATIONS } from "#data/menu-translations.ts";
import { VENUE } from "#data/venue.ts";
import { copyIn as atmosphereCopy } from "#atmosphere/copy.ts";
import { renderAtmosphereSection } from "#atmosphere/render/atmosphere-section.ts";
import { copyIn as heroCopy } from "#hero/copy.ts";
import { renderHeroSection } from "#hero/render/hero-section.ts";
import { copyIn as menuPreviewCopy } from "#menu-preview/copy.ts";
import {
  renderMenuPreviewSection,
  type ShowcaseGroupContent,
} from "#menu-preview/render/menu-preview-section.ts";
import { copyIn as visitCopy } from "#visit/copy.ts";
import { renderVisitSection } from "#visit/render/visit-section.ts";
import { formatSnapshotDate } from "#shared/dates/snapshot-date.ts";
import { escapeHtml } from "#shared/html/escape.ts";
import { usesForeignScript } from "#shared/locale/foreign-script.ts";
import { assetPrefix, localeDirectory } from "#shared/locale/locale-paths.ts";
import { LOCALES, type Locale } from "#shared/locale/locales.ts";
import { translateName } from "#shared/locale/translated-name.ts";
import { copyIn as pageCopy } from "#shared/page/copy.ts";
import { renderPageShell } from "#shared/page/page-shell.ts";
import { canonicalUrl } from "#shared/site/site-address.ts";


const OUTPUT_ROOT = "docs";

const ASSET_ROOT = "assets";

const PAGE_FILE = "index.html";

const SITEMAP_FILE = "sitemap.xml";

const JEKYLL_OPT_OUT = ".nojekyll";

const BORSCHT_KEY = "Borsch";

const findItem = (englishName: string): MenuItem => {
  const found = MENU.flatMap((category) => category.items).filter(
    (item) => item.name.en === englishName,
  );

  if (found.length !== 1) {
    throw new Error(`The showcase names "${englishName}", which the snapshot does not hold once.`);
  }

  return found[0] as MenuItem;
};

const showcaseName = (item: MenuItem, locale: Locale): string => {
  const name = translateName(item.name, MENU_TRANSLATIONS)[locale];

  if (usesForeignScript(name, locale)) {
    throw new Error(
      `The ${locale} page would show "${name}" in an alphabet it never loads. ` +
        `Add a ${locale} name for it to data/menu-translations.ts.`,
    );
  }

  return name;
};

const showcaseFor = (locale: Locale): ShowcaseGroupContent[] =>
  MENU_SHOWCASE.map((group) => ({
    id: group.id,
    items: group.itemNames.map((englishName) => {
      const item = findItem(englishName);

      return { name: showcaseName(item, locale), price: item.price };
    }),
  }));

const renderBody = (locale: Locale): string =>
  [
    renderHeroSection(heroCopy(locale), VENUE),
    renderAtmosphereSection(
      atmosphereCopy(locale),
      assetPrefix(locale),
      findItem(BORSCHT_KEY).price,
    ),
    renderMenuPreviewSection(menuPreviewCopy(locale), {
      groups: showcaseFor(locale),
      capturedOn: MENU_CAPTURED_ON,
      sourceUrl: MENU_SOURCE_URL,
    }),
    renderVisitSection(visitCopy(locale), VENUE),
  ].join("\n");

const buildPage = (locale: Locale): void => {
  const directory = join(OUTPUT_ROOT, localeDirectory(locale));
  const page = renderPageShell(
    locale,
    pageCopy(locale),
    heroCopy(locale).tagline,
    { snapshotDate: formatSnapshotDate(MENU_CAPTURED_ON), instagramHandle: VENUE.instagramHandle },
    renderBody(locale),
  );

  mkdirSync(directory, { recursive: true });
  writeFileSync(join(directory, PAGE_FILE), page);
};

const filesUnder = (root: string): string[] =>
  readdirSync(root, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => relative(root, join(entry.parentPath, entry.name)).split(sep).join("/"));

const everythingTheBuildMakes = (): Set<string> =>
  new Set([
    ...filesUnder(ASSET_ROOT),
    ...LOCALES.map((locale) => [localeDirectory(locale), PAGE_FILE].filter(Boolean).join("/")),
    SITEMAP_FILE,
    JEKYLL_OPT_OUT,
  ]);

const removeWhatTheBuildNoLongerMakes = (): void => {
  if (!existsSync(OUTPUT_ROOT)) {
    return;
  }
  const made = everythingTheBuildMakes();

  for (const file of filesUnder(OUTPUT_ROOT)) {
    if (!made.has(file)) {
      rmSync(join(OUTPUT_ROOT, file));
    }
  }
};

const copyAssets = (): void => {
  cpSync(ASSET_ROOT, OUTPUT_ROOT, { recursive: true });
};

const writeSitemap = (): void => {
  const urls = LOCALES.map(
    (locale) => `  <url><loc>${escapeHtml(canonicalUrl(locale))}</loc></url>`,
  ).join("\n");

  writeFileSync(
    join(OUTPUT_ROOT, SITEMAP_FILE),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
  );
};

const keepGitHubPagesFromRunningJekyll = (): void => {
  writeFileSync(join(OUTPUT_ROOT, JEKYLL_OPT_OUT), "");
};

const buildSite = (): void => {
  mkdirSync(OUTPUT_ROOT, { recursive: true });
  removeWhatTheBuildNoLongerMakes();
  copyAssets();

  for (const locale of LOCALES) {
    buildPage(locale);
  }

  writeSitemap();
  keepGitHubPagesFromRunningJekyll();
};

buildSite();
