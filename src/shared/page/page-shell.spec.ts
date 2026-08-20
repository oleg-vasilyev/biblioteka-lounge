import { describe, expect, it, vi } from "vitest";
import { copyIn } from "#shared/page/copy.ts";
import { renderPageShell } from "#shared/page/page-shell.ts";


const mark = (value: unknown): string =>
  typeof value === "string" ? `[e:${value}]` : (value as { trusted: string }).trusted;

vi.mock("#shared/html/html.ts", () => ({
  html: (strings: TemplateStringsArray, ...values: unknown[]) =>
    strings
      .map((part, index) => (index < values.length ? part + mark(values[index]) : part))
      .join(""),
  raw: (trusted: string) => ({ trusted }),
}));

vi.mock("#shared/locale/locale-paths.ts", () => ({
  relativeHref: (from: string, to: string) => `href-${from}-${to}`,
  assetPrefix: (from: string) => (from === "en" ? "" : "../"),
}));

vi.mock("#shared/locale/locales.ts", () => ({ LOCALES: ["en", "ka", "ru"], DEFAULT_LOCALE: "en" }));

vi.mock("#shared/page/stylesheet.ts", () => ({
  stylesheetFor: (locale: string) => `/* css for ${locale} */`,
}));

vi.mock("#shared/page/webfonts.ts", () => ({ fontsHref: (locale: string) => `fonts-${locale}` }));

vi.mock("#shared/site/site-address.ts", () => ({
  canonicalUrl: (locale: string) => `https://example.test/${locale}/`,
  assetUrl: (file: string) => `https://example.test/${file}`,
}));

const DESCRIPTION = "Hookah by the fireplace.";
const FACTS = { snapshotDate: "20.08.2026", instagramHandle: "@lounge.ge" };

describe("page shell", () => {
  it("declares the page language and titles it with the venue's own name", () => {
    const page = renderPageShell("ka", copyIn("ka"), DESCRIPTION, FACTS, "");

    expect(page).toContain('<html lang="[e:ka]">');
    expect(page).toContain("<title>[e:ბიბლიოთეკა ლაუნჯი]</title>");
  });

  it("points every page at itself and at both siblings, with a default for the rest", () => {
    const page = renderPageShell("ru", copyIn("ru"), DESCRIPTION, FACTS, "");

    expect(page).toContain('<link rel="canonical" href="[e:https://example.test/ru/]">');
    expect(page).toContain('<link rel="alternate" hreflang="[e:en]" href="[e:https://example.test/en/]">');
    expect(page).toContain('<link rel="alternate" hreflang="[e:ka]" href="[e:https://example.test/ka/]">');
    expect(page).toContain(
      '<link rel="alternate" hreflang="x-default" href="[e:https://example.test/en/]">',
    );
  });

  it("asks for the Georgian face only through the locale's own font request", () => {
    expect(renderPageShell("ka", copyIn("ka"), DESCRIPTION, FACTS, "")).toContain(
      '<link href="[e:fonts-ka]" rel="stylesheet">',
    );
    expect(renderPageShell("en", copyIn("en"), DESCRIPTION, FACTS, "")).toContain(
      '<link href="[e:fonts-en]" rel="stylesheet">',
    );
  });

  it("inlines the stylesheet built for that locale, unescaped", () => {
    expect(renderPageShell("ka", copyIn("ka"), DESCRIPTION, FACTS, "")).toContain(
      "<style>/* css for ka */</style>",
    );
  });

  it("shares one card image and describes the page in its own language", () => {
    const page = renderPageShell("ru", copyIn("ru"), DESCRIPTION, FACTS, "");

    expect(page).toContain(
      '<meta property="og:image" content="[e:https://example.test/img/fireplace-hearth-wide-900.jpg]">',
    );
    expect(page).toContain('<meta name="description" content="[e:Hookah by the fireplace.]">');
    expect(page).toContain('<meta property="og:locale" content="[e:ru]">');
  });

  it("finds the icon from the page's own depth", () => {
    expect(renderPageShell("en", copyIn("en"), DESCRIPTION, FACTS, "")).toContain(
      '<link rel="icon" href="[e:favicon.svg]"',
    );
    expect(renderPageShell("ka", copyIn("ka"), DESCRIPTION, FACTS, "")).toContain(
      '<link rel="icon" href="[e:../favicon.svg]"',
    );
  });

  it("switches languages by short label, naming each in full for a screen reader", () => {
    const page = renderPageShell("ka", copyIn("ka"), DESCRIPTION, FACTS, "");

    expect(page).toContain(
      '<a href="[e:href-ka-en]" lang="[e:en]" aria-label="[e:English]">[e:EN]</a>',
    );
    expect(page).toContain(
      '<a href="[e:href-ka-ka]" lang="[e:ka]" aria-label="[e:ქართული]" aria-current="page">[e:ქა]</a>',
    );
    expect(page).toContain('<nav class="switch" aria-label="[e:ენა]">');
  });

  it("dates the footer's snapshot note from the data it was given", () => {
    expect(renderPageShell("en", copyIn("en"), DESCRIPTION, FACTS, "")).toContain(
      "<p>[e:Menu prices are a snapshot of ][e:20.08.2026][e: from the venue’s own menu.]</p>",
    );
  });

  it("keeps the three honesty lines on every language page", () => {
    for (const locale of ["en", "ka", "ru"] as const) {
      const page = renderPageShell(locale, copyIn(locale), DESCRIPTION, FACTS, "");

      expect(page).toContain(`[e:${copyIn(locale).photosBorrowedNoteBefore}][e:@lounge.ge]`);
      expect(page).toContain(`[e:${copyIn(locale).georgianDraftNote}]`);
    }
  });

  it("plants the body as trusted markup, never through the escaper", () => {
    expect(renderPageShell("en", copyIn("en"), DESCRIPTION, FACTS, "<em>x</em>")).toContain(
      "<main><em>x</em></main>",
    );
  });
});
