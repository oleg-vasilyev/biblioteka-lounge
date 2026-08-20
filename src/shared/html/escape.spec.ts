import { describe, expect, it } from "vitest";
import { escapeHtml } from "#shared/html/escape.ts";


describe("escapeHtml", () => {
  it("entity-encodes every character that can open markup or close an attribute", () => {
    expect(escapeHtml(`<dish name="Юля's & сыр">`)).toBe(
      "&lt;dish name=&quot;Юля&#39;s &amp; сыр&quot;&gt;",
    );
  });

  it("leaves Georgian, Cyrillic and Latin text untouched", () => {
    expect(escapeHtml("ბიბლიოთეკა ლაუნჯი — Библиотека Лаунж — Biblioteka")).toBe(
      "ბიბლიოთეკა ლაუნჯი — Библиотека Лаунж — Biblioteka",
    );
  });

  it("escapes an ampersand that already looks like an entity, so no double meaning survives", () => {
    expect(escapeHtml("&amp;")).toBe("&amp;amp;");
  });
});
