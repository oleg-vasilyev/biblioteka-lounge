import { describe, expect, it } from "vitest";
import { translateName, type NameTranslation } from "#shared/locale/translated-name.ts";


const doublePineapple: NameTranslation = {
  of: "Кальян дабл ананас",
  ka: "ჩილიმი ორმაგ ანანასზე",
  en: "Hookah on double pineapple",
  ru: "Кальян дабл ананас",
};

const untranslated = {
  ka: "Кальян дабл ананас",
  en: "Кальян дабл ананас",
  ru: "Кальян дабл ананас",
};

describe("translated name", () => {
  it("replaces every language of a name the venue left in one", () => {
    expect(translateName(untranslated, [doublePineapple])).toEqual({
      ka: "ჩილიმი ორმაგ ანანასზე",
      en: "Hookah on double pineapple",
      ru: "Кальян дабл ананас",
    });
  });

  it("leaves a name the venue did translate exactly as the snapshot holds it", () => {
    const asCaptured = { ka: "ბორში", en: "Borsch", ru: "Борщ" };

    expect(translateName(asCaptured, [doublePineapple])).toBe(asCaptured);
  });

  it("matches on the snapshot's English name, so a Georgian lookalike cannot claim it", () => {
    const georgianMatch = { ka: "Кальян дабл ананас", en: "Hookah, double pineapple", ru: "x" };

    expect(translateName(georgianMatch, [doublePineapple])).toBe(georgianMatch);
  });

  it("returns the name untouched when nothing has been translated at all", () => {
    expect(translateName(untranslated, [])).toBe(untranslated);
  });
});
