import type { Locale } from "#shared/locale/locales.ts";
import { copy as english, type Copy } from "#hero/copy.en.ts";
import { copy as georgian } from "#hero/copy.ka.ts";
import { copy as russian } from "#hero/copy.ru.ts";


export const copyIn = (locale: Locale): Copy => {
  switch (locale) {
    case "en":
      return english;
    case "ka":
      return georgian;
    case "ru":
      return russian;
  }
};

export type { Copy };
