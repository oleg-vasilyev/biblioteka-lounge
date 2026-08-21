import type { LocalizedName } from "#shared/locale/multilingual-name.ts";


export type NameTranslation = LocalizedName & { of: string };

export const translateName = (
  name: LocalizedName,
  translations: readonly NameTranslation[],
): LocalizedName => {
  const supplied = translations.find((translation) => translation.of === name.en);

  if (supplied === undefined) {
    return name;
  }

  return { ka: supplied.ka, en: supplied.en, ru: supplied.ru };
};
