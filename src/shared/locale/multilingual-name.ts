export type LocalizedName = { ka: string; en: string; ru: string };

type Language = keyof LocalizedName;

const SEPARATOR_AND_NEIGHBOURS = /(\s*[/•]\s*)/;
const GEORGIAN_LETTERS = /[Ⴀ-ჿ]/g;
const CYRILLIC_LETTERS = /[Ѐ-ӿ]/g;
const LATIN_LETTERS = /[A-Za-z]/g;
const SAME_LANGUAGE_LIST_SEPARATOR = " / ";

const classifyByLetterMajority = (token: string): Language | "wordless" => {
  const letterCounts: [Language, number][] = [
    ["ka", token.match(GEORGIAN_LETTERS)?.length ?? 0],
    ["ru", token.match(CYRILLIC_LETTERS)?.length ?? 0],
    ["en", token.match(LATIN_LETTERS)?.length ?? 0],
  ];
  const [language, count] = letterCounts.reduce((leader, candidate) =>
    candidate[1] > leader[1] ? candidate : leader,
  );

  return count === 0 ? "wordless" : language;
};

export const splitMultilingualName = (combined: string): LocalizedName => {
  const parts = combined.split(SEPARATOR_AND_NEIGHBOURS);
  const runs: Partial<Record<Language, string>> = {};
  const waitingForALanguage: string[] = [];
  let currentLanguage: Language | undefined;
  let pendingSeparator = "";

  for (const [index, part] of parts.entries()) {
    const isSeparator = index % 2 === 1;

    if (isSeparator) {
      pendingSeparator = part;
      continue;
    }
    const token = part.trim();

    if (token === "") {
      continue;
    }
    const kind = classifyByLetterMajority(token);
    const language = kind === "wordless" ? currentLanguage : kind;

    if (language === undefined) {
      waitingForALanguage.push(token);
      continue;
    }
    const claimed = [...waitingForALanguage.splice(0), token].join(SAME_LANGUAGE_LIST_SEPARATOR);
    const run = runs[language];
    const separator =
      language === currentLanguage && pendingSeparator !== ""
        ? pendingSeparator
        : SAME_LANGUAGE_LIST_SEPARATOR;

    runs[language] = run === undefined ? claimed : run + separator + claimed;
    currentLanguage = language;
    pendingSeparator = "";
  }

  const en = runs.en ?? runs.ru ?? runs.ka ?? combined;

  return { ka: runs.ka ?? en, en, ru: runs.ru ?? en };
};
