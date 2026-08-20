import { describe, expect, it } from "vitest";
import { splitMultilingualName } from "#shared/locale/multilingual-name.ts";


describe("splitMultilingualName", () => {
  it("splits the venue's usual three-language mash on unspaced slashes", () => {
    expect(
      splitMultilingualName("Кальян на энергетике/Hookah on Energy Drink/ჩილიმი ენერგეტიკზე"),
    ).toEqual({
      ru: "Кальян на энергетике",
      en: "Hookah on Energy Drink",
      ka: "ჩილიმი ენერგეტიკზე",
    });
  });

  it("keeps a slash inside one language while splitting between languages", () => {
    expect(splitMultilingualName("ИПА/АПА / IPA/APA")).toEqual({
      ru: "ИПА/АПА",
      en: "IPA/APA",
      ka: "IPA/APA",
    });
  });

  it("treats bullets as boundaries even when the source forgets a space", () => {
    expect(
      splitMultilingualName("Библиотека Ланч• ბიბლიოთეკა ლანჩი • Biblioteka Lunch"),
    ).toEqual({
      ru: "Библиотека Ланч",
      ka: "ბიბლიოთეკა ლანჩი",
      en: "Biblioteka Lunch",
    });
  });

  it("rejoins a multi-word run in each language with its own separators", () => {
    expect(
      splitMultilingualName(
        "Мясо / Рыба / Курица / Meat / Fish / Chicken / ხორცი / თევზი / ქათამი",
      ),
    ).toEqual({
      ru: "Мясо / Рыба / Курица",
      en: "Meat / Fish / Chicken",
      ka: "ხორცი / თევზი / ქათამი",
    });
  });

  it("classifies by letter majority, so one Cyrillic typo cannot capture an English name", () => {
    expect(
      splitMultilingualName("Капучино на миндальном молоке / Almond milk Сappuccino"),
    ).toEqual({
      ru: "Капучино на миндальном молоке",
      en: "Almond milk Сappuccino",
      ka: "Almond milk Сappuccino",
    });
  });

  it("fills a language the source never wrote, en first, then ru, then ka", () => {
    expect(splitMultilingualName("Холодник")).toEqual({
      ru: "Холодник",
      en: "Холодник",
      ka: "Холодник",
    });
    expect(splitMultilingualName("ჭარხლის სუპი")).toEqual({
      ka: "ჭარხლის სუპი",
      en: "ჭარხლის სუპი",
      ru: "ჭარხლის სუპი",
    });
  });

  it("hands a leading wordless token to the first language that appears", () => {
    expect(splitMultilingualName("№1 / Крепкий / Strong")).toEqual({
      ru: "№1 / Крепкий",
      en: "Strong",
      ka: "Strong",
    });
  });

  it("keeps quotes and markup characters untouched for the renderer to escape", () => {
    expect(splitMultilingualName(`Чай "Библиотека" <фирменный> / Tea "Biblioteka"`)).toEqual({
      ru: `Чай "Библиотека" <фирменный>`,
      en: `Tea "Biblioteka"`,
      ka: `Tea "Biblioteka"`,
    });
  });
});
