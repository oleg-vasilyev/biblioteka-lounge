import { cpSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { MENU, MENU_CAPTURED_ON, MENU_SOURCE_URL, type MenuItem } from "#data/menu.ts";
import { MENU_SHOWCASE } from "#data/menu-showcase.ts";
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
import { assetPrefix, localeDirectory } from "#shared/locale/locale-paths.ts";
import { LOCALES, type Locale } from "#shared/locale/locales.ts";
import { copyIn as pageCopy } from "#shared/page/copy.ts";
import { renderPageShell } from "#shared/page/page-shell.ts";
import { canonicalUrl } from "#shared/site/site-address.ts";


const OUTPUT_ROOT = "docs";

const ASSET_ROOT = "assets";

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

const showcaseFor = (locale: Locale): ShowcaseGroupContent[] =>
  MENU_SHOWCASE.map((group) => ({
    id: group.id,
    items: group.itemNames.map((englishName) => {
      const item = findItem(englishName);

      return { name: item.name[locale], price: item.price };
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
    renderMenuPreviewSection(locale, menuPreviewCopy(locale), {
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
    formatSnapshotDate(MENU_CAPTURED_ON),
    renderBody(locale),
  );

  mkdirSync(directory, { recursive: true });
  writeFileSync(join(directory, "index.html"), page);
};

const copyAssets = (): void => {
  cpSync(ASSET_ROOT, OUTPUT_ROOT, { recursive: true });
};

const writeSitemap = (): void => {
  const urls = LOCALES.map((locale) => `  <url><loc>${canonicalUrl(locale)}</loc></url>`).join("\n");

  writeFileSync(
    join(OUTPUT_ROOT, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
  );
};

const keepGitHubPagesFromRunningJekyll = (): void => {
  writeFileSync(join(OUTPUT_ROOT, ".nojekyll"), "");
};

const buildSite = (): void => {
  mkdirSync(OUTPUT_ROOT, { recursive: true });
  copyAssets();

  for (const locale of LOCALES) {
    buildPage(locale);
  }

  writeSitemap();
  keepGitHubPagesFromRunningJekyll();
};

buildSite();
