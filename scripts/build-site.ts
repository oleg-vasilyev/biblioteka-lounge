import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { localeDirectory } from "#shared/locale/locale-paths.ts";
import { LOCALES, type Locale } from "#shared/locale/locales.ts";
import { copyIn } from "#shared/page/copy.ts";
import { renderPageShell } from "#shared/page/page-shell.ts";


const OUTPUT_ROOT = "docs";

const emptyBodyUntilTheFirstSectionLands = "";

const buildPage = (locale: Locale): void => {
  const directory = join(OUTPUT_ROOT, localeDirectory(locale));
  const page = renderPageShell(locale, copyIn(locale), emptyBodyUntilTheFirstSectionLands);

  mkdirSync(directory, { recursive: true });
  writeFileSync(join(directory, "index.html"), page);
};

const keepGitHubPagesFromRunningJekyll = (): void => {
  writeFileSync(join(OUTPUT_ROOT, ".nojekyll"), "");
};

const buildSite = (): void => {
  for (const locale of LOCALES) {
    buildPage(locale);
  }
  keepGitHubPagesFromRunningJekyll();
};

buildSite();
