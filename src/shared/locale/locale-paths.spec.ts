import { describe, expect, it } from "vitest";
import { localeDirectory, relativeHref } from "#shared/locale/locale-paths.ts";


describe("locale paths", () => {
  it("houses English at the root and the other languages in their own directories", () => {
    expect(localeDirectory("en")).toBe("");
    expect(localeDirectory("ka")).toBe("ka/");
    expect(localeDirectory("ru")).toBe("ru/");
  });

  it("links every page to every language relatively, so the site works under any base path", () => {
    expect(relativeHref("en", "en")).toBe("./");
    expect(relativeHref("en", "ka")).toBe("ka/");
    expect(relativeHref("en", "ru")).toBe("ru/");
    expect(relativeHref("ka", "en")).toBe("../");
    expect(relativeHref("ka", "ka")).toBe("../ka/");
    expect(relativeHref("ka", "ru")).toBe("../ru/");
    expect(relativeHref("ru", "en")).toBe("../");
    expect(relativeHref("ru", "ka")).toBe("../ka/");
    expect(relativeHref("ru", "ru")).toBe("../ru/");
  });
});
