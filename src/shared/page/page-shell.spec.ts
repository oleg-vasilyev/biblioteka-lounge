import { describe, expect, it, vi } from "vitest";
import { copyIn } from "#shared/page/copy.ts";
import { renderPageShell } from "#shared/page/page-shell.ts";


vi.mock("#shared/html/html.ts", () => {
  const mark = (value: unknown): string =>
    typeof value === "string" ? `[escaped:${value}]` : (value as { trusted: string }).trusted;

  return {
    html: (strings: TemplateStringsArray, ...values: unknown[]) =>
      strings
        .map((part, index) => (index < values.length ? part + mark(values[index]) : part))
        .join(""),
    raw: (trusted: string) => ({ trusted }),
  };
});

vi.mock("#shared/locale/locale-paths.ts", () => ({
  relativeHref: (from: string, to: string) => `href-${from}-${to}`,
}));

vi.mock("#shared/locale/locales.ts", () => ({
  LOCALES: ["en", "ka", "ru"],
}));

describe("page shell", () => {
  it("declares the page language and routes the title through escaping", () => {
    const page = renderPageShell("ka", copyIn("ka"), "");

    expect(page).toContain('<html lang="[escaped:ka]">');
    expect(page).toContain("<title>[escaped:ბიბლიოთეკა ლაუნჯი]</title>");
  });

  it("links each language by its autonym and marks the current one", () => {
    const page = renderPageShell("ka", copyIn("ka"), "");

    expect(page).toContain(
      '<a href="[escaped:href-ka-en]" lang="[escaped:en]">[escaped:English]</a>',
    );
    expect(page).toContain(
      '<a href="[escaped:href-ka-ka]" lang="[escaped:ka]" aria-current="page">[escaped:ქართული]</a>',
    );
    expect(page).toContain(
      '<a href="[escaped:href-ka-ru]" lang="[escaped:ru]">[escaped:Русский]</a>',
    );
    expect(page).toContain('<nav aria-label="[escaped:ენა]">');
  });

  it("plants the body as trusted markup, never through the escaper", () => {
    const page = renderPageShell("en", copyIn("en"), "<em>section</em>");

    expect(page).toContain("<main><em>section</em></main>");
  });
});
