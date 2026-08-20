import type { Locale } from "#shared/locale/locales.ts";


const DEFAULT_LOCALE: Locale = "en";

export const localeDirectory = (locale: Locale): string => {
  switch (locale) {
    case "en":
      return "";
    case "ka":
      return "ka/";
    case "ru":
      return "ru/";
  }
};

export const assetPrefix = (from: Locale): string => (from === DEFAULT_LOCALE ? "" : "../");

export const relativeHref = (from: Locale, to: Locale): string => {
  const stepUpFromOwnDirectory = from === DEFAULT_LOCALE ? "" : "../";
  const target = localeDirectory(to);

  if (target === "") {
    return from === DEFAULT_LOCALE ? "./" : "../";
  }

  return stepUpFromOwnDirectory + target;
};
