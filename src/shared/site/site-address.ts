import { localeDirectory } from "#shared/locale/locale-paths.ts";
import type { Locale } from "#shared/locale/locales.ts";


export const SITE_ORIGIN = "https://oleg-vasilyev.github.io";

export const SITE_BASE_PATH = "/biblioteka-lounge/";

export const canonicalUrl = (locale: Locale): string =>
  SITE_ORIGIN + SITE_BASE_PATH + localeDirectory(locale);

export const assetUrl = (file: string): string => SITE_ORIGIN + SITE_BASE_PATH + file;
