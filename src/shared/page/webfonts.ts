import type { Locale } from "#shared/locale/locales.ts";


const LITERATA_ONLY =
  "https://fonts.googleapis.com/css2?family=Literata:wght@400;600&display=swap";

const LITERATA_WITH_GEORGIAN =
  "https://fonts.googleapis.com/css2?family=Literata:wght@400;600&family=Noto+Serif+Georgian:wght@400;600&display=swap";

export const fontsHref = (locale: Locale): string => {
  switch (locale) {
    case "ka":
      return LITERATA_WITH_GEORGIAN;
    case "en":
    case "ru":
      return LITERATA_ONLY;
  }
};

export const serifStack = (locale: Locale): string => {
  switch (locale) {
    case "ka":
      return 'Literata,"Noto Serif Georgian",Georgia,serif';
    case "en":
    case "ru":
      return "Literata,Georgia,serif";
  }
};
