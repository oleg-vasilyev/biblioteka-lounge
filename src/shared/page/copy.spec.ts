import { describe, expect, it } from "vitest";
import { copyIn } from "#shared/page/copy.ts";


describe("page copy", () => {
  it("serves each locale its own rendering of the venue's name", () => {
    expect(copyIn("en").siteName).toBe("Biblioteka Lounge");
    expect(copyIn("ka").siteName).toBe("ბიბლიოთეკა ლაუნჯი");
    expect(copyIn("ru").siteName).toBe("Библиотека Лаунж");
  });

  it("names every language in itself, identically from every page", () => {
    const autonyms = { en: "English", ka: "ქართული", ru: "Русский" };

    expect(copyIn("en").languageNames).toEqual(autonyms);
    expect(copyIn("ka").languageNames).toEqual(autonyms);
    expect(copyIn("ru").languageNames).toEqual(autonyms);
  });

  it("labels the switcher in the language of the page it sits on", () => {
    expect(copyIn("en").languageSwitcherLabel).toBe("Language");
    expect(copyIn("ka").languageSwitcherLabel).toBe("ენა");
    expect(copyIn("ru").languageSwitcherLabel).toBe("Язык");
  });
});
