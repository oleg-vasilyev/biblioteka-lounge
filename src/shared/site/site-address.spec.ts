import { describe, expect, it, vi } from "vitest";
import { assetUrl, canonicalUrl } from "#shared/site/site-address.ts";


vi.mock("#shared/locale/locale-paths.ts", () => ({
  localeDirectory: (locale: string) => (locale === "en" ? "" : `${locale}/`),
}));

describe("site address", () => {
  it("gives every language page one absolute address, the default one at the root", () => {
    expect(canonicalUrl("en")).toBe("https://oleg-vasilyev.github.io/biblioteka-lounge/");
    expect(canonicalUrl("ka")).toBe("https://oleg-vasilyev.github.io/biblioteka-lounge/ka/");
    expect(canonicalUrl("ru")).toBe("https://oleg-vasilyev.github.io/biblioteka-lounge/ru/");
  });

  it("addresses an asset from the site root, so a shared card never resolves per language", () => {
    expect(assetUrl("img/social-cover.png")).toBe(
      "https://oleg-vasilyev.github.io/biblioteka-lounge/img/social-cover.png",
    );
  });
});
