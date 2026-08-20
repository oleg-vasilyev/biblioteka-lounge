import type { Locale } from "#shared/locale/locales.ts";


const CYRILLIC = /[Ѐ-ӿ]/;
const GEORGIAN = /[Ⴀ-ჿᲐ-Ჿ]/;

export const usesForeignScript = (name: string, locale: Locale): boolean => {
  switch (locale) {
    case "en":
      return CYRILLIC.test(name) || GEORGIAN.test(name);
    case "ka":
      return CYRILLIC.test(name);
    case "ru":
      return GEORGIAN.test(name);
  }
};
