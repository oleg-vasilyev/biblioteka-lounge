import { describe, expect, it, vi } from "vitest";
import { html, raw } from "#shared/html/html.ts";


vi.mock("#shared/html/escape.ts", () => ({
  escapeHtml: (value: string) => `[escaped:${value}]`,
}));

describe("html", () => {
  it("routes every interpolated string through the escaper", () => {
    expect(html`<p>${`x < y & "z"`}</p>`).toBe(`<p>[escaped:x < y & "z"]</p>`);
  });

  it("passes raw fragments through untouched", () => {
    expect(html`<div>${raw("<em>trusted</em>")}</div>`).toBe("<div><em>trusted</em></div>");
  });

  it("stringifies numbers without sending them to the escaper", () => {
    expect(html`<b>${45}</b>`).toBe("<b>45</b>");
  });

  it("joins an array in order, resolving each entry by its own kind", () => {
    expect(html`<ul>${[raw("<li>a</li>"), "b"]}</ul>`).toBe("<ul><li>a</li>[escaped:b]</ul>");
  });

  it("renders a template with no interpolations as written", () => {
    expect(html`<hr>`).toBe("<hr>");
  });
});
